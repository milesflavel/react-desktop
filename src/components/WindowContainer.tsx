interface WindowContainerProps {
  children?: React.ReactNode;
}

export const WindowContainer = ({ children }: WindowContainerProps) => {
  return <section className="relative size-full">{children}</section>;
};
