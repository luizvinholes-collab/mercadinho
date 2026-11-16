(() => {
  const links = (window.PAGE_CONFIG && window.PAGE_CONFIG.links) || {};
  for (const [id, url] of Object.entries({btnGooglePlay: links.googlePlayUrl, btnAppStore: links.appStoreUrl, btnWhatsApp: links.whatsappUrl})) {
    const link = document.getElementById(id);
    if (link && typeof url === "string" && url.trim()) link.href = url;
  }
})();
