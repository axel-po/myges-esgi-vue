import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/infrastructure/config/firebase";
import type { Schedule } from "@/domain/entities/Schedule";
import type { IScheduleRepository } from "@/domain/repositories/IScheduleRepository";

export class FirebaseScheduleRepository implements IScheduleRepository {
  async getSchedulesByClassIds(classIds: string[]): Promise<Schedule[]> {
    const schedulesRef = collection(db, "Schedules");
    const q = query(schedulesRef, where("classeId", "in", classIds));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Schedule[];
  }
}
