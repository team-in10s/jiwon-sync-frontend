// hooks/useInputAutoScroll.ts
import { useEffect } from 'react';

function scrollInputIntoView(element: HTMLElement) {
  if (!element) return;

  setTimeout(() => {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  }, 300);
}

export function useInputAutoScroll() {
  useEffect(() => {
    // focusin 이벤트 리스너 추가
    const handleFocusIn = (e: FocusEvent) => {
      const target = e.target as HTMLElement;
      if (
        (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') &&
        target.hasAttribute('data-scroll')
      ) {
        scrollInputIntoView(target);
      }
    };

    window.addEventListener('focusin', handleFocusIn);

    // 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener('focusin', handleFocusIn);
    };
  }, []);
}
