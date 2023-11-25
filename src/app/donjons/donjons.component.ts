import {AfterViewInit, Component, OnInit} from '@angular/core';
import {DonjonInfo, Donjons} from "./types";
import {Input} from "@angular/core";

@Component({
  selector: 'app-donjons',
  templateUrl: './donjons.component.html',
  styles: []
})
export class DonjonsComponent {
  @Input()
  donjons: any = [];
}
