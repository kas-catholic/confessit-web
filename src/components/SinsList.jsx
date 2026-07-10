import { DragDropProvider } from "@dnd-kit/react";
import { move } from "@dnd-kit/helpers";
import SinListItem from "@components/SinListItem";
import { m } from "../paraglide/messages.js";
import { getLocale } from "../paraglide/runtime.js";

const SinsList = ({
  sinsList,
  onReorder,
  onRemoveSinItem,
  onFinishConfession,
  onClearAllData,
  lastConfessionDate,
}) => {
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

  const locale = getLocale();
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
        </div>
      </div>
    </DragDropProvider>
  );
};

export default SinsList;
