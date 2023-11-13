import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LogsComponent} from './logs.component';
import {Logs} from "./types";

const MOCK_LOGS = [
  {nom: 'Dernier raid légion', date: '2017-08-30'},
  {nom: 'Donjon 20', date: '2017-08-30'},
  {nom: 'Donjon 20', date: '2017-08-30'},
];

describe('LogsComponent', () => {
  let component: LogsComponent;
  let fixture: ComponentFixture<LogsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LogsComponent]
    });
    fixture = TestBed.createComponent(LogsComponent);
    component = fixture.componentInstance;
    component.logs = MOCK_LOGS;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display ligne of logs when logs is defined and not null', () => {
    expect(fixture.nativeElement.querySelectorAll('.list-logs-item').length).toBe(3);
  });

  it('should display text when no logs is defined', () => {
    component.logs = [];
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.no-logs').textContent).toBe('Aucun log pour le moment');
  });
});
