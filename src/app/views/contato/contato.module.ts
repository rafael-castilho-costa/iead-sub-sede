import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { CommonModule } from '@angular/common';
import { ContatoComponent } from "./contato/contato.component";

const routes : Routes = [
  { path: '', component: ContatoComponent }
];
@NgModule ({

  imports: [
    CommonModule,
    ContatoComponent,
    RouterModule.forChild(routes)
  ]
})

export class ContatoModule { }
