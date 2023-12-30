export type StuffApi = {
  name: string;
  race: string;
  class: string;
  active_spec_name: string;
  active_spec_role: string;
  gender: string;
  faction: string;
  achievement_points: number;
  honorable_kills: number;
  thumbnail_url: string;
  region: string;
  realm: string;
  last_crawled_at: string;
  profile_url: string;
  profile_banner: string;
  gear: {
    updated_at: string;
    item_level_equipped: number;
    item_level_total: number;
    artifact_traits: number;
    corruption: {
      added: number;
      resisted: number;
      total: number;
      cloakRank: number;
      spells: []
    };
    items: ItemsApi;
  };
};

export type Stuff = {
  info_equipement: {
    updated_at: string;
    item_level_equipped: number;
    item_level_total: number;
  };
  items: Items;
}

export type ItemApi = {
  item_id: number;
  item_level: number;
  enchant: number;
  icon: string;
  name: string;
  item_quality: string;
  is_legendary: boolean;
  is_azerite_armor: boolean;
  azerite_powers: [];
  corruption: {};
  domination_shards: [];
  tier: string;
  gems: [];
  bonuses: [];
}

export type ItemsApi = ItemApi[];

export type Item = {
  emplacement: string;
  name: string;
  ilvl: number;
  icon: string;
  enchant: number;
  item_id: number;
}

export type Items = Item[];
