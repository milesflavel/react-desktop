interface WindowHeaderButtonProps {
  decoration: React.ReactNode;
  onClick?: () => void;
}

export const WindowHeaderButton = ({
  decoration,
  onClick,
}: WindowHeaderButtonProps) => {
  return (
    <button
      className="bg-neutral-350 border-outset active:border-inset flex aspect-square h-full content-center border-2 border-neutral-300 p-0.5 align-middle"
      onClick={onClick}
    >
      {decoration}
    </button>
  );
};
