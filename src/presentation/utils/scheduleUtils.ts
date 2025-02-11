import type { Schedule } from "@/domain/entities/Schedule";

export const getEventsForDay = (
  schedules: Schedule[],
  day: string
): Schedule[] => {
  return schedules.filter((event) => {
    const eventDate = new Date(event.date.seconds * 1000);
    const eventDay = eventDate.toLocaleDateString("fr-FR", {
      weekday: "long",
    });

    return eventDay.toLowerCase() === day.toLowerCase();
  });
};

export const getEventStyle = (event: Schedule): Record<string, string> => {
  const [startHour, startMinute] = event.startTime.split(":").map(Number);
  const [endHour, endMinute] = event.endTime.split(":").map(Number);

  const top = (startHour - 8) * 60 + startMinute; // Position depuis 8h00
  const height = (endHour - startHour) * 60 + (endMinute - startMinute); // Durée en pixels

  return {
    top: `${top}px`,
    height: `${height}px`,
    backgroundColor: event.color || "#3498db",
  };
};

export const formatTime = (time: string): string => {
  return time;
};
