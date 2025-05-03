import { TrashIcon } from "@heroicons/react/16/solid";
import { useSortable } from "@dnd-kit/react/sortable";

const SinListItem = ({ sinItem, onRemoveSinItem, index }) => {
  const { ref } = useSortable({
    id: sinItem.id ?? sinItem.text + Math.random(),
    index,
  });

  const handleDelete = () => {
    onRemoveSinItem(sinItem);
  };

  return (
    <div
      ref={ref}
      className="bg-base-200 p-4 min-h-14 rounded-md flex flex-row gap-4 items-center"
    >
      <div data-id={sinItem.text} className="flex-1">
        {sinItem.text}
      </div>

      <a className="btn btn-accent btn-sm h-8 w-10" onClick={handleDelete}>
        <TrashIcon className="h-5" />
      </a>
    </div>
  );
};

export default SinListItem;
