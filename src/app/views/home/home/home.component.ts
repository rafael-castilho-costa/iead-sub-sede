import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { RouterModule } from '@angular/router';

interface Ministerio {
  titulo: string;
  subtitulo: string;
  culto: string;
}

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true,
})
export class HomeComponent {
  ministerios: Ministerio[] = [
    {
      titulo:'Ovelhas de Jesus',
      subtitulo: 'Crianças',
      culto: 'Todo Domingo às 18h30',
    },
    {
      titulo:'Conjunto Ágape',
      subtitulo: 'Adolescentes',
      culto: 'Toda primeira Sexta-Feira do Mês às 19h30',
    },
    {
      titulo:'Mocidade Voz Celestial',
      subtitulo: 'Jovens',
      culto: 'Toda segunda Sexta-Feira do Mês às 19h30',
    },
    {
      titulo:'Rosa de Saron',
      subtitulo: 'Mulheres',
      culto: 'Toda terceira Sexta-Feira do Mês às 19h30',
    },
    {
      titulo:'Guerreiros de Sião',
      subtitulo: 'Homens',
      culto: 'Toda última Sexta-Feira do Mês às 19h30',
    },
  ];

  visibleCards = 4;
  startIndex = 0;

  ngOnInit() {
    this.updateVisibleCards();
  }

  @HostListener('window:resize')
  onResize() {
    this.updateVisibleCards();
  }

  updateVisibleCards() {
    if (typeof window === 'undefined') return;
    const width = window.innerWidth;
    if (width < 600) {
      this.visibleCards = 1;
    } else if (width < 900) {
      this.visibleCards = 1;
    } else if (width < 1200) {
      this.visibleCards = 2;
    } else if (width < 1391) {
      this.visibleCards = 3;
    } else {
      this.visibleCards = 4;
    }

    if (this.startIndex + this.visibleCards > this.ministerios.length) {
      this.startIndex = Math.max(0, this.ministerios.length - this.visibleCards);
    }
  }

  get visibleMinisterios() {
    return this.ministerios.slice(this.startIndex, this.startIndex + this.visibleCards);
  }

  prev() {
    if (this.startIndex > 0) {
      this.startIndex --;
    }
  }

  next() {
    if (this.startIndex + this.visibleCards < this.ministerios.length) {
      this.startIndex ++;
    }
  }

}
