import { mountReactMarkupPage } from "../framework.js";

function captureBodyMarkup() {
  const cloneHost = document.createElement("div");
  const nodes = Array.from(document.body.childNodes);

  nodes.forEach(node => {
    if (node.nodeType === Node.ELEMENT_NODE && node.tagName === "SCRIPT") {
      return;
    }
    cloneHost.appendChild(node.cloneNode(true));
  });

  return cloneHost.innerHTML.trim();
}

export async function bootstrapReactPage({ imports = [] } = {}) {
  const bodyClass = document.body.className || "";
  const markup = captureBodyMarkup();

  document.body.innerHTML = '<div id="app"></div>';

  if (bodyClass) {
    document.body.className = bodyClass;
  } else {
    document.body.removeAttribute("class");
  }

  mountReactMarkupPage({
    targetId: "app",
    bodyClass,
    markup
  });

  for (const importPath of imports) {
    await import(importPath);
  }
}
