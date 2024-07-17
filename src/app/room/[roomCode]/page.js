"use client";
import Loading from "@/app/loading";
import SlideListingPage from "@/components/slides/SlideListingPage";
import { useToast } from "@/components/ui/use-toast";
import { fetcher, getIdFromSlug, toSlug } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { FaRegMap, FaShareSquare } from "react-icons/fa";
import { FaHouse, FaLocationDot } from "react-icons/fa6";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { PiHouseLight } from "react-icons/pi";
import useSWR from "swr";
import Gallery from "./_components/Gallery";
import TabComponentTest from "./_components/TabComponentTest";

const DetailRoomPage = ({ params, searchParams }) => {
  const roomId = getIdFromSlug(params.roomCode);
  const { toast } = useToast();

  const [showPhone, setShowPhone] = useState(false);

  const { data, isLoading, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/rooms/${roomId}`,
    fetcher
  );
  console.log("🚀 ~ DetailRoomPage ~ data:", data);

  const {
    data: motel,
    isLoading: isMotelLoading,
    error: isMotelError,
  } = useSWR(
    data && !isLoading && !error
      ? `${process.env.NEXT_PUBLIC_API_URL}/motels/${data.room.motelId}`
      : null,
    fetcher
  );
  console.log("🚀 ~ DetailRoomPage ~ motel:", motel);

  const {
    data: location,
    isLoading: isLocationLoading,
    error: isLocationError,
  } = useSWR(
    motel && !isMotelLoading && !isMotelError
      ? `${process.env.NEXT_PUBLIC_API_URL}/locations/ward/${motel.motels.motel.wardId}`
      : null,
    fetcher
  );
  console.log("🚀 ~ DetailRoomPage ~ location:", location);

  const {
    data: relateRoom,
    isLoading: isRelateRoomLoading,
    error: isRelateRoomError,
  } = useSWR(
    location && !isLocationLoading && !isLocationError
      ? `${process.env.NEXT_PUBLIC_API_URL}/rooms/filter-rooms?cityId=${location.ward.city.id}&pageIndex=1&pageSize=6`
      : null,
    fetcher
  );
  console.log("🚀 ~ DetailRoomPage ~ relateRoom:", relateRoom);
  console.log(
    `${process.env.NEXT_PUBLIC_API_URL}/rooms/filter-rooms?cityId=${location?.ward?.city?.id}`
  );

  const imagesGallery = data && !isLoading && data?.room.photos;
  imagesGallery &&
    !imagesGallery.some((item) => item.url === data?.room.image) &&
    imagesGallery.unshift({
      url: data?.room.image,
      name: "Main Image",
    });

  if (isLoading || isMotelLoading || isLocationLoading) return <Loading />;
  if (error || isMotelError || isLocationError) return <p>Error</p>;

  return (
    <article className="m-auto w-full w-12/12 xl:w-11/12 max-w-[1480px] md:mt-12 md:px-4 lg:px-7 xl:px-0">
      <section className="hidden md:block col-span-12 mb-10">
        <div className="grid grid-cols-12">
          <h1 className="text-2xl md:text-5xl font-semibold text-gray-700 mb-2 md:col-span-9 leading-6 ">
            {data.room.name}
          </h1>
          <div className="flex justify-end items-center gap-x-3 col-span-3">
            <div className="flex justify-end items-center gap-x-3">
              <CopyToClipboard
                text={window.location.href}
                onCopy={() => {
                  toast({
                    title: "Sao chép thành công!",
                  });
                }}
              >
                <button className="flex items-center justify-center text-sm px-3 py-2 gap-x-2 shadow-md hover:shadow-lg rounded-full bg-white">
                  <FaShareSquare />
                  <div className="hidden md:block">Chia sẻ</div>
                </button>
              </CopyToClipboard>
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center gap-x-2 text-gray-600 mt-4">
          <FaLocationDot />
          {data.room.name}, {location.ward.name}, {location.ward.district.name},{" "}
          {location.ward.city.name}
        </div>
        <div className="flex md:flex-row gap-x-3 gap-y-2 md:gap-y-3 mt-6 flex-wrap">
          <div className="flex items-center rounded-full text-sm text-gray-600 py-1.5 px-4 border-2 border-primary">
            <span className="font-semibold text-primary">Phòng trống</span>
          </div>
          <div className="gray-chip">
            <FaHouse />
            <span>
              {data?.room.roomSize} m<sup>2</sup>
            </span>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-12 gap-y-1 gap-x-8 lg:gap-x-10">
        <div className="col-span-11 lg:col-span-8">
          <section className="col-span-12">
            <button className="w-full right-5 cursor-pointer bg-white text-center z-50">
              <div className="hidden md:grid grid-cols-12 h-[420px] mt-2 gap-x-3">
                <div className="col-span-8 relative">
                  <Image
                    src={
                      data?.room.image
                        ? process.env.NEXT_PUBLIC_CDN_URL + data?.room.image
                        : "/images/no-image.png"
                    }
                    alt="anh"
                    fill
                    priority
                    sizes="35vw"
                    className="object-cover rounded-xl"
                  />
                  <div className="flex justify-between align-bottom absolute bottom-5 w-full">
                    <div className="ml-5 w-fit h-[38px]">
                      <div className="flex md:flex-row gap-x-2 gap-y-2 h-full md:gap-y-3 flex-wrap font-medium ">
                        <a
                          className="flex items-center rounded-full gap-x-2 hover:bg-gray-200 md:py-2 px-4 bg-white"
                          href={
                            "https://maps.google.com/?q=" +
                            data?.room.motel[0].latitude +
                            "," +
                            data?.room.motel[0].longitude
                          }
                          target="_blank"
                        >
                          <FaRegMap />
                          <span className="text-sm font-medium">
                            Google Map
                          </span>
                        </a>
                      </div>
                    </div>
                    <div className="flex mr-5 items-center gap-x-3">
                      <div className="relative flex gap-x-2 items-center w-fit h-[38px] px-3 cursor-pointer bg-white hover:bg-gray-200 rounded-full text-center">
                        <Gallery images={imagesGallery} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-span-4 grid grid-rows-12 h-[420px] gap-y-3">
                  <div className="row-span-6 w-full relative">
                    <Image
                      src={
                        data?.room.photos[0]
                          ? process.env.NEXT_PUBLIC_CDN_URL +
                            data?.room.photos[0].url
                          : "/images/no-image.png"
                      }
                      alt="anh"
                      fill
                      sizes="15vw"
                      className="object-cover rounded-xl"
                    />
                  </div>
                  <div className="row-span-6 w-full relative">
                    <Image
                      src={
                        data?.room.photos[1]
                          ? process.env.NEXT_PUBLIC_CDN_URL +
                            data?.room.photos[1].url
                          : "/images/no-image.png"
                      }
                      alt="anh"
                      sizes="15vw"
                      fill
                      className="object-cover rounded-xl"
                    />
                  </div>
                </div>
              </div>
              {/* mobile */}
              <div className="block md:hidden shadow  relative md:rounded-md overflow-hidden">
                <div className="h-[50vh] relative">
                  <Image
                    src={
                      "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    }
                    alt="anh"
                    className="object-cover"
                    fill
                  />
                  <div className="flex justify-between align-bottom absolute bottom-5 w-full">
                    <div className="ml-5 w-fit h-[38px]">
                      <div className="flex md:flex-row gap-x-2 gap-y-2 h-full md:gap-y-3 flex-wrap font-medium ">
                        <a
                          className="flex items-center rounded-full gap-x-2 hover:bg-gray-200 md:py-2 px-4 bg-white"
                          href="/"
                        >
                          <FaRegMap />
                          <span className="text-sm font-medium">View map</span>
                        </a>
                      </div>
                    </div>
                    <div className="flex mr-5 items-center gap-x-3">
                      <div className="relative flex gap-x-2 items-center w-fit h-[38px] px-3 cursor-pointer bg-white hover:bg-gray-200 rounded-full text-center">
                        <span className="text-sm font-medium">
                          View photos (23)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </button>
            <div className="hidden md:block">
              <div className="my-2 md:my-4 text-[9pt] md:text-[11pt] flex flex-row items-center gap-1 flex-wrap">
                <PiHouseLight />
                <MdOutlineKeyboardArrowRight />
                <a
                  href={`/rent-listings/rooms?cityId=${location.ward.city.id}`}
                  target="_blank"
                >
                  {location.ward.city.name}
                </a>

                <MdOutlineKeyboardArrowRight />
                <a
                  href={`/rent-listings/rooms?cityId=${location.ward.city.id}&districtId=${location.ward.district.id}`}
                  target="_blank"
                >
                  {location.ward.district.name}
                </a>
                <MdOutlineKeyboardArrowRight />
                <a
                  href={`/rent-listings/rooms?cityId=${location.ward.city.id}&districtId=${location.ward.district.id}&wardId=${location.ward.id}`}
                  target="_blank"
                >
                  {location.ward.name}
                </a>
                <MdOutlineKeyboardArrowRight />
                {data.room.name}
              </div>
            </div>
          </section>
          {/* mobile */}
          <div className="block md:hidden shadow relative md:rounded-md overflow-hidden">
            <div className="flex justify-between items-center mx-4 mt-2 mb-5">
              <div className="my-2 md:my-4 text-[9pt] md:text-[11pt] flex flex-row items-center gap-1">
                <PiHouseLight />
                <MdOutlineKeyboardArrowRight />
                <a
                  href={`/rent-listings/rooms?cityId=${location.ward.city.id}`}
                  target="_blank"
                >
                  {location.ward.city.name}
                </a>

                <MdOutlineKeyboardArrowRight />
                <a
                  href={`/rent-listings/rooms?cityId=${location.ward.city.id}&districtId=${location.ward.district.id}`}
                  target="_blank"
                >
                  {location.ward.district.name}
                </a>
                <MdOutlineKeyboardArrowRight />
                <a
                  href={`/rent-listings/rooms?cityId=${location.ward.city.id}&districtId=${location.ward.district.id}&wardId=${location.ward.id}`}
                  target="_blank"
                >
                  {location.ward.name}
                </a>
                <MdOutlineKeyboardArrowRight />
                {data.room.name}
              </div>
              <button className="flex items-center justify-center text-sm px-3 py-2 gap-x-2 shadow-md hover:shadow-lg rounded-full bg-white">
                <FaShareSquare size={12} />
                <div className="hidden md:block">Chia sẻ</div>
              </button>
            </div>

            <div className=" mx-4 mt-2 mb-5">
              <h1 className="text-2xl md:text-5xl font-semibold text-gray-700 mb-2 md:col-span-9 leading-8 text-start">
                Via Alfredo Soffredini 29/31 Milano
              </h1>
              <div className="flex flex-row items-center gap-x-2 text-gray-600 mt-4 text-sm">
                Via Privata Alfredo Soffredini, Milan, Italy
              </div>
              <div className="flex md:flex-row gap-x-3 gap-y-2 md:gap-y-3 mt-6 flex-wrap">
                <div className="flex items-center rounded-full text-sm text-gray-600 py-1.5 px-4 border-2 border-primary">
                  <span className="font-semibold text-primary">
                    Available Now
                  </span>
                </div>
                <div className="flex items-center rounded-full text-sm text-gray-600 py-1.5 px-4 gap-x-2 bg-gray-200/50">
                  <FaHouse />
                  <span>
                    {data?.room.roomSize} m<sup>2</sup>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <TabComponentTest data={data} />
        </div>

        <div className="hidden lg:block md:col-span-12 lg:col-span-4 xl:col-span-4 2xl:col-span-4">
          <div className="sticky top-[110px] ">
            <div className=" p-10 rounded-xl flex flex-col items-center justify-center gap-5 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]">
              <div className="flex items-end text-pink-700">
                <span className="text-3xl font-medium">
                  {data.room.price.toLocaleString()} VND/
                </span>
                <span className="text-sm">tháng</span>
              </div>
              <button className="w-full rounded-full py-2 text-white bg-gradient-to-r from-primary to-pink-500 relative animation-pulse hover:shadow-lg">
                Thuê ngay
              </button>
              <button
                className="w-full rounded-full py-2 text-pink-700 bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] hover:shadow-xl"
                onClick={() => setShowPhone(true)}
              >
                {showPhone
                  ? data.room.motel[0].contactPhone
                  : "Yêu cầu thông tin"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <section className="mx-6 md:mx-2 mb-10 pt-10">
        <p className="text-2xl text-gray-600 font-semibold mt-2 mb-8 ">
          Có thể bạn cũng quan tâm
        </p>
        <div className="md:px-3">
          <div className="grid grid-cols-12 gap-4 md:gap-x-2 lg:gap-y-6 lg:gap-x-6 mt-10">
            {relateRoom?.list.map((room) => (
              <div
                key={room.id}
                className="col-span-12 md:col-span-6 lg:col-span-4"
              >
                <ListItem data={room} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
};

export default DetailRoomPage;

const ListItem = ({ data }) => {
  return (
    <div className="rounded cursor-pointer relative shadow transform transition duration-500 hover:scale-110">
      <a href={`/room/${toSlug(data.name)}-${data.id}`} target="_blank">
        <div>
          <div className="h-[250px]">
            {/* swiper */}
            <SlideListingPage mainImage={data.image} images={data.photos} />
          </div>
          <span className="bg-white text-[8pt] text-gray-600 py-[5px] px-2 rounded-full absolute top-[5px] right-[5px] z-[1] shadow-md">
            Còn trống
          </span>
          <div className="p-1 pt-1.5">
            <div className="flex justify-between">
              <p className="text-xs uppercase">{data.phone}</p>
              <div className="flex flex-wrap text-xs gap-x-1">
                <span className="flex items-center after-dot-break">
                  {data.roomSize} m<sup>2</sup>
                </span>
              </div>
            </div>
            <p className="mt-1 font-medium text-xl">{data.name}</p>
            <p className="text-sm text-slate-400">{data.motel.address}</p>
            <div className="justify-between">
              <div className="flex mt-2 items-baseline text-xl md:text-2xl  text-primary ">
                {data.price.toLocaleString()}đ/{" "}
                <span className="text-sm">tháng</span>
              </div>{" "}
              {data.isFurnished && (
                <p className="text-primary mt-1 ml-1 text-xs capitalize">
                  Bao gồm nội thất
                </p>
              )}
            </div>
          </div>
        </div>
      </a>
    </div>
  );
};
