import { defineStore } from "pinia";
import { ref } from "vue";
import type { Course } from "@/domain/entities/Course";
import { FirebaseCoursesRepository } from "@/infrastructure/firebase/repositories/FirebaseCoursesRepository";
import { FetchCoursesUseCase } from "@/application/usecases/courses/FetchCoursesUseCase";

const coursesRepository = new FirebaseCoursesRepository();
const fetchCoursesUseCase = new FetchCoursesUseCase(coursesRepository);

export const useCourseStore = defineStore("course", () => {
  const courses = ref<Course[]>([]);

  async function fetchCourses() {
    try {
      courses.value = await fetchCoursesUseCase.execute();
    } catch (err) {
      console.error("Erreur lors de la récupération des cours :", err);
      throw err;
    }
  }

  return {
    courses,
    fetchCourses,
  };
});
