import { getEggCopy } from "@/lib/easter-eggs";

/** Inline script - prints once per page load (no React / no duplicates). */
export function buildConsoleEggScript() {
  const en = getEggCopy("en");
  const fr = getEggCopy("fr");

  return `(function () {
  if (window.__rbConsoleEgg) return;
  window.__rbConsoleEgg = 1;
  var frPath =
    location.pathname === "/fr" || location.pathname.indexOf("/fr/") === 0;
  var title = frPath ? ${JSON.stringify(fr.consoleTitle)} : ${JSON.stringify(en.consoleTitle)};
  var body = frPath ? ${JSON.stringify(fr.consoleBody)} : ${JSON.stringify(en.consoleBody)};
  try {
    console.log(
      "%c" + title,
      "color:#d4b23a;font-weight:700;font-size:13px;font-family:ui-sans-serif,system-ui,sans-serif"
    );
    console.log(
      "%c" + body,
      "color:#a39a8c;font-weight:400;font-size:12px;font-family:ui-sans-serif,system-ui,sans-serif"
    );
  } catch (e) {}
})();`;
}

export const consoleEggScript = buildConsoleEggScript();
