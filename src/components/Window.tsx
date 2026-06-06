import { useState } from "react";

interface WindowProps {
  title?: string;
  children?: React.ReactNode;
}

export const Window = ({ title, children }: WindowProps) => {
  const [width, setWidth] = useState(400);
  const [height, setHeight] = useState(300);
  const [x, setX] = useState(200);
  const [y, setY] = useState(300);

  return (
    <section
      className="border-ridge bg-neutral-350 absolute flex flex-col border-4 border-t-neutral-200 border-r-neutral-400 border-b-neutral-400 border-l-neutral-200"
      style={{ width: width, height: height, left: x, top: y }}
    >
      <header className="flex h-6 w-full items-center bg-linear-to-r from-blue-900 to-blue-700 p-1">
        <h1 className="text-lg/none font-medium text-white">{title}</h1>
      </header>
      <section className="grow">{children}</section>
    </section>
  );
};
