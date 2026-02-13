import { Routes } from '@angular/router';
import { SeoData } from './core/seo/seo.types';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./views/home/home.module').then((m) => m.HomeModule),
    data: {
      seo: {
        title: 'IEAD Jardim Todos os Santos em Senador Canedo - GO | Igreja Evangélica',
        description:
          'Igreja Evangélica Assembleia de Deus em Senador Canedo - GO. Veja horários de culto, agenda, contato e informações da IEAD Jardim Todos os Santos.',
        canonicalPath: '/'
      } satisfies SeoData
    }
  },
  {
    path: 'home',
    redirectTo: '',
    pathMatch: 'full'
  },
  {
    path: 'agenda',
    loadChildren: () => import('./views/agenda/agenda.module').then((m) => m.AgendaModule),
    data: {
      seo: {
        title: 'Agenda da IEAD em Senador Canedo - GO | Cultos e Eventos',
        description:
          'Acompanhe a agenda mensal da IEAD Jardim Todos os Santos em Senador Canedo - GO, com cultos, eventos e programações especiais.',
        canonicalPath: '/agenda'
      } satisfies SeoData
    }
  },
  {
    path: 'contato',
    loadChildren: () => import('./views/contato/contato.module').then((m) => m.ContatoModule),
    data: {
      seo: {
        title: 'Contato da IEAD Jardim Todos os Santos | Senador Canedo - GO',
        description:
          'Entre em contato com a IEAD Jardim Todos os Santos em Senador Canedo - GO. Endereço, WhatsApp, telefone e localização no mapa.',
        canonicalPath: '/contato',
        structuredData: {
          '@context': 'https://schema.org',
          '@type': 'Church',
          name: 'IEAD Jardim Todos os Santos',
          url: 'https://ieadsubsede.org.br',
          telephone: '+55 62 99999-9999',
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Rua Vereador Jose Eduardo, Qd 8b, Lote 01 - Jardim Todos os Santos',
            addressLocality: 'Senador Canedo',
            addressRegion: 'GO',
            addressCountry: 'BR'
          },
          openingHoursSpecification: [
            {
              '@type': 'OpeningHoursSpecification',
              dayOfWeek: 'Wednesday',
              opens: '19:30',
              closes: '21:00'
            },
            {
              '@type': 'OpeningHoursSpecification',
              dayOfWeek: 'Friday',
              opens: '19:30',
              closes: '21:00'
            },
            {
              '@type': 'OpeningHoursSpecification',
              dayOfWeek: 'Sunday',
              opens: '08:30',
              closes: '10:00'
            },
            {
              '@type': 'OpeningHoursSpecification',
              dayOfWeek: 'Sunday',
              opens: '18:30',
              closes: '20:30'
            }
          ],
          sameAs: ['https://instagram.com']
        }
      } satisfies SeoData
    }
  },
  {
    path: 'contribuicao',
    loadChildren: () => import('./views/contribuicao/contribuicao.module').then((m) => m.ContribuicaoModule),
    data: {
      seo: {
        title: 'Contribuição | IEAD Jardim Todos os Santos',
        description:
          'Contribua com a obra da IEAD Jardim Todos os Santos em Senador Canedo - GO de forma simples e segura.',
        canonicalPath: '/contribuicao'
      } satisfies SeoData
    }
  },
  {
    path: 'ministerios',
    loadChildren: () => import('./views/ministerios/ministerios.module').then((m) => m.MinisteriosModule),
    data: {
      seo: {
        title: 'Ministérios da IEAD Jardim Todos os Santos',
        description:
          'Conheça os ministérios da IEAD Jardim Todos os Santos em Senador Canedo - GO e participe das atividades da igreja.',
        canonicalPath: '/ministerios'
      } satisfies SeoData
    }
  },
  {
    path: 'liderancas',
    loadChildren: () => import('./views/liderancas/liderancas.module').then((m) => m.LiderancasModule),
    data: {
      seo: {
        title: 'Lideranças | IEAD Jardim Todos os Santos',
        description:
          'Conheça a liderança pastoral da IEAD Jardim Todos os Santos em Senador Canedo - GO.',
        canonicalPath: '/liderancas'
      } satisfies SeoData
    }
  },
  {
    path: 'historia',
    loadChildren: () => import('./views/historia/historia.module').then((m) => m.HistoriaModule),
    data: {
      seo: {
        title: 'História da IEAD Jardim Todos os Santos',
        description:
          'Conheça a história da IEAD Jardim Todos os Santos e a caminhada da igreja em Senador Canedo - GO.',
        canonicalPath: '/historia'
      } satisfies SeoData
    }
  },
  {
    path: 'missao',
    loadChildren: () => import('./views/missao/missao.module').then((m) => m.MissaoModule),
    data: {
      seo: {
        title: 'Missão e Valores | IEAD Jardim Todos os Santos',
        description:
          'Veja a missão, os valores e os princípios da IEAD Jardim Todos os Santos em Senador Canedo - GO.',
        canonicalPath: '/missao'
      } satisfies SeoData
    }
  },
  {
    path: 'reforma',
    loadComponent: () => import('./views/reforma/reforma.component').then((m) => m.ReformaComponent),
    data: {
      seo: {
        title: 'Reforma da Igreja | IEAD Jardim Todos os Santos',
        description:
          'Acompanhe a reforma da IEAD Jardim Todos os Santos em Senador Canedo - GO e saiba como contribuir.',
        canonicalPath: '/reforma'
      } satisfies SeoData
    }
  },
  {
    path: 'igreja-evangelica-em-senador-canedo',
    loadComponent: () =>
      import('./views/seo-local/local-seo-page.component').then((m) => m.LocalSeoPageComponent),
    data: {
      seo: {
        title: 'Igreja Evangélica em Senador Canedo - GO | IEAD Jardim Todos os Santos',
        description:
          'Procura uma igreja evangélica em Senador Canedo - GO? Conheça a IEAD Jardim Todos os Santos, horários de culto e localização.',
        canonicalPath: '/igreja-evangelica-em-senador-canedo'
      } satisfies SeoData,
      localPage: {
        heading: 'Igreja Evangélica em Senador Canedo - GO',
        intro:
          'A IEAD Jardim Todos os Santos é uma igreja evangélica em Senador Canedo - GO, com foco em ensino bíblico, comunhão e acolhimento familiar.',
        sections: [
          {
            title: 'Um lugar para toda a família',
            content:
              'Nossa igreja recebe crianças, adolescentes, jovens, adultos e idosos com programação regular durante a semana e aos domingos.'
          },
          {
            title: 'Cultos e atividades',
            content:
              'Realizamos cultos de ensino, oração, escola bíblica e cultos da família com mensagens fundamentadas na Palavra de Deus.'
          }
        ]
      }
    }
  },
  {
    path: 'assembleia-de-deus-em-senador-canedo',
    loadComponent: () =>
      import('./views/seo-local/local-seo-page.component').then((m) => m.LocalSeoPageComponent),
    data: {
      seo: {
        title: 'Assembleia de Deus em Senador Canedo - GO | IEAD Jardim Todos os Santos',
        description:
          'Conheça a Assembleia de Deus IEAD Jardim Todos os Santos em Senador Canedo - GO. Veja endereço, horários e agenda da igreja.',
        canonicalPath: '/assembleia-de-deus-em-senador-canedo'
      } satisfies SeoData,
      localPage: {
        heading: 'Assembleia de Deus em Senador Canedo - GO',
        intro:
          'A IEAD Jardim Todos os Santos integra a história da Assembleia de Deus em Senador Canedo - GO, com compromisso com discipulado e evangelização.',
        sections: [
          {
            title: 'Tradição pentecostal e ensino bíblico',
            content:
              'Valorizamos a doutrina bíblica, a oração e a vida cristã prática, com ambiente de comunhão e serviço.'
          },
          {
            title: 'Participação da comunidade',
            content:
              'Além dos cultos, a igreja promove atividades ministeriais e eventos que fortalecem vínculos entre membros e visitantes.'
          }
        ]
      }
    }
  },
  {
    path: 'horarios-de-culto-em-senador-canedo',
    loadComponent: () =>
      import('./views/seo-local/local-seo-page.component').then((m) => m.LocalSeoPageComponent),
    data: {
      seo: {
        title: 'Horários de Culto em Senador Canedo - GO | IEAD Jardim Todos os Santos',
        description:
          'Veja os horários de culto da IEAD Jardim Todos os Santos em Senador Canedo - GO e programe sua visita.',
        canonicalPath: '/horarios-de-culto-em-senador-canedo'
      } satisfies SeoData,
      localPage: {
        heading: 'Horários de Culto em Senador Canedo - GO',
        intro:
          'Se você busca horários de culto em Senador Canedo - GO, confira a programação da IEAD Jardim Todos os Santos.',
        sections: [
          {
            title: 'Programação regular',
            content:
              'Quarta-feira e sexta-feira às 19h30, domingo às 08h30 (EBD) e 18h30 (Culto da Família).'
          },
          {
            title: 'Como visitar',
            content:
              'Nossa igreja está no Jardim Todos os Santos. Você pode entrar em contato por WhatsApp e obter rotas pelo Google Maps.'
          }
        ]
      }
    }
  },
  {
    path: 'congresso-umadmego-senador-canedo',
    loadComponent: () =>
      import('./views/seo-local/local-seo-page.component').then((m) => m.LocalSeoPageComponent),
    data: {
      seo: {
        title: 'Congresso UMADMEGO em Senador Canedo - GO | IEAD Jardim Todos os Santos',
        description:
          'Acompanhe informações sobre congresso UMADMEGO em Senador Canedo - GO na IEAD Jardim Todos os Santos.',
        canonicalPath: '/congresso-umadmego-senador-canedo'
      } satisfies SeoData,
      localPage: {
        heading: 'Congresso UMADMEGO em Senador Canedo - GO',
        intro:
          'A IEAD Jardim Todos os Santos apoia e divulga a programação de eventos e congressos do calendário local, incluindo o congresso UMADMEGO em Senador Canedo - GO.',
        sections: [
          {
            title: 'Programação e participação',
            content:
              'As datas e detalhes são divulgados nos canais oficiais da igreja e na agenda de eventos para facilitar a participação da juventude e da comunidade.'
          },
          {
            title: 'Atualizações frequentes',
            content:
              'Mantenha-se atento às publicações para conferir preletores, horários e informações logísticas dos congressos.'
          }
        ]
      }
    }
  },
  {
    path: 'atualizacoes',
    loadComponent: () =>
      import('./views/atualizacoes/atualizacoes.component').then((m) => m.AtualizacoesComponent),
    data: {
      seo: {
        title: 'Atualizações da Igreja | Mensagens, Eventos e Programações',
        description:
          'Acompanhe resumos de mensagens, fotos de cultos e eventos e programações futuras da IEAD Jardim Todos os Santos.',
        canonicalPath: '/atualizacoes'
      } satisfies SeoData
    }
  }
];
