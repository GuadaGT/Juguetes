import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {JugueteListComponent} from "./components/juguete-list/juguete-list.component";

const routes: Routes = [
  {path: '', pathMatch: 'full', component: JugueteListComponent},
  {path: 'juguetes', redirectTo: ''},
  {path: '**', redirectTo: '/juguetes', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
