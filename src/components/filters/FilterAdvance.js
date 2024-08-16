import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { usePRouter } from "@/hooks/usePRouter";
import { deleteAttributeInUrl } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaFilter } from "react-icons/fa";
import { z } from "zod";
import { Checkbox } from "../ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

const items = [
  {
    id: "isFridge",
    label: "Tủ lạnh",
  },
  {
    id: "isAirConditioner",
    label: "Máy lạnh",
  },
  {
    id: "isGarret",
    label: "Gác xép",
  },
  {
    id: "isFurnished",
    label: "Nội thất",
  },
  {
    id: "isWifi",
    label: "Wifi",
  },
  {
    id: "isTV",
    label: "Tivi",
  },
  {
    id: "isWashingMachine",
    label: "Máy giặt",
  },
];

const FormSchema = z.object({
  items: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "Vui lòng chọn ít nhất 1 lựa chọn",
  }),
});

const FilterAdvance = ({ searchParams }) => {
  const currentUrl = window.location.href;
  const router = usePRouter();

  const [open, setOpen] = useState(false);

  const defaultValuesArr = Object.keys(searchParams).filter(
    (key) => searchParams[key] === "true"
  );

  const form = useForm({
    resolver: zodResolver(FormSchema),
    values: {
      items: defaultValuesArr,
    },
    defaultValues: {
      items: defaultValuesArr,
    },
  });

  const handleDeleteFilter = () => {
    const newUrl = deleteAttributeInUrl(
      currentUrl,
      items.map((item) => item.id)
    );

    form.reset({ items: [] });

    router.replace(newUrl);
    setOpen(false);
  };

  const onSubmit = (data) => {
    // delete attribute already have
    const newUrl = deleteAttributeInUrl(
      currentUrl,
      items.map((item) => item.id)
    );

    // add attribute
    const newParams = data.items.map((item) => `${item}=true`).join("&");
    router.replace(newUrl + "&" + newParams);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="bg-gray-700 text-white rounded-full py-2.5 px-4 flex justify-between items-center gap-x-3 relative hover:shadow-lg">
          <FaFilter />
          <p className="whitespace-nowrap">Bộ lọc</p>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <DialogHeader>
              <DialogTitle>Bộ lọc nâng cao</DialogTitle>
              <DialogDescription>
                Lọc tất cả các thuộc tính. Nhấn OK để lọc.
              </DialogDescription>
            </DialogHeader>

            <FormField
              control={form.control}
              name="items"
              render={() => (
                <FormItem>
                  {items.map((item) => (
                    <FormField
                      key={item.id}
                      control={form.control}
                      name="items"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={item.id}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(item.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, item.id])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== item.id
                                        )
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-medium">
                              {item.label}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={handleDeleteFilter}
              >
                Xoá bộ lọc
              </Button>
              <Button type="submit">OK</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default FilterAdvance;
