"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useEffect, useRef, useState } from "react";
import { FaHandsWash, FaShower, FaWifi } from "react-icons/fa";
import { FaKitchenSet } from "react-icons/fa6";
import { GiWashingMachine } from "react-icons/gi";
import { IoIosArrowDown } from "react-icons/io";
import { LuSofa } from "react-icons/lu";
import { MdMicrowave, MdPets } from "react-icons/md";
import { PiCookingPot, PiGenderIntersex, PiTelevision } from "react-icons/pi";
import { SlHome } from "react-icons/sl";
import { TbAirConditioning, TbFridge } from "react-icons/tb";

const TabComponentTest = ({ data }) => {
  const descriptionContentRef = useRef();
  const detailsContentRef = useRef();
  const conditionsContentRef = useRef();
  const priceContentRef = useRef();
  const howToBookContentRef = useRef();
  const descriptionBtnRef = useRef();
  const detailsBtnRef = useRef();
  const conditionsBtnRef = useRef();
  const priceBtnRef = useRef();
  const howToBookBtnRef = useRef();

  const scrollToTargetAdjusted = (contentRef, btnRef) => {
    //scroll
    var element = contentRef.current;
    var headerOffset = 140;
    var elementPosition = element.getBoundingClientRect().top;
    var offsetPosition = elementPosition + window.scrollY - headerOffset;
    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });

    ///active button
    const listBtn = [
      descriptionBtnRef,
      detailsBtnRef,
      conditionsBtnRef,
      priceBtnRef,
      howToBookBtnRef,
    ];
    const index = listBtn.indexOf(btnRef);
    if (index !== -1) {
      listBtn.splice(index, 1);
    }
    listBtn.forEach((btn) => {
      btn.current.classList.remove("active-tab");
    });
    if (!btnRef.current.classList.contains("active-tab")) {
      btnRef.current.classList.add("active-tab");
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      ///active button
      const listBtn = [
        descriptionBtnRef,
        detailsBtnRef,
        conditionsBtnRef,
        priceBtnRef,
        howToBookBtnRef,
      ];
      const listContent = [
        descriptionContentRef,
        detailsContentRef,
        conditionsContentRef,
        priceContentRef,
        howToBookContentRef,
      ];

      let currentSection = descriptionContentRef;
      listContent.forEach((section) => {
        const sectionTop = section.current.offsetTop;
        // console.log("🚀 ~ listContent.forEach ~ sectionTop:", sectionTop);
        // console.log("🚀 ~ listContent.forEach ~ scrollY:", scrollY);
        if (scrollY >= sectionTop - 140) {
          currentSection = section;
        }
      });
      let currentBtn = descriptionBtnRef;
      listBtn.forEach((btn) => {
        btn.current.classList.remove("active-tab");
      });

      if (currentSection === descriptionContentRef) {
        listBtn.splice(descriptionBtnRef, 1);
        currentBtn = descriptionBtnRef;
      }
      if (currentSection === detailsContentRef) {
        listBtn.splice(detailsBtnRef, 1);
        currentBtn = detailsBtnRef;
      }
      if (currentSection === conditionsContentRef) {
        listBtn.splice(conditionsBtnRef, 1);
        currentBtn = conditionsBtnRef;
      }
      if (currentSection === priceContentRef) {
        listBtn.splice(priceBtnRef, 1);
        currentBtn = priceBtnRef;
      }
      if (currentSection === howToBookContentRef) {
        listBtn.splice(howToBookBtnRef, 1);
        currentBtn = howToBookBtnRef;
      }

      if (!currentBtn.current.classList.contains("active-tab")) {
        currentBtn.current.classList.add("active-tab");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      <div className="flex items-center justify-between md:top-[80px] h-[60px] text-sm bg-white overflow-x-auto whitespace-nowrap my-3 md:my-6 sticky top-[55px]">
        <button
          className="uppercase deactive-tab hover-active-tab active-tab flex justify-center items-center w-full h-full md:px-0 px-4"
          ref={descriptionBtnRef}
          onClick={() =>
            scrollToTargetAdjusted(descriptionContentRef, descriptionBtnRef)
          }
        >
          Giới thiệu chung
        </button>
        <button
          className="uppercase deactive-tab hover-active-tab flex justify-center items-center w-full h-full md:px-0 px-4"
          ref={detailsBtnRef}
          onClick={() =>
            scrollToTargetAdjusted(detailsContentRef, detailsBtnRef)
          }
        >
          Chi tiết
        </button>
        <button
          className="uppercase deactive-tab hover-active-tab flex justify-center items-center w-full h-full md:px-0 px-4"
          ref={conditionsBtnRef}
          onClick={() =>
            scrollToTargetAdjusted(conditionsContentRef, conditionsBtnRef)
          }
        >
          Điều kiện
        </button>
        <button
          className="uppercase deactive-tab hover-active-tab flex justify-center items-center w-full h-full md:px-0 px-4"
          ref={priceBtnRef}
          onClick={() => scrollToTargetAdjusted(priceContentRef, priceBtnRef)}
        >
          Giá
        </button>
        <button
          className="uppercase deactive-tab hover-active-tab flex justify-center items-center w-full h-full md:px-0 px-4"
          ref={howToBookBtnRef}
          onClick={() =>
            scrollToTargetAdjusted(howToBookContentRef, howToBookBtnRef)
          }
        >
          Hướng dẫn
        </button>
      </div>
      <div className="mt-10 md:mx-0 mx-4">
        <section className="pb-5 md:pb-15 xl:pr-10" ref={descriptionContentRef}>
          <p className="font-semibold mt-2 mb-8 text-3xl text-gray-600">
            Giới thiệu
          </p>
          <p className="text-sm px-3 whitespace-pre-line">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae
            cupiditate iure quam, reiciendis, iste ipsam ipsum architecto quas
            libero cumque vel laudantium non sint? Voluptas porro saepe nihil
            voluptates dolorum!
          </p>
        </section>
        <hr className="w-10/12 md:w-6/12 m-auto bg-[#F1F1F1] mt-5 mb-10" />
        <section className="pb-5 md:pb-15 xl:pr-10" ref={detailsContentRef}>
          <p className="font-semibold mt-2 mb-8 text-3xl text-gray-600">
            Chi tiết
          </p>
          <div className="md:px-3">
            <div className="flex items-center my-8">
              <SlHome size={22} />
              <span className="font-medium ml-3 text-xl">Thông tin cơ bản</span>
            </div>
            <div className="grid grid-cols-12 mb-4 gap-y-4 text-sm">
              <div className="grid col-span-12 md:col-span-6 border-r-0 md:border-r-2 md:pr-6 lg:pr-8 xl:pr-10">
                <div className="grid grid-cols-12 gap-4 h-fit">
                  {data?.room.floorNumber && (
                    <>
                      <div className="col-span-6">
                        <p className="font-semibold">Số tầng</p>
                      </div>
                      <div className="col-span-6 flex justify-end items-center gap-1">
                        <SlHome />
                        <p>{data.room.floorNumber}</p>
                      </div>
                    </>
                  )}

                  {data?.room.roomSize && (
                    <>
                      <div className="col-span-6">
                        <p className="font-semibold">Mét vuông</p>
                      </div>
                      <div className="col-span-6 flex justify-end items-center gap-1">
                        <SlHome />
                        <p>{data?.room.roomSize}</p>
                      </div>
                    </>
                  )}
                  {data?.room.numberOfRoommates && (
                    <>
                      <div className="col-span-6">
                        <p className="font-semibold">Số người ở</p>
                      </div>
                      <div className="col-span-6 flex justify-end items-center gap-1">
                        <SlHome />
                        <p>{data?.room.numberOfRoommates}</p>
                      </div>
                    </>
                  )}
                  {data?.room.isGarret && (
                    <>
                      <div className="col-span-6">
                        <p className="font-semibold">Gác xếp</p>
                      </div>
                      <div className="col-span-6 flex justify-end items-center gap-1">
                        <SlHome />
                        <p>{data?.room.isGarret ? "Yes" : "No"}</p>
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div className="grid col-span-12 md:col-span-6 mt-0 md:pl-6 lg:pl-8 xl:pl-10">
                <p className="text-black font-semibold mt-4 md:mt-0 mb-2 ">
                  Tiện nghi
                </p>
                <ul className="flex md:flex-row gap-x-3 gap-y-0 flex-wrap mb-4">
                  {data?.room.isAirConditioner && (
                    <li className="my-1 flex items-center gap-x-2">
                      <TbAirConditioning />
                      <span>Máy lạnh</span>
                    </li>
                  )}
                  {data?.room.isCooktop && (
                    <li className="my-1 flex items-center gap-x-2">
                      <PiCookingPot />
                      <span>Bếp</span>
                    </li>
                  )}
                  {data?.room.isDishWasher && (
                    <li className="my-1 flex items-center gap-x-2">
                      <FaHandsWash />
                      <span>Máy rửa chén</span>
                    </li>
                  )}
                  {data?.room.isEquippedKitchen && (
                    <li className="my-1 flex items-center gap-x-2">
                      <FaKitchenSet />
                      <span>Trang bị bếp</span>
                    </li>
                  )}
                  {data?.room.isFridge && (
                    <li className="my-1 flex items-center gap-x-2">
                      <TbFridge />
                      <span>Tủ lạnh</span>
                    </li>
                  )}
                  {data?.room.isFurnished && (
                    <li className="my-1 flex items-center gap-x-2">
                      <LuSofa />
                      <span>Nội thất</span>
                    </li>
                  )}
                  {data?.room.isOven && (
                    <li className="my-1 flex items-center gap-x-2">
                      <MdMicrowave />
                      <span>Lò nướng</span>
                    </li>
                  )}
                  {data?.room.isShower && (
                    <li className="my-1 flex items-center gap-x-2">
                      <FaShower />
                      <span>Nhà tắm</span>
                    </li>
                  )}
                  {data?.room.isTV && (
                    <li className="my-1 flex items-center gap-x-2">
                      <PiTelevision />
                      <span>TV</span>
                    </li>
                  )}
                  {data?.room.isWashingMachine && (
                    <li className="my-1 flex items-center gap-x-2">
                      <GiWashingMachine />
                      <span>Máy giặt</span>
                    </li>
                  )}
                  {data?.room.isWifi && (
                    <li className="my-1 flex items-center gap-x-2">
                      <FaWifi />
                      <span>Wifi</span>
                    </li>
                  )}
                </ul>
                <p className="text-black font-semibold mt-4 md:mt-0 mb-2 ">
                  Luật lệ
                </p>
                <ul className="flex md:flex-row gap-x-3 gap-y-0 flex-wrap mb-4">
                  <li className="my-1 flex items-center gap-x-2">
                    <PiGenderIntersex />
                    <span>Chấp nhận nam nữ</span>
                  </li>
                  <li className="my-1 flex items-center gap-x-2">
                    <MdPets />
                    <span>Cho phép nuôi thú cưng</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <hr className="w-10/12 md:w-6/12 m-auto bg-[#F1F1F1] mt-5 mb-10" />
        <section className="pb-5 md:pb-15 xl:pr-10" ref={conditionsContentRef}>
          <p className="font-semibold mt-2 mb-8 text-3xl text-gray-600">
            Điều kiện thuê phòng
          </p>
          <div className="">
            <p className="font-semibold mt-2 mb-8 text-gray-600">
              Landlord Terms and Conditions
            </p>
            <p className="text-sm">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt
              quod cupiditate doloremque earum id consectetur cumque qui unde
              molestias soluta error animi, natus distinctio nihil debitis
              itaque voluptas, pariatur ea?
            </p>
          </div>
        </section>
        <hr className="w-10/12 md:w-6/12 m-auto bg-[#F1F1F1] mt-5 mb-10" />
        <section className="pb-5 md:pb-15" ref={priceContentRef}>
          <p className="font-semibold mt-2 mb-8 text-3xl text-gray-600">
            Chi tiết giá
          </p>
          <div className="border border-[#E2E2E2] rounded-lg p-5">
            <div className="flex justify-between items-start w-full mt-4 mb-8">
              <div className="font-semibold">Hàng tháng</div>
              <div className="text-base md:text-lg text-right font-normal text-primary ">
                {data?.room.price.toLocaleString()}VND/month
              </div>
            </div>
            <div className="flex justify-between items-start w-full mt-4 mb-8">
              <div className="font-semibold">Cọc</div>
              <div className="text-base md:text-lg text-right font-normal">
                {data?.room.price.toLocaleString()}VND
              </div>
            </div>
          </div>
        </section>
        <hr className="w-10/12 md:w-6/12 m-auto bg-[#F1F1F1] mt-5 mb-10" />
        <section className="pb-5 md:pb-15" ref={howToBookContentRef}>
          <p className="font-semibold mt-2 mb-8 text-3xl text-gray-600">
            Làm thế nào để thuê phòng?
          </p>
          <FaqItem />
          <FaqItem />
          <FaqItem />
          <FaqItem />
        </section>
      </div>
    </>
  );
};

export default TabComponentTest;

const FaqItem = () => {
  const [open, setOpen] = useState(false);
  const handleOpenChange = (e) => {
    setOpen(e);
  };
  return (
    <>
      <Collapsible
        className="max-w-[600px] my-3 w-full px-4 py-2 border rounded-[14px] bg-white"
        onOpenChange={handleOpenChange}
        open={open}
      >
        <CollapsibleTrigger className="flex py-1 justify-between items-center cursor-pointer text-black w-full">
          Can I use this in my project?
          <IoIosArrowDown
            className={`transition ${open ? "rotate-180" : ""}`}
          />
        </CollapsibleTrigger>
        <CollapsibleContent className="text-black mt-4 text-sm">
          Yes. Free to use for personal and commercial projects. No attribution
          required.
        </CollapsibleContent>
      </Collapsible>
    </>
  );
};
