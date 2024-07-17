"use client";

import Loading from "@/app/loading";
import SlideListingPage from "@/components/slides/SlideListingPage";
import TestGGmap2 from "@/components/test/TestGGmap2";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useGet } from "@/lib/api";
import { fetcher, getIdFromSlug, toSlug } from "@/lib/utils";
import { useEffect, useState } from "react";
import { FaWifi } from "react-icons/fa";
import { FaSquareParking } from "react-icons/fa6";
import { FiHome } from "react-icons/fi";
import { GiFloorHatch, GiLift } from "react-icons/gi";
import {
  MdKeyboardArrowDown,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { RxCaretSort } from "react-icons/rx";
import { TbAirConditioning, TbFridge } from "react-icons/tb";
import useSWR from "swr";

const ListRoomOfMotel = ({ params, searchParams }) => {
  console.log("🚀 ~ ListRoomOfMotel ~ searchParams:", searchParams);
  const motelId = getIdFromSlug(params.motelCode);

  const { data, isLoading, error } = useGet(
    `${process.env.NEXT_PUBLIC_API_URL}/motels/${motelId}`
  );
  console.log("🚀 ~ ListRoomOfMotel ~ data:", data);

  const {
    data: locationList,
    isLoading: isLocationLoading,
    error: isLocationError,
  } = useSWR(
    data && !isLoading && !error
      ? `${process.env.NEXT_PUBLIC_API_URL}/locations/ward/${data.motels.motel.wardId}`
      : null,
    fetcher
  );
  console.log("🚀 ~ ListRoomOfMotel ~ locationList:", locationList);

  const [filter, setFilter] = useState("all");
  useEffect(() => {
    const divElement = document.querySelector('[data-ntpc="GoogleMapsEmbed"]');

    if (divElement) {
      divElement.style.height = "100%";
    }
  }, []);

  if (isLoading || isLocationLoading) {
    return <Loading />;
  }
  if (error || isLocationError) {
    return <div>Error</div>;
  }

  return (
    <>
      <section className="min-h-96 grid grid-cols-12 justify-between">
        <div className="p-3 md:p-5 xl:pl-10 pt-5 col-span-12 lg:col-span-8 border-b">
          <div className="mb-5">
            <h1 className="text-black my-3 text-4xl lg:text-5xl font-semibold">
              Nhà trọ {data.motels.motel.name}
            </h1>
            <div className="flex items-center gap-x-1">
              <FiHome size={18} />
              <MdOutlineKeyboardArrowRight />
              <a
                href={`/rent-listings/motels?cityId=${locationList.ward.city.id}`}
                target="_blank"
              >
                {locationList.ward.city.name}
              </a>
              <MdOutlineKeyboardArrowRight />
              <a
                href={`/rent-listings/motels?cityId=${locationList.ward.city.id}&districtId=${locationList.ward.district.id}`}
                target="_blank"
              >
                {locationList.ward.district.name}
              </a>
              <MdOutlineKeyboardArrowRight />
              <a
                href={`/rent-listings/motels?cityId=${locationList.ward.city.id}&district
                Id=${locationList.ward.district.id}&wardId=${locationList.ward.id}`}
                target="_blank"
              >
                {locationList.ward.name}
              </a>
              <MdOutlineKeyboardArrowRight />
              <span>
                {data.motels.motel.address}, Nhà trọ {data.motels.motel.name}
              </span>
            </div>
          </div>

          <div className="mb-5">
            <div className="flex items-center gap-x-2">
              {data?.motels.motel.isBasement && (
                <div className="gray-chip">
                  <FaSquareParking size={18} />
                  Chỗ để xe
                </div>
              )}
              {data?.motels.motel.isLift && (
                <div className="gray-chip">
                  <GiLift size={18} />
                  Thang máy
                </div>
              )}
              {data?.motels.motel.isMiddle && (
                <div className="gray-chip">
                  <GiFloorHatch size={18} />
                  Tầng lửng
                </div>
              )}
              {data?.motels.motel.isWifi && (
                <div className="gray-chip">
                  <FaWifi size={18} />
                  Wifi
                </div>
              )}
            </div>
            <div className="flex items-center gap-x-2 mt-3">
              <div className="yellow-chip">
                Diện tích: {data.motels.motel.roomAcreageFrom} m<sup>2</sup> ~{" "}
                {data.motels.motel.roomAcreageTo} m<sup>2</sup>
              </div>
              <div className="yellow-chip">
                Số tầng: {data.motels.motel.floorAmount}
              </div>
              <div className="yellow-chip">
                Giá: {data.motels.motel.roomPriceFrom.toLocaleString()} VND ~{" "}
                {data.motels.motel.roomPriceTo.toLocaleString()} VND
              </div>
              <div className="yellow-chip">
                Điện: {data.motels.motel.electricPrice.toLocaleString()} VND/kWh
              </div>
            </div>
            <div className="mt-3">
              <i>Liên hệ:</i>{" "}
              <u>
                <b>{data.motels.motel.contactPhone}</b>
              </u>
            </div>
          </div>

          <div className="mb-5 md:mb-14">
            <div className="flex flex-wrap gap-x-3 gap-y-1.5 mt-5 justify-end ">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className=" rounded-full text-sm h-[40px]">
                    <button className=" shadow hover:shadow-lg text-sm px-3 rounded-full basis-1/3 items-center flex py-1 h-[40px] gap-x-1 text-gray-500">
                      <RxCaretSort size={20} />
                      <span>
                        {filter === "most-relevant"
                          ? "Most Relevant"
                          : filter === "date-of-availability"
                          ? "Date of availability"
                          : filter === "nearest-first"
                          ? "Nearest First"
                          : filter === "cheapest-first"
                          ? "Cheapest First"
                          : filter === "name"
                          ? "Sort by name"
                          : filter === "new"
                          ? "Newest first"
                          : "Default"}
                      </span>
                      <MdKeyboardArrowDown size={20} />
                    </button>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>Sort by</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuRadioGroup
                    value={filter}
                    onValueChange={setFilter}
                  >
                    <DropdownMenuRadioItem value="most-relevant">
                      Most Relevant
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="date-of-availability">
                      Date of availability
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="nearest-first">
                      Nearest First
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="cheapest-first">
                      Cheapest First
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="name">
                      Sort by name
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="new">
                      Newest first
                    </DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {data.motels.motel.rooms.length > 0 ? (
            <ul className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 md:gap-x-5 lg:gap-y-8 xl:pr-4 gap-y-5 relative mb-20">
              {data.motels.motel.rooms.map((room) => (
                <ListItem
                  key={room.id}
                  data={room}
                  locationList={locationList}
                  motelName={data.motels.motel.name}
                />
              ))}
            </ul>
          ) : (
            <div className="flex justify-center">
              <div className="text-center">
                <h1 className="text-2xl font-bold">Không có phong trọ nào</h1>
              </div>
            </div>
          )}
        </div>

        <div className="hidden lg:block col-span-4 justify-center">
          <div className="sticky h-full top-[80px] right-0">
            <TestGGmap2 data={data.motels.motel} />
          </div>
        </div>
      </section>
    </>
  );
};

export default ListRoomOfMotel;

const ListItem = ({ data, locationList, motelName }) => {
  return (
    <li className="md:col-span-1 col-span-2">
      <div className="rounded cursor-pointer relative ">
        <a href={`/room/phong-${toSlug(data.name)}-${data.id}`} target="_blank">
          <div>
            <div className="h-[250px]">
              {/* swiper */}
              <SlideListingPage mainImage={data.image} images={data.photos} />
            </div>
            {data.status === "AVAILABLE" ? (
              <span className="bg-white text-[8pt] text-gray-600 py-[5px] px-2 rounded-full absolute top-[5px] right-[5px] z-[1] shadow-md">
                Phòng trống
              </span>
            ) : (
              <span className="bg-white text-[8pt] text-gray-600 py-[5px] px-2 rounded-full absolute top-[5px] right-[5px] z-[1] shadow-md">
                Phòng đã cho thuê
              </span>
            )}

            <div className="p-1 pt-1.5">
              <div className="flex justify-between">
                <p className="text-xs uppercase">Lorem ipsum dolor sit amet</p>
                <div className="flex flex-wrap text-xs gap-x-1">
                  <span className="flex items-center after-dot-break">
                    {data?.roomSize} m<sup>2</sup>
                  </span>
                  {data?.isAirConditioner && (
                    <>
                      <span className="flex gap-x-1 items-center after-dot-break">
                        1 <TbAirConditioning size={16} color="slate" />
                      </span>
                    </>
                  )}
                  {data?.isFridge && (
                    <>
                      <span className="flex gap-x-1 items-center">
                        1 <TbFridge size={16} color="slate" />
                      </span>
                    </>
                  )}
                </div>
              </div>
              <p className="mt-1 font-medium text-xl">{data.name}</p>
              <p className="text-sm text-slate-400">
                Lorem ipsum dolor sit amet
              </p>
              <div className="justify-between">
                <div className="flex mt-2 items-baseline text-xl md:text-2xl  text-teal-500 ">
                  {data.price.toLocaleString()} VND /{" "}
                  <span className="text-sm">tháng</span>
                </div>
                <p className="text-teal-500 mt-1 ml-1 text-xs capitalize">
                  {data?.isFurnished && "Bao gồm nội thất"}
                </p>
              </div>
            </div>
          </div>
        </a>
      </div>
    </li>
  );
};
