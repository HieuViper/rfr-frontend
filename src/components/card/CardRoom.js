import { toSlug } from "@/lib/utils";
import Link from "next/link";
import SlideListingPage from "../slides/SlideListingPage";

export default function CardRoom({
  name,
  id,
  image,
  photos,
  phone,
  roomSize,
  address,
  price,
  isFurnished,
}) {
  return (
    <Link href={`/room/${toSlug(name)}-${id}`} target="_blank">
      <div className="rounded-lg cursor-pointer relative shadow-xl transform transition duration-500 hover:scale-110 max-h-[440px] flex flex-col">
        <div className="h-[250px]">
          {/* swiper */}
          <SlideListingPage mainImage={image} images={photos} />
        </div>
        <span className="bg-white text-[8pt] text-gray-600 py-[5px] px-2 rounded-full absolute top-[5px] right-[5px] z-[1] shadow-md">
          Còn trống
        </span>
        <div className="px-2 pt-1.5 pb-2 flex flex-col flex-1">
          <div className="flex justify-between">
            <p className="text-xs uppercase">{phone}</p>
            <div className="flex flex-wrap text-xs gap-x-1">
              <span className="flex items-center after-dot-break">
                {roomSize} m<sup>2</sup>
              </span>
            </div>
          </div>
          <div className="flex-1 mb-2">
            <p className="mt-1 font-medium text-xl line-clamp-1">{name}</p>
            <p className="text-sm text-slate-400 line-clamp-2">{address}</p>
          </div>
          <div className="">
            <div className="flex mt-2 items-baseline text-xl md:text-2xl text-primary ">
              {price.toLocaleString()}đ/ <span className="text-sm">tháng</span>
            </div>
            <div className="h-4">
              {isFurnished && (
                <p className="text-primary mt-1 ml-1 text-xs capitalize">
                  Bao gồm nội thất
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
