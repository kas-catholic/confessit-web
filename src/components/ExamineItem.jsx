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
    <div className="bg-green-200">
      {text}
      <div className="md-checkbox">
        <input
          id={`checkitem:${sinId}`}
          type="checkbox"
          checked={selected}
          onChange={handleClick}
        />
        <label htmlFor={`checkitem:${sinId}`}>{t("examineitem.yes")}</label>
      </div>
    </div>
  );
};

export default ExamineItem;
