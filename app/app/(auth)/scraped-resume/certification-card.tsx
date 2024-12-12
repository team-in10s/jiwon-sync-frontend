import React, { useState } from "react";
import ResumeCardWrapper from "./resume-card-wrapper";
import { ResumeCertificate } from "./types";
import BottomSheetContent from "@/app/app/(auth)/scraped-resume/BottomSheetContent";
import PlatformContent from "@/app/app/(auth)/scraped-resume/PlatformContent";
import { platformsLabelValue } from "@/app/lib/constants";
import SelectComponent from "@/app/app/(auth)/scraped-resume/SelectComponent";
import CustomBottomSheet from "@/app/app/(auth)/scraped-resume/CustomBottomSheet";
import { PlatformStatusItem } from "@/app/app/(users)/account-status/types";
import CertificationEditComponent from "@/app/app/(auth)/scraped-resume/CertificationEditComponent";

type CertificationProps = {
  data: ResumeCertificate[];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick: (data: any) => void;
  completedPlatforms: PlatformStatusItem[];
};

const CertificationCard: React.FC<CertificationProps> = ({
  data,
  onClick,
  completedPlatforms,
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="mb-1.5">
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
              <p className="font-semibold">{item.certificateName}</p>
              <p className="font-semibold">{item.issuer}</p>
              <p>
                {item.acquisitionYear}.{item.acquisitionMonth}
              </p>
            </div>
            <CustomBottomSheet open={open} onDismiss={() => setOpen(false)}>
              <BottomSheetContent
                platformContent={
                  <div className={"flex flex-col gap-[16px]"}>
                    <PlatformContent
                      imgSrc={"default"}
                      title={item.certificateName}
                      subTitle={item.issuer}
                      startYear={item.acquisitionYear}
                      startMonth={item.acquisitionMonth}
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
                editContent={
                  <CertificationEditComponent
                    title={item.certificateName}
                    subTitle={item.issuer}
                    startYear={item.acquisitionYear}
                    startMonth={item.acquisitionMonth}
                  />
                }
              />
            </CustomBottomSheet>
          </ResumeCardWrapper>
        ))}
    </div>
  );
};

export default CertificationCard;
