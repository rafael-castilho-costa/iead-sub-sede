import Swiper from 'swiper';

import {Navigation, Pagination, Autoplay } from 'swiper/modules';

import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { RouterModule } from '@angular/router';



Swiper.use([Navigation, Pagination, Autoplay]);



interface Ministerio {
  titulo: string;
  subtitulo: string;
  culto: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})

export class HomeComponent {
    slideAtual = 0;
    intervalId: any;

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
    },{
      titulo:'Escola Bíblica Dominical',
      subtitulo: 'Todos os Membros',
      culto: 'Todo Domingo às 8h30',
    }
  ];

  visibleCards = 4;
  startIndex = 0;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
     if (isPlatformBrowser(this.platformId)) {
      this.updateVisibleCards();
      this.iniciarAutoSlide();
  }
  }


  @HostListener('window:resize')
  onResize() {
    if (isPlatformBrowser(this.platformId)) {
      this.updateVisibleCards();
    }
  }

  updateVisibleCards() {
    const width = window.innerWidth;
    if (width < 600) {
      this.visibleCards = 1;
    } else if (width < 900) {
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


  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  iniciarAutoSlide() {
    this.intervalId = setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  prevSlide() {
    this.slideAtual = (this.slideAtual - 1 + this.imagens.length) % this.imagens.length;
  }

  nextSlide() {
    this.slideAtual = (this.slideAtual + 1) % this.imagens.length;
  }

  goToSlide(index: number) {
    this.slideAtual = index;
  }

  imagens: string[] = [
    'assets/reforma/reforma-externa-durante1.jpeg',
    'assets/reforma/reforma-externa-durante2.jpeg',
    'assets/reforma/reforma-externa-durante3.jpg',
    'assets/reforma/reforma-externa-durante4.jpeg',
    'assets/reforma/reforma-externa-durante5.jpeg',
    'assets/reforma/reforma-externa-durante6.jpeg',
    'assets/reforma/reforma-externa-durante7.jpeg',
  ];

}
