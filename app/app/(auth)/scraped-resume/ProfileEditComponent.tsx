import { Editable } from "@/app/app/(auth)/scraped-resume/Editable";
import { ResumeProfile } from "@/app/app/(auth)/scraped-resume/types";
import React from "react";

interface CertificationEditComponentProps extends ResumeProfile {}

export default function WorkExperienceEditComponent({
  companyName,
  department,
  jobTitle,
  startYear,
  startMonth,
  endYear,
  endMonth,
  salary,
  resumeTitle,
  name,
  email,
  phoneNumber,
  totalExperienceYears,
}: CertificationEditComponentProps) {
  return (
    <div className={"flex flex-row justify-start"}>
      <div className="mr-4 size-14 rounded bg-gray-200"></div>
      <div className="font-semibold">
        <Editable placeholder={"이름"} defaultContent={name} />
        <Editable placeholder={"전화번호"} defaultContent={phoneNumber} />
        <Editable placeholder={"이메일"} defaultContent={email} />
      </div>
    </div>
  );
}
