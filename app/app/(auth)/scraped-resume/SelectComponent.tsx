import { Select } from "@radix-ui/themes";
import { Option } from "@/app/lib/constants";
import { useEffect, useState } from "react";
import clsx from "clsx";

interface SelectComponentProps {
  defaultValue?: string;
  options: Option[];
  outline?: boolean;
  placeholder?: string;
}

export default function SelectComponent({
  defaultValue,
  options,
  outline,
  placeholder,
}: SelectComponentProps) {
  const [_defaultValue, setDefaultValue] = useState(defaultValue);
  useEffect(() => {
    setDefaultValue(defaultValue);
  }, [defaultValue]);
  const triggerClass = outline
    ? "border-[0px] shadow-none"
    : "justify-center gap-[16px] font-semibold rounded-[8px] border-[2px] border-purple-06 border-solid shadow-none p-[8px]";
  return (
    <Select.Root defaultValue={_defaultValue || ""}>
      <Select.Trigger
        className={clsx(triggerClass, "h-fit")}
        placeholder={placeholder || "플랫폼"}
      />
      <Select.Content>
        {options.map(({ label, value }) => {
          return <Select.Item value={value}>{label}</Select.Item>;
        })}
      </Select.Content>
    </Select.Root>
  );
}
