interface TaskbarButtonProps {
  title?: string;
  onClick?: () => void;
}

export const TaskbarButton = ({ title, onClick }: TaskbarButtonProps) => {
  return (
    <button
      className="border-outset active:border-inset border-2 border-neutral-300 px-2 focus:outline-2 focus:-outline-offset-5 focus:outline-black focus:outline-dotted"
      onClick={onClick}
    >
      {title}
    </button>
  );
};
