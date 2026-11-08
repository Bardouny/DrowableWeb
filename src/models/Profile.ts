const defaultBio =
  "Welcome to my profile! I'm passionate about exploring new ideas and sharing knowledge. Feel free to connect with me!";

const defaultHeadlines = [
  "NEW TO DROWABLE",
  "EXPLORING THE WORLD OF DROWABLE",
  "DROWABLE ENTHUSIAST",
  "DISCOVERING DROWABLE",
  "DROWABLE ADVENTURER",
  "DROWABLE EXPLORER",
  "DROWABLE LOVER",
  "DROWABLE FANATIC",
];

export class Profile {
  profileId!: string;
  headLine!: string | null;
  bio!: string | null;
  profileImageLink!: string | null;
  user?: import("./User").User | null;

  constructor(init?: Partial<Profile>) {
    this.profileId = crypto.randomUUID();
    this.headLine =
      defaultHeadlines[Math.floor(Math.random() * defaultHeadlines.length)]!;
    this.bio = defaultBio;
    this.profileImageLink = null;
    Object.assign(this, init);
    this.headLine ??=
      defaultHeadlines[Math.floor(Math.random() * defaultHeadlines.length)]!;
    this.bio ??= defaultBio;
  }
}