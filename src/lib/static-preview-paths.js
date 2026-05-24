export function getStaticPreviewPrefix(distRelativePath) {
  const normalized = distRelativePath.replace(/\\/g, "/").replace(/^\.?\//, "");
  const segments = normalized.split("/").filter(Boolean);
  const depth = Math.max(segments.length - 1, 0);

  return depth === 0 ? "./" : "../".repeat(depth);
}

export function rewriteStaticPreviewHtml(html, distRelativePath) {
  const prefix = getStaticPreviewPrefix(distRelativePath);

  return html.replace(/(href|src)="\/(?!\/)([^"]*)"/g, (_match, attr, target) => {
    const rewritten = target ? `${prefix}${target}` : prefix;
    return `${attr}="${rewritten}"`;
  });
}
