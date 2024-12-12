import {
  PlatformContentType,
  PlatformContentTypeName,
} from "@/app/lib/constants";
import { Editable } from "@/app/app/(auth)/scraped-resume/Editable";
import CustomButton from "@/app/app/(auth)/scraped-resume/CustomButton";

interface CertificationEditComponentProps {
  title?: string;
  subTitle?: string;
  startYear?: string;
  startMonth?: string;
  description?: string;
  platformContentType: PlatformContentType;
}

export default function CertificationEditComponent(
  props: CertificationEditComponentProps,
) {
  return (
    <div className={"flex flex-col"}>
      <div className={"flex flex-col"}>
        <div className={"border-b-[1px] border-b-gray-06 flex flex-row"}>
          <span className={"text-purple-00"}>*</span>
          <Editable
            placeholder={`${PlatformContentTypeName[props.platformContentType]}명`}
            defaultContent={props.title}
          />
        </div>
        <div className={"border-b-[1px] border-b-gray-06"}>
          <Editable
            placeholder={`${PlatformContentTypeName[props.platformContentType]}기관`}
            defaultContent={props.subTitle}
          />
        </div>
        <div className={"border-b-[1px] flex flex-row gap-[10px]"}>
          <span>발급일</span>
          <Editable
            placeholder={`YYYY.MM`}
            defaultContent={`${props.startYear}.${props.startMonth}`}
          />
        </div>
        <div className={"flex flex-col mt-[16px] gap-[6px]"}>
          <span>설명 및 내용</span>
          <textarea
            className={"border-purple-03 border-[1px] rounded-[8px] p-[8px]"}
          />
        </div>
        <CustomButton className={"mt-[16px]"} text={"저장"} />
      </div>
    </div>
  );
}
