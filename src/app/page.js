import { SkeletonComp as SkeletonCompForm } from "@/components/forms/FormHomepage";
import SlideHomepage from "@/components/slides/SlideHomepage";
import { Loader2Icon } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
const HomepageDynamicContent = dynamic(
  () => import("@/components/HomepageDynamicContent"),
  {
    loading: () => (
      <div className="w-full flex justify-center items-center">
        <Loader2Icon />
      </div>
    ),
  }
);
const FormHomepage = dynamic(() => import("@/components/forms/FormHomepage"), {
  loading: () => <SkeletonCompForm />,
});

export default async function Home() {
  const formData = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/locations/cities/1`
  ).then((res) => res.json());

  return (
    <>
      <section className="relative bg-gradient-to-b from-70% from-orange-100 via-orange-50 to-white pt-4 md:pt-20 w-full md:min-h-[65vh] min-h-[55vh] md:mb-24">
        <div className="grid grid-cols-12 m-auto w-11/12 md:w-full lg:w-11/12 px-0 md:px-6 lg:px-0  max-w-[1200px]">
          <div className="col-span-12 md:col-span-7 px-5 md:pr-5 md:pl-0">
            <h1 className=" text-[#343434] mb-3 md:mb-5 lg:text-6xl md:text-5xl text-4xl font-bold xl:leading-[1.3em] lg:leading[1.2em]">
              Tìm Phòng Trọ <br /> và Nhà Trọ <br /> ở mọi nơi
            </h1>
            <h2 className="lg:text-2xl text-xl text-[#999999] mb-2 md:mb-5 font-medium">
              Tìm phòng trọ và nhà trọ online
            </h2>

            <div className="hidden md:flex justify-between gap-x-5 lg:gap-x-10 mt-12 max-w-[400px] lg:max-w-[500px]">
              <div className="w-full h-72 relative rounded-3xl shadow-xl">
                <Image
                  src={"https://spacest.com/image/home/home_image_1.jpg"}
                  fill
                  alt="anh1"
                  sizes="(max-width: 768px) 0vw, (max-width: 1200px) 25vw, 20vw"
                  priority
                  className="rounded-2xl w-full h-auto"
                />
              </div>
              <div className="w-full h-72 relative rounded-3xl shadow-xl">
                <Image
                  src={"https://spacest.com/image/home/home_image_2.jpg"}
                  fill
                  alt="anh2"
                  sizes="(max-width: 768px) 0vw, (max-width: 1200px) 25vw, 20vw"
                  priority
                  className="rounded-2xl w-full h-auto"
                />
              </div>
            </div>
          </div>

          <div className="col-span-12 md:col-span-5 flex flex-col justify-center items-center gap-y-10 mt-10 md:mt-0">
            <div className="py-4 px-5 md:py-6 md:px-6 xl:py-6 xl:px-10 max-w-[400px] w-full rounded-3xl bg-white shadow-xl mt-18">
              <FormHomepage formData={formData} />
            </div>
          </div>
        </div>
      </section>

      <HomepageDynamicContent />

      <section className="m-auto md:m-0 md:ml-auto md:w-[90%] w-11/12 md:mt-20 mt-4 ">
        <h2 className="text-2xl md:text-[32px] md:text-left text-center font-semibold tracking-wide text-[#343434] mt-5 mb-7">
          Phòng trọ ở Thành Phố Hồ Chí Minh
        </h2>
        <div className="w-full">
          <SlideHomepage type={"districts"} />
        </div>
      </section>

      <section className="m-auto py-3 md:py-10 md:ml-auto md:w-[90%] w-11/12 md:pb-14 pb-4 ">
        <h2 className="text-2xl md:text-[32px] font-semibold tracking-wide mb-2 text-rmGray-900 md:text-left text-center">
          Thuê phòng an toàn
        </h2>
        <p className="text-[#7b8389] md:text-left text-center">
          Đội ngũ của chúng tôi luôn sẵn sàng giúp bạn tìm được chỗ ở lý tưởng.
          Thuê phòng trực tuyến hoàn toàn dễ dàng.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 my-10 md:px-16">
          <div className="mb-0 md:text-left text-center relative px-5 md:py-0 py-5 flex flex-col ">
            <Image
              src={"/indoor.svg"}
              alt="oke2"
              className="mx-auto md:mx-0 basis-1/2"
              width={45}
              height={45}
            />
            <div className="basis-1/2">
              <p className="text-xl md:text-2xl font-medium mb-2 mt-4 text-rmGray-500">
                Thuê phòng trong tích tắc
              </p>
              <p className="text-sm text-gray-500 leading-6">
                Để thuê phòng bạn vui lòng liên hệ theo số điện thoại của chủ
                nhà được cung cấp.
              </p>
            </div>
          </div>
          <div className="mb-0 md:text-left text-center px-5 md:border-r md:py-0 py-5 md:border-l md:border-t-0 border-t md:border-b-0 border-b border-slate-300 flex flex-col">
            <Image
              src={"/home-verified.svg"}
              alt="oke1"
              width={50}
              className="mx-auto md:mx-0 basis-1/2"
              height={50}
            />

            <div className="basis-1/2">
              <p className="text-xl md:text-2xl font-medium mb-2 mt-4 text-rmGray-500">
                Phòng được xác minh kỹ càng
              </p>
              <p className="text-sm text-gray-500 leading-6">
                Đội ngũ RFR đích thân đến thăm tất cả các căn hộ trên nền tảng
                này để giúp các bạn tìm chính xác như đã thấy trong hình.{" "}
              </p>
            </div>
          </div>

          <div className="md:text-left text-center px-5 md:py-0 py-5 flex flex-col justify-between">
            <Image
              src={"/girl-study.svg"}
              className="mx-auto md:mx-0"
              alt="oke3"
              width={60}
              height={60}
            />

            <div className="">
              <p className="text-xl md:text-2xl font-medium mb-2 mt-4 text-rmGray-500">
                Hỗ trợ nhiệt tình
              </p>
              <p className="text-sm text-gray-500 leading-6">
                Chúng tôi luôn sẵn sàng giải đáp mọi thắc mắc của bạn 24/24.
                Lắng nghe Khách hàng là ưu tiên hàng đầu.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="m-auto py-3 md:py-10 md:ml-auto md:w-[90%] w-11/12 pb-14">
        <h2 className="text-2xl md:text-[32px] font-semibold tracking-wide mb-2 text-rmGray-900 md:text-left text-center">
          Được công nhận bởi khách hàng
        </h2>
        <p className="text-[#7b8389] md:text-left text-center">
          Khách hàng của chúng tôi hài lòng 100% và các đánh giá của họ nói lên
          điều đó!
        </p>

        <div className="w-full md:p-14">
          <SlideHomepage type={"reviews"} />
        </div>
      </section>
    </>
  );
}
