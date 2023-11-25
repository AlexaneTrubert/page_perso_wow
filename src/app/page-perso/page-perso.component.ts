import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {DonjonInfo, DonjonRun, Donjons} from "../donjons/types";
import {Guildes, Perso, Persos} from "../perso/types";
import {Logs} from "../logs/types";
import {Activites} from "../activite/types";
import {RaiderioService} from "../services/raiderio.service";

@Component({
  selector: 'app-page-perso',
  templateUrl: './page-perso.component.html',
  styleUrls: []
})
export class PagePersoComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private router: Router,
              private raiderIo: RaiderioService) {
  }

  serveurName: string = this.route.snapshot.params['serveur'];
  persoName: string = this.route.snapshot.params['perso'];
  regionName: string = this.route.snapshot.params['region'];
  title = 'WOWPerso';
  donjons: any = [];
  guildes: Guildes = [];
  logs: Logs = [];
  activites: Activites | undefined;
  perso: Perso | undefined;
  raids = [];

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

    this.raiderIo.getCharacterMythicPlusBestRuns(this.persoName, this.serveurName, this.regionName).subscribe(bestRuns => {
      this.raiderIo.getCharacterMythicPlusAlternateRuns(this.persoName, this.serveurName, this.regionName).subscribe(bestAlternateRuns => {
        const allRuns = [...bestRuns, ...bestAlternateRuns];
        const allDonjons = Array.from(new Set(allRuns.map(run => run.name)));

        const donjonsData : any = []; // Tableau pour stocker les données des donjons

        allDonjons.forEach(donjon => {
          const donjonRuns = allRuns.filter(run => run.name === donjon);

          const foundFortifiedRun = donjonRuns.find(run => run.affixes.find(affixe => affixe.nom === 'Fortified'));
          const foundTyrannicalRun = donjonRuns.find(run => run.affixes.find(affixe => affixe.nom === 'Tyrannical'));

          if (foundFortifiedRun !== undefined && foundTyrannicalRun !== undefined) {
            const donjonData = {
              name: donjon,
              fortifiedRun: foundFortifiedRun,
              tyranicalRun: foundTyrannicalRun,
              best_run: bestRuns.filter(run => run.name === donjon),
            };
            donjonsData.push(donjonData);
          }
        });
        this.donjons = donjonsData;
        console.log(this.donjons);
      });
    });
  }
}
