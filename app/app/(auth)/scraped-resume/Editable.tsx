import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import {
  forwardRef,
  KeyboardEvent,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import "xss";

interface EditableProps {
  defaultContent?: string;
  onChangeEvent?: (text: string) => void;
  onBlur?: (text: string) => void;
  tagName?: string;
  className?: string;
  placeholder: string;
  disabled?: boolean;
  focusOnDefault?: boolean;
  disableEnter?: boolean;
  id?: string;
}

export interface EditableRef {
  focus: () => void;
}

export const Editable = forwardRef<EditableRef, EditableProps>(
  (
    {
      defaultContent,
      onChangeEvent,
      tagName,
      className,
      placeholder,
      onBlur,
      disabled,
      focusOnDefault,
      disableEnter,
      id,
    }: EditableProps,
    ref,
  ) => {
    const inputRef = useRef<HTMLElement | null>(null);

    useImperativeHandle(
      ref,
      () => {
        return {
          focus() {
            setTimeout(() => inputRef.current && inputRef.current!.focus(), 0);
          },
        };
      },
      [],
    );

    const [content, setContent] = useState(defaultContent || "");

    useEffect(() => {
      setContent(defaultContent || "");
    }, [defaultContent]);

    const onContentChange = useCallback((evt: ContentEditableEvent) => {
      const content = filterXSS(evt.currentTarget.innerHTML, {
        whiteList: { br: [], div: [] },
        stripIgnoreTag: true,
        stripIgnoreTagBody: ["script"],
      });
      setContent(content);
      onChangeEvent && onChangeEvent(content);
    }, []);

    const onKeyDown = useCallback((evt: KeyboardEvent<HTMLDivElement>) => {
      if (evt.nativeEvent.isComposing) {
        return;
      }
      if (evt.key === "Enter" && !disableEnter) {
        evt.currentTarget.blur();
      }
    }, []);

    const onBlurEvent = useCallback(() => {
      setContent((prev) => {
        onBlur && onBlur(prev);
        return prev;
      });
    }, [content]);

    // useEffect(() => {
    //   onChangeEvent &&
    //     setContent((prev) => {
    //       onChangeEvent(prev);
    //       return prev;
    //     });
    // }, [content]);

    useEffect(() => {
      (defaultContent === "" || !defaultContent) &&
        focusOnDefault &&
        inputRef.current &&
        inputRef.current!.focus();
    }, []);

    return (
      <ContentEditable
        id={id}
        disabled={disabled}
        innerRef={inputRef}
        tagName={tagName}
        data-placeholder={placeholder}
        onKeyDown={onKeyDown}
        onChange={onContentChange}
        onBlur={onBlurEvent}
        html={content}
      />
    );
  },
);

Editable.displayName = "Editable";
