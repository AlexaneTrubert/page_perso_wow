import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiviteComponent } from './activite.component';
import {Activites} from "./types";
import {DatePipe, registerLocaleData} from "@angular/common";
import {LOCALE_ID} from "@angular/core";
import localeFr from '@angular/common/locales/fr';

const MOCK_ACTIVITES : Activites = {
  pseudo: 'Nenyïm',
  thumbnail_url: "mouh.jpg",
  activitesArray: [{date: "2023-11-18T22:29:29.000Z", donjon: "Malepeste", niveau: 20},{date: "2023-11-18T22:29:29.000Z", donjon: "Malepeste", niveau: 20}]
}

registerLocaleData(localeFr);

describe('ActiviteComponent', () => {
  let component: ActiviteComponent;
  let fixture: ComponentFixture<ActiviteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActiviteComponent],
    });
    TestBed.overrideProvider(LOCALE_ID, { useValue: 'fr-FR' });
    fixture = TestBed.createComponent(ActiviteComponent);
    component = fixture.componentInstance;
    component.activites = MOCK_ACTIVITES;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display 2 activites if 2 activites are in the list', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('.list-activite-item').length).toEqual(2);
  });

  it('should display text if no activites are in the list', () => {
    component.activites = undefined;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.no-activite').textContent).toBe('Aucune activité');
  });

  it('should transform date to d/m/Y format', () => {
    fixture.detectChanges();
    const pipe = new DatePipe('fr-FR');
    const transformedDate = pipe.transform(component.activites?.activitesArray[0].date, 'dd/MM/yyyy');

    expect(transformedDate).toBe('18/11/2023');
  });
});
