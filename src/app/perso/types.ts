export type Perso = {
  pseudo: string;
  serveur: string;
  continent: string;
  faction?: string;
  lvl?: number;
  ilvl?: number;
  classe?: string;
  spe?: string;
};

export type Persos = Perso[];

export type Guilde = {
  nom: string;
  faction: string;
  serveur: string;
  continent: string;
}

export type Guildes = Guilde[];
