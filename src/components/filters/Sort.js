import { usePRouter } from "@/hooks/usePRouter";
import { deleteAttributeInUrl } from "@/lib/utils";
import { RxCaretSort } from "react-icons/rx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const listSort = [
  {
    value: "createdAt-asc",
    label: "Mới nhất",
  },
  {
    value: "price-asc",
    label: "Giá tăng dần",
  },
  {
    value: "price-desc",
    label: "Giá giảm dần",
  },
  {
    value: "name-asc",
    label: "A -> Z",
  },
];

const Sort = ({ searchParams }) => {
  const router = usePRouter();

  const getCurrentSort = () => {
    if (searchParams.sort) {
      return listSort.find((item) => item.value === searchParams.sort);
    }
    return listSort[0];
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="filter-basic-btn">
          <div className="disabled:cursor-default rounded-full">
            <div className="xs:flex">
              <div className="flex justify-between gap-x-3 items-center">
                <div className="flex flex-col">
                  <span className="text-[8pt] text-gray-500 font-medium text-left">
                    Sắp xếp
                  </span>
                  <span className="pl-2 font-medium text-[10pt] whitespace-nowrap text-gray-800 ">
                    {getCurrentSort().label}
                  </span>
                </div>
                <RxCaretSort className="ml-3" size={20} />
              </div>
            </div>
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Sắp xếp</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={getCurrentSort().value}
          onValueChange={(value) => {
            router.replace(
              deleteAttributeInUrl(window.location.href, ["sort"]) +
                `&sort=${value}`
            );
          }}
        >
          {listSort.map((item) => {
            return (
              <DropdownMenuRadioItem key={item.value} value={item.value}>
                {item.label}
              </DropdownMenuRadioItem>
            );
          })}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Sort;
