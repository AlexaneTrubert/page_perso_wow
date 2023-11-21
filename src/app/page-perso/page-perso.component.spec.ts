import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {PagePersoComponent} from './page-perso.component';
import {PersoComponent} from "../perso/perso.component";
import {DonjonsComponent} from "../donjons/donjons.component";
import {ActiviteComponent} from "../activite/activite.component";
import {LogsComponent} from "../logs/logs.component";
import {RaidComponent} from "../raid/raid.component";
import {ReactiveFormsModule} from "@angular/forms";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RaiderioService} from "../services/raiderio.service";
import {RemplaceTiretPipe} from "./remplaceTiret.pipe";
import {of} from "rxjs";
import {Affixes} from "../donjons/types";
import {data} from "autoprefixer";

describe('PagePersoComponent', () => {
  let component: PagePersoComponent;
  let fixture: ComponentFixture<PagePersoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PagePersoComponent, PersoComponent, DonjonsComponent, ActiviteComponent, LogsComponent, RaidComponent, RemplaceTiretPipe],
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule],
      providers: [RaiderioService]
    }).compileComponents();
    fixture = TestBed.createComponent(PagePersoComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show raids when you go on page', () => {
    const MOCK_RAIDS_PROGRESS_DATA = [{
      "nom": "mouh",
      "boss": 5,
      "summary": "mouh",
      "nm": 5,
      "hm": 5,
      "mm": 5,
    },
    {
      "nom": "mouh",
      "boss": 5,
      "summary": "mouh",
      "nm": 5,
      "hm": 5,
      "mm": 5,
    }];
    spyOn(TestBed.inject(RaiderioService), 'getCharacterRaidsProgress').and.returnValue(of(MOCK_RAIDS_PROGRESS_DATA));
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('app-raid')).toBeDefined();
  });

  it('should show activities when you go on page', () => {
    const MOCK_ACTIVITIES_DATA = {
      "pseudo": "mouh",
      "thumbnail_url": "mouh",
      "activitesArray": [{
        "date": "2023-11-20T21:39:45.000Z",
        "donjon": "mouh",
        "niveau": 5
      },
      {
        "date": "2023-11-20T21:39:45.000Z",
        "donjon": "mouh",
        "niveau": 5
      }]
    };
    spyOn(TestBed.inject(RaiderioService), 'getCharacterMythicLastRuns').and.returnValue(of(MOCK_ACTIVITIES_DATA));
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('app-activite')).toBeDefined();
  });

  it('should show best runs when you go on page', () => {
    const MOCK_BEST_RUNS_DATA = [{
      "nom": "mouh",
      "niveauFortifie": 20,
      "niveauTyranique": 20,
      "points": 360,
      "temps": 145879654,
      "affixes": [{"logo": "Sanguine.png", "nom": "Sanguine", "description": "mouh"},
        {"logo": "Sanguine.png", "nom": "Sanguine", "description": "mouh"},],
    }];

    spyOn(TestBed.inject(RaiderioService), 'getCharacterMythicPlusBestRuns').and.returnValue(of(MOCK_BEST_RUNS_DATA));
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('app-donjons')).toBeDefined();
  });

  it('should set guildes array if data.guilde is defined', fakeAsync(() => {
    const mockPerso = {
      guilde: {
        nom: 'NomDeLaGuilde',
        serveur: 'ServeurDeLaGuilde'
      },
      pseudo: 'mouh',
      serveur: "hyjal",
      continent: 'Continent'
    };

    spyOn(TestBed.inject(RaiderioService), 'getCharacterMythicPlusRanks').and.returnValue(of(mockPerso)); // Mock response

    component.fetchData();

    tick();

    expect(component.guildes).toBeDefined();
    expect(component.guildes.length).toBe(1);
    expect(component.guildes[0].nom).toBe('NomDeLaGuilde');
    expect(component.guildes[0].serveur).toBe('ServeurDeLaGuilde');
  }));

  it('should not set guildes array if data.guilde is undefined', fakeAsync(() => {
    const mockPerso = {
      pseudo: 'mouh',
      serveur: "hujal",
      continent: 'Continent',
      guilde: undefined
    };

    spyOn(TestBed.inject(RaiderioService), 'getCharacterMythicPlusRanks').and.returnValue(of(mockPerso)); // Mock response

    component.fetchData();

    tick();

    expect(component.guildes).toEqual([]);
  }));
});
