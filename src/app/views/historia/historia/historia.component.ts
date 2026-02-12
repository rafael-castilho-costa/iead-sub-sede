import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface BlocoHistoria {
  titulo: string;
  placeholder: string;
}

@Component({
  standalone: true,
  selector: 'app-historia',
  imports: [CommonModule],
  templateUrl: './historia.component.html',
  styleUrl: './historia.component.scss'
})
export class HistoriaComponent {
  readonly blocos: BlocoHistoria[] = [
    {
      titulo: 'Origem da IEAD',
      placeholder: 'Adicionar aqui o texto sobre o inicio da igreja, fundacao e primeiros anos.'
    },
    {
      titulo: 'Crescimento e Marcos',
      placeholder: 'Adicionar aqui os principais marcos historicos, datas importantes e expansao.'
    },
    {
      titulo: 'Historia da Sub-Sede',
      placeholder: 'Adicionar aqui a trajetoria local da Sub-Sede, lideranca e conquistas.'
    }
  ];
}
