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
    <div className="border-2 p-2 border-base-300 first:rounded-t-md last:rounded-b-md">
      {text}
      <div className="md-checkbox">
        <div class="form-control w-20 ms-auto">
          <label className="cursor-pointer label">
            <span class="label-text text-lg">{t("examineitem.yes")}</span>
            <input
              id={`checkitem:${sinId}`}
              type="checkbox"
              checked={selected}
              onChange={handleClick}
              className="checkbox checkbox-primary checkbox-lg"
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default ExamineItem;
