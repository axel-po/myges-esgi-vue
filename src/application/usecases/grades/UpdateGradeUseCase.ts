import type { Grade } from "@/domain/entities/Grade";
import type { IGradesRepository } from "@/domain/repositories/IGradesRepository";

export class UpdateGradeUseCase {
  constructor(private gradesRepository: IGradesRepository) {}

  async execute(gradeId: string, updatedGrade: Partial<Grade>): Promise<void> {
    return this.gradesRepository.updateGrade(gradeId, updatedGrade);
  }
}
