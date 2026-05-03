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
      placeholder: 'Em construção'
    },
    {
      titulo: 'Crescimento e Marcos',
      placeholder: 'Em construção'
    },
    {
      titulo: 'Historia da Sub-Sede',
      placeholder: 'Em construção'
    }
  ];
}
