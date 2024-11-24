import { t } from "i18next";

import ListHeader from "@components/ListHeader";
import SinListItem from "@components/SinListItem";

const SinsList = ({ sinsList, onRemoveSinItem }) => {
  const sinCards = sinsList.map((sinItem, index) => (
    <SinListItem
      sinItem={sinItem}
      onRemoveSinItem={onRemoveSinItem}
      key={index}
    />
  ));

  return (
    <div>
      <ListHeader>{t("sins_list.review")}</ListHeader>
      {sinCards}
    </div>
  );
};

export default SinsList;
