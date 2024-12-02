import { TrashIcon } from "@heroicons/react/16/solid";

const SinListItem = ({ sinItem, onRemoveSinItem }) => {
  const handleDelete = () => {
    onRemoveSinItem(sinItem);
  };

  return (
    <div className="py-2 min-h-20 lg:min-h-12 px-0 bg-base-200 rounded-md flex flex-row gap-4 items-center">
      <a className="btn btn-error btn-sm h-full w-10" onClick={handleDelete}>
        <TrashIcon className="h-5" />
      </a>
      <div className="flex-1">{sinItem.text}</div>
    </div>
  );
};

export default SinListItem;
