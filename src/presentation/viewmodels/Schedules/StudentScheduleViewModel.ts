import { ref } from "vue";
import { FirebaseScheduleRepository } from "@/infrastructure/firebase/repositories/FirebaseScheduleRepository";
import { FirebaseCoursesRepository } from "@/infrastructure/firebase/repositories/FirebaseCoursesRepository";
import { FetchStudentSchedulesUseCase } from "@/application/usecases/schedules/FetchStudentSchedulesUseCase";
import { FetchCoursesUseCase } from "@/application/usecases/courses/FetchCoursesUseCase";
import type { Schedule } from "@/domain/entities/Schedule";
import type { Course } from "@/domain/entities/Course";
import { FirebaseUserRepository } from "@/infrastructure/firebase/repositories/FirebaseUserRepository";

export function useStudentScheduleViewModel() {
  const schedules = ref<Schedule[]>([]);
  const courses = ref<Course[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const scheduleRepository = new FirebaseScheduleRepository();
  const userRepository = new FirebaseUserRepository();
  const courseRepository = new FirebaseCoursesRepository();

  const fetchSchedulesUseCase = new FetchStudentSchedulesUseCase(
    scheduleRepository
  );
  const fetchCoursesUseCase = new FetchCoursesUseCase(courseRepository);

  const fetchSchedules = async (studentId: string[]) => {
    loading.value = true;
    error.value = null;

    try {
      const fetchedSchedules = await fetchSchedulesUseCase.execute(studentId);

      const courseIds = [
        ...new Set(fetchedSchedules.map((schedule) => schedule.courseId)),
      ];

      const fetchedCourses = await fetchCoursesUseCase.execute(courseIds);

      schedules.value = fetchedSchedules.map((schedule) => {
        const course = fetchedCourses.find(
          (course) => course.id === schedule.courseId
        );

        return {
          ...schedule,
          title: course?.title || "Cours inconnu",
        };
      });
    } catch (err) {
      error.value = "Erreur lors de la récupération des emplois du temps.";
      console.error(err);
    } finally {
      loading.value = false;
    }
  };

  const fetchSchedulesByClassIds = async (userId: string) => {
    loading.value = true;
    error.value = null;

    try {
      const user = await userRepository.getUserById(userId);
      const classIds = user.classeId;

      const fetchedSchedules = await scheduleRepository.getSchedulesByClassIds(
        classIds
      );

      const courseIds = [
        ...new Set(fetchedSchedules.map((schedule) => schedule.courseId)),
      ];

      const fetchedCourses = await fetchCoursesUseCase.execute(courseIds);

      schedules.value = fetchedSchedules.map((schedule) => {
        const course = fetchedCourses.find(
          (course) => course.id === schedule.courseId
        );

        return {
          ...schedule,
          title: course?.title || "Cours inconnu",
        };
      });
    } catch (err) {
      error.value = "Erreur lors de la récupération des emplois du temps.";
      console.error(err);
    } finally {
      loading.value = false;
    }
  };

  return {
    schedules,
    courses,
    loading,
    error,
    fetchSchedules,
    fetchSchedulesByClassIds,
  };
}
