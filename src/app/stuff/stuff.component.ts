import {Component, Input} from '@angular/core';
import {Stuff} from "./types";

@Component({
  selector: 'app-stuff',
  templateUrl: './stuff.component.html',
  styles: []
})
export class StuffComponent{
  @Input() stuff: Stuff | null = null;

}
