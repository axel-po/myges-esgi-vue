import type { Grade } from "@/domain/entities/Grade";
import type { IGradesRepository } from "@/domain/repositories/IGradesRepository";

export class FetchStudentGradesUseCase {
  constructor(private gradesRepository: IGradesRepository) {}

  async execute(studentId: string): Promise<Grade[]> {
    return await this.gradesRepository.getStudentGrades(studentId);
  }
}
