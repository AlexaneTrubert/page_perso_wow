import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Donjons} from "./donjons/types";
import {Guilde, Guildes, Perso, Persos} from "./perso/types";
import {Logs} from "./logs/types";
import {Activites} from "./activite/types";
import {RaiderioService} from "./services/raiderio.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent {
  title = 'WOWPerso';
  donjons: Donjons = [];
  persos: Persos = [];
  guildes: Guildes = [];
  logs: Logs = [];
  activites: Activites | undefined;
  perso: Perso | undefined;
  raids = [];

  constructor(private raiderIo: RaiderioService) {
  }

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

  onSubmit() {
    this.raiderIo.getCharacterMythicPlusRanks(this.name.value, this.realm.value, this.region.value).subscribe((data: Perso) => {
      this.perso = data;
      if(data.guilde) {
        this.guildes = [
          {nom: data.guilde.nom, faction: data.faction, serveur: data.guilde.serveur, continent: data.continent}
        ];
      }
    });
    this.raiderIo.getCharacterMythicPlusBestRuns(this.name.value, this.realm.value, this.region.value).subscribe((data: Donjons) => {
      this.donjons = data;
    });
    this.raiderIo.getCharacterMythicLastRuns(this.name.value, this.realm.value, this.region.value).subscribe((data: any) => {
      this.activites = data;
    });
    this.raiderIo.getCharacterRaidsProgress(this.name.value, this.realm.value, this.region.value).subscribe((data: any) => {
      this.raids = data;
    });
  }
}
