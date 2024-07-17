import { usePRouter } from "@/hooks/usePRouter";
import { deleteAttributeInSearchParams } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { MdOutlineOtherHouses } from "react-icons/md";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const FilterType = ({ searchParams }) => {
  const pathname = usePathname();
  const router = usePRouter();

  const type = pathname.split("/")[2];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="filter-basic-btn">
          <div className="disabled:cursor-default rounded-full">
            <div className="xs:flex">
              <div className="flex justify-between gap-x-3 items-center">
                <div className="flex flex-col">
                  <span className="text-[8pt] text-gray-500 font-medium text-left">
                    Loại
                  </span>
                  <span className="pl-2 font-medium text-[10pt] whitespace-nowrap text-gray-800 ">
                    {type === "motels" ? "Nhà trọ" : "Phòng trọ"}
                  </span>
                </div>
                <MdOutlineOtherHouses className="ml-3" size={20} />
              </div>
            </div>
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Chọn hình thức tìm kiếm</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={type === "motels" ? "motels" : "rooms"}
          onValueChange={() => {
            router.push(
              "/rent-listings/" +
                (type === "motels" ? "rooms?" : "motels?") +
                deleteAttributeInSearchParams(searchParams, [
                  "pageIndex",
                  "pageSize",
                ])
            );
          }}
        >
          <DropdownMenuRadioItem value="rooms">Phòng trọ</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="motels">Nhà trọ</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FilterType;
