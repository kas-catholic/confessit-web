import { TrashIcon } from "@heroicons/react/16/solid";

const SinListItem = ({ sinItem, onRemoveSinItem }) => {
  const handleDelete = () => {
    onRemoveSinItem(sinItem);
  };

  return (
    <div className="bg-base-200 p-4 min-h-14 rounded-md flex flex-row gap-4 items-center">
      <div className="flex-1">{sinItem.text}</div>
      <a className="btn btn-accent btn-sm h-full w-10" onClick={handleDelete}>
        <TrashIcon className="h-5" />
      </a>
    </div>
  );
};

export default SinListItem;
