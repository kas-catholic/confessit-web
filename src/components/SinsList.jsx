import { DragDropProvider } from "@dnd-kit/react";
import { move } from "@dnd-kit/helpers";
import SinListItem from "@components/SinListItem";
import { m } from "../paraglide/messages.js";
import { getLocale } from "../paraglide/runtime.js";
import { jsPDF } from "jspdf";
import { useState } from "react";
import sinsdb from "@data/sinsdb";

const SinsList = ({
  sinsList,
  onReorder,
  onRemoveSinItem,
  onFinishConfession,
  onClearAllData,
  lastConfessionDate,
}) => {
  const locale = getLocale();
  const [showExportOptions, setShowExportOptions] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  const handleDragEnd = (event) => {
    const next = move(sinsList, event);
    if (next === sinsList) return;

    onReorder(next);
  };

  const sinItems = sinsList.map((sinItem, index) => (
    <SinListItem
      sinItem={sinItem}
      onRemoveSinItem={onRemoveSinItem}
      key={sinItem.id}
      id={sinItem.id}
      index={index}
    />
  ));

  // Helper to get the text content for export, grouped by commandment
  const getContentText = () => {
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
      lines.push(m[`commandments.${cmd.commandment_id}.title`]());
      for (const text of sins) {
        lines.push(`  ${text}`);
      }
      lines.push("");
    }
    for (const text of customs) {
      lines.push(text);
    }

    return lines.join("\n").trimEnd();
  };

  const handleExportText = () => {
    const text = getContentText();
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "confession.txt");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    let y = 20;
    const lineHeight = 10;
    const pageLimit = 280;

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

    const drawLine = (text, bold) => {
      if (y > pageLimit) {
        doc.addPage();
        y = 20;
      }
      doc.setFont("helvetica", bold ? "bold" : "normal");
      doc.setFontSize(bold ? 13 : 12);
      doc.text(text, 20, y);
      y += lineHeight;
    };

    for (const cmd of sinsdb.commandments) {
      const sins = grouped[cmd.commandment_id];

      if (!sins || sins.length === 0) continue;

      drawLine(m[`commandments.${cmd.commandment_id}.title`](), true);

      for (const text of sins) {
        drawLine(`  ${text}`, false);
      }

      y += 4;
    }

    for (const text of customs) {
      drawLine(text, false);
    }

    doc.save("confession.pdf");
  };

  const handleCopyToClipboard = async () => {
    const text = getContentText();

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

      showToastMessage(m["sins_list.copied_to_clipboard"]());
    } catch {
      showToastMessage(m["sins_list.failed_to_copy"]());
    }
  };

  const showToastMessage = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  return (
    <DragDropProvider onDragEnd={handleDragEnd}>
      <div className="flex flex-col px-4 gap-4">
        {lastConfessionDate && (
          <div className="text-center text-base-content/80 mb-2">
            {m["sins_list.last_confession_on"]({
              date: lastConfessionDate.toLocaleDateString(locale, {
                year: "numeric",
                month: "long",
                day: "numeric",
              }),
            })}
          </div>
        )}
        {sinItems}
        <div className="flex flex-col gap-2 mt-6 items-center">
          {onFinishConfession && (
            <button
              className="btn btn-primary w-full max-w-xs"
              onClick={onFinishConfession}
            >
              {m["sins_list.finish_confession"]() ?? "Finish Confession"}
            </button>
          )}
          {onClearAllData && (
            <button
              className="btn btn-outline w-full max-w-xs"
              onClick={onClearAllData}
            >
              {m["sins_list.clear_all_data"]() ?? "Clear All Data"}
            </button>
          )}
          <div className="relative w-full max-w-xs">
            <button
              className="btn btn-outline w-full justify-between"
              onClick={() => setShowExportOptions(!showExportOptions)}
            >
              {m["sins_list.export"]()}
              <svg
                className="ml-2 h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={showExportOptions ? "M18 9l-3 3-3-3" : "M9 15l3-3 3 3"}
                />
              </svg>
            </button>

            {showExportOptions && (
              <div className="absolute right-0 mt-2 w-56 bg-base-100 border border-base-content/20 rounded-md shadow-lg z-20">
                <div className="py-1">
                  <button
                    className="flex w-full px-4 py-2 text-left text-base-content hover:bg-base-200 cursor-pointer"
                    onClick={() => {
                      handleExportText();
                      setShowExportOptions(false);
                    }}
                  >
                    {m["sins_list.export_as_text"]()}
                  </button>
                  <button
                    className="flex w-full px-4 py-2 text-left text-base-content hover:bg-base-200 cursor-pointer"
                    onClick={() => {
                      handleExportPDF();
                      setShowExportOptions(false);
                    }}
                  >
                    {m["sins_list.export_as_pdf"]()}
                  </button>
                  <button
                    className="flex w-full px-4 py-2 text-left text-base-content hover:bg-base-200 cursor-pointer"
                    onClick={() => {
                      handleCopyToClipboard();
                      setShowExportOptions(false);
                    }}
                  >
                    {m["sins_list.copy_to_clipboard"]()}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {showToast && (
          <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-base-200 text-base-content px-4 py-2 rounded-md shadow-lg z-50">
            {toastMessage}
          </div>
        )}
      </div>
    </DragDropProvider>
  );
};

export default SinsList;
