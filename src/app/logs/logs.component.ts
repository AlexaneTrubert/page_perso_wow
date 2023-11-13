import { Component } from '@angular/core';
import {Logs} from "./types";

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styles: []
})
export class LogsComponent {
  logs: Logs = [];
}
