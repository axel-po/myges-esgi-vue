import { collection, getDocs } from "firebase/firestore";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import type { IUserRepository } from "@/domain/repositories/IUserRepository";
import type { User } from "@/domain/entities/User";
import { auth } from "@/infrastructure/config/firebase";
import { db } from "@/infrastructure/config/firebase";
import { FIREBASE_COLLECTIONS } from "@/infrastructure/config/firebaseCollections";
import { useLoadingStore } from "@/presentation/store/loading.store";

export class FirebaseUserRepository implements IUserRepository {
  async getCurrentUser(): Promise<User | null> {
    const loadingStore = useLoadingStore();

    try {
      loadingStore.startLoading();

      const user = auth.currentUser;
      if (!user) {
        console.log("Aucun utilisateur connecté");
        return null;
      }

      const userDoc = await getDoc(
        doc(db, FIREBASE_COLLECTIONS.USERS, user.uid)
      );

      return userDoc.data() as User;
    } finally {
      loadingStore.stopLoading();
    }
  }

  async signIn(email: string, password: string): Promise<User> {
    const loadingStore = useLoadingStore();

    try {
      loadingStore.startLoading();

      const credential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const userDoc = await getDoc(
        doc(db, FIREBASE_COLLECTIONS.USERS, credential.user.uid)
      );
      return userDoc.data() as User;
    } finally {
      loadingStore.stopLoading();
    }
  }

  async signOut(): Promise<void> {
    const loadingStore = useLoadingStore();

    try {
      loadingStore.startLoading();
      await auth.signOut();
    } finally {
      loadingStore.stopLoading();
    }
  }

  async getUserById(userId: string): Promise<any> {
    const userRef = doc(db, "Users", userId);
    const userSnapshot = await getDoc(userRef);
    return userSnapshot.data();
  }

  async getAllUsers(): Promise<User[]> {
    const loadingStore = useLoadingStore();

    try {
      loadingStore.startLoading();

      const usersRef = collection(db, FIREBASE_COLLECTIONS.USERS);
      const querySnapshot = await getDocs(usersRef);

      return querySnapshot.docs.map((doc) => ({
        uid: doc.id,
        ...doc.data(),
      })) as User[];
    } finally {
      loadingStore.stopLoading();
    }
  }
}
