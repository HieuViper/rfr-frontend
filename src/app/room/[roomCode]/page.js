"use client";
import Loading from "@/app/loading";
import CardRoom from "@/components/card/CardRoom";
import { useToast } from "@/components/ui/use-toast";
import { fetcher, getIdFromSlug } from "@/lib/utils";
import { PhoneCallIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { FaRegMap, FaShareSquare } from "react-icons/fa";
import { FaHouse, FaLocationDot } from "react-icons/fa6";
import { IoIosPeople } from "react-icons/io";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { PiHouseLight } from "react-icons/pi";
import useSWR from "swr";
import Gallery from "./_components/Gallery1";
import Gallery2 from "./_components/Gallery2";
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
          {data.room.name}, {motel?.motels?.motel?.address},{" "}
          {location.ward.name}, {location.ward.district.name},{" "}
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
          {data?.room.numberOfRoommates && (
            <div className="gray-chip">
              <IoIosPeople size={24} />
              <span>Ở được {data?.room.numberOfRoommates} người</span>
            </div>
          )}
        </div>
      </section>

      <div className="grid grid-cols-12 gap-y-1 gap-x-8 lg:gap-x-10">
        <div className="col-span-12 lg:col-span-8">
          <section className="col-span-12">
            <button className="w-full right-5 cursor-pointer bg-white text-center z-50">
              <div className="hidden md:grid grid-cols-12 h-[420px] mt-2 gap-x-3">
                <div className="col-span-8 relative">
                  <Gallery2 images={imagesGallery}>
                    <Image
                      src={
                        data?.room.image
                          ? process.env.NEXT_PUBLIC_CDN_URL + data?.room.image
                          : "/images/no-image.png"
                      }
                      alt="anh"
                      fill
                      priority
                      sizes="50vw"
                      className="object-cover rounded-xl"
                    />
                  </Gallery2>
                  <div className="flex justify-between align-bottom absolute bottom-5 w-full">
                    <div className="ml-5 w-fit h-[38px]">
                      <div className="flex md:flex-row gap-x-2 gap-y-2 h-full md:gap-y-3 flex-wrap font-medium ">
                        <Link
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
                        </Link>
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
                    <Gallery2 images={imagesGallery}>
                      <Image
                        src={
                          data?.room.photos[0]
                            ? process.env.NEXT_PUBLIC_CDN_URL +
                              data?.room.photos[0].url
                            : "/images/no-image.png"
                        }
                        alt="anh"
                        fill
                        sizes="30vw"
                        className="object-cover rounded-xl"
                      />
                    </Gallery2>
                  </div>
                  <div className="row-span-6 w-full relative">
                    <Gallery2 images={imagesGallery}>
                      <Image
                        src={
                          data?.room.photos[1]
                            ? process.env.NEXT_PUBLIC_CDN_URL +
                              data?.room.photos[1].url
                            : "/images/no-image.png"
                        }
                        alt="anh"
                        sizes="30vw"
                        fill
                        className="object-cover rounded-xl"
                      />
                    </Gallery2>
                  </div>
                </div>
              </div>
              {/* mobile */}
              <div className="block md:hidden shadow  relative md:rounded-md overflow-hidden">
                <div className="h-[50vh] relative">
                  <Gallery2 images={imagesGallery}>
                    <Image
                      src={
                        data?.room.image
                          ? process.env.NEXT_PUBLIC_CDN_URL + data?.room.image
                          : "/images/no-image.png"
                      }
                      alt="anh"
                      className="object-cover"
                      fill
                    />
                  </Gallery2>
                  <div className="flex justify-between align-bottom absolute bottom-5 w-full">
                    <div className="ml-5 w-fit h-[38px]">
                      <div className="flex md:flex-row gap-x-2 gap-y-2 h-full md:gap-y-3 flex-wrap font-medium ">
                        <Link
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
                        </Link>
                      </div>
                    </div>
                    <div className="flex mr-5 items-center gap-x-3">
                      <div className="relative flex gap-x-2 items-center w-fit h-[38px] px-3 cursor-pointer bg-white hover:bg-gray-200 rounded-full text-center">
                        <Gallery images={imagesGallery} />
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
                <Link
                  href={`/rent-listings/rooms?cityId=${location.ward.city.id}`}
                  target="_blank"
                >
                  {location.ward.city.name}
                </Link>

                <MdOutlineKeyboardArrowRight />
                <Link
                  href={`/rent-listings/rooms?cityId=${location.ward.city.id}&districtId=${location.ward.district.id}`}
                  target="_blank"
                >
                  {location.ward.district.name}
                </Link>
                <MdOutlineKeyboardArrowRight />
                <Link
                  href={`/rent-listings/rooms?cityId=${location.ward.city.id}&districtId=${location.ward.district.id}&wardId=${location.ward.id}`}
                  target="_blank"
                >
                  {location.ward.name}
                </Link>
                <MdOutlineKeyboardArrowRight />
                {motel?.motels?.motel?.address}
                <MdOutlineKeyboardArrowRight />
                {data.room.name}
              </div>
            </div>
          </section>
          {/* mobile */}
          <div className="block md:hidden shadow relative md:rounded-md overflow-hidden">
            <div className="flex items-center mx-4 my-2">
              <div className="my-2 md:my-4 text-[9pt] md:text-[11pt] flex flex-row flex-wrap items-center gap-1">
                <PiHouseLight />
                <MdOutlineKeyboardArrowRight />
                <Link
                  href={`/rent-listings/rooms?cityId=${location.ward.city.id}`}
                  target="_blank"
                >
                  {location.ward.city.name}
                </Link>

                <MdOutlineKeyboardArrowRight />
                <Link
                  href={`/rent-listings/rooms?cityId=${location.ward.city.id}&districtId=${location.ward.district.id}`}
                  target="_blank"
                >
                  {location.ward.district.name}
                </Link>
                <MdOutlineKeyboardArrowRight />
                <Link
                  href={`/rent-listings/rooms?cityId=${location.ward.city.id}&districtId=${location.ward.district.id}&wardId=${location.ward.id}`}
                  target="_blank"
                >
                  {location.ward.name}
                </Link>
                <MdOutlineKeyboardArrowRight />
                {data.room.name}
              </div>
            </div>

            <div className=" mx-4 mt-2 mb-5">
              <div className="flex gap-2">
                <h1 className="text-2xl md:text-5xl font-semibold text-gray-700 md:col-span-9 leading-8 text-start">
                  {data.room.name}
                </h1>
                <CopyToClipboard
                  text={window.location.href}
                  onCopy={() => {
                    toast({
                      title: "Sao chép thành công!",
                    });
                  }}
                >
                  <button className="flex items-center justify-center text-sm px-3 py-2 gap-x-2 shadow-md hover:shadow-lg rounded-full bg-white h-fit">
                    <FaShareSquare />
                    <div className="hidden md:block">Chia sẻ</div>
                  </button>
                </CopyToClipboard>
              </div>
              <div className="flex flex-row items-center gap-x-2 text-gray-600 mt-4 text-sm">
                {data.room.name}, {location.ward.name},{" "}
                {location.ward.district.name}, {location.ward.city.name}
              </div>
              <div className="flex md:flex-row gap-x-3 gap-y-2 md:gap-y-3 mt-6 flex-wrap">
                <div className="flex items-center rounded-full text-sm text-gray-600 py-1.5 px-4 border-2 border-primary">
                  <span className="font-semibold text-primary">
                    Phòng trống
                  </span>
                </div>
                <div className="gray-chip">
                  <FaHouse />
                  <span>
                    {data?.room.roomSize} m<sup>2</sup>
                  </span>
                </div>
                {data?.room.numberOfRoommates && (
                  <div className="gray-chip">
                    <IoIosPeople size={24} />
                    <span>Ở được {data?.room.numberOfRoommates} người</span>
                  </div>
                )}
                <button
                  className="w-full rounded-full py-2 text-pink-700 bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] hover:shadow-xl"
                  onClick={() => setShowPhone(true)}
                >
                  {showPhone ? (
                    <a
                      href={`tel:${data.room.motel[0].contactPhone}`}
                      className="flex items-center justify-center gap-2"
                    >
                      <PhoneCallIcon size={18} />{" "}
                      {data.room.motel[0].contactPhone}
                    </a>
                  ) : (
                    "Yêu cầu thông tin"
                  )}
                </button>
              </div>
            </div>
          </div>

          <TabComponentTest
            data={data}
            motelRegulation={motel?.motels?.motel?.regulation}
          />
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
                {showPhone ? (
                  <a
                    href={`tel:${data.room.motel[0].contactPhone}`}
                    className="flex items-center justify-center gap-2"
                  >
                    <PhoneCallIcon size={18} />{" "}
                    {data.room.motel[0].contactPhone}
                  </a>
                ) : (
                  "Yêu cầu thông tin"
                )}
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
                <CardRoom
                  address={room.address}
                  id={room.id}
                  image={room.image}
                  isFurnished={room.isFurnished}
                  name={room.name}
                  phone={room.phone}
                  photos={room.photos}
                  price={room.price}
                  roomSize={room.roomSize}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
};

export default DetailRoomPage;
