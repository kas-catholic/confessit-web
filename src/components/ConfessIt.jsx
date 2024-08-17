import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import ExamineList from "./ExamineList";
import SinsList from "./SinsList";
import Walkthrough from "./Walkthrough";

function ConfessIt() {


  return (
    <div>
      <h1>ConfessIt Component</h1>
      <Swiper spaceBetween={5} slidesPerView={1} breakpoints={{1024: {slidesPerView: 3, spaceBetween: 10}}}>
        <SwiperSlide><ExamineList /></SwiperSlide>
        <SwiperSlide><SinsList /></SwiperSlide>
        <SwiperSlide><Walkthrough /></SwiperSlide>
      </Swiper>
    </div>
  );
}

export default ConfessIt;
