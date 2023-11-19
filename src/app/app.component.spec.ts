import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RaiderioService } from './services/raiderio.service';
import { ReactiveFormsModule } from '@angular/forms';
import {PersoComponent} from "./perso/perso.component";
import {DonjonsComponent} from "./donjons/donjons.component";
import {ActiviteComponent} from "./activite/activite.component";
import {LogsComponent} from "./logs/logs.component";
import {RouterTestingModule} from "@angular/router/testing";
import {of} from "rxjs";
import {Activites} from "./activite/types";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RaidComponent} from "./raid/raid.component";

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let raiderIoService: RaiderioService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent, PersoComponent, DonjonsComponent, ActiviteComponent, LogsComponent, RaidComponent],
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule],
      providers: [
        { provide: RaiderioService, useClass: RaiderioService }
      ]
    }).compileComponents();

    raiderIoService = TestBed.inject(RaiderioService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should init activites on form submit', () => {
    const MOCK_ACTIVITES: Activites = {
      pseudo: "Nenyïm",
      thumbnail_url: "https://render-eu.worldofwarcraft.com/character/les-sentinelles/1/178617473-avatar.jpg",
      activitesArray: [
        {date: "2021-01-10T21:00:00.000Z", donjon: "The Necrotic Wake", niveau: 10},
        {date: "2021-01-11T21:00:00.000Z", donjon: "Malepeste", niveau: 10},
      ],
    };

    spyOn(raiderIoService, 'getCharacterMythicLastRuns').and.returnValue(of(MOCK_ACTIVITES));

    component.search.controls['name'].setValue('someName');
    component.search.controls['realm'].setValue('someRealm');
    component.search.controls['region'].setValue('someRegion');

    component.onSubmit();

    expect(raiderIoService.getCharacterMythicLastRuns).toHaveBeenCalledWith('someName', 'someRealm', 'someRegion');
    expect(component.activites).toEqual(MOCK_ACTIVITES);
  });

  it('should init perso on form submit', () => {
    const MOCK_PERSO = {
      pseudo: "Nenyïm",
      serveur: "les-sentinelles",
      continent: "eu",
    };

    spyOn(raiderIoService, 'getCharacterMythicPlusRanks').and.returnValue(of(MOCK_PERSO));

    component.search.controls['name'].setValue('someName');
    component.search.controls['realm'].setValue('someRealm');
    component.search.controls['region'].setValue('someRegion');

    component.onSubmit();

    expect(raiderIoService.getCharacterMythicPlusRanks).toHaveBeenCalledWith('someName', 'someRealm', 'someRegion');
    expect(component.perso).toEqual(MOCK_PERSO);
  });

  it('should init donjons on form submit', () => {
    const MOCK_DONJONS = [
      {nom: "Malepeste", niveauFortifie: 10, niveauTyranique: 1, points: 1000, temps: 1000, affixes: [], topMonde: 1, topRegion: 1},
      ];

    spyOn(raiderIoService, 'getCharacterMythicPlusBestRuns').and.returnValue(of(MOCK_DONJONS));

    component.search.controls['name'].setValue('someName');
    component.search.controls['realm'].setValue('someRealm');
    component.search.controls['region'].setValue('someRegion');

    component.onSubmit();

    expect(raiderIoService.getCharacterMythicPlusBestRuns).toHaveBeenCalledWith('someName', 'someRealm', 'someRegion');
    expect(component.donjons).toEqual(MOCK_DONJONS);
  });
});
