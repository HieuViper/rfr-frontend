import { convertToAbbreviation, toSlug } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default function CardMotel({
  name,
  id,
  image,
  contactPhone,
  address,
  roomAcreageFrom,
  roomAcreageTo,
  roomPriceFrom,
  roomPriceTo,
}) {
  return (
    <Link href={`/motel/${toSlug(name)}-${id}`} target="_blank">
      <div className="rounded-lg cursor-pointer relative shadow-xl transform transition duration-500 hover:scale-110 max-h-[440px] flex flex-col">
        <div className="h-[250px] relative">
          <Image
            src={process.env.NEXT_PUBLIC_CDN_URL + image}
            alt={name}
            fill
            sizes="(max-width: 768px) 70vw, (max-width: 1200px) 50vw, 25vw"
            className="object-cover rounded-t-xl"
          />
        </div>
        <span className="bg-white text-[8pt] text-gray-600 py-[5px] px-2 rounded-full absolute top-[5px] right-[5px] z-[1] shadow-md">
          Còn trống
        </span>
        <div className="px-2 pt-1.5 pb-2 flex flex-col flex-1">
          <div className="flex justify-between">
            <p className="text-xs uppercase">{contactPhone}</p>
            <div className="flex flex-wrap text-xs gap-x-1">
              <span className="flex items-center after-dot-break">
                {roomAcreageFrom} m<sup>2</sup>
              </span>
              <span className="flex items-center">
                {roomAcreageTo} m<sup>2</sup>
              </span>
            </div>
          </div>
          <div className="flex-1 mb-2">
            <p className="mt-1 font-medium text-xl line-clamp-1">{name}</p>
            <p className="text-sm text-slate-400 line-clamp-2">{address}</p>
          </div>
          <div className="">
            <div className="flex mt-2 items-baseline text-xl md:text-2xl  text-primary ">
              {convertToAbbreviation(roomPriceFrom)} -{" "}
              {convertToAbbreviation(roomPriceTo)} VND /{" "}
              <span className="text-sm">tháng</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
