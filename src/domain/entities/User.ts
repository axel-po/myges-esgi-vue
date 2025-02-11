import { UserRole } from "@/domain/enums/UserRole";

export interface User {
  createdAt: Date;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  uid: string;
  classeId: string[];
}
