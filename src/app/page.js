import FormHomepage from "@/components/forms/FormHomepage";
import SlideHomepage from "@/components/slides/SlideHomepage";
import Image from "next/image";

async function getRoomByDistrict(cityId, districtId) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/rooms/filter-rooms?cityId=${cityId}&districtId=${districtId}&pageIndex=1&pageSize=10`,
    {
      cache: "no-store",
    }
  );
  return res.json();
}

export default async function Home() {
  // const roomInDistrictOneData = getRoomByDistrict(50, 550);
  // const roomInDistrictThreeData = getRoomByDistrict(50, 558);
  // const roomInDistrictSevenData = getRoomByDistrict(50, 566);
  // const roomInDistrictTanbinhData = getRoomByDistrict(50, 554);
  // const roomInDistrictGoVapData = getRoomByDistrict(50, 552);

  // const [
  //   roomInDistrictOne,
  //   roomInDistrictThree,
  //   roomInDistrictSeven,
  //   roomInDistrictTanbinh,
  //   roomInDistrictGoVap,
  // ] = await Promise.all([
  //   roomInDistrictOneData,
  //   roomInDistrictThreeData,
  //   roomInDistrictSevenData,
  //   roomInDistrictTanbinhData,
  //   roomInDistrictGoVapData,
  // ]);

  return (
    <>
      <section className="relative bg-gradient-to-b from-70% from-orange-100 via-orange-50 to-white pt-4 md:pt-20 w-full md:min-h-[65vh] min-h-[55vh] md:mb-24">
        <div className="grid grid-cols-12 m-auto w-11/12 md:w-full lg:w-11/12 px-0 md:px-6 lg:px-0  max-w-[1200px]">
          <div className="col-span-12 md:col-span-7 px-5 md:pr-5 md:pl-0">
            <div className=" text-[#343434] mb-3 md:mb-5 lg:text-6xl md:text-5xl text-4xl font-bold xl:leading-[1.3em] lg:leading[1.2em]">
              <h1>
                Tìm Phòng Trọ <br /> và Nhà Trọ <br /> ở mọi nơi
              </h1>
            </div>
            <div className="lg:text-2xl text-xl text-[#999999] mb-2 md:mb-5 font-medium">
              <h2>Tìm phòng trọ và nhà trọ online</h2>
            </div>

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
              <FormHomepage />
            </div>
          </div>
        </div>
      </section>

      {/* <section className="m-auto md:m-0 md:ml-auto md:w-[90%] w-11/12 mt-20 ">
        <div className="mt-5 mb-5 ">
          <h2 className="text-2xl md:text-[32px] md:text-left text-center font-semibold tracking-wide mb-2 text-[#343434]">
            Phòng trọ ở Quận 1
          </h2>
          <p className="md:text-lg md:text-left text-center text-[#7b8389]">
            Quận 1 nổi bật với các địa danh như Nhà thờ Đức Bà, Bưu điện Thành
            phố và khu phố Tây Bùi Viện, là điểm đến sôi động và phong phú văn
            hóa.
          </p>
        </div>
        <div className=" w-full ">
          <SlideHomepage data={roomInDistrictOne.list} />
        </div>
      </section>
      <section className="m-auto md:m-0 md:ml-auto md:w-[90%] w-11/12 md:mt-20 mt-4">
        <div className="mt-5 mb-5 ">
          <h2 className="text-2xl md:text-[32px] md:text-left text-center font-semibold tracking-wide mb-2 text-[#343434]">
            Phòng trọ ở Quận 3
          </h2>
          <p className="md:text-lg md:text-left text-center text-[#7b8389]">
            Nổi tiếng với các công viên rợp bóng cây và các di tích lịch sử,
            Quận 3 cung cấp không gian sống xanh mát, yên tĩnh và đầy chất
            lượng.
          </p>
        </div>
        <div className=" w-full ">
          <SlideHomepage data={roomInDistrictThree.list} />
        </div>
      </section>
      <section className="m-auto md:m-0 md:ml-auto md:w-[90%] w-11/12 md:mt-20 mt-4">
        <div className="mt-5 mb-5 ">
          <h2 className="text-2xl md:text-[32px] md:text-left text-center font-semibold tracking-wide mb-2 text-[#343434]">
            Phòng trọ ở Quận 7
          </h2>
          <p className="md:text-lg md:text-left text-center text-[#7b8389]">
            Khu đô thị Phú Mỹ Hưng hiện đại, Quận 7 cung cấp không gian sống
            xanh, an toàn với đầy đủ tiện ích cao cấp, thích hợp cho gia đình và
            người nước ngoài.
          </p>
        </div>
        <div className=" w-full ">
          <SlideHomepage data={roomInDistrictSeven.list} />
        </div>
      </section>
      <section className="m-auto md:m-0 md:ml-auto md:w-[90%] w-11/12 md:mt-20 mt-4">
        <div className="mt-5 mb-5 ">
          <h2 className="text-2xl md:text-[32px] md:text-left text-center font-semibold tracking-wide mb-2 text-[#343434]">
            Phòng trọ ở Quận Tân Bình
          </h2>
          <p className="md:text-lg md:text-left text-center text-[#7b8389]">
            Với Sân bay Tân Sơn Nhất và nhiều khu thương mại, Quận Tân Bình là
            trung tâm giao thông và thương mại sầm uất, cung cấp đầy đủ tiện ích
            cho cư dân.
          </p>
        </div>
        <div className=" w-full ">
          <SlideHomepage data={roomInDistrictTanbinh.list} />
        </div>
      </section>
      <section className="m-auto md:m-0 md:ml-auto md:w-[90%] w-11/12 md:mt-20 mt-4">
        <div className="mt-5 mb-5 ">
          <h2 className="text-2xl md:text-[32px] md:text-left text-center font-semibold tracking-wide mb-2 text-[#343434]">
            Phòng trọ ở Quận Gò Vấp
          </h2>
          <p className="md:text-lg md:text-left text-center text-[#7b8389]">
            Với nhiều trường học, công viên và các khu chợ truyền thống, Quận Gò
            Vấp mang đến không gian sống năng động, thân thiện và đầy đủ tiện
            ích.
          </p>
        </div>
        <div className=" w-full ">
          <SlideHomepage data={roomInDistrictGoVap.list} />
        </div>
      </section> */}

      <section className="m-auto md:m-0 md:ml-auto md:w-[90%] w-11/12 md:mt-20 mt-4 ">
        <div className="mt-5 mb-5 ">
          <h2 className="text-2xl md:text-[32px] md:text-left text-center font-semibold tracking-wide mb-2 text-[#343434]">
            Phòng trọ ở Thành Phố Hồ Chí Minh
          </h2>
        </div>
        <div className=" w-full ">
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
