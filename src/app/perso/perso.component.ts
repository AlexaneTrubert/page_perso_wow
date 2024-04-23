import {Component, Input, OnInit} from '@angular/core';
import {Guildes, Perso, Persos} from "./types";

@Component({
  selector: 'app-perso',
  templateUrl: './perso.component.html',
  styles: []
})
export class PersoComponent implements OnInit{
  @Input()
  persos: Persos = [];
  @Input()
  guildes: Guildes = [];
  @Input()
  perso: Perso | undefined;
  hidden = "hidden";

  private affixesTurn = [
    [9, 134, 11],
    [10, 3, 123],
    [9, 124, 6],
    [10, 134, 7],
    [9, 136, 123],
    [10, 135, 6],
    [9, 3, 8],
    [10, 124, 11],
    [9, 135, 7],
    [10, 136, 8],
  ];

  affixes: number[] = [];
  private EU_DELAY: number = 0;
  private EU_START_WEEK: number = 1670385600;
  private weekNumber: number = 0;

  constructor() {
    this.weekNumber = this.getCurrentWeekNumber();
  }
  ngOnInit(): void {
    this.affixes = this.getAffixesForThisWeek();
  }

  toggleMenu() {
    this.hidden = this.hidden === "" ? "hidden" : "";
  }

  getCurrentWeekNumber() {
    const now = new Date();
    const nowSeconds = now.getTime() / 1000;
    this.weekNumber = Math.floor((nowSeconds - this.EU_START_WEEK) / 604800);
    return this.weekNumber;
  }

  getAffixesForThisWeek(): number[] {
    const week = this.weekNumber % 10;
    return this.affixesTurn[week];
  }
}
