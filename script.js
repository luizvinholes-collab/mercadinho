(function(){
  const C = window.PAGE_CONFIG || {};

  function setText(id, value){
    const el = document.getElementById(id);
    if(!el) return;
    el.textContent = value ?? "";
  }

  function safeUrl(url){
    if(!url || typeof url !== "string") return "";
    return url;
  }

  // Título e boas-vindas (mantidos)
  setText("siteTitle", C.siteName || "Mercadinho Porto Itália");
  setText("welcomeMessage", C.welcomeMessage || "");

  // Dica pequena
  const downloadHint = document.getElementById("downloadHint");
  if(downloadHint) downloadHint.textContent = "Acesso rápido para baixar e começar.";

  // Botões (mantidos links atuais)
  const googlePlay = document.getElementById("btnGooglePlay");
  const appStore = document.getElementById("btnAppStore");
  const btnWhatsApp = document.getElementById("btnWhatsApp");

  if(googlePlay) googlePlay.href = safeUrl(C.links?.googlePlayUrl) || "#";
  if(appStore) appStore.href = safeUrl(C.links?.appStoreUrl) || "#";
  if(btnWhatsApp) btnWhatsApp.href = safeUrl(C.links?.whatsappUrl) || "#";

  // Informações úteis
  setText("horario", C.funcionamento?.horario || "");
  setText("pagamento", C.pagamento?.formas || "");

  // Primeiros passos (lista 1..5 como solicitado)
  const passosList = document.getElementById("passosList");
  if(passosList){
    const items = Array.isArray(C.passos) ? C.passos : [];
    passosList.innerHTML = "";

    items.forEach((txt)=>{
      const li = document.createElement("li");
      li.textContent = txt;
      passosList.appendChild(li);
    });
  }
})();
