import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface PilarItem {
  titulo: string;
  descricao: string;
}

interface PrincipioItem {
  titulo: string;
  descricao: string;
}

@Component({
  standalone: true,
  selector: 'app-missao',
  imports: [CommonModule],
  templateUrl: './missao.component.html',
  styleUrls: ['./missao.component.scss']
})
export class MissaoComponent {
  readonly pilares: PilarItem[] = [
    {
      titulo: 'Missão',
      descricao: 'Proclamar o Evangelho de Jesus Cristo, formar discípulos e servir com amor, promovendo crescimento espiritual e comunhão entre as famílias.'
    },
    {
      titulo: 'Visão',
      descricao: 'Ser uma igreja bíblica, acolhedora e relevante, reconhecida por transformar vidas por meio da Palavra, da oração e do cuidado com pessoas.'
    },
    {
      titulo: 'Valores',
      descricao: 'Fidelidade à Palavra, santidade, amor ao próximo, unidade da igreja, integridade, serviço e compromisso com a missão de Cristo.'
    }
  ];

  readonly principios: PrincipioItem[] = [
    {
      titulo: 'Centralidade da Palavra',
      descricao: 'Toda decisão, ensino e prática ministerial parte da Bíblia como nossa regra de fé e conduta.'
    },
    {
      titulo: 'Oração e Dependência de Deus',
      descricao: 'Vivemos em comunhão com o Senhor, buscando direção e fortalecimento para cada etapa da caminhada.'
    },
    {
      titulo: 'Discipulado e Cuidado',
      descricao: 'Valorizamos o acompanhamento pessoal e o desenvolvimento espiritual de cada membro da igreja.'
    },
    {
      titulo: 'Serviço com Excelência',
      descricao: 'Servimos com responsabilidade, zelo e humildade, para honrar a Deus e edificar pessoas.'
    }
  ];
}
