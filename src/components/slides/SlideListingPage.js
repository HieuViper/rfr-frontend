import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "../../app/globals.css";

// import required modules
import Image from "next/image";
import { Navigation, Pagination } from "swiper/modules";
const SlideListingPage = ({ mainImage, images }) => {
  const listImage = mainImage
    ? [{ url: mainImage, name: "mainImage" }, ...images]
    : images;
  return (
    <>
      <Swiper
        navigation={true}
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Navigation, Pagination]}
        className="mySwiper rounded-xl"
        style={{
          "--swiper-navigation-color": "white",
          "--swiper-navigation-size": "24px",
          "--swiper-pagination-color": "#e11d48",
          "--swiper-pagination-bullet-inactive-color": "#999999",
          "--swiper-pagination-bullet-inactive-opacity": "1",
        }}
      >
        {listImage.map((image, index) =>
          !image?.url ? (
            <SwiperSlide key={index}>
              <Image
                src={"/image/no-image.jpg"}
                alt="anh"
                fill
                sizes="304px"
                className="object-cover rounded-xl"
              />
            </SwiperSlide>
          ) : (
            <SwiperSlide key={index}>
              <Image
                src={process.env.NEXT_PUBLIC_CDN_URL + image.url}
                alt={image.name}
                fill
                priority
                sizes="304px"
                className="object-cover rounded-xl"
              />
            </SwiperSlide>
          )
        )}
      </Swiper>
    </>
  );
};

export default SlideListingPage;
