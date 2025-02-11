import type { IGradesRepository } from "@/domain/repositories/IGradesRepository";
import type { Grade } from "@/domain/entities/Grade";

export class AddGradeUseCase {
  constructor(private gradesRepository: IGradesRepository) {}

  async execute(grade: Omit<Grade, "id">): Promise<void> {
    await this.gradesRepository.addGrade(grade);
  }
}
