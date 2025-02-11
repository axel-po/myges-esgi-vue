export interface Grade {
  id: string;
  note: number;
  date: Date;
  teacherId: string;
  studentId: string;
  course_id: string;
  courseName?: string;
}
