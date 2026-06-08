import { useRef, useState } from "react";
import { useClickAndDrag } from "../hooks/useClickAndDrag";
import { WindowHeaderButton } from "./WindowHeaderButton";

export interface WindowProps {
  title?: string;
  onFocus?: () => void;
  children?: React.ReactNode;
}

export const Window = ({ title, onFocus, children }: WindowProps) => {
  const [width, setWidth] = useState(400);
  const [height, setHeight] = useState(300);
  const [x, setX] = useState(200);
  const [y, setY] = useState(300);
  const initialWidth = useRef(0);
  const initialHeight = useRef(0);
  const initialX = useRef(0);
  const initialY = useRef(0);

  const handleDragStart = () => {
    initialWidth.current = width;
    initialHeight.current = height;
    initialX.current = x;
    initialY.current = y;
  };
  const handleResizeTop = (dy: number) => {
    setHeight(initialHeight.current - dy);
    setY(initialY.current + dy);
  };
  const handleResizeRight = (dx: number) => {
    setWidth(initialWidth.current + dx);
  };
  const handleResizeBottom = (dy: number) => {
    setHeight(initialHeight.current + dy);
  };
  const handleResizeLeft = (dx: number) => {
    setWidth(initialWidth.current - dx);
    setX(initialX.current + dx);
  };

  const { ref: headerRef } = useClickAndDrag({
    onClick: onFocus,
    onDragStart: handleDragStart,
    onDragMove: (dx, dy) => {
      onFocus?.();
      setX(initialX.current + dx);
      setY(initialY.current + dy);
    },
  });
  const { ref: resizeTopLeftRef } = useClickAndDrag({
    onDragStart: handleDragStart,
    onDragMove: (dx, dy) => {
      onFocus?.();
      handleResizeTop(dy);
      handleResizeLeft(dx);
    },
  });
  const { ref: resizeTopRef } = useClickAndDrag({
    onDragStart: handleDragStart,
    onDragMove: (_dx, dy) => {
      onFocus?.();
      handleResizeTop(dy);
    },
  });
  const { ref: resizeTopRightRef } = useClickAndDrag({
    onDragStart: handleDragStart,
    onDragMove: (dx, dy) => {
      onFocus?.();
      handleResizeTop(dy);
      handleResizeRight(dx);
    },
  });
  const { ref: resizeRightRef } = useClickAndDrag({
    onDragStart: handleDragStart,
    onDragMove: (dx, _dy) => {
      onFocus?.();
      handleResizeRight(dx);
    },
  });
  const { ref: resizeBottomRightRef } = useClickAndDrag({
    onDragStart: handleDragStart,
    onDragMove: (dx, dy) => {
      onFocus?.();
      handleResizeBottom(dy);
      handleResizeRight(dx);
    },
  });
  const { ref: resizeBottomRef } = useClickAndDrag({
    onDragStart: handleDragStart,
    onDragMove: (_dx, dy) => {
      onFocus?.();
      handleResizeBottom(dy);
    },
  });
  const { ref: resizeBottomLeftRef } = useClickAndDrag({
    onDragStart: handleDragStart,
    onDragMove: (dx, dy) => {
      onFocus?.();
      handleResizeBottom(dy);
      handleResizeLeft(dx);
    },
  });
  const { ref: resizeLeftRef } = useClickAndDrag({
    onDragStart: handleDragStart,
    onDragMove: (dx, _dy) => {
      onFocus?.();
      handleResizeLeft(dx);
    },
  });

  return (
    <div
      className="absolute"
      style={{ width: width, height: height, left: x, top: y }}
      onClick={onFocus}
    >
      {/* Content */}
      <section className="border-ridge bg-neutral-350 flex size-full flex-col gap-px border-4 border-t-neutral-200 border-r-neutral-400 border-b-neutral-400 border-l-neutral-200">
        <header
          ref={headerRef}
          className="flex h-6 w-full cursor-default items-center gap-0.5 bg-linear-to-r from-blue-900 to-blue-700 p-0.5 select-none"
        >
          <h1 className="mr-auto text-lg/none font-medium text-white">
            {title}
          </h1>
          <WindowHeaderButton
            decoration={
              <svg className="size-full" viewBox="0 0 10 10">
                <path className="stroke-black stroke-2" d="M 1 9 L 9 9" />
              </svg>
            }
          />
          <WindowHeaderButton
            decoration={
              <svg className="size-full" viewBox="0 0 10 10">
                <path
                  className="stroke-black stroke-2"
                  d="M 0 0 L 10 10 M 0 10 L 10 0"
                />
              </svg>
            }
          />
        </header>
        <section className="grow">{children}</section>
      </section>
      {/* Resize Handles */}
      <div
        ref={resizeTopLeftRef}
        className="absolute -top-1 -left-1 h-3 w-3 cursor-nw-resize"
      ></div>
      <div
        ref={resizeTopRef}
        className="absolute -top-1 right-2 left-2 h-3 cursor-n-resize"
      ></div>
      <div
        ref={resizeTopRightRef}
        className="absolute -top-1 -right-1 h-3 w-3 cursor-ne-resize"
      ></div>
      <div
        ref={resizeRightRef}
        className="absolute top-2 -right-1 bottom-2 w-3 cursor-e-resize"
      ></div>
      <div
        ref={resizeBottomRightRef}
        className="absolute -right-1 -bottom-1 h-3 w-3 cursor-se-resize"
      ></div>
      <div
        ref={resizeBottomRef}
        className="absolute right-2 -bottom-1 left-2 h-3 cursor-s-resize"
      ></div>
      <div
        ref={resizeBottomLeftRef}
        className="absolute -bottom-1 -left-1 h-3 w-3 cursor-sw-resize"
      ></div>
      <div
        ref={resizeLeftRef}
        className="absolute top-2 bottom-2 -left-1 w-3 cursor-w-resize"
      ></div>
    </div>
  );
};
