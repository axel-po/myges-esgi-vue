import type { ICoursesRepository } from "@/domain/repositories/ICoursesRepository";
import type { Course } from "@/domain/entities/Course";

export class FetchCoursesUseCase {
  constructor(private coursesRepository: ICoursesRepository) {}

  async execute(courseIds?: string[]): Promise<Course[]> {
    const courses = await this.coursesRepository.getCourses();

    if (courseIds && courseIds.length > 0) {
      return courses.filter((course) => courseIds.includes(course.id));
    }

    return courses;
  }
}
