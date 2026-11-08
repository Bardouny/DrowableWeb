import type { Project } from "./Project";
import type { Templete } from "./Templete";

export class ProjectType {
  projectTypeId!: string;
  name!: string;
  projects: Project[] = [];
  templetes: Templete[] = [];

  constructor(init?: Partial<ProjectType>) {
    Object.assign(this, init);
  }
}
