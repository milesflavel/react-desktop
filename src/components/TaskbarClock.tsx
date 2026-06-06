import { useDateTime } from "../hooks/useDateTime";

export const TaskbarClock = () => {
  const { timestamp, displayValue } = useDateTime("hours-minutes");

  return (
    <time
      className="flex h-full items-center px-2"
      dateTime={timestamp.toISOString()}
    >
      {displayValue}
    </time>
  );
};
