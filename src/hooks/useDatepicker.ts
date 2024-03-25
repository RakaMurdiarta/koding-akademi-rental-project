"use client";
import { useEffect, useState } from "react";

const useDatePicker = () => {
  const currentDate = new Date();
  const todayDateString = formatDate(currentDate);

  const tomorrow = new Date(currentDate);
  tomorrow.setDate(currentDate.getDate() + 1);
  const tomorrowDateString = formatDate(tomorrow);

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  function formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  useEffect(() => {
    if (isOpen)
      setTimeout(() => {
        setIsOpen(false);
      }, 3000);
  }, [isOpen]);

  return {
    todayDateString,
    tomorrowDateString,
    formatDate,
    isOpen,
    toggle,
  };
};

export default useDatePicker;
