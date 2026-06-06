interface TaskbarProps {
  items?: React.ReactNode;
  trayItems?: React.ReactNode;
}

export const Taskbar = ({ items, trayItems }: TaskbarProps) => {
  return (
    <section className="border-outset bg-neutral-350 flex h-10 w-full justify-between border-t-2 border-neutral-300 p-0.5">
      <div className="flex gap-1">{items}</div>
      <div className="border-inset border-2 border-neutral-300">
        {trayItems}
      </div>
    </section>
  );
};
