import { WorkType, workTypeValue } from "@/app/lib/constants";
import CustomRadioCards from "@/app/app/(auth)/scraped-resume/CustomRadioCards";
import { Editable } from "@/app/app/(auth)/scraped-resume/Editable";
import CustomButton from "@/app/app/(auth)/scraped-resume/CustomButton";
import { ResumeExperience } from "@/app/app/(auth)/scraped-resume/types";
import SelectComponent from "@/app/app/(auth)/scraped-resume/SelectComponent";
import { Checkbox, Flex, Text } from "@radix-ui/themes";

interface CertificationEditComponentProps extends ResumeExperience {}

export default function WorkExperienceEditComponent({
  companyName,
  department,
  jobTitle,
  startYear,
  startMonth,
  endYear,
  endMonth,
  salary,
}: CertificationEditComponentProps) {
  return (
    <div className={"flex flex-col"}>
      <div className={"flex flex-col gap-[8px]"}>
        <CustomRadioCards
          options={Object.keys(WorkType).map((workType: WorkType) => ({
            value: workType,
            label: workTypeValue.get(workType)!,
          }))}
        />
        <div className={"border-b-[1px] border-b-gray-06 flex flex-row"}>
          <span className={"text-purple-00"}>*</span>
          <Editable placeholder={`회사명`} defaultContent={companyName} />
        </div>
        <div className={"border-b-[1px] border-b-gray-06 flex flex-row"}>
          <span className={"text-purple-00"}>*</span>
          <Editable placeholder={`부서명`} defaultContent={department} />
        </div>
        <div className={"flex flex-row w-full"}>
          <div className={"border-b-[1px] border-b-gray-06 flex-1"}>
            <span className={"text-purple-00"}>*</span>
            <SelectComponent
              options={[]}
              outline={true}
              placeholder={"포지션"}
            />
          </div>
          <div className={"border-b-[1px] border-b-gray-06 flex-1"}>
            <span className={"text-purple-00"}>*</span>
            <SelectComponent options={[]} outline={true} placeholder={"직책"} />
          </div>
        </div>
        <div className={"flex flex-row gap-[10px]"}>
          <span className={"text-purple-00"}>*</span>
          <span>재직기간</span>
          <Editable
            placeholder={`YYYY.MM`}
            defaultContent={`${startYear}.${startMonth}`}
          />
          <Text as="label">
            <Flex gap="2">
              <Checkbox defaultChecked />
              재직중
            </Flex>
          </Text>
        </div>
        <div className={"flex flex-col gap-[6px]"}>
          <div className={"flex flex-row"}>
            <span className={"text-purple-00"}>*</span>
            <span>업무 및 성과</span>
          </div>
          <textarea
            className={"border-purple-03 border-[1px] rounded-[8px] p-[8px]"}
          />
        </div>
        <div className={"flex flex-row justify-between"}>
          <SelectComponent
            options={[]}
            outline={true}
            placeholder={"퇴사사유"}
          />
          <div className={"flex flex-row"}>
            <div className={"border-b-[1px] border-b-gray-06"}>
              <Editable placeholder={`최종연봉`} />
            </div>
            <span>만원</span>
          </div>
        </div>
        <span>{salary}</span>
        <CustomButton className={"mt-[16px]"} text={"저장"} />
      </div>
    </div>
  );
}
