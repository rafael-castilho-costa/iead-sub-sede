import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-reforma',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './reforma.component.html',
  styleUrl: './reforma.component.scss'
})
export class ReformaComponent {
  readonly imagens = [
    'assets/reforma/reforma-externa-durante1.jpeg',
    'assets/reforma/reforma-externa-durante2.jpeg',
    'assets/reforma/reforma-externa-durante3.jpg',
    'assets/reforma/reforma-externa-durante4.jpeg',
    'assets/reforma/reforma-externa-durante5.jpeg',
    'assets/reforma/reforma-externa-durante6.jpeg',
    'assets/reforma/reforma-externa-durante7.jpeg'
  ];

  readonly frentesContribuicao = [
    'Melhoria do espaço de culto para receber melhor os membros e visitantes.',
    'Adequação da estrutura para segurança e conforto da congregação.',
    'Manutenção contínua para preservar a casa do Senhor em boas condições.'
  ];
}
