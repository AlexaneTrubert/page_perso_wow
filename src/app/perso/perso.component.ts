import {Component, Input} from '@angular/core';
import {Guildes, Perso, Persos} from "./types";

@Component({
  selector: 'app-perso',
  templateUrl: './perso.component.html',
  styles: []
})
export class PersoComponent {
  @Input()
  persos: Persos = [];
  @Input()
  guildes: Guildes = [];
  @Input()
  perso: Perso | undefined;
}
