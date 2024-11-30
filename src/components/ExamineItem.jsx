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
    <div className="form-control border-2 border-base-300 first:rounded-t-md last:rounded-b-md">
      <label className="cursor-pointer label p-4 justify-start min-h-24">
        <input
          id={`checkitem:${sinId}`}
          type="checkbox"
          checked={selected}
          onChange={handleClick}
          className="checkbox checkbox-primary checkbox-lg me-4"
        />
        <span className="label-text text-lg">{text}</span>
      </label>
    </div>
  );
};

export default ExamineItem;
