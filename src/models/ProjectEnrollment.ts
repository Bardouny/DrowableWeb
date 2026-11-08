import type { Project } from "./Project";
import type { User } from "./User";

export class ProjectEnrollment {
  projectEnrollmentId!: string;
  permissions?: string | null;
  createdAt!: Date;
  status!: string;
  senderUserId!: string;
  enrolledUserId!: string;
  projectId!: string;
  enrolledUser!: User;
  project!: Project;
  senderUser!: User;

  constructor(init?: Partial<ProjectEnrollment>) {
    Object.assign(this, init);
  }
}
