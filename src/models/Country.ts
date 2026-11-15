import type { PersonalInfo } from "./PersonalInfo";

export class Country {
  countryId!: number;
  name!: string;
  code!: string;
  phonNumberCode!: string;
  personalInfos: PersonalInfo[] = [];

  private static readonly countries = [
    { countryId: 1, name: "Lebanon", code: "LB", phonNumberCode: "+961" },
    { countryId: 2, name: "United States", code: "US", phonNumberCode: "+1" },
    { countryId: 3, name: "United Kingdom", code: "GB", phonNumberCode: "+44" },
    { countryId: 4, name: "Canada", code: "CA", phonNumberCode: "+1" },
    { countryId: 5, name: "France", code: "FR", phonNumberCode: "+33" },
  ];

  constructor(init?: Partial<Country>) {
    Object.assign(this, init);
  }

  static All(): Country[] {
    return this.countries.map((country) => new Country(country));
  }

  static Find(countryId: number): Country | undefined {
    const country = this.countries.find((item) => item.countryId === countryId);
    return country ? new Country(country) : undefined;
  }
}
