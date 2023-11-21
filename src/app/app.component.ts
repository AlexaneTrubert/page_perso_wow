import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Donjons} from "./donjons/types";
import {Guilde, Guildes, Perso, Persos} from "./perso/types";
import {Logs} from "./logs/types";
import {Activites} from "./activite/types";
import {RaiderioService} from "./services/raiderio.service";
import {Router} from "@angular/router";

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

  constructor(private router: Router) {
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
    const name = this.name.value
    const region = this.region.value;
    const realm = this.realm.value;

    this.router.navigate([region, realm, name]);
  }
}
