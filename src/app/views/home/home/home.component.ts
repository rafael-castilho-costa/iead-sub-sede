import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, HostListener, Inject, OnDestroy, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { AniversarianteItem, HomeAniversariantesService } from './home-aniversariantes.service';

Swiper.use([Navigation, Pagination, Autoplay]);

interface Ministerio {
  titulo: string;
  subtitulo: string;
  culto: string;
}

interface AgendaItem {
  dia: string;
  hora: string;
  evento: string;
}

interface AniversarianteDaSemana extends AniversarianteItem {
  diasRelativos: number;
  ordemSemana: number;
  labelData: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  slideAtual = 0;
  intervalId: ReturnType<typeof setInterval> | null = null;
  agendaIndex = 0;
  isAgendaMobile = false;

  aniversariantesSemana: AniversarianteDaSemana[] = [];
  loadingAniversariantes = false;
  aniversariantesCarregados = false;
  erroAniversariantes = '';

  ministerios: Ministerio[] = [
    {
      titulo: 'Ovelhas de Jesus',
      subtitulo: 'Crianças',
      culto: 'Todo Domingo às 18h30'
    },
    {
      titulo: 'Conjunto Ágape',
      subtitulo: 'Adolescentes',
      culto: 'Toda primeira Sexta-Feira do Mês às 19h30'
    },
    {
      titulo: 'Mocidade Voz Celestial',
      subtitulo: 'Jovens',
      culto: 'Toda segunda Sexta-Feira do Mês às 19h30'
    },
    {
      titulo: 'Rosa de Saron',
      subtitulo: 'Mulheres',
      culto: 'Toda terceira Sexta-Feira do Mês às 19h30'
    },
    {
      titulo: 'Guerreiros de Sião',
      subtitulo: 'Homens',
      culto: 'Toda última Sexta-Feira do Mês às 19h30'
    },
    {
      titulo: 'Escola Bíblica Dominical',
      subtitulo: 'Todos os Membros',
      culto: 'Todo Domingo às 8h30'
    }
  ];

  agendaSemanal: AgendaItem[] = [
    {
      dia: '1° Sábado do Mês',
      hora: '18h30',
      evento: 'Santa Ceia do Senhor'
    },
    {
      dia: 'Quarta-feira',
      hora: '19h30',
      evento: 'Culto de Ensino'
    },
    {
      dia: 'Sexta-feira',
      hora: '19h30',
      evento: 'Culto de Departamentos'
    },
    {
      dia: 'Domingo pela manhã',
      hora: '08h30',
      evento: 'Escola Bíblica Dominical'
    },
    {
      dia: 'Domingo à noite',
      hora: '18h30',
      evento: 'Culto da Família'
    }
  ];

  visibleCards = 4;
  startIndex = 0;

  imagens: string[] = [
    'assets/reforma/reforma-externa-durante1.jpeg',
    'assets/reforma/reforma-externa-durante2.jpeg',
    'assets/reforma/reforma-externa-durante3.jpg',
    'assets/reforma/reforma-externa-durante4.jpeg',
    'assets/reforma/reforma-externa-durante5.jpeg',
    'assets/reforma/reforma-externa-durante6.jpeg',
    'assets/reforma/reforma-externa-durante7.jpeg'
  ];

  private readonly destroy$ = new Subject<void>();
  private readonly aniversariantesService = inject(HomeAniversariantesService);

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.updateVisibleCards();
      this.iniciarAutoSlide();
      this.carregarAniversariantesSemana();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();

    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  @HostListener('window:resize')
  onResize(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.updateVisibleCards();
    }
  }

  updateVisibleCards(): void {
    const width = window.innerWidth;
    this.isAgendaMobile = width < 900;

    if (width < 900) {
      this.visibleCards = 1;
    } else if (width < 1200) {
      this.visibleCards = 2;
    } else {
      this.visibleCards = 4;
    }

    if (this.startIndex + this.visibleCards > this.ministerios.length) {
      this.startIndex = Math.max(0, this.ministerios.length - this.visibleCards);
    }
  }

  get visibleMinisterios(): Ministerio[] {
    return this.ministerios.slice(this.startIndex, this.startIndex + this.visibleCards);
  }

  prev(): void {
    if (this.startIndex > 0) {
      this.startIndex--;
    }
  }

  next(): void {
    if (this.startIndex + this.visibleCards < this.ministerios.length) {
      this.startIndex++;
    }
  }

  iniciarAutoSlide(): void {
    this.intervalId = setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  prevSlide(): void {
    this.slideAtual = (this.slideAtual - 1 + this.imagens.length) % this.imagens.length;
  }

  nextSlide(): void {
    this.slideAtual = (this.slideAtual + 1) % this.imagens.length;
  }

  goToSlide(index: number): void {
    this.slideAtual = index;
  }

  prevAgendaCard(): void {
    if (!this.agendaSemanal.length) {
      return;
    }

    this.agendaIndex = (this.agendaIndex - 1 + this.agendaSemanal.length) % this.agendaSemanal.length;
  }

  nextAgendaCard(): void {
    if (!this.agendaSemanal.length) {
      return;
    }

    this.agendaIndex = (this.agendaIndex + 1) % this.agendaSemanal.length;
  }

  goToAgendaCard(index: number): void {
    this.agendaIndex = index;
  }

  carregarAniversariantesSemana(): void {
    this.loadingAniversariantes = true;
    this.aniversariantesCarregados = false;
    this.erroAniversariantes = '';

    this.aniversariantesService
      .buscarAniversariantes()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (items) => {
          this.aniversariantesSemana = this.filtrarAniversariantesDaSemana(items);
          this.loadingAniversariantes = false;
          this.aniversariantesCarregados = true;
        },
        error: (erro) => {
          console.error('Erro ao carregar aniversariantes:', erro);
          this.loadingAniversariantes = false;
          this.aniversariantesCarregados = true;
          this.erroAniversariantes = 'Não foi possível carregar os aniversariantes agora.';
          this.aniversariantesSemana = [];
        }
      });
  }

  getLabelAniversario(item: AniversarianteDaSemana): string {
    if (item.diasRelativos === 0) {
      return 'Hoje';
    }

    if (item.diasRelativos === -1) {
      return 'Ontem';
    }

    if (item.diasRelativos < 0) {
      return `Há ${Math.abs(item.diasRelativos)} dia(s)`;
    }

    return `Em ${item.diasRelativos} dia(s)`;
  }

  private filtrarAniversariantesDaSemana(items: AniversarianteItem[]): AniversarianteDaSemana[] {
    const hoje = this.getHojeSaoPaulo();
    const hojeUtc = this.toUtcDate(hoje.ano, hoje.mes, hoje.dia);
    const diaSemana = hojeUtc.getUTCDay(); // 0 = domingo

    const inicioSemanaUtc = this.addDaysUtc(hojeUtc, -diaSemana);
    const fimSemanaUtc = this.addDaysUtc(inicioSemanaUtc, 6);
    const anosSemana = new Set([inicioSemanaUtc.getUTCFullYear(), fimSemanaUtc.getUTCFullYear(), hoje.ano]);

    return items
      .map((item): AniversarianteDaSemana | null => {
        const parsed = this.parseMesDia(item.data);
        if (!parsed) {
          return null;
        }

        let dataEventoUtc: Date | null = null;
        for (const ano of anosSemana) {
          const dia = parsed.mes === 2 && parsed.dia === 29 && !this.isAnoBissexto(ano) ? 28 : parsed.dia;
          const candidato = this.toUtcDate(ano, parsed.mes, dia);

          if (candidato >= inicioSemanaUtc && candidato <= fimSemanaUtc) {
            dataEventoUtc = candidato;
            break;
          }
        }

        if (!dataEventoUtc) {
          return null;
        }

        const diasRelativos = this.diffDaysUtc(dataEventoUtc, hojeUtc);
        const ordemSemana = this.diffDaysUtc(dataEventoUtc, inicioSemanaUtc);

        return {
          ...item,
          diasRelativos,
          ordemSemana,
          labelData: `${String(dataEventoUtc.getUTCDate()).padStart(2, '0')}/${String(dataEventoUtc.getUTCMonth() + 1).padStart(2, '0')}`
        };
      })
      .filter((item): item is AniversarianteDaSemana => !!item)
      .sort((a, b) => a.ordemSemana - b.ordemSemana || a.nome.localeCompare(b.nome));
  }

  private getHojeSaoPaulo(): { ano: number; mes: number; dia: number } {
    const formatter = new Intl.DateTimeFormat('en-CA', {
      timeZone: 'America/Sao_Paulo',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });

    const parts = formatter.formatToParts(new Date());
    const year = Number(parts.find((p) => p.type === 'year')?.value);
    const month = Number(parts.find((p) => p.type === 'month')?.value);
    const day = Number(parts.find((p) => p.type === 'day')?.value);

    return { ano: year, mes: month, dia: day };
  }

  private parseMesDia(data: string): { mes: number; dia: number } | null {
    const [mesStr, diaStr] = data.split('-');
    const mes = Number(mesStr);
    const dia = Number(diaStr);

    if (!Number.isInteger(mes) || !Number.isInteger(dia) || mes < 1 || mes > 12 || dia < 1 || dia > 31) {
      return null;
    }

    return { mes, dia };
  }

  private toUtcDate(ano: number, mes: number, dia: number): Date {
    return new Date(Date.UTC(ano, mes - 1, dia));
  }

  private addDaysUtc(base: Date, dias: number): Date {
    const d = new Date(base);
    d.setUTCDate(d.getUTCDate() + dias);
    return d;
  }

  private diffDaysUtc(a: Date, b: Date): number {
    const msPorDia = 24 * 60 * 60 * 1000;
    return Math.round((a.getTime() - b.getTime()) / msPorDia);
  }

  private isAnoBissexto(ano: number): boolean {
    return (ano % 4 === 0 && ano % 100 !== 0) || ano % 400 === 0;
  }
}
