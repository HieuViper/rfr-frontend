"use client";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../../app/globals.css";

// import required modules
import { useCallback, useRef, useState } from "react";
import { Pagination } from "swiper/modules";

import { arrayDataDistricts } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import { IoArrowBackSharp, IoArrowForward } from "react-icons/io5";

const SlideHomepage = ({ ref }) => {
  const [initSlides, setInitSlides] = useState(false);

  const sliderRef = useRef(null);

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);
  return (
    <>
      <div className=" justify-end gap-4 mr-4 md:flex hidden mb-5">
        <button
          className="prev-arrow bg-neutral-700 text-white p-2 rounded-full hover:opacity-70 transition-all"
          onClick={handlePrev}
        >
          <IoArrowBackSharp size={20} />
        </button>
        <button
          className="next-arrow bg-neutral-700 text-white p-2 rounded-full hover:opacity-70 transition-all"
          onClick={handleNext}
        >
          <IoArrowForward size={20} />
        </button>
      </div>
      <Swiper
        ref={sliderRef}
        onInit={() => setInitSlides(true)}
        spaceBetween={30}
        breakpoints={{
          320: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 4,
          },
        }}
        modules={[Pagination]}
        className="mySwiper"
        navigation={{
          nextEl: ".hp-swiper-button-next",
          prevEl: ".hp-swiper-button-prev",
        }}
      >
        {initSlides && (
          <>
            {arrayDataDistricts.map((item, index) => (
              <SwiperSlide key={index}>
                <Card data={item} />
              </SwiperSlide>
            ))}
          </>
        )}
      </Swiper>
    </>
  );
};

export default SlideHomepage;

const Card = ({ data }) => {
  return (
    <Link
      href={`/rent-listings/rooms?cityId=50&districtId=${data.id}`}
      className="flex flex-col hover:scale-105 transition-all h-full rounded-xl shadow-md m-2"
    >
      <div className="h-[300px] relative">
        <Image
          src={data.image}
          alt={data.name}
          fill
          sizes="(min-width: 2720px) 574px, (min-width: 2080px) 430px, (min-width: 1600px) 322px, (min-width: 1300px) 254px, (min-width: 800px) 142px, 259px"
          className="rounded-t-xl w-full h-auto object-contain"
        />
      </div>

      <div className="flex flex-col p-3 ">
        <div className="my-2 text-xl font-medium text-neutral-700 text-start">
          Phòng trọ ở {data.name}
        </div>
        <div className="text-[#7b8389] text-[9pt] md:text-xs text-start">
          {data.description}
        </div>
      </div>
    </Link>
  );
};
