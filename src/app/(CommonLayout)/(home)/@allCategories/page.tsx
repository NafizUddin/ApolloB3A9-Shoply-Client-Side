"use client";

import SectionTitle from "@/src/components/HomeComponents/SectionTitle/SectionTitle";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { BsArrowRight } from "react-icons/bs";
import { BsArrowLeft } from "react-icons/bs";
import { useGetAllCategoriesQuery } from "@/src/lib/redux/features/category/categoryApi";
import { ICategory } from "@/src/types/model";
import HomeCategoryCard from "@/src/components/Cards/HomeCategoryCard";
import { useRef } from "react";

const AllCategories = () => {
  const { data: allCategories, isLoading } =
    useGetAllCategoriesQuery(undefined);

  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

  return (
    <div className="pb-14 px-5">
      <div className="flex justify-between items-center mb-8">
        <SectionTitle sub="Categories" heading="Browse Top Category" />
        <div className="flex gap-4">
          <button
            ref={prevRef}
            className="w-14 h-14 bg-primary rounded-full flex justify-center items-center"
          >
            <BsArrowLeft className="text-white text-xl" />
          </button>
          <button
            ref={nextRef}
            className="w-14 h-14 bg-primary rounded-full flex justify-center items-center"
          >
            <BsArrowRight className="text-white text-xl" />
          </button>
        </div>
      </div>

      <Swiper
        slidesPerView={5}
        spaceBetween={20}
        loop={true}
        modules={[Navigation]}
        className="mySwiper"
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onBeforeInit={(swiper) => {
          if (
            swiper.params.navigation &&
            typeof swiper.params.navigation !== "boolean"
          ) {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }
        }}
      >
        {allCategories?.map((category: ICategory, index: number) => (
          <SwiperSlide key={index}>
            <HomeCategoryCard category={category} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default AllCategories;
