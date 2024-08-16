import SlideHomepage from "./slides/SlideHomepage";

async function getRoomByDistrict(cityId, districtId) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/rooms/filter-rooms?cityId=${cityId}&districtId=${districtId}&pageIndex=1&pageSize=10`,
    {
      cache: "no-store",
    }
  );
  return res.json();
}

export default async function HomepageDynamicContent() {
  const roomInDistrictOneData = getRoomByDistrict(50, 550);
  const roomInDistrictThreeData = getRoomByDistrict(50, 558);
  const roomInDistrictSevenData = getRoomByDistrict(50, 566);
  const roomInDistrictTanbinhData = getRoomByDistrict(50, 554);
  const roomInDistrictGoVapData = getRoomByDistrict(50, 552);

  const [
    roomInDistrictOne,
    roomInDistrictThree,
    roomInDistrictSeven,
    roomInDistrictTanbinh,
    roomInDistrictGoVap,
  ] = await Promise.all([
    roomInDistrictOneData,
    roomInDistrictThreeData,
    roomInDistrictSevenData,
    roomInDistrictTanbinhData,
    roomInDistrictGoVapData,
  ]);

  return (
    <>
      <section className="m-auto md:m-0 md:ml-auto md:w-[90%] w-11/12 mt-20 ">
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
      </section>
    </>
  );
}
