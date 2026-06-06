import { useEffect, useRef } from "react";

interface ClickAndDragOptions {
  onDrag?: (posX: number, posY: number) => void;
  dragThreshold?: number;
}

export const useClickAndDrag = ({
  onDrag = () => {},
  dragThreshold = 5,
}: ClickAndDragOptions = {}) => {
  const elementRef = useRef<HTMLElement>(null);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStartY = useRef(0);
  const elementStartX = useRef(0);
  const elementStartY = useRef(0);

  useEffect(() => {
    const element = elementRef.current;

    const mousedownHandler = (e: MouseEvent) => {
      e.preventDefault();

      isDragging.current = false;
      dragStartX.current = e.pageX;
      dragStartY.current = e.pageY;

      if (element) {
        const elementRect = element.getBoundingClientRect();
        elementStartX.current = elementRect.left + window.scrollX;
        elementStartY.current = elementRect.top + window.scrollY;
      }

      document.addEventListener("mousemove", mousemoveHandler);
      document.addEventListener("mouseup", mouseupHandler);
    };

    const mousemoveHandler = (e: MouseEvent) => {
      const dx = e.pageX - dragStartX.current;
      const dy = e.pageY - dragStartY.current;

      if (!isDragging.current) {
        const distance = Math.hypot(dx, dy);

        if (distance > dragThreshold) {
          isDragging.current = true;
        }
      } else {
        onDrag(elementStartX.current + dx, elementStartY.current + dy);
      }
    };

    const mouseupHandler = (e: MouseEvent) => {
      if (isDragging.current) {
        e.preventDefault();
      }

      document.removeEventListener("mousemove", mousemoveHandler);
      document.removeEventListener("mouseup", mouseupHandler);

      isDragging.current = false;
      dragStartX.current = 0;
      dragStartY.current = 0;
      elementStartX.current = 0;
      elementStartY.current = 0;
    };

    if (element) {
      element.addEventListener("mousedown", mousedownHandler);
    }

    return () => {
      if (element) {
        element.removeEventListener("mousedown", mousedownHandler);
      }

      isDragging.current = false;
    };
  }, [elementRef.current, dragThreshold]);

  return {
    ref: elementRef,
  };
};
