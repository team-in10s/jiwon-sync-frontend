import { RadioCards } from "@radix-ui/themes";
import { Option } from "@/app/lib/constants";

interface CustomRadioCardsProps {
  options: Option[];
  onValueChange?: (val: string) => void;
}

export default function CustomRadioCards({
  options,
  onValueChange,
}: CustomRadioCardsProps) {
  return (
    <RadioCards.Root
        className={'flex flex-row gap-[5px] items-start justify-start'}
      columns={`${options.length}`}
      defaultValue={options[0].value!}
    >
      {options.map(({ value, label }) => {
        return <RadioCards.Item className={'px-[16px] py-[6px] w-fit h-fit text-nowrap'} value={value}>{label}</RadioCards.Item>;
      })}
    </RadioCards.Root>
  );
}
