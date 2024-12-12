import React from "react";
import clsx from "clsx";
import { HrPlatformName, PLATFORM_CONFIG } from "@/app/lib/constants";

type ResumeCardWrapperProps = {
  platform: HrPlatformName;
  children: React.ReactNode;
  onClick: () => void;
};

const borderColors = {
  saramin: "border-saramin",
  incruit: "border-incruit",
  jobkorea: "border-jobkorea",
  wanted: "border-wanted",
  remember: "border-remember",
};

const bgColors = {
  saramin: "bg-saramin",
  incruit: "bg-incruit",
  jobkorea: "bg-jobkorea",
  wanted: "bg-wanted",
  remember: "bg-remember",
};

const ResumeCardWrapper: React.FC<ResumeCardWrapperProps> = ({
  platform,
  children,
  onClick,
}) => {
  const b = borderColors[platform as keyof typeof borderColors];
  const c = bgColors[platform as keyof typeof bgColors];

  return (
    <>
      <div
        className={clsx(
          "mb-1.5 flex flex-col overflow-hidden rounded-xl border-2",
          b,
        )}
        onClick={() => {
          onClick();
        }}
      >
        <div
          className={clsx(
            "py-1 text-center text-xs font-medium",
            c,
            platform === "incruit" ? "text-gray-02" : "text-white",
          )}
        >
          {PLATFORM_CONFIG[platform]?.displayName}에서 가져왔어요
        </div>
        <div className="p-4">{children}</div>
      </div>
    </>
  );
};

export default ResumeCardWrapper;
