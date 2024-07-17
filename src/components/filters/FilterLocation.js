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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import { useEffect, useState } from "react";

const FilterLocation = (props) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  // console.log("🚀 ~ ComboboxDemo ~ value:", value);

  useEffect(() => {
    if (props.current) {
      setValue(props.current);
    } else {
      setValue("");
    }
  }, [props]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={`w-[${props.width}] justify-between`}
          disabled={props.disabled || false}
        >
          {value
            ? props.data.find((item) => item.id == value)?.name
            : props.placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={`w-[${props.width}] p-0`}>
        <Command>
          <CommandInput placeholder={props.placeholder} />
          <CommandEmpty>Không tìm thấy.</CommandEmpty>
          <CommandGroup>
            <CommandList>
              {props.data.map((item) => (
                <CommandItem
                  key={item.id}
                  value={item.name}
                  onSelect={(currentValue) => {
                    const value = props.data.find(
                      (option) => option.name === currentValue
                    )?.id;
                    setValue(value ?? "");
                    setOpen(false);
                    props.onChange(value);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value == item.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {item.name}
                </CommandItem>
              ))}
            </CommandList>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default FilterLocation;
