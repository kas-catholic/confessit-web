const SinListItem = ({ sinItem, onRemoveSinItem }) => {
  const handleDelete = () => {
    onRemoveSinItem(sinItem);
  };

  return (
    <div className="bg-yellow-300">
      {sinItem.text}
      <a className="mt-2 btn btn-error" size="sm" onClick={handleDelete}>
        <i className="fa fa-trash"></i>
      </a>
    </div>
  );
};

export default SinListItem;
