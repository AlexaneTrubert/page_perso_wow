import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DonjonsComponent} from './donjons.component';
import {MillisecondeToMinutesPipe} from "./millisecondeToMinutes.pipe";

describe('DonjonsComponent', () => {
  let component: DonjonsComponent;
  let fixture: ComponentFixture<DonjonsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DonjonsComponent, MillisecondeToMinutesPipe]
    });
    fixture = TestBed.createComponent(DonjonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
