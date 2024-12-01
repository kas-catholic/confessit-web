import { t } from "i18next";

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
    <div className="form-control">
      <label className="cursor-pointer label py-2 px-0 justify-start min-h-20 lg:min-h-12">
        <input
          id={`checkitem:${sinId}`}
          type="checkbox"
          checked={selected}
          onChange={handleClick}
          className="checkbox checkbox-primary me-4"
        />
        <span className="label-text">{text}</span>
      </label>
    </div>
  );
};

export default ExamineItem;
