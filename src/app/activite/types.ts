export type Activite = {
  date?: string;
  donjon?: string;
  niveau?: number;
};

export type Activites = {
  pseudo: string;
  thumbnail_url: string;
  activitesArray: Activite[];
};
