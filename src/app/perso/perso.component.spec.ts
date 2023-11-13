import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersoComponent } from './perso.component';
import {Guildes, Persos} from "./types";
const MOCK_PERSOS: Persos = [
  {pseudo: 'Nenyïm', serveur: 'Les sentinelles', continent: 'EU', lvl: 70, ilvl: 344, classe: 'Paladin', spe: 'Sacré', faction: 'Horde'},
  {pseudo: 'Almariel', serveur: 'Les sentinelles', continent: 'EU', lvl: 70, ilvl: 334, classe: 'Mage', spe: 'Feu', faction: 'Horde'},
];

const MOCK_GUILDES: Guildes = [
  {nom: 'Légion obscure', faction: 'Horde', serveur: 'Les sentinelles', continent: 'EU'},
  {nom: 'Guilde 2', faction: 'Horde', serveur: 'Les sentinelles', continent: 'EU'},
];

describe('PersoComponent', () => {
  let component: PersoComponent;
  let fixture: ComponentFixture<PersoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PersoComponent]
    });
    fixture = TestBed.createComponent(PersoComponent);
    component = fixture.componentInstance;
    component.persos = MOCK_PERSOS;
    component.guildes = MOCK_GUILDES;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display multiple perso if there are multiple perso', () => {
    expect(fixture.nativeElement.querySelectorAll('.list-perso-item').length).toBe(2);
  });

  it('should display text when perso is empty', () => {
    component.persos = [];
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('.no-perso')).toBeDefined();
  });

  it('should display guild if guild is defined', () => {
    expect(fixture.nativeElement.querySelectorAll('.list-guilde-item').length).toBe(2);
  });

  it('should display text when guild is empty', () => {
    component.guildes = [];
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('.no-guilde')).toBeDefined();
  });
});
