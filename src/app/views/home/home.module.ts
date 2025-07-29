import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { HomeRoutingModule } from './home-routing.module';
import { RouterModule } from '@angular/router';




@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    RouterModule,
    HomeComponent,
  ],
  exports: [
    HomeComponent
  ],
})
export class HomeModule { }
