import { collection, getDocs } from "firebase/firestore";
import { db } from "@/infrastructure/config/firebase";
import { FIREBASE_COLLECTIONS } from "@/infrastructure/config/firebaseCollections";
import type { Course } from "@/domain/entities/Course";
import type { ICoursesRepository } from "@/domain/repositories/ICoursesRepository";

export class FirebaseCoursesRepository implements ICoursesRepository {
  async getCourses(): Promise<Course[]> {
    const coursesRef = collection(db, FIREBASE_COLLECTIONS.COURSES);
    const querySnapshot = await getDocs(coursesRef);

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Course[];
  }
}
