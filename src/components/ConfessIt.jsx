import { useState, useEffect, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { t } from "i18next";

import sinsdb from "@data/sinsdb";

import AddSinModal from "@components/AddSinModal";
import Column from "@components/Column";
import ExamineList from "@components/ExamineList";
import SinsList from "@components/SinsList";
import Walkthrough from "@components/Walkthrough";
import WelcomeModal from "@components/WelcomeModal";

const ConfessIt = () => {
  const [selectedSinIds, setSelectedSinIds] = useState([]);
  const [customSins, setCustomSins] = useState([]);
  const [lastConfessionDate, setLastConfessionDate] = useState(null);
  // Load state from localStorage on component mount
  useEffect(() => {
    const storedState = localStorage.getItem("state");
    if (storedState) {
      const parsedState = JSON.parse(storedState);
      setSelectedSinIds(parsedState.selectedSinIds || []);
      setCustomSins(parsedState.customSins || []);
    }

    const lastConfessionDateStr = localStorage.getItem("lastConfessionDate");
    if (lastConfessionDateStr) {
      setLastConfessionDate(new Date(lastConfessionDateStr));
    }
  }, []);

  // Persist state to localStorage whenever it changes
  const persistData = useCallback(() => {
    localStorage.setItem(
      "state",
      JSON.stringify({ selectedSinIds, customSins }),
    );
  }, [selectedSinIds, customSins]);

  useEffect(() => {
    persistData();
  }, [selectedSinIds, customSins, persistData]);

  const sinsList = selectedSinIds
    .map((id) => ({
      id: id,
      text: t(`sins.${id}.text_past`),
    }))
    .concat(customSins.map((text) => ({ text: text })));

  const addSinId = useCallback((id) => {
    setSelectedSinIds((prev) => [...prev, id]);
  }, []);

  const removeSinItem = useCallback((sinItem) => {
    if ("id" in sinItem && sinItem.id !== null) {
      setSelectedSinIds((prev) => prev.filter((s) => s !== sinItem.id));
    } else {
      removeCustomSin(sinItem.text);
    }
  }, []);

  const addCustomSin = useCallback((text) => {
    setCustomSins((prev) => [...prev, text]);
  }, []);

  const removeCustomSin = useCallback((text) => {
    setCustomSins((prev) => prev.filter((s) => s !== text));
  }, []);

  const handleFinishConfession = useCallback(() => {
    const now = new Date();

    localStorage.setItem("lastConfessionDate", now);
    setLastConfessionDate(now);
    setSelectedSinIds([]);
    setCustomSins([]);
  }, [t]);

  const handleClearAllData = useCallback(() => {
    localStorage.removeItem("lastConfessionDate");
    setSelectedSinIds([]);
    setCustomSins([]);
    setLastConfessionDate(null);
  }, []);

  return (
    <div className="w-full h-full">
      <Swiper
        modules={[Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        breakpoints={{ 1024: { slidesPerView: 3, spaceBetween: 0 } }}
        pagination={{ clickable: true }}
        className="h-full"
      >
        <SwiperSlide className="h-full">
          <Column title={t("examine_list.examine", "Examine")}>
            <ExamineList
              sinsdb={sinsdb}
              selectedSinIds={selectedSinIds}
              onAddSinId={addSinId}
              onRemoveSinItem={removeSinItem}
            />
          </Column>
        </SwiperSlide>
        <SwiperSlide>
          <Column title={t("sins_list.review", "Review")}>
            <SinsList
              sinsList={sinsList}
              onRemoveSinItem={removeSinItem}
              onFinishConfession={handleFinishConfession}
              onClearAllData={handleClearAllData}
              lastConfessionDate={lastConfessionDate}
            />
          </Column>
        </SwiperSlide>
        <SwiperSlide>
          <Column title={t("walkthrough.walkthrough", "Walkthrough")}>
            <Walkthrough
              sinsList={sinsList}
              lastConfessionDate={lastConfessionDate}
            />
          </Column>
        </SwiperSlide>
      </Swiper>
      <AddSinModal addCustomSin={addCustomSin} />
      <WelcomeModal />
    </div>
  );
};

export default ConfessIt;
