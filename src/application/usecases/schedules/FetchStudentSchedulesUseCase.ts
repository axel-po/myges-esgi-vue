// src/application/usecases/schedules/FetchStudentSchedulesUseCase.ts
import type { IScheduleRepository } from "@/domain/repositories/IScheduleRepository";
import type { Schedule } from "@/domain/entities/Schedule";

export class FetchStudentSchedulesUseCase {
  constructor(private scheduleRepository: IScheduleRepository) {}

  async execute(classeId: string[]): Promise<Schedule[]> {
    return await this.scheduleRepository.getSchedulesByClassIds(classeId);
  }
}
