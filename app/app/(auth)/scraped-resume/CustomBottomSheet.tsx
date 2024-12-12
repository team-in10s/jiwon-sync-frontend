import { BottomSheet, BottomSheetProps } from "react-spring-bottom-sheet";
import React from "react";

export default function CustomBottomSheet({
  children,
  ...props
}: BottomSheetProps) {
  return (
    <BottomSheet
      className={"radix-themes"}
      data-scaling={"100%"}
      data-is-root-theme="true"
      data-accent-color="indigo"
      data-gray-color="slate"
      data-has-background="true"
      data-panel-background="translucent"
      data-radius="medium"
      open={props.open}
      blocking={false}
      sibling={
        <div
          data-rsbs-backdrop="true"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            props.onDismiss?.();
          }}
        />
      }
    >
      {children}
    </BottomSheet>
  );
}
