import type { Country } from "./Country";
import type { User } from "./User";

export type GenderType = "Male" | "Female" | "Other";

export class PersonalInfo {
  personalInfoId!: string;
  firstName!: string;
  lastName!: string;
  dateOfBirth?: Date | null;
  gender?: GenderType | null;
  countryId!: number;
  country!: Country;
  user?: User | null;

  constructor(init?: Partial<PersonalInfo>) {
    Object.assign(this, init);
  }
}
