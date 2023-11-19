import {Component, Input} from '@angular/core';
import {Raids} from "./types";

@Component({
  selector: 'app-raid',
  templateUrl: './raid.component.html',
  styles: []
})
export class RaidComponent {
  @Input()
  raids: Raids = [];
}
