import FormHomepage from "@/components/forms/FormHomepage";
import SlideHomepage from "@/components/slides/SlideHomepage";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <section className="relative bg-gradient-to-b from-70% from-orange-100 via-orange-50 to-white pt-4 md:pt-20 w-full md:min-h-[65vh] min-h-[55vh]">
        <div className="grid grid-cols-12 m-auto w-11/12 md:w-full lg:w-11/12 px-0 md:px-6 lg:px-0  max-w-[1200px]">
          <div className="col-span-12 md:col-span-7 px-5 md:pr-5 md:pl-0">
            <div className=" text-[#343434] mb-3 md:mb-5 lg:text-6xl md:text-5xl text-3xl font-semibold xl:leading-[1.3em] lg:leading[1.2em]">
              <h1>
                Tìm Phòng Trọ <br /> và Nhà Trọ <br /> ở mọi nơi
              </h1>
            </div>
            <div className="lg:text-2xl text-xl text-[#999999] mb-2 md:mb-5">
              <h2>Tìm phòng trọ và nhà trọ online</h2>
            </div>

            <div className="hidden md:flex justify-between gap-x-5 lg:gap-x-10 mt-12 max-w-[400px] lg:max-w-[500px]">
              <div className="w-full h-72 relative rounded-3xl shadow-xl">
                <Image
                  src={"https://spacest.com/image/home/home_image_1.jpg"}
                  fill
                  alt="anh"
                  sizes="(min-width: 1040px) 230px, 190px"
                  className="rounded-2xl w-full h-auto"
                />
              </div>
              <div className="w-full h-72 relative rounded-3xl shadow-xl">
                <Image
                  src={"https://spacest.com/image/home/home_image_2.jpg"}
                  fill
                  alt="anh"
                  sizes="(min-width: 1040px) 230px, 190px"
                  className="rounded-2xl w-full h-auto"
                />
              </div>
            </div>
          </div>

          <div className="col-span-12 md:col-span-5 flex flex-col justify-center items-center gap-y-10 mt-10 md:mt-0">
            <div className="py-4 px-5 md:py-6 md:px-6 xl:py-6 xl:px-10 max-w-[400px] w-full rounded-3xl bg-white shadow-xl mt-18">
              <FormHomepage />
            </div>
          </div>
        </div>
      </section>

      <section className="m-auto md:ml-auto md:w-[90%] w-11/12 mt-20">
        <div className="mt-5 mb-5 ">
          <h2 className="text-2xl md:text-[32px] md:text-left text-center font-semibold tracking-wide mb-2 text-[#343434]">
            Phòng trọ ở Thành Phố Hồ Chí Minh
          </h2>
        </div>
      </section>
      <section className="md:ml-auto md:m-0 m-auto md:w-[90%] w-11/12 pb-14 ">
        <div className="">
          <SlideHomepage />
        </div>
      </section>
    </>
  );
}
