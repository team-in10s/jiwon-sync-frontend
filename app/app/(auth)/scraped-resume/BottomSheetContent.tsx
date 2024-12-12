import { Tabs } from "@radix-ui/themes";
import { useState } from "react";

interface BottomSheetContentProps {
  platformContent: React.ReactNode;
  editContent: React.ReactNode;
}

enum TabType {
  platform = "platform",
  content = "content",
}

export default function BottomSheetContent({
  platformContent,
  editContent,
}: BottomSheetContentProps) {
  const [value, setValue] = useState<TabType>(TabType.platform);
  return (
    <div className={"flex flex-col p-[16px]"}>
      {value === TabType.platform ? (
        <span>가져올 플랫폼 내용을 지정할 수 있어요.</span>
      ) : (
        <div className={"flex flex-col"}>
          <span>가져올 내용을 직접 수정할 수 있어요.</span>
          <span>* 표시는 필수 작성 요소 입니다.</span>
        </div>
      )}
      <Tabs.Root
        className={"w-full"}
        value={value}
        onValueChange={(val) => setValue(value)}
      >
        <Tabs.List color={"purple"}>
          <Tabs.Trigger
            className={"flex-1"}
            onClick={() => setValue(TabType.platform)}
            value={TabType.platform}
          >
            플랫폼
          </Tabs.Trigger>
          <Tabs.Trigger
            className={"flex-1"}
            onClick={() => setValue(TabType.content)}
            value={TabType.content}
          >
            내용
          </Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value={TabType.platform} className={"py-[16px]"}>
          {platformContent}
        </Tabs.Content>

        <Tabs.Content value={TabType.content} className={"py-[16px]"}>
          {editContent}
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
}
