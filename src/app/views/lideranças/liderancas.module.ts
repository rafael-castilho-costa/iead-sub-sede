import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CommonModule } from '@angular/common';
import { LiderancasComponent } from "./liderancas/liderancas.component";


const routes : Routes = [
  { path: '', component: LiderancasComponent }
];
@NgModule ({

  imports: [
    CommonModule,
    LiderancasComponent,
    RouterModule.forChild(routes)
  ]
})

export class LiderancasModule { }
