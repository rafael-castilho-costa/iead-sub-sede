import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CommonModule } from '@angular/common';
import { MissaoComponent } from "./missao/missao.component";



const routes : Routes = [
  { path: '', component: MissaoComponent }
];
@NgModule ({

  imports: [
    CommonModule,
    MissaoComponent,
    RouterModule.forChild(routes)
  ]
})

export class MissaoModule { }
