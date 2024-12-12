import React, { useState } from "react";
import ResumeCardWrapper from "./resume-card-wrapper";
import { ResumeEducation } from "./types";
import BottomSheetContent from "@/app/app/(auth)/scraped-resume/BottomSheetContent";
import PlatformContent from "@/app/app/(auth)/scraped-resume/PlatformContent";
import { PlatformContentType, platformsLabelValue } from "@/app/lib/constants";
import SelectComponent from "@/app/app/(auth)/scraped-resume/SelectComponent";
import { PlatformStatusItem } from "@/app/app/(users)/account-status/types";
import CustomBottomSheet from "@/app/app/(auth)/scraped-resume/CustomBottomSheet";

type EducationProps = {
  data: ResumeEducation[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick: (data: any) => void;
  completedPlatforms: PlatformStatusItem[];
};

const EducationCard: React.FC<EducationProps> = ({
  data,
  onClick,
  completedPlatforms,
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="mb-5 w-full">
      <div className="mb-1.5 text-lg font-semibold">학력</div>
      {data
        .filter((item) => item.isSelected)
        .map((item) => (
          <ResumeCardWrapper
            platform={item.platform}
            onClick={() => {
              onClick(item);
              setOpen(true);
            }}
            key={item.platform}
          >
            <div>
              <p className="font-semibold">{item.schoolName}</p>
              <div className="font-semibold">
                <span>{item.major}</span>
                <span> - </span>
                <span>{item.educationLevel}</span>
              </div>
              <p>
                {item.startYear} - {item.endYear}
              </p>
              <p>{item.graduationStatus}</p>
            </div>
            <CustomBottomSheet open={open} onDismiss={() => setOpen(false)}>
              <BottomSheetContent
                platformContent={
                  <div className={"flex flex-col gap-[16px]"}>
                    <PlatformContent
                      imgSrc={"default"}
                      title={item.schoolName}
                      subTitle={item.major}
                      startYear={item.educationLevel}
                      startMonth={undefined}
                      isCurrent={undefined}
                      endYear={item.startYear}
                      endMonth={undefined}
                      contentType={PlatformContentType.school}
                      description={undefined}
                    />
                    <SelectComponent
                      options={completedPlatforms.map(({ platform }) => ({
                        value: platform,
                        label: platformsLabelValue[platform],
                      }))}
                      defaultValue={completedPlatforms[0]?.platform}
                    />
                  </div>
                }
                editContent={<div className="font-semibold"></div>}
              />
            </CustomBottomSheet>
          </ResumeCardWrapper>
        ))}
    </div>
  );
};

export default EducationCard;
