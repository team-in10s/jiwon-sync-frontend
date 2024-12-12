import React, { useState } from "react";
import ResumeCardWrapper from "./resume-card-wrapper";
import { ResumeProfile } from "./types";
import BottomSheetContent from "@/app/app/(auth)/scraped-resume/BottomSheetContent";
import { PlatformStatusItem } from "@/app/app/(users)/account-status/types";
import CustomBottomSheet from "@/app/app/(auth)/scraped-resume/CustomBottomSheet";
import WorkExperienceEditComponent from "@/app/app/(auth)/scraped-resume/ProfileEditComponent";

type ProfileProps = {
  data: ResumeProfile[];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick: (data: any) => void;
  completedPlatforms: PlatformStatusItem[];
};

const ProfileCard: React.FC<ProfileProps> = ({
  data,
  onClick,
  completedPlatforms,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div className="mb-5 w-full">
      <div className="mb-1.5 text-lg font-semibold">프로필</div>
      {Array.isArray(data) &&
        data
          .filter((item) => item.isSelected)
          .map((item) => (
            <ResumeCardWrapper
              key={item.platform}
              platform={item.platform}
              onClick={() => {
                onClick(item);
                setOpen(true);
              }}
            >
              <div className={"flex flex-row justify-start"}>
                <div className="mr-4 size-14 rounded bg-gray-200"></div>
                <div className="font-semibold">
                  {/* <p>Title: {item.resumeTitle}</p> */}
                  <p>이름: {item.name}</p>
                  <p>전화번호: {item.phoneNumber}</p>
                  <p>이메일: {item.email}</p>

                  {/* <p>Experience: {item.totalExperienceYears} years</p> */}
                </div>
              </div>
              <CustomBottomSheet open={open} onDismiss={() => setOpen(false)}>
                <BottomSheetContent
                  platformContent={
                    <div className={"flex flex-row justify-start"}>
                      <div className="mr-4 size-14 rounded bg-gray-200"></div>
                      <div className="font-semibold">
                        <p>{item.name || "이름"}</p>
                        <p>{item.phoneNumber || "전화번호"}</p>
                        <p>{item.email || "이메일"}</p>
                      </div>
                    </div>
                  }
                  editContent={<WorkExperienceEditComponent {...item} />}
                />
              </CustomBottomSheet>
            </ResumeCardWrapper>
          ))}
    </div>
  );
};

export default ProfileCard;
