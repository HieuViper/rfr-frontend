"use client";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../../app/globals.css";

// import required modules
import { useCallback, useRef, useState } from "react";

import { arrayDataDistricts, customerReviews } from "@/lib/data";
import { toSlug } from "@/lib/utils";
import { StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { IoArrowBackSharp, IoArrowForward } from "react-icons/io5";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Skeleton } from "../ui/skeleton";

const SlideHomepage = ({ data, type }) => {
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
      <div className=" justify-end gap-4 mr-4 md:flex hidden mb-4">
        <button
          className="prev-arrow bg-neutral-700 text-white p-2 rounded-full hover:opacity-70 transition-all"
          onClick={handlePrev}
          aria-label="prev"
        >
          <IoArrowBackSharp size={20} />
        </button>
        <button
          className="next-arrow bg-neutral-700 text-white p-2 rounded-full hover:opacity-70 transition-all"
          onClick={handleNext}
          aria-label="next"
        >
          <IoArrowForward size={20} />
        </button>
      </div>
      <div className="md:pr-10">
        <Swiper
          ref={sliderRef}
          onInit={() => setInitSlides(true)}
          spaceBetween={20}
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
          style={{ padding: "40px 0px" }}
          navigation={{
            nextEl: ".hp-swiper-button-next",
            prevEl: ".hp-swiper-button-prev",
          }}
        >
          {initSlides ? (
            <>
              {type === "districts"
                ? arrayDataDistricts.map((item, index) => (
                    <SwiperSlide key={index}>
                      <MotelCardByDistrict data={item} />
                    </SwiperSlide>
                  ))
                : type === "reviews"
                ? customerReviews.map((item, index) => (
                    <SwiperSlide key={index}>
                      <ReviewCard data={item} />
                    </SwiperSlide>
                  ))
                : data.map((item, index) => (
                    <SwiperSlide key={index}>
                      <RoomCardByDistrict data={item} />
                    </SwiperSlide>
                  ))}
            </>
          ) : (
            <SkeletonComp />
          )}
        </Swiper>
      </div>
    </>
  );
};

export default SlideHomepage;

const MotelCardByDistrict = ({ data }) => {
  return (
    <Link
      href={`/rent-listings/rooms?cityId=50&districtId=${data.id}`}
      className="flex flex-col hover:scale-105 transition-all rounded-xl shadow-md m-2 h-[420px]"
    >
      <div className="h-[300px] relative">
        <Image
          src={data.image}
          alt={data.name}
          fill
          sizes="(max-width: 768px) 90vw, 25vw"
          className="rounded-t-xl w-full h-auto object-contain"
        />
      </div>

      <div className="flex flex-col p-3 ">
        <div className="my-2 text-xl font-medium text-neutral-700 text-start">
          Phòng trọ ở {data.name}
        </div>
        <div className="text-[#4E585A] text-[9pt] md:text-xs text-start">
          {data.description}
        </div>
      </div>
    </Link>
  );
};

const RoomCardByDistrict = ({ data }) => {
  return (
    <Link
      href={`/room/${toSlug(data.name)}-${data.id}`}
      target="_blank"
      className="rounded-lg cursor-pointer relative shadow-xl transform transition duration-400 hover:scale-105 max-h-[440px] flex flex-col"
    >
      <div className="h-[250px] relative">
        {/* swiper */}
        <Image
          src={process.env.NEXT_PUBLIC_CDN_URL + data.image}
          alt={data.name}
          fill
          sizes="(max-width: 768px) 90vw, 25vw"
          className="rounded-t-xl w-full h-auto object-contain"
        />
      </div>
      <span className="bg-white text-[8pt] text-gray-600 py-[5px] px-2 rounded-full absolute top-[5px] right-[5px] z-[1] shadow-md">
        Còn trống
      </span>
      <div className="px-2 pt-1.5 pb-2 flex flex-col flex-1">
        <div className="flex justify-between">
          <p className="text-xs uppercase">{data.phone}</p>
          <div className="flex flex-wrap text-xs gap-x-1">
            <span className="flex items-center after-dot-break">
              {data.roomSize} m<sup>2</sup>
            </span>
          </div>
        </div>
        <div className="flex-1 mb-2">
          <p className="mt-1 font-medium text-xl line-clamp-1">{data.name}</p>
          <p className="text-sm text-slate-400 line-clamp-2">
            {data.motel.address}
          </p>
        </div>
        <div className="">
          <div className="flex mt-2 items-baseline text-xl md:text-2xl text-primary ">
            {data.price.toLocaleString()}đ/{" "}
            <span className="text-sm">tháng</span>
          </div>{" "}
          <div className="h-4">
            {data.isFurnished && (
              <p className="text-primary mt-1 ml-1 text-xs capitalize">
                Bao gồm nội thất
              </p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

const ReviewCard = ({ data }) => {
  return (
    <div className="p-3 flex flex-col justify-between min-h-[140px] shadow-lg">
      <p className="text-gray-700 text-sm">{data.review}</p>
      <div className="flex items-center justify-between gap-2">
        <p className="font-medium text-lg">{data.name}</p>
        <div className="flex gap-2">
          {Array.from({ length: data.stars }).map((_, index) => (
            <StarIcon key={index} className="w-5 h-5 text-yellow-400" />
          ))}
        </div>
      </div>
    </div>
  );
};
const SkeletonComp = () => {
  return (
    <div className="p-5 grid md:grid-cols-5 sm:grid-cols-2 grid-cols-1 gap-10">
      <div className="h-[400px] w-full">
        <Skeleton className="h-[300px]" />
        <Skeleton className="h-2 rounded-full my-2"></Skeleton>
        <Skeleton className="h-2 rounded-full mb-2"></Skeleton>
        <Skeleton className="h-2 rounded-full"></Skeleton>
      </div>
      <div className="h-[440px] w-full sm:block hidden">
        <Skeleton className="h-[300px]" />
        <Skeleton className="h-2 rounded-full my-2"></Skeleton>
        <Skeleton className="h-2 rounded-full mb-2"></Skeleton>
        <Skeleton className="h-2 rounded-full"></Skeleton>
      </div>
      <div className="h-[440px] w-full md:block hidden">
        <Skeleton className="h-[300px]" />
        <Skeleton className="h-2 rounded-full my-2"></Skeleton>
        <Skeleton className="h-2 rounded-full mb-2"></Skeleton>
        <Skeleton className="h-2 rounded-full"></Skeleton>
      </div>
      <div className="h-[440px] w-full md:block hidden">
        <Skeleton className="h-[300px]" />
        <Skeleton className="h-2 rounded-full my-2"></Skeleton>
        <Skeleton className="h-2 rounded-full mb-2"></Skeleton>
        <Skeleton className="h-2 rounded-full"></Skeleton>
      </div>
    </div>
  );
};
