import { useState, useEffect } from "react";

/**
 * Custom hook to get the local time with optional 12/24 hour format and AM/PM sign.
 * @param {boolean} is12HourFormat - Whether to display time in 12-hour format. Default is true.
 * @param {boolean} showAmPmSign - Whether to display the AM/PM sign. Default is true.
 * @returns {string} - The formatted local time.
 */
const useLocalTime = (
  is12HourFormat: boolean = true,
  showAmPmSign: boolean = true
): string => {
  const [localTime, setLocalTime] = useState<string>("");

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    // Function to update the local time based on the provided parameters
    const updateLocalTime = () => {
      const now = new Date();
      let hours = now.getHours();
      let minutes = now.getMinutes().toString();
      let amPm = "";

      if (is12HourFormat) {
        if (showAmPmSign) {
          amPm = hours >= 12 ? " PM" : " AM";
        }
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
      }

      // Add a leading zero to the minutes using the padStart method
      minutes = minutes.padStart(2, "0");

      const formattedTime = `${hours}:${minutes}${amPm}`;
      setLocalTime(formattedTime);
    };

    // Function to schedule the first update at the beginning of the next second
    const scheduleUpdate = () => {
      const now = new Date();
      // Calculate the delay required for the first update to align with the beginning of the next second
      const delay = 1000 - (now.getTime() % 1000);

      // Schedule the first update and set up the interval to update the time every second thereafter
      setTimeout(() => {
        updateLocalTime();
        intervalId = setInterval(updateLocalTime, 1000);
      }, delay);
    };

    // Call the scheduleUpdate function to initiate the time updates
    scheduleUpdate();

    // Clean up the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, [is12HourFormat, showAmPmSign]);

  return localTime;
};

export default useLocalTime;
