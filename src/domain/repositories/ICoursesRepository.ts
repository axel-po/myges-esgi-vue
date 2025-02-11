import type { Course } from "@/domain/entities/Course";

export interface ICoursesRepository {
  getCourses(): Promise<Course[]>;
}
