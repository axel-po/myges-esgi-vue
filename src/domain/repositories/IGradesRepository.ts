import type { Grade } from "@/domain/entities/Grade";

export interface IGradesRepository {
  getStudentGrades(studentId: string): Promise<Grade[]>;
  addGrade(grade: Omit<Grade, "id">): Promise<void>;
  updateGrade(gradeId: string, updatedData: Partial<Grade>): Promise<void>;
}
