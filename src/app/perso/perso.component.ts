import {Component} from '@angular/core';
import {Guildes, Persos} from "./types";

@Component({
  selector: 'app-perso',
  templateUrl: './perso.component.html',
  styles: []
})
export class PersoComponent {
  persos: Persos = [];

  guildes: Guildes = [];
}
