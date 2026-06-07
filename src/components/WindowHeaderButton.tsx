interface WindowHeaderButtonProps {
  decoration?: string;
  onClick?: () => void;
}

export const WindowHeaderButton = ({
  decoration,
  onClick,
}: WindowHeaderButtonProps) => {
  return (
    <button
      className="bg-neutral-350 border-outset active:border-inset flex aspect-square h-full content-center border-2 border-neutral-300 px-2 align-middle"
      onClick={onClick}
    >
      {decoration}
    </button>
  );
};
