import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Guildes, Perso} from "../perso/types";
import {Activites} from "../activite/types";
import {RaiderioService} from "../services/raiderio.service";
import {Raids} from "../raid/types";
import {DonjonInfo} from "../donjons/types";
import {Stuff} from "../stuff/types";

@Component({
  selector: 'app-page-perso',
  templateUrl: './page-perso.component.html',
  styleUrls: []
})
export class PagePersoComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private raiderIo: RaiderioService) {
  }

  serveurName: string = this.route.snapshot.params['serveur'];
  persoName: string = this.route.snapshot.params['perso'];
  regionName: string = this.route.snapshot.params['region'];
  title = 'WOWPerso';
  donjons!: DonjonInfo;
  guildes: Guildes = [];
  activites: Activites | undefined;
  perso: Perso | undefined;
  raids: Raids = [];
  bestScoreRaiderIo?: number;
  stuff!: Stuff | null;

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.serveurName = params['serveur'];
      this.persoName = params['perso'];
      this.regionName = params['region'];

      this.fetchData();
    });
  }

  fetchData() {
    this.raiderIo.getCharacterMythicPlusRanks(this.persoName, this.serveurName, this.regionName).subscribe((data: Perso) => {
      this.perso = data;
      if (data.rankings) {
        this.bestScoreRaiderIo = data.rankings.score.all;
      }
      if (data.guilde) {
        this.guildes = [
          {nom: data.guilde.nom, faction: data.faction, serveur: data.guilde.serveur, continent: data.continent}
        ];
      }
    });

    this.raiderIo.getCharacterMythicLastRuns(this.persoName, this.serveurName, this.regionName).subscribe((data: any) => {
      this.activites = data;
    });

    this.raiderIo.getCharacterRaidsProgress(this.persoName, this.serveurName, this.regionName).subscribe((data: any) => {
      this.raids = data;
    });

    this.raiderIo.getCharacterStuffs(this.persoName, this.serveurName, this.regionName).subscribe((data: any) => {
      this.stuff = data;
    });

    this.raiderIo.getCharacterMythicPlusBestRuns(this.persoName, this.serveurName, this.regionName).subscribe(bestRuns => {
      this.raiderIo.getCharacterMythicPlusAlternateRuns(this.persoName, this.serveurName, this.regionName).subscribe(bestAlternateRuns => {
        const allRuns = [...bestRuns, ...bestAlternateRuns];
        const allDonjons = Array.from(new Set(allRuns.map(run => run.nom)));

        const donjonsData: any = []; // Tableau pour stocker les données des donjons

        allDonjons.forEach(donjon => {
          const donjonRuns = allRuns.filter(run => run.nom === donjon);

          const foundFortifiedRun = donjonRuns.find(run => run.affixes.find(affixe => affixe.nom === 'Fortified'));
          const foundTyrannicalRun = donjonRuns.find(run => run.affixes.find(affixe => affixe.nom === 'Tyrannical'));

          // Vérification si les runs fortifiés et tyranniques existent
          if (foundFortifiedRun !== undefined && foundTyrannicalRun !== undefined) {
            const donjonData = {
              name: donjon,
              fortifiedRun: foundFortifiedRun,
              tyranicalRun: foundTyrannicalRun,
              best_run: bestRuns.filter(run => run.nom === donjon),
            };
            donjonsData.push(donjonData);
          } else {
            // Si l'un des types de run est undefined, ajouter l'autre type en tant que best run et initialiser l'autre à un objet vide
            const donjonData = {
              name: donjon,
              fortifiedRun: foundFortifiedRun || { nom: '', affixes: [] },
              tyranicalRun: foundTyrannicalRun || { nom: '', affixes: [] },
              best_run: bestRuns.filter(run => run.nom === donjon),
            };
            donjonsData.push(donjonData);
          }
        });
        this.donjons = donjonsData;
      });
    });
  }
}
