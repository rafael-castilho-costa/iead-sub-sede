import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./views/home/home.module').then(m => m.HomeModule)
  },
  {
    path:'agenda',
    loadChildren: () => import('./views/agenda/agenda.module').then(m => m.AgendaModule)
  },
  {
    path: 'contato',
    loadChildren: () => import('./views/contato/contato.module').then(m => m.ContatoModule)
  },
  {
    path: 'contribuicao',
    loadChildren: () => import('./views/contribuicao/contribuicao.module').then(m => m.ContribuicaoModule)
  },
  {
    path: 'ministerios',
    loadChildren: () => import('./views/ministerios/ministerios.module').then(m => m.MinisteriosModule)
  }

];

