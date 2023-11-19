import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Donjons} from "../donjons/types";
import {Guildes, Perso, Persos} from "../perso/types";
import {Logs} from "../logs/types";
import {Activites} from "../activite/types";
import {RaiderioService} from "../services/raiderio.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

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
  donjons: Donjons = [];
  persos: Persos = [];
  guildes: Guildes = [];
  logs: Logs = [];
  activites: Activites | undefined;
  perso: Perso | undefined;
  raids = [];


  search = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    region: new FormControl('eu', [Validators.required]),
    realm: new FormControl('les-sentinelles', [Validators.required])
  });

  get name() {
    return this.search.controls.name;
  }

  get realm() {
    return this.search.controls.realm;
  }

  get region() {
    return this.search.controls.region;
  }

  ngOnInit() {
    this.raiderIo.getCharacterMythicPlusRanks(this.persoName, this.serveurName,this.regionName).subscribe((data: Perso) => {
      this.perso = data;
      if (data.guilde) {
        this.guildes = [
          {nom: data.guilde.nom, faction: data.faction, serveur: data.guilde.serveur, continent: data.continent}
        ];
      }
    });
    this.raiderIo.getCharacterMythicPlusBestRuns(this.persoName, this.serveurName, this.regionName).subscribe((data: Donjons) => {
      this.donjons = data;
    });
    this.raiderIo.getCharacterMythicLastRuns(this.persoName, this.serveurName, this.regionName).subscribe((data: any) => {
      this.activites = data;
    });
    this.raiderIo.getCharacterRaidsProgress(this.persoName, this.serveurName, this.regionName).subscribe((data: any) => {
      this.raids = data;
    });
  }
}
