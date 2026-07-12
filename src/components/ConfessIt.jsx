import { useState, useEffect, useCallback, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { m } from "../paraglide/messages.js";

import sinsdb from "@data/sinsdb";

import AddSinModal from "@components/AddSinModal";
import Column from "@components/Column";
import ExamineList from "@components/ExamineList";
import SinsList from "@components/SinsList";
import Walkthrough from "@components/Walkthrough";
import WelcomeModal from "@components/WelcomeModal";

const ConfessIt = () => {
  const [sinsList, setSinsList] = useState([]);
  const [lastConfessionDate, setLastConfessionDate] = useState(null);

  const hasHydrated = useRef(false);

  useEffect(() => {
    const storedState = localStorage.getItem("state");

    if (storedState) {
      try {
        const parsedState = JSON.parse(storedState);

        if (parsedState.version === 1) {
          if (Array.isArray(parsedState.data?.sinsList)) {
            setSinsList(parsedState.data.sinsList);
          }
        } else {
          const migrated = (parsedState.selectedSinIds || []).map((id) => ({
            id,
            text: m[`sins.${id}.text_past`](),
            type: "sin",
          }));
          const storedCustomSins = parsedState.customSins || [];
          storedCustomSins.forEach((s) => {
            migrated.push(
              typeof s === "string"
                ? {
                    id: `custom-${crypto.randomUUID()}`,
                    text: s,
                    type: "custom",
                  }
                : { ...s, type: "custom" },
            );
          });

          setSinsList(migrated);
        }
      } catch {
        console.warn("Failed to load persisted state; starting fresh.");
      }
    }

    const lastConfessionDateStr = localStorage.getItem("lastConfessionDate");
    if (lastConfessionDateStr) {
      setLastConfessionDate(new Date(lastConfessionDateStr));
    }
    hasHydrated.current = true;
  }, []);

  // Persist state to localStorage whenever it changes (after hydration).
  const persistData = useCallback(() => {
    localStorage.setItem(
      "state",
      JSON.stringify({ version: 1, data: { sinsList } }),
    );
  }, [sinsList]);

  useEffect(() => {
    if (!hasHydrated.current) return;
    persistData();
  }, [sinsList, persistData]);

  const addSinId = useCallback((id) => {
    setSinsList((prev) => [
      ...prev,
      { id, text: m[`sins.${id}.text_past`](), type: "sin" },
    ]);
  }, []);

  const removeSinItem = useCallback((sinItem) => {
    setSinsList((prev) => prev.filter((s) => s.id !== sinItem.id));
  }, []);

  const addCustomSin = useCallback((text) => {
    setSinsList((prev) => [
      ...prev,
      { id: `custom-${crypto.randomUUID()}`, text, type: "custom" },
    ]);
  }, []);

  const handleReorderSinsList = useCallback((newOrder) => {
    setSinsList(newOrder);
  }, []);

  const handleFinishConfession = useCallback(() => {
    const now = new Date();

    localStorage.setItem("lastConfessionDate", now);
    setLastConfessionDate(now);
    setSinsList([]);
  }, []);

  const handleClearAllData = useCallback(() => {
    localStorage.removeItem("lastConfessionDate");
    setSinsList([]);
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
        noSwiping={true}
        className="h-full"
      >
        <SwiperSlide className="h-full">
          <Column title={m["examine_list.examine"]() ?? "Examine"}>
            <ExamineList
              sinsdb={sinsdb}
              selectedSinIds={sinsList
                .filter((s) => s.type === "sin")
                .map((s) => s.id)}
              onAddSinId={addSinId}
              onRemoveSinItem={removeSinItem}
            />
          </Column>
        </SwiperSlide>
        <SwiperSlide>
          <Column title={m["sins_list.review"]() ?? "Review"}>
            <SinsList
              sinsList={sinsList}
              onReorder={handleReorderSinsList}
              onRemoveSinItem={removeSinItem}
              onFinishConfession={handleFinishConfession}
              onClearAllData={handleClearAllData}
              lastConfessionDate={lastConfessionDate}
            />
          </Column>
        </SwiperSlide>
        <SwiperSlide>
          <Column title={m["walkthrough.walkthrough"]() ?? "Walkthrough"}>
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
