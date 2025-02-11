import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  addDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/infrastructure/config/firebase";
import { FIREBASE_COLLECTIONS } from "@/infrastructure/config/firebaseCollections";
import type { Grade } from "@/domain/entities/Grade";
import type { IGradesRepository } from "@/domain/repositories/IGradesRepository";
import { useLoadingStore } from "@/presentation/store/loading.store";

export class FirebaseGradesRepository implements IGradesRepository {
  async getStudentGrades(
    studentId: string
  ): Promise<(Grade & { courseName: string })[]> {
    const loadingStore = useLoadingStore();

    try {
      loadingStore.startLoading();

      const gradesRef = collection(db, FIREBASE_COLLECTIONS.GRADES);
      const q = query(gradesRef, where("studentId", "==", studentId));
      const querySnapshot = await getDocs(q);

      const gradesWithCourses: (Grade & { courseName: string })[] = [];

      for (const docSnap of querySnapshot.docs) {
        const gradeData = docSnap.data();
        const grade: Grade = {
          id: docSnap.id,
          note: gradeData.note,
          date: gradeData.date.toDate(),
          teacherId: gradeData.teacherId,
          studentId: gradeData.studentId,
          course_id: gradeData.course_id,
        };

        const courseDoc = await getDoc(
          doc(db, FIREBASE_COLLECTIONS.COURSES, grade.course_id)
        );

        const courseName = courseDoc.exists()
          ? courseDoc.data().title
          : "Cours inconnu";

        gradesWithCourses.push({
          ...grade,
          courseName,
        });
      }

      return gradesWithCourses;
    } finally {
      loadingStore.stopLoading();
    }
  }

  async addGrade(grade: Omit<Grade, "id">): Promise<void> {
    const loadingStore = useLoadingStore();

    try {
      loadingStore.startLoading();

      const gradesRef = collection(db, FIREBASE_COLLECTIONS.GRADES);
      await addDoc(gradesRef, grade);
    } catch (err) {
      console.error("Erreur lors de l'ajout de la note :", err);
      throw new Error("Impossible d'ajouter la note. Veuillez réessayer.");
    } finally {
      loadingStore.stopLoading();
    }
  }

  async updateGrade(
    gradeId: string,
    updatedData: Partial<Grade>
  ): Promise<void> {
    const loadingStore = useLoadingStore();

    try {
      loadingStore.startLoading();

      const gradeRef = doc(db, FIREBASE_COLLECTIONS.GRADES, gradeId);
      await updateDoc(gradeRef, updatedData);
    } catch (err) {
      console.error("Erreur lors de la mise à jour de la note :", err);
      throw new Error(
        "Impossible de mettre à jour la note. Veuillez réessayer."
      );
    } finally {
      loadingStore.stopLoading();
    }
  }
}
