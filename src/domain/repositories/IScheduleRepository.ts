// src/domain/repositories/IScheduleRepository.ts
import type { Schedule } from "@/domain/entities/Schedule";

export interface IScheduleRepository {
  getSchedulesByClassIds(classIds: string[]): Promise<Schedule[]>;
}
