import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import {PersoComponent} from "./perso/perso.component";

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule
      ],
      declarations: [
        AppComponent,
        PersoComponent
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should navigate to correct URL on form submission', () => {
    spyOn(router, 'navigate').and.stub(); // Spy on router navigate method

    const name = 'PlayerName';
    const region = 'EU';
    const realm = 'RealmName';

    component.search.patchValue({
      name: name,
      region: region,
      realm: realm
    });

    const form = fixture.nativeElement.querySelector('form');
    form.dispatchEvent(new Event('submit'));

    fixture.detectChanges();

    expect(router.navigate).toHaveBeenCalledWith([region, realm, name]);
  });
});
