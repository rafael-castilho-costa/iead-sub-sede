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
  },
  {
    path: 'liderancas',
    loadChildren: () => import('./views/lideranças/liderancas.module').then(m => m.LiderancasModule)
  },
  {
    path: 'historia',
    loadChildren: () => import('./views/historia/historia.module').then(m => m.HistoriaModule)
  },
  {
    path: 'missao',
    loadChildren: () => import('./views/missao/missao.module').then(m => m.MissaoModule)
  }
];

