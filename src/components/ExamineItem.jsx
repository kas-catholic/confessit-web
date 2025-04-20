const ExamineItem = ({
  text,
  sinId,
  selected,
  onAddSinId,
  onRemoveSinItem,
}) => {
  const handleClick = (e) => {
    if (e.target.checked) {
      onAddSinId(sinId);
    } else {
      onRemoveSinItem({ id: sinId });
    }
  };

  return (
    <fieldset className="fieldset py-2 px-0 justify-start content-center min-h-14">
      <label className="fieldset-label text-base text-base-content">
        <input
          id={`checkitem:${sinId}`}
          type="checkbox"
          checked={selected}
          onChange={handleClick}
          className="checkbox checkbox-primary me-4"
        />
        {text}
      </label>
    </fieldset>
  );
};

export default ExamineItem;
