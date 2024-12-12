import React from "react";
import { PlatformContentType } from "@/app/lib/constants";

interface PlatformContentProps {
  title?: string;
  subTitle?: string;
  startYear?: string;
  startMonth?: string;
  isCurrent?: boolean;
  endYear?: string;
  endMonth?: string;
  description?: string;
  imgSrc?: string;
  contentType: PlatformContentType;
}

export default function PlatformContent({
  title,
  subTitle,
  startYear,
  startMonth,
  isCurrent,
  endYear,
  endMonth,
  contentType,
  description,
  imgSrc,
}: PlatformContentProps) {
  return (
    <div>
      <div className="mb-1.5 flex items-center">
        {!!imgSrc && <div className="mr-4 size-14 rounded bg-gray-200"></div>}
        <div>
          <p className="font-semibold">{title}</p>
          <p className="font-semibold">{subTitle}</p>
          <div>
            <span>
              {startYear}.{startMonth}
            </span>
            {!!endYear && !!endMonth && (
              <>
                <span> - </span>
                {isCurrent ? (
                  <span>
                    {contentType === PlatformContentType.school
                      ? "재학중"
                      : "재직중"}
                  </span>
                ) : (
                  <span>
                    {endYear}.{endMonth}
                  </span>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      <p>{description}</p>
    </div>
  );
}
