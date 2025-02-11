export interface Schedule {
  id: string;
  date: { seconds: number; nanoseconds: number };
  startTime: string;
  endTime: string;
  courseId: string;
  classeId: string;
  color?: string;
  title?: string;
}
