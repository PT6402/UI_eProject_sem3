/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import "./sliderStyles.css";
import { Swiper, SwiperSlide } from "swiper/react";

import ProductCard from "../ProductCard";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const ProductSlider = ({
  onTouchStart,
  onTouchEnd,
  slides,
  bp,
  slidesPerView,
  spaceBetween,
  pagination,
  allowTouchMove = true,
  modules,
  sliderClassName,
  slideClassName,
  fillClassName,
  cardExpandableClassName,
  onCardPick,
  navigation,
}) => {
  const [isNestedBeingDragged, setIsNestedBeingDragged] = useState(false);
  console.log(isNestedBeingDragged);
  return (
    <>
      <Swiper
        centerInsufficientSlides
        breakpoints={bp ? bp : undefined}
        slidesPerView={slidesPerView}
        spaceBetween={spaceBetween}
        pagination={pagination}
        allowSlidePrev={true}
        allowSlideNext={true}
        allowTouchMove={allowTouchMove}
        modules={modules}
        navigation={{
          nextEl: ".image-swiper-button-next",
          prevEl: ".image-swiper-button-prev",
          disabledClass: "swiper-button-disabled",
        }}
        className={`${sliderClassName} slider-navigation`}>
        {navigation && (
          <>
            <div className={`swiper-button image-swiper-button-prev`}>
              <FaArrowLeft />
            </div>
            <div className={`swiper-button image-swiper-button-next`}>
              <FaArrowRight />
            </div>
          </>
        )}
        {slides.map((slide) => (
          <SwiperSlide key={slide.id} className={slideClassName}>
            <ProductCard
              name={slide.name}
              description={slide.description}
              id={slide.id}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default ProductSlider;
