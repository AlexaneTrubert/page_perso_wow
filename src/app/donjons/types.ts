export type Donjon = {
  nom: string;
  niveauFortifie: number;
  niveauTyranique: number;
  points: number;
  temps: string;
  affixes: Affixes;
  topMonde: number;
  topRegion: number;
};

export type Donjons = Donjon[];

export type Affix = {
  logo?: string;
  nom: string;
}

export type Affixes = Affix[];
