export type RaidProgress = {
  summary: string;
  total_bosses: number;
  normal_bosses_killed: number;
  heroic_bosses_killed: number;
  mythic_bosses_killed: number;
};

export type RaidApi = {
  raid_progression: {
    [key: string]: RaidProgress;
  };
};

export type Raids = Raid[];

export type Raid = {
  nom: string;
  boss: number;
  summary: string;
  nm: number;
  hm: number;
  mm: number;
}
