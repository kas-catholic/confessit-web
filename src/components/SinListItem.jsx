import { TrashIcon } from "@heroicons/react/16/solid";
import { useSortable } from "@dnd-kit/react/sortable";

const GripIcon = () => (
  <svg
    viewBox="0 0 12 12"
    fill="currentColor"
    className="w-6 h-6 md:w-4 md:h-4"
  >
    <circle cx="2" cy="2" r="1.2" />
    <circle cx="6" cy="2" r="1.2" />
    <circle cx="2" cy="6" r="1.2" />
    <circle cx="6" cy="6" r="1.2" />
    <circle cx="2" cy="10" r="1.2" />
    <circle cx="6" cy="10" r="1.2" />
  </svg>
);

const SinListItem = ({ sinItem, onRemoveSinItem, id, index }) => {
  const handleDelete = () => {
    onRemoveSinItem(sinItem);
  };

  const { ref, handleRef, isDragSource } = useSortable({ id, index });

  return (
    <div
      ref={ref}
      className={`bg-base-200 p-4 min-h-14 rounded-md flex flex-row gap-4 items-center ${
        isDragSource ? "opacity-50" : ""
      }`}
    >
      <div
        ref={handleRef}
        className="cursor-grab active:cursor-grabbing text-base-content/40 hover:text-base-content/70 shrink-0 p-2 md:p-1 touch-none select-none swiper-no-swiping"
        aria-label="Drag to reorder"
      >
        <GripIcon />
      </div>
      <div className="flex-1">{sinItem.text}</div>
      <a className="btn btn-accent btn-sm h-8 w-10" onClick={handleDelete}>
        <TrashIcon className="h-5" />
      </a>
    </div>
  );
};

export default SinListItem;
