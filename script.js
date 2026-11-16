(function(){
  const C = window.PAGE_CONFIG || {};

  function setText(id, value){
    const el = document.getElementById(id);
    if(!el) return;
    el.textContent = value ?? "";
  }

  function safeUrl(url){
    if(!url || typeof url !== "string") return "";
    if(url.includes("PLACEHOLDER")) return "";
    return url;
  }

  setText("welcomeMessage", C.welcomeMessage || "");

  const googlePlay = document.getElementById("btnGooglePlay");
  const appStore = document.getElementById("btnAppStore");

  const downloadHint = document.getElementById("downloadHint");
  if(downloadHint) downloadHint.textContent = C.ui?.downloadHint || "";

  const placeholderNote = document.getElementById("uiPlaceholderNote");
  const genericNote = document.getElementById("genericNote");

  const hasMissing =
    (safeUrl(C.links?.googlePlayUrl) === "") ||
    (safeUrl(C.links?.appStoreUrl) === "") ||
    (safeUrl(C.links?.whatsappUrl) === "");

  if(placeholderNote){
    if(hasMissing){
      placeholderNote.style.display = "block";
      placeholderNote.textContent = C.ui?.placeholderLinksNote || "Há links com placeholder. Substitua no arquivo.";
    }
  }

  if(genericNote){
    genericNote.textContent = hasMissing
      ? "Atenção: alguns botões ainda podem não funcionar até você substituir os placeholders no código."
      : "Pronto! Botões e links foram configurados.";
  }

  if(googlePlay){
    googlePlay.href = safeUrl(C.links?.googlePlayUrl) || "#";
    const t = googlePlay.querySelector(".btnText");
    if(t && C.ui?.ctaAndroidLabel) t.textContent = C.ui.ctaAndroidLabel;
  }
  if(appStore){
    appStore.href = safeUrl(C.links?.appStoreUrl) || "#";
    const t = appStore.querySelector(".btnText");
    if(t && C.ui?.ctaAppleLabel) t.textContent = C.ui.ctaAppleLabel;
  }

  const stepDownload = document.getElementById("stepDownload");
  const stepCadastro = document.getElementById("stepCadastro");
  const stepAcesso = document.getElementById("stepAcesso");

  function fillList(ulEl, items){
    if(!ulEl) return;
    ulEl.innerHTML = "";
    (items || []).forEach((txt)=>{
      const li = document.createElement("li");
      li.textContent = txt;
      ulEl.appendChild(li);
    });
  }

  fillList(stepDownload, C.passos?.comoBaixar);
  fillList(stepCadastro, C.cadastro?.comoCadastrar);
  fillList(stepAcesso, C.acesso?.comoAcessar);

  setText("horario", C.funcionamento?.horario || "");
  setText("pagamento", C.pagamento?.formas || "");
  setText("comoFunciona", C.regras?.comoFunciona || "");
  setText("regrasBasicas", C.regras?.regrasBasicas || "");

  const btnWhatsApp = document.getElementById("btnWhatsApp");
  if(btnWhatsApp){
    const u = safeUrl(C.links?.whatsappUrl);
    btnWhatsApp.href = u || "#";
    btnWhatsApp.setAttribute("aria-disabled", u ? "false" : "true");
  }

  const faqList = document.getElementById("faqList");
  if(faqList){
    const items = C.faq || [];
    faqList.innerHTML = "";

    items.forEach((item)=>{
      const wrapper = document.createElement("div");
      wrapper.className = "faqItem";
      wrapper.setAttribute("aria-expanded", "false");

      const btn = document.createElement("button");
      btn.className = "faqBtn";
      btn.type = "button";
      btn.textContent = item.q || "";

      const ans = document.createElement("div");
      ans.className = "faqAnswer";
      ans.textContent = item.a || "";

      btn.addEventListener("click", ()=>{
        const expanded = wrapper.getAttribute("aria-expanded") === "true";
        wrapper.setAttribute("aria-expanded", expanded ? "false" : "true");
      });

      wrapper.appendChild(btn);
      wrapper.appendChild(ans);
      faqList.appendChild(wrapper);
    });
  }
})();
