"use client";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { usePRouter } from "@/hooks/usePRouter";
import { useGet } from "@/lib/api";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaRegBuilding } from "react-icons/fa";
import { MdOutlineHomeWork } from "react-icons/md";
import { z } from "zod";

const formSchema = z.object({
  city: z.string({ required_error: "Vui lòng chọn thành phố bạn muốn ở" }),

  type: z.string({ required_error: "Vui được chọn loại muốn tìm kiếm" }),
});
const FormHomepage = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
  });
  const router = usePRouter();

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const {
    data: citiesData,
    error: isCitiesError,
    isLoading: isCitiesLoading,
  } = useGet(`${process.env.NEXT_PUBLIC_API_URL}/locations/cities/1`);

  if (isCitiesError) return <>Failed to load</>;
  if (isCitiesLoading) return <>Loading...</>;

  function onSubmit(data) {
    console.log(data);
    router.push(`/rent-listings/${data.type}?cityId=${data.city}`);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => {
            return (
              <FormItem className="flex flex-col">
                <FormLabel>Chọn Thành Phố</FormLabel>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-full justify-between",
                          !value && "text-muted-foreground"
                        )}
                      >
                        {value
                          ? citiesData.find((city) => city.id === value)?.name
                          : "Bấm để chọn"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput placeholder="Tìm kiếm" />
                      <CommandList>
                        <CommandEmpty>Không tìm thấy kết quả.</CommandEmpty>
                        <CommandGroup>
                          {citiesData.map((city) => (
                            <CommandItem
                              value={city.name}
                              key={city.id}
                              onSelect={(currentValue) => {
                                form.setValue("city", city.id + "");
                                const value = citiesData.find(
                                  (option) => option.name === currentValue
                                )?.id;
                                setValue(value ?? "");
                                setOpen(false);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  city.id === value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {city.name}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormDescription>Chọn nơi bạn muốn ở</FormDescription>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Chọn loại hình thức muốn tìm kiếm</FormLabel>
                <FormControl>
                  <div className="flex justify-between gap-x-2 md:gap-x-3 mt-4 md:max-w-[250px]">
                    <button
                      className={
                        `w-full flex flex-col gap-y-1 md:gap-y-3 items-center justify-center border-2 py-2 px-2 md:py-2.5 md:px-3 text-center rounded-xl hover:bg-gray-100 transition-all duration-200` +
                        (form.getValues("type") === "motels"
                          ? " border-primary text-primary"
                          : "")
                      }
                      type="button"
                      onClick={() => form.setValue("type", "motels")}
                    >
                      <FaRegBuilding size={20} />
                      <span className="text-sm">Nhà trọ</span>
                    </button>
                    <button
                      className={
                        `w-full flex flex-col gap-y-1 md:gap-y-2 items-center justify-center border-2 py-2 px-2 md:py-2.5 md:px-3 text-center rounded-xl hover:bg-gray-100 transition-all duration-200` +
                        (form.getValues("type") === "rooms"
                          ? " border-primary text-primary"
                          : "")
                      }
                      type="button"
                      onClick={() => form.setValue("type", "rooms")}
                    >
                      <MdOutlineHomeWork size={24} />
                      <span className="text-sm">Phòng trọ</span>
                    </button>
                  </div>
                </FormControl>
                {/* <FormDescription>
              This is your public display name.
            </FormDescription> */}
                <FormMessage />
              </FormItem>
            );
          }}
        />

        <Button
          type="submit"
          className="w-full rounded-full font-medium text-base"
        >
          Tìm kết quả
        </Button>
      </form>
    </Form>
  );
};

export default FormHomepage;
