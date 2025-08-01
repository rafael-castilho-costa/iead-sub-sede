import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CommonModule } from '@angular/common';
import { HistoriaComponent } from "./historia/historia.component";



const routes : Routes = [
  { path: '', component: HistoriaComponent }
];
@NgModule ({

  imports: [
    CommonModule,
    HistoriaComponent,
    RouterModule.forChild(routes)
  ]
})

export class HistoriaModule { }
