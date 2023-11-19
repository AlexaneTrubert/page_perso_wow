import {Component, Input} from '@angular/core';
import {Activites} from "./types";

@Component({
  selector: 'app-activite',
  templateUrl: './activite.component.html',
  styles: []
})
export class ActiviteComponent {
  @Input()
  activites: Activites | undefined;


}
