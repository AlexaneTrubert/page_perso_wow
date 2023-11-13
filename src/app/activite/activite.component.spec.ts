import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiviteComponent } from './activite.component';
import {Activites} from "./types";

const MOCK_ACTIVITES : Activites = [
  {pseudo: 'Nenyïm', date: '2020-12-01', donjon: 'Porté liberté', niveau: 1},
  {pseudo: 'Nenyïm', date: '2020-12-01', donjon: 'Salle de l\'imprégnation', niveau: 1},
  {pseudo: 'Nenyïm', date: '2020-12-01', donjon: 'Cime du vortex', niveau: 1},
]

describe('ActiviteComponent', () => {
  let component: ActiviteComponent;
  let fixture: ComponentFixture<ActiviteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActiviteComponent]
    });
    fixture = TestBed.createComponent(ActiviteComponent);
    component = fixture.componentInstance;
    component.activites = MOCK_ACTIVITES;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display 3 activites if 3 activites are in the list', () => {
    expect(fixture.nativeElement.querySelectorAll('.list-activite-item').length).toEqual(3);
  });

  it('should display text if no activites are in the list', () => {
    component.activites = [];
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.no-activite').textContent).toBe('Aucune activité');
  });
});
