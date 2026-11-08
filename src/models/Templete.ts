import type { ProjectType } from "./ProjectType";

export class Templete {
  templeteId!: string;
  link!: string;
  projectTypeId!: string;
  projectType!: ProjectType;

  constructor(init?: Partial<Templete>) {
    Object.assign(this, init);
  }
}
