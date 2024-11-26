import { t } from "i18next";

import SinListItem from "@components/SinListItem";

const SinsList = ({ sinsList, onRemoveSinItem }) => {
  const sinCards = sinsList.map((sinItem, index) => (
    <SinListItem
      sinItem={sinItem}
      onRemoveSinItem={onRemoveSinItem}
      key={index}
    />
  ));

  return <div>{sinCards}</div>;
};

export default SinsList;
