import { usePRouter } from "@/hooks/usePRouter";
import { deleteAttributeInUrl } from "@/lib/utils";
import { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Slider } from "../ui/slider";

const FilterBudget = ({ searchParams }) => {
  const currentUrl = window.location.href;
  const [budget, setBudget] = useState([
    searchParams.priceFrom || 0,
    searchParams.priceTo || 10000000,
  ]);
  const minPrice = parseInt(budget[0]);
  const maxPrice = parseInt(budget[1]);

  const router = usePRouter();

  const [open, setOpen] = useState(false);
  const [flagValidBudget, setFlagValidBudget] = useState(false);

  const handleCheckValidBudget = () => {
    if (minPrice > maxPrice) {
      setFlagValidBudget(true);
      return false;
    } else if (minPrice < 0 || maxPrice <= 0) {
      setFlagValidBudget(true);
      return false;
    } else if (maxPrice < minPrice) {
      setFlagValidBudget(true);
      return false;
    } else {
      setOpen(false);
      return true;
    }
  };

  const handleSubmit = () => {
    const flag = handleCheckValidBudget();
    if (flag == true) {
      console.log("ok");

      // delete attribute already have
      const newUrl = deleteAttributeInUrl(currentUrl, ["priceFrom", "priceTo"]);

      // add attribute
      router.replace(newUrl + `&priceFrom=${minPrice}&priceTo=${maxPrice}`);
    } else {
      console.log("error");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="relative">
          <div className="filter-basic-btn">
            <div className="disabled:cursor-default rounded-full">
              <div className="xs:flex">
                <div className="flex justify-between gap-x-3 items-center">
                  <div className="flex flex-col">
                    <span className="text-[8pt] text-gray-500 font-medium text-left">
                      Giá
                    </span>
                    <span className="pl-2 font-medium text-[10pt] whitespace-nowrap text-gray-800 ">
                      {minPrice.toLocaleString()} VND -{" "}
                      {maxPrice.toLocaleString()} VND
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Hãy chọn giá đúng</DialogTitle>
          <DialogDescription>
            Lựa chọn một khoảng giá mà bạn muốn. Nhấn OK để xem kết quả khi chọn
            xong.
          </DialogDescription>
        </DialogHeader>
        <div className="my-7">
          <p className="font-medium mb-5 text-gray-500">Chọn khoảng giá</p>
          <div className="md:min-w-[200px] lg:min-w-[400px] max-w-[700px] w-full px-5">
            <div className="mb-7 w-11/12 md:w-8/12 m-auto">
              <Slider
                defaultValue={[0, 5000000]}
                max={10000000}
                step={100000}
                value={budget}
                onValueChange={(value) => {
                  setBudget(value);
                }}
              />
              <div className="flex justify-between text-rmGray-200 text-sm mt-5">
                <span>{minPrice.toLocaleString() || 0} VND</span>
                <span>{maxPrice.toLocaleString() || 0} VND</span>
              </div>
            </div>

            <div className="flex flex-col gap-y-5">
              <div className="flex justify-between">
                <div className="flex flex-col gap-2">
                  <p className="mb-2 font-medium text-gray-500">Tối thiểu</p>
                  <div className="flex items-center w-40">
                    <Input
                      className="mr-2"
                      value={minPrice}
                      type="number"
                      onChange={(e) => {
                        setBudget(parseInt(e.target.value), [maxPrice]);
                      }}
                    />{" "}
                    VND
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="mb-2 font-medium text-gray-500">Tối đa</p>
                  <div className="flex items-center w-40">
                    <Input
                      className="mr-2"
                      value={maxPrice}
                      type="number"
                      onChange={(e) => {
                        setBudget([minPrice, parseInt(e.target.value)]);
                      }}
                    />{" "}
                    VND
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {flagValidBudget && (
          <small className="text-sm leading-none text-red-500">
            Vui lòng lựa chọn khoảng giá
          </small>
        )}
        <DialogFooter>
          <Button onClick={handleSubmit}>OK</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FilterBudget;
