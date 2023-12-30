import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs";
import {Perso, PersoApi} from "../perso/types";
import {
  Affix,
  Affixes,
  AffixesApi, Donjon,
  DonjonsApi,
} from "../donjons/types";
import {Activites} from "../activite/types";
import {RaidApi, Raids} from "../raid/types";
import {Item, Items, ItemsApi, Stuff, StuffApi} from "../stuff/types";

@Injectable({
  providedIn: 'root'
})
export class RaiderioService {
  constructor(private http: HttpClient) {
  }

  getCharacterMythicPlusRanks(pseudo: string | null, realm: string | null, region: string | null) {
    return this.http.get<PersoApi>("https://raider.io/api/v1/characters/profile?region=" + region + "&realm=" + realm + "&name=" + pseudo + "&fields=guild%2Cmythic_plus_scores_by_season%3Acurrent")
      .pipe(
        map(response => {
          return {
            pseudo: response.name,
            serveur: response.realm,
            continent: response.region,
            faction: response.faction,
            classe: response.class,
            spe: response.active_spec_name,
            race: response.race,
            avatar: response.thumbnail_url,
            urlRaiderIo: response.profile_url,
            guilde: {
              nom: response.guild.name,
              serveur: response.guild.realm
            },
            rankings: {
              season: response.mythic_plus_scores_by_season[0].season,
              score: {
                all: response.mythic_plus_scores_by_season[0].scores.all,
                dps: response.mythic_plus_scores_by_season[0].scores.dps,
                healer: response.mythic_plus_scores_by_season[0].scores.healer,
                tank: response.mythic_plus_scores_by_season[0].scores.tank
              }
            }
          } as Perso;
        })
      );
  }

  getCharacterMythicPlusBestRuns(pseudo: string | null, realm: string | null, region: string | null) {
    return this.http.get<DonjonsApi>(
      "https://raider.io/api/v1/characters/profile?region=" + region + "&realm=" + realm + "&name=" + pseudo + "&fields=mythic_plus_best_runs"
    ).pipe(
      map(response => {
        return response.mythic_plus_best_runs.map(item => ({
          nom: item.dungeon,
          niveau: item.mythic_level,
          points: item.score,
          temps: item.clear_time_ms,
          upgrade: item.num_keystone_upgrades,
          affixes: this.mapAffixes(item.affixes),
        } as Donjon));
      })
    );
  }

  getCharacterMythicPlusAlternateRuns(pseudo: string | null, realm: string | null, region: string | null) {
    return this.http.get<DonjonsApi>("https://raider.io/api/v1/characters/profile?region=" + region + "&realm=" + realm + "&name=" + pseudo + "&fields=mythic_plus_alternate_runs")
      .pipe(
        map(response => {
          return response.mythic_plus_alternate_runs.map(item => {
            return {
              nom: item.dungeon,
              niveau: item.mythic_level,
              points: item.score,
              temps: item.clear_time_ms,
              upgrade: item.num_keystone_upgrades,
              affixes: this.mapAffixes(item.affixes),
            } as Donjon;
          })
        }));
  }

  getCharacterMythicLastRuns(pseudo: string | null, realm: string | null, region: string | null) {
    return this.http.get<DonjonsApi>("https://raider.io/api/v1/characters/profile?region=" + region + "&realm=" + realm + "&name=" + pseudo + "&fields=mythic_plus_recent_runs")
      .pipe(
        map(response => {
          return {
            pseudo: response.name,
            thumbnail_url: response.thumbnail_url,
            activitesArray: response.mythic_plus_recent_runs.map(item => {
              return {
                date: item.completed_at,
                donjon: item.dungeon,
                niveau: item.mythic_level
              }
            })
          } as Activites;
        })
      );
  }

  getCharacterRaidsProgress(pseudo: string | null, realm: string | null, region: string | null) {
    return this.http.get<RaidApi>("https://raider.io/api/v1/characters/profile?region=" + region + "&realm=" + realm + "&name=" + pseudo + "&fields=raid_progression")
      .pipe(
        map(response => {
          const raids: Raids = [];

          for (const key in response.raid_progression) {
            if (response.raid_progression.hasOwnProperty(key)) {
              const raidDetails = response.raid_progression[key];
              raids.push({
                nom: key,
                boss: raidDetails.total_bosses,
                summary: raidDetails.summary,
                nm: raidDetails.normal_bosses_killed,
                hm: raidDetails.heroic_bosses_killed,
                mm: raidDetails.mythic_bosses_killed
              });
            }
          }

          return raids;
        })
      );
  }

  getCharacterStuffs(pseudo: string | null, realm: string | null, region: string | null) {
    return this.http.get<StuffApi>("https://raider.io/api/v1/characters/profile?region=" + region + "&realm=" + realm + "&name=" + pseudo + "&fields=gear")
      .pipe(
        map(response => {
          return {
            info_equipement: {
              updated_at: response.gear.updated_at,
              item_level_equipped: response.gear.item_level_equipped,
              item_level_total: response.gear.item_level_total
            },
            items: this.mapItems(response.gear.items)
          } as Stuff;
        })
      );
  }

  mapAffixes(apiAffixes: AffixesApi): Affixes {
    return apiAffixes.map(apiAffix => {
      return {
        id: apiAffix.id,
        nom: apiAffix.name || '',
        description: apiAffix.description || '',
        logo: apiAffix.icon || ''
      } as Affix;
    });
  }

  mapItems(apiItems: ItemsApi): Items {
    const itemsArray: Items = [];

    for (const key in apiItems) {
      if (Object.prototype.hasOwnProperty.call(apiItems, key)) {
        const apiItem = apiItems[key];
        const item: Item = {
          emplacement: key,
          name: apiItem.name,
          ilvl: apiItem.item_level,
          icon: apiItem.icon,
          enchant: apiItem.enchant,
          item_id: apiItem.item_id
        };
        itemsArray.push(item);
      }
    }

    return itemsArray;
  }
}
