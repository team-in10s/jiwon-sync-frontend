import React, { useState } from "react";
import ResumeCardWrapper from "./resume-card-wrapper";
import { ResumeExperience } from "./types";
import BottomSheetContent from "@/app/app/(auth)/scraped-resume/BottomSheetContent";
import SelectComponent from "@/app/app/(auth)/scraped-resume/SelectComponent";
import { PlatformContentType, platformsLabelValue } from "@/app/lib/constants";
import { PlatformStatusItem } from "@/app/app/(users)/account-status/types";
import PlatformContent from "@/app/app/(auth)/scraped-resume/PlatformContent";
import CustomBottomSheet from "@/app/app/(auth)/scraped-resume/CustomBottomSheet";
import WorkExperienceEditComponent from "@/app/app/(auth)/scraped-resume/WorkExperienceEditComponent";

type WorkExperienceProps = {
  data: ResumeExperience[];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick: (data: any) => void;
  completedPlatforms: PlatformStatusItem[];
};

const WorkExperienceCard: React.FC<WorkExperienceProps> = ({
  data,
  onClick,
  completedPlatforms,
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="mb-5 w-full">
      <div className="mb-1.5 text-lg font-semibold">경력</div>
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
              <div className="mb-1.5 flex items-center">
                <div className="mr-4 size-14 rounded bg-gray-200"></div>
                <div>
                  <p className="font-semibold">{item.jobTitle}</p>
                  <p className="font-semibold">{item.companyName}</p>
                  <p>{item.department}</p>
                  <div>
                    <span>
                      {item.startYear}.{item.startMonth}
                    </span>
                    <span> - </span>
                    {item.isCurrent ? (
                      <span>재직 중</span>
                    ) : (
                      <span>
                        {item.endYear}.{item.endMonth}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <p>{item.responsibilities}</p>
              <CustomBottomSheet open={open} onDismiss={() => setOpen(false)}>
                <BottomSheetContent
                  platformContent={
                    <div className={"flex flex-col gap-[16px]"}>
                      <PlatformContent
                        imgSrc={"default"}
                        title={item.jobTitle}
                        subTitle={item.companyName}
                        startYear={item.startYear}
                        startMonth={item.startMonth}
                        isCurrent={item.isCurrent}
                        endYear={item.endYear}
                        endMonth={item.endMonth}
                        contentType={PlatformContentType.work}
                        description={item.responsibilities}
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
                  editContent={<WorkExperienceEditComponent {...item} />}
                />
              </CustomBottomSheet>
            </div>
          </ResumeCardWrapper>
        ))}
    </div>
  );
};

export default WorkExperienceCard;
