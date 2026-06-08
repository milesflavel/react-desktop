import { useEffect, useRef } from "react";

interface ClickAndDragOptions {
  onClick?: () => void;
  onDragStart?: () => void;
  onDragEnd?: () => void;
  onDragMove?: (dx: number, dy: number) => void;
  dragThreshold?: number;
}

export const useClickAndDrag = ({
  onClick = () => {},
  onDragStart = () => {},
  onDragEnd = () => {},
  onDragMove = () => {},
  dragThreshold = 5,
}: ClickAndDragOptions = {}) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStartY = useRef(0);

  useEffect(() => {
    const element = elementRef.current;

    const mousedownHandler = (e: MouseEvent) => {
      isDragging.current = false;
      dragStartX.current = e.pageX;
      dragStartY.current = e.pageY;

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
          onDragStart();
        }
      } else {
        onDragMove(dx, dy);
      }
    };

    const mouseupHandler = (e: MouseEvent) => {
      if (isDragging.current) {
        e.preventDefault();
      } else {
        onClick();
      }

      document.removeEventListener("mousemove", mousemoveHandler);
      document.removeEventListener("mouseup", mouseupHandler);

      isDragging.current = false;
      dragStartX.current = 0;
      dragStartY.current = 0;
      onDragEnd();
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
  }, [
    elementRef.current,
    onClick,
    onDragStart,
    onDragEnd,
    onDragMove,
    dragThreshold,
  ]);

  return {
    ref: elementRef,
  };
};
