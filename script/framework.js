import React from "https://esm.sh/react@18.3.1";
import { createRoot } from "https://esm.sh/react-dom@18.3.1/client";

const frameworkState = {
  name: "React 18",
  bootedAt: new Date().toISOString(),
  page: window.location.pathname.split("/").pop() || "index.html"
};

window.React = React;
window.__frontendFramework = frameworkState;
document.documentElement.dataset.framework = "react";

window.dispatchEvent(
  new CustomEvent("framework:ready", {
    detail: frameworkState
  })
);

const roots = new Map();

function PageMarkup({ markup }) {
  return React.createElement("div", {
    id: "react-page-shell",
    dangerouslySetInnerHTML: { __html: markup }
  });
}

export function mountReactMarkupPage({
  targetId = "app",
  bodyClass = "",
  markup = ""
}) {
  const host = document.getElementById(targetId);
  if (!host) {
    throw new Error(`Target root #${targetId} tidak ditemukan.`);
  }

  if (typeof bodyClass === "string" && bodyClass.trim()) {
    document.body.className = bodyClass.trim();
  }

  if (!roots.has(targetId)) {
    roots.set(targetId, createRoot(host));
  }

  const root = roots.get(targetId);
  root.render(React.createElement(PageMarkup, { markup }));
}

export { React };
