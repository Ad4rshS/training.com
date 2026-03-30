function openLink(url) {
  // Use window.open with noopener for better security.
  const w = window.open(url, "_blank", "noopener,noreferrer");
  if (w) return;

  // Fallback in case pop-up blockers block the new tab.
  window.location.href = url;
}

function wireUpButtons() {
  const buttons = document.querySelectorAll("[data-link]");
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const url = btn.getAttribute("data-link");
      if (!url) return;
      openLink(url);
    });
  });
}

document.addEventListener("DOMContentLoaded", wireUpButtons);

function registerServiceWorker() {
  // PWA install prompts typically require a service worker.
  if (!("serviceWorker" in navigator)) return;

  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("./service-worker.js")
      .catch(() => {
        // If registration fails (offline/unsupported), the page still works normally.
      });
  });
}

registerServiceWorker();

