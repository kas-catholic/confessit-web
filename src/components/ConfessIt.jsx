import React, { useState, useEffect, useCallback } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import sinsdb from "@data/sinsdb";

import ExamineList from "@components/ExamineList";
import SinsList from "@components/SinsList";
import Walkthrough from "@components/Walkthrough";

const ConfessIt = () => {
  const sinsById = new Map(sinsdb.sins.map((s) => [s.sin_id, s]));

  const [selectedSinIds, setSelectedSinIds] = useState([]);
  const [customSins, setCustomSins] = useState([]);

  // Load state from localStorage on component mount
  useEffect(() => {
    const storedState = localStorage.getItem("state");
    if (storedState) {
      const parsedState = JSON.parse(storedState);
      setSelectedSinIds(parsedState.selectedSinIds || []);
      setCustomSins(parsedState.customSins || []);
    }
  }, []);

  // Persist state to localStorage whenever it changes
  const persistData = useCallback(() => {
    localStorage.setItem("state", JSON.stringify({ selectedSinIds, customSins }));
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
    if (sinItem.hasOwnProperty("id") && sinItem.id !== null) {
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

  const clearAll = useCallback(() => {
    setSelectedSinIds([]);
    setCustomSins([]);
  }, []);


  return (
    <div>
      <h1>ConfessIt Component</h1>
      <Swiper spaceBetween={5} slidesPerView={1} breakpoints={{1024: {slidesPerView: 3, spaceBetween: 10}}}>
        <SwiperSlide>
          <ExamineList sinsdb={sinsdb} selectedSinIds={selectedSinIds} onAddSinId={addSinId} onRemoveSinItem={removeSinItem} />
        </SwiperSlide>
        <SwiperSlide><SinsList /></SwiperSlide>
        <SwiperSlide><Walkthrough /></SwiperSlide>
      </Swiper>
    </div>
  );
}

export default ConfessIt;
