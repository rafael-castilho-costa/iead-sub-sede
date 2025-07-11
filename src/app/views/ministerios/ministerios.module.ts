import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { CommonModule } from '@angular/common';
import { MinisteriosComponent } from "./ministerios/ministerios.component";

const routes : Routes = [
  { path: '', component: MinisteriosComponent }
];
@NgModule ({

  imports: [
    CommonModule,
    MinisteriosComponent,
    RouterModule.forChild(routes)
  ]
})

export class MinisteriosModule { }

