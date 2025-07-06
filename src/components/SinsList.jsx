import SinListItem from "@components/SinListItem";
import i18next from "i18next";
import { useTranslation } from "react-i18next";

const SinsList = ({
  sinsList,
  onRemoveSinItem,
  onFinishConfession,
  onClearAllData,
  lastConfessionDate,
}) => {
  const { t } = useTranslation();
  const sinItems = sinsList.map((sinItem, index) => (
    <SinListItem
      sinItem={sinItem}
      onRemoveSinItem={onRemoveSinItem}
      key={index}
    />
  ));

  const locale = i18next.language;
  let formattedDate = null;
  if (lastConfessionDate) {
    const dateObj = new Date(lastConfessionDate);
    formattedDate = dateObj.toLocaleDateString(locale, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  return (
    <div className="flex flex-col px-4 gap-4">
      {lastConfessionDate && (
        <div className="text-center text-base-content/80 mb-2">
          {t("sins_list.last_confession_on", {
            defaultValue: "Your last confession was on {{date}}.",
            date: formattedDate,
          })}
        </div>
      )}
      {sinItems}
      <div className="flex flex-col gap-2 mt-6 items-center">
        {onFinishConfession && (
          <button
            className="btn btn-primary w-full max-w-xs"
            onClick={onFinishConfession}
          >
            {t("sins_list.finish_confession", "Finish Confession")}
          </button>
        )}
        {onClearAllData && (
          <button
            className="btn btn-outline w-full max-w-xs"
            onClick={onClearAllData}
          >
            {t("sins_list.clear_all_data", "Clear All Data")}
          </button>
        )}
      </div>
    </div>
  );
};

export default SinsList;
