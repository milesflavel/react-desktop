import { useEffect, useState } from "react";

type DateTimeFormat = "hours-minutes" | "hours-minutes-seconds";

const ONE_SECOND = 1000;
const ONE_MINUTE = ONE_SECOND * 60;

export const useDateTime = (format: DateTimeFormat = "hours-minutes") => {
  const [value, setValue] = useState(getDateTime(format));

  useEffect(() => {
    const interval = setInterval(() => {
      setValue(getDateTime(format));
    }, getUpdateInterval(format));

    return () => {
      clearInterval(interval);
    };
  }, [format]);

  return {
    timestamp: value,
    displayValue: getDisplayValue(value, format),
  };
};

const getDateTime = (format: DateTimeFormat) => {
  const date = new Date();

  switch (format) {
    case "hours-minutes":
      date.setSeconds(0, 0);
      return date;
    case "hours-minutes-seconds":
      date.setMilliseconds(0);
      return date;
  }
};

const getDisplayValue = (date: Date, format: DateTimeFormat) => {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  switch (format) {
    case "hours-minutes":
      return (
        String(hours > 12 ? hours - 12 : hours).padStart(2, "0") +
        ":" +
        String(minutes).padStart(2, "0") +
        (hours < 12 ? " AM" : " PM")
      );
    case "hours-minutes-seconds":
      return (
        String(hours > 12 ? hours - 12 : hours).padStart(2, "0") +
        ":" +
        String(minutes).padStart(2, "0") +
        ":" +
        String(seconds).padStart(2, "0") +
        (hours < 12 ? " AM" : " PM")
      );
  }
};

const getUpdateInterval = (format: DateTimeFormat) => {
  switch (format) {
    case "hours-minutes":
      return ONE_MINUTE;
    case "hours-minutes-seconds":
      return ONE_SECOND;
  }
};
