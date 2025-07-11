
import { NgModule } from "@angular/core";
import { HomeComponent } from "./home/home.component";
import { RouterModule, Routes } from "@angular/router";
import { AgendaComponent } from "../agenda/agenda/agenda.component";

  const routes:Routes = [

        {
          path:'',
          component: HomeComponent,
        }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule { }
