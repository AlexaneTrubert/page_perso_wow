import {Component} from '@angular/core';
import {Input} from "@angular/core";

@Component({
  selector: 'app-donjons',
  templateUrl: './donjons.component.html',
  styles: [
    `.text-warning {
      color: #f0ad4e;
    }`
  ]
})
export class DonjonsComponent {
  @Input()
  donjons: any = [];

  getRange(num: number): any[] {
    return Array.from({ length: num });
  }
}
