import sinsdb from "@data/sinsdb";

/**
 * Build a markdown string from the sins list, grouped by commandment.
 * @param {Array} sinsList - Array of sin items
 * @param {Function} getMessage - paraglide message lookup, e.g. (key) => m[key]()
 * @returns {string} markdown-formatted string
 */
export function buildMarkdown(sinsList, getMessage) {
  const grouped = {};
  const customs = [];

  for (const item of sinsList) {
    const cmdId =
      item.commandment_id ??
      sinsdb.sins.find((s) => s.sin_id === item.id)?.commandment_id;

    if (cmdId) {
      if (!grouped[cmdId]) grouped[cmdId] = [];

      grouped[cmdId].push(item.text);
    } else {
      customs.push(item.text);
    }
  }

  const lines = [];

  for (const cmd of sinsdb.commandments) {
    const sins = grouped[cmd.commandment_id];

    if (!sins || sins.length === 0) continue;

    lines.push(`## ${getMessage(`commandments.${cmd.commandment_id}.title`)}`);

    for (const text of sins) {
      lines.push(`- ${text}`);
    }

    lines.push("");
  }

  for (const text of customs) {
    lines.push(`- ${text}`);
  }

  return lines.join("\n").trimEnd();
}

/**
 * Trigger a file download in the browser.
 * @param {string} content - File content
 * @param {string} filename - Filename to download as
 */
export function downloadFile(content, filename) {
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  link.style.visibility = "hidden";

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}

/**
 * Copy text to clipboard with fallback for non-HTTPS contexts.
 * @param {string} text
 * @returns {Promise<boolean>} true if successful
 */
export async function copyToClipboard(text) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
    } else {
      const textarea = document.createElement("textarea");

      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.left = "-9999px";

      document.body.appendChild(textarea);

      textarea.select();

      document.execCommand("copy");
      document.body.removeChild(textarea);
    }

    return true;
  } catch {
    return false;
  }
}
