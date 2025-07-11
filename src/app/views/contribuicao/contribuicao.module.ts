import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { CommonModule } from '@angular/common';
import { ContribuicaoComponent } from "./contribuicao/contribuicao.component";

const routes : Routes = [
  { path: '', component: ContribuicaoComponent }
];
@NgModule ({

  imports: [
    CommonModule,
    ContribuicaoComponent,
    RouterModule.forChild(routes)
  ]
})

export class ContribuicaoModule { }
