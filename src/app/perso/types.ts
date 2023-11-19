export type Perso = {
  pseudo: string;
  serveur: string;
  continent: string;
  faction?: string;
  lvl?: number;
  ilvl?: number;
  classe?: string;
  spe?: string;
  race?: string;
  avatar?: string;
  urlRaiderIo?: string;
  guilde?: {
    nom: string;
    serveur: string;
  }
};

export type Persos = Perso[];

export type Guilde = {
  nom?: string;
  faction?: string;
  serveur?: string;
  continent?: string;
}

export type Guildes = Guilde[];

export type PersoApi = {
  "name": string,
  "race": string,
  "class": string,
  "active_spec_name": string,
  "active_spec_role": string,
  "gender": string,
  "faction": string,
  "achievement_points": number,
  "honorable_kills": number,
  "thumbnail_url": string,
  "region": string,
  "realm": string,
  "last_crawled_at": string,
  "profile_url": string,
  "profile_banner": string,
  "guild": {
    "name": string,
    "realm": string,
  }
}
