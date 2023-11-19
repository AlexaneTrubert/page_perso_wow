import {Component} from '@angular/core';
import {Donjons} from "./types";
import {Input} from "@angular/core";

@Component({
  selector: 'app-donjons',
  templateUrl: './donjons.component.html',
  styles: []
})
export class DonjonsComponent {
  @Input()
  donjons: Donjons = [];

}
