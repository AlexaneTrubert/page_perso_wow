import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PagePersoComponent} from "./page-perso/page-perso.component";

const routes: Routes = [
  {
    path: ':region/:serveur/:perso',
    component: PagePersoComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
