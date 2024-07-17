"use client";
import Loading from "@/app/loading";
import PaginationComp from "@/components/Pagination";
import FilterAdvance from "@/components/filters/FilterAdvance";
import FilterBudget from "@/components/filters/FilterBudget";
import FilterLocation from "@/components/filters/FilterLocation";
import FilterType from "@/components/filters/FilterType";
import Sort from "@/components/filters/Sort";
import NoDataFound from "@/components/not-found/NoDataFound";
import NotFound from "@/components/not-found/NotFound";
import SlideListingPage from "@/components/slides/SlideListingPage";
import TestGGmap1 from "@/components/test/TestGGmap1";
import { usePRouter } from "@/hooks/usePRouter";
import { useGet } from "@/lib/api";
import { convertToAbbreviation, toSlug } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { MdKeyboardArrowRight } from "react-icons/md";

const RentMotelList = ({ searchParams }) => {
  const router = usePRouter();
  const pathname = usePathname();

  const pageSize = searchParams.pageSize || 4;
  const pageIndex = searchParams.pageIndex || 1;

  const cityId = searchParams.cityId;
  const districtId = searchParams.districtId;
  const wardId = searchParams.wardId;

  const isFridge = searchParams.isFridge;
  const isAirConditioner = searchParams.isAirConditioner;
  const isGarret = searchParams.isGarret;
  const isFurnished = searchParams.isFurnished;
  const isWifi = searchParams.isWifi;
  const isTV = searchParams.isTV;
  const isWashingMachine = searchParams.isWashingMachine;

  const priceFrom = searchParams.priceFrom;
  const priceTo = searchParams.priceTo;

  const sort = searchParams.sort;

  const {
    data: motels,
    isLoading: isMotelsLoading,
    error: isMotelsError,
  } = useGet(
    `${process.env.NEXT_PUBLIC_API_URL}/motels/filter-motels?cityId=${cityId}${
      districtId ? `&districtId=${districtId}` : ""
    }${wardId ? `&wardId=${wardId}` : ""}${
      isFridge ? `&isFridge=${true}` : ""
    }${isAirConditioner ? `&isAirConditioner=${true}` : ""}${
      isGarret ? `&isGarret=${true}` : ""
    }${isFurnished ? `&isFurnished=${true}` : ""}${
      isWifi ? `&isWifi=${true}` : ""
    }${isTV ? `&isTV=${true}` : ""}${
      isWashingMachine ? `&isWashingMachine=${true}` : ""
    }${priceFrom ? `&priceFrom=${priceFrom}` : ""}${
      priceTo ? `&priceTo=${priceTo}` : ""
    }${
      sort === "price-asc"
        ? "&sortField=price&sortOrder=ASC"
        : sort === "price-desc"
        ? "&sortField=price&sortOrder=DESC"
        : sort === "createdAt-asc"
        ? ""
        : sort === "name-asc"
        ? "&sortField=name&sortOrder=ASC"
        : ""
    }&pageSize=${pageSize}&pageIndex=${pageIndex}`
  );
  console.log("🚀 ~ RentMotelList ~ motels:", motels);

  const {
    data: districts,
    isLoading: isDistrictsLoading,
    error: isDistrictsError,
  } = useGet(
    `${process.env.NEXT_PUBLIC_API_URL}/locations/districts/${searchParams.cityId}`
  );
  const {
    data: cities,
    isLoading: isCitiesLoading,
    error: isCitiesError,
  } = useGet(`${process.env.NEXT_PUBLIC_API_URL}/locations/cities/1`);
  const {
    data: wards,
    isLoading: isWardsLoading,
    error: isWardsError,
  } = useGet(
    `${process.env.NEXT_PUBLIC_API_URL}/locations/wards/${searchParams.districtId}`,
    searchParams.districtId ? true : false
  );

  const {
    data: cityInfo,
    isLoading: isCityInfoLoading,
    error: isCityInfoError,
  } = useGet(
    `${process.env.NEXT_PUBLIC_API_URL}/locations/city/${searchParams.cityId}`,
    searchParams.cityId ? true : false
  );
  const {
    data: districtInfo,
    isLoading: isDistrictInfoLoading,
    error: isDistrictInfoError,
  } = useGet(
    `${process.env.NEXT_PUBLIC_API_URL}/locations/district/${searchParams.districtId}`,
    searchParams.districtId ? true : false
  );
  const {
    data: wardInfo,
    isLoading: isWardInfoLoading,
    error: isWardInfoError,
  } = useGet(
    `${process.env.NEXT_PUBLIC_API_URL}/locations/ward/${searchParams.wardId}`,
    searchParams.wardId ? true : false
  );

  useEffect(() => {
    // add option "Tat Ca" to districts and wards list
    districts &&
      !isDistrictsLoading &&
      !districts.list.some((item) => item.id === 0) &&
      districts.list.unshift({
        id: 0,
        name: "Tất cả",
      });

    wards &&
      !isWardsLoading &&
      !wards.list.some((item) => item.id === 0) &&
      wards.list.unshift({
        id: 0,
        name: "Tất cả",
      });
  }, [isDistrictsLoading, districts, wards, isWardsLoading]);

  if (!searchParams.cityId) return <NotFound />;
  if (
    isMotelsLoading ||
    isDistrictsLoading ||
    isCitiesLoading ||
    isWardsLoading ||
    isCityInfoLoading ||
    isDistrictInfoLoading ||
    isWardInfoLoading
  )
    return <Loading />;

  return (
    <>
      <section className="w-full border-b overflow-hidden sticky md:top-[80px] top-[56px] bg-white z-10">
        <div className="flex items-center gap-x-3 md:gap-x-5 overflow-x-auto p-2 md:p-4 xl:pl-10">
          {/* filter by location */}
          <div className="">
            <FilterLocation
              data={cities}
              current={searchParams.cityId}
              placeholder="Chọn tỉnh thành"
              onChange={(cityId) =>
                router.replace(`/rent-listings/motels?cityId=${cityId}`)
              }
            />
            <FilterLocation
              data={districts.list}
              placeholder="Chọn quận huyện"
              current={searchParams.districtId || ""}
              onChange={(districtId) => {
                districtId == 0
                  ? router.replace(
                      `/rent-listings/motels?cityId=${searchParams.cityId}`
                    )
                  : router.replace(
                      `/rent-listings/motels?cityId=${searchParams.cityId}&districtId=${districtId}`
                    );
              }}
            />

            {searchParams.districtId && (
              <FilterLocation
                data={wards.list}
                placeholder="Chọn phường xã"
                current={searchParams.wardId || ""}
                onChange={(wardId) => {
                  wardId == 0
                    ? router.replace(
                        `/rent-listings/motels?cityId=${searchParams.cityId}&districtId=${searchParams.districtId}`
                      )
                    : router.replace(
                        `/rent-listings/motels?cityId=${searchParams.cityId}&districtId=${searchParams.districtId}&wardId=${wardId}`
                      );
                }}
                disabled={!searchParams.districtId}
              />
            )}
          </div>

          <div className="w-[1px] h-8 bg-gray-200"></div>

          {/* filter by type */}
          <FilterType searchParams={searchParams} />
          <div className="w-[1px] h-8 bg-gray-200"></div>

          {/* filter by budget */}
          <FilterBudget searchParams={searchParams} />
          <div className="w-[1px] h-8 bg-gray-200"></div>

          {/* sort */}
          <Sort searchParams={searchParams} />

          {/* Advance filter */}
          <FilterAdvance searchParams={searchParams} />
        </div>
      </section>

      {motels.list.length == 0 ? (
        <NoDataFound />
      ) : (
        <>
          <section className="grid grid-cols-12 gap-5 h-full relative ">
            <div className="md:col-span-8 col-span-12 px-16">
              <div className="my-2 md:my-4 text-[9pt] md:text-[11pt] mx-5 flex flex-row items-center">
                <Link href={"/"}>
                  <AiOutlineHome size={20} />
                </Link>
                {cityInfo && (
                  <>
                    <MdKeyboardArrowRight size={20} />
                    {cityInfo.city.name}
                  </>
                )}
                {districtInfo && (
                  <>
                    <MdKeyboardArrowRight size={20} />
                    {districtInfo.district.name}
                  </>
                )}
                {wardInfo && (
                  <>
                    <MdKeyboardArrowRight size={20} />
                    {wardInfo.ward.name}
                  </>
                )}
              </div>

              <h2 className="text-3xl leading-9 text-black my-5 md:my-10 text-center font-semibold">
                Nhà trọ tại:{" "}
                <span className="text-primary">
                  {cityInfo?.city.name}
                  {districtInfo ? " , " + districtInfo.district.name : ""}
                  {wardInfo ? " , " + wardInfo.ward.name : ""}
                </span>
              </h2>

              <div className="pt-0 md:pt-5">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 2xl:gap-10">
                  {!isMotelsLoading &&
                    motels.list.map((item) => (
                      <ListItem key={item.id} data={item} />
                    ))}
                </div>

                <div className="my-10">
                  <PaginationComp
                    pageIndex={pageIndex}
                    total={motels.total}
                    pageSize={motels.pageSize}
                  />
                </div>
              </div>
            </div>

            <div className="md:col-span-4 col-span-12">
              <div className="sticky right-0 top-[159px] h-[calc(100vh-72px-80px)]">
                <TestGGmap1 data={motels.list} />
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default RentMotelList;
export const ListItem = ({ data }) => {
  return (
    <div className="rounded cursor-pointer relative shadow transform transition duration-500 hover:scale-110">
      <a href={`/motel/${toSlug(data.name)}-${data.id}`} target="_blank">
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
                  {data.roomAcreageFrom} m<sup>2</sup>
                </span>
                <span className="flex items-center">
                  {data.roomAcreageTo} m<sup>2</sup>
                </span>
                {/* <span className="flex gap-x-1 items-center">
                  1 <PiBathtubThin size={16} color="slate" />
                </span> */}
              </div>
            </div>
            <p className="mt-1 font-medium text-xl">{data.name}</p>
            <p className="text-sm text-slate-400">{data.address}</p>
            <div className="justify-between">
              <div className="flex mt-2 items-baseline text-xl md:text-2xl  text-teal-500 ">
                {convertToAbbreviation(data.roomPriceFrom)} -{" "}
                {convertToAbbreviation(data.roomPriceTo)} VND /{" "}
                <span className="text-sm">tháng</span>
              </div>{" "}
              <p className="text-teal-500 mt-1 ml-1 text-xs capitalize">
                Utilities included
              </p>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
};
