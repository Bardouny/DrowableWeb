import type { ProjectEnrollment } from "./ProjectEnrollment";
import type { ProjectType } from "./ProjectType";
import type { User } from "./User";

export class Project {
  projectId!: string;
  name!: string;
  code!: string;
  description?: string | null;
  isActive!: boolean;
  createdAt!: Date;
  ownerUserId!: string;
  projectTypeId!: string;
  ownerUser!: User;
  projectEnrollments: ProjectEnrollment[] = [];
  projectType!: ProjectType;

  constructor(init?: Partial<Project>) {
    Object.assign(this, init);
  }
}
