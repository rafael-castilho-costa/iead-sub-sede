import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AgendaComponent } from "./agenda/agenda.component";
import { CommonModule } from '@angular/common';

const routes : Routes = [
  { path: '', component: AgendaComponent }
];
@NgModule ({

  imports: [
    CommonModule,
    AgendaComponent,
    RouterModule.forChild(routes)
  ]
})

export class AgendaModule { }
