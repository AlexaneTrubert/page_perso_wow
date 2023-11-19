export type Donjon = {
  nom: string;
  niveauFortifie?: number;
  niveauTyranique?: number;
  points: number;
  temps: number;
  affixes: Affixes;
};

export type Donjons = Donjon[];

export type Affix = {
  logo?: string;
  nom: string;
  description?: string;
}

export type Affixes = Affix[];

export type AffixApi = {
  id: number;
  name: string;
  description: string;
  icon: string;
  wowhead_url: string;
}

export type AffixesApi = AffixApi[];

export type DonjonsApi = {
  name?: string;
  race?: string;
  class?: string;
  active_spec_name?: string;
  active_spec_role?: string;
  gender?: string;
  faction?: string;
  achievement_points?: number;
  honorable_kills?: number;
  thumbnail_url?: string;
  region?: string;
  realm?: string;
  last_crawled_at?: string;
  profile_url?: string;
  profile_banner?: string;
  mythic_plus_best_runs: DonjonApi[];
  mythic_plus_recent_runs: DonjonApi[];
}

export type DonjonApi = {
  dungeon: string;
  short_name: string;
  mythic_level: number;
  completed_at: string;
  clear_time_ms: number;
  num_keystone_upgrades: number;
  map_challenge_mode_id: number;
  zone_id: number;
  score: number;
  affixes: AffixesApi;
  url: string;
}
