import {Component} from '@angular/core';
import {Affixes, Donjons} from "./types";

@Component({
  selector: 'app-donjons',
  templateUrl: './donjons.component.html',
  styles: []
})
export class DonjonsComponent {
  affixes: Affixes = [];
  donjons: Donjons = [];
}
