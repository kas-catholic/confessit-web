import { TrashIcon } from "@heroicons/react/16/solid";

const SinListItem = ({ sinItem, onRemoveSinItem }) => {
  const handleDelete = () => {
    onRemoveSinItem(sinItem);
  };

  return (
    <div className="mb-4 bg-base-200 rounded-md flex flex-row">
      <div className="flex-1 p-2 flex flex-col justify-center">
        {sinItem.text}
      </div>
      <a className="btn btn-error h-full w-12" onClick={handleDelete}>
        <TrashIcon className="h-5" />
      </a>
    </div>
  );
};

export default SinListItem;
