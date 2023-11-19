import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {PersoComponent} from './perso/perso.component';
import {ActiviteComponent} from './activite/activite.component';
import {DonjonsComponent} from './donjons/donjons.component';
import {LogsComponent} from './logs/logs.component';
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { RaidComponent } from './raid/raid.component';
import { PagePersoComponent } from './page-perso/page-perso.component';

@NgModule({
  declarations: [
    AppComponent,
    PersoComponent,
    ActiviteComponent,
    DonjonsComponent,
    LogsComponent,
    RaidComponent,
    PagePersoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
