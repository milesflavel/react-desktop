import { useState } from "react";
import { useClickAndDrag } from "../hooks/useClickAndDrag";

interface WindowProps {
  title?: string;
  children?: React.ReactNode;
}

export const Window = ({ title, children }: WindowProps) => {
  const [width, _setWidth] = useState(400);
  const [height, _setHeight] = useState(300);
  const [x, setX] = useState(200);
  const [y, setY] = useState(300);

  const { ref: headerRef } = useClickAndDrag({
    onDrag: (posX, posY) => {
      setX(posX);
      setY(posY);
    },
  });

  return (
    <section
      className="border-ridge bg-neutral-350 absolute flex flex-col border-4 border-t-neutral-200 border-r-neutral-400 border-b-neutral-400 border-l-neutral-200"
      style={{ width: width, height: height, left: x, top: y }}
    >
      <header
        ref={headerRef}
        className="flex h-6 w-full cursor-default items-center bg-linear-to-r from-blue-900 to-blue-700 p-1"
      >
        <h1 className="text-lg/none font-medium text-white">{title}</h1>
      </header>
      <section className="grow">{children}</section>
    </section>
  );
};
