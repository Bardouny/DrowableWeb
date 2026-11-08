import type { PersonalInfo } from "./PersonalInfo";

export class Country {
  countryId!: number;
  name!: string;
  code!: string;
  phonNumberCode!: string;
  personalInfos: PersonalInfo[] = [];

  constructor(init?: Partial<Country>) {
    Object.assign(this, init);
  }
}
