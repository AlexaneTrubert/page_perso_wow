import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonjonsComponent } from './donjons.component';

const MOCK_AFFIXES = [
  {nom: 'Sanguin'},
  {nom: 'Explosif'},
  {nom: 'Fortifié'},
  ];

const MOCK_DONJONS = [
    {nom: 'Profondeurs Sanguines', niveauTyranique: 20, niveauFortifie: 20, points: 360, temps: '24min 30s', affixes: MOCK_AFFIXES, topMonde: 1, topRegion: 1},
    {nom: 'Malpeste', niveauTyranique: 20, niveauFortifie: 20, points: 360, temps: '24min 30s', affixes: MOCK_AFFIXES, topMonde: 1, topRegion: 1},
    {nom: 'Port-liberté', niveauTyranique: 20, niveauFortifie: 20, points: 360, temps: '24min 30s', affixes: MOCK_AFFIXES, topMonde: 1, topRegion: 1},
  ];

describe('DonjonsComponent', () => {
  let component: DonjonsComponent;
  let fixture: ComponentFixture<DonjonsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DonjonsComponent]
    });
    fixture = TestBed.createComponent(DonjonsComponent);
    component = fixture.componentInstance;
    component.affixes = MOCK_AFFIXES;
    component.donjons = MOCK_DONJONS;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display multiple row on table if dungeon is not null', () => {
    expect(fixture.nativeElement.querySelectorAll('.donjon-row').length).toBe(3);
  });

  it('should display text if no dungeon is available', () => {
    component.donjons = [];
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.no-donjon').textContent).toBe('Aucun donjon disponible');
  });

  it('should display 3 affix on row', () => {
    expect(fixture.nativeElement.querySelectorAll('.donjon-row')[0].querySelectorAll('.list-affix').length).toBe(3);
  });
});
