import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { forkJoin } from 'rxjs';

interface MensagemResumo {
  titulo: string;
  data: string;
  resumo: string;
}

interface EventoGaleria {
  titulo: string;
  data: string;
  descricao: string;
  imagem?: string;
}

interface ProgramacaoFutura {
  titulo: string;
  data: string;
  horario: string;
  local: string;
}

@Component({
  selector: 'app-atualizacoes',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './atualizacoes.component.html',
  styleUrl: './atualizacoes.component.scss'
})
export class AtualizacoesComponent implements OnInit {
  mensagens: MensagemResumo[] = [];
  eventos: EventoGaleria[] = [];
  programacoes: ProgramacaoFutura[] = [];
  carregando = true;
  erroCarregamento = false;

  constructor(private readonly http: HttpClient) {}

  ngOnInit(): void {
    forkJoin({
      mensagens: this.http.get<MensagemResumo[]>('/assets/data/conteudos/mensagens.json'),
      eventos: this.http.get<EventoGaleria[]>('/assets/data/conteudos/eventos.json'),
      programacoes: this.http.get<ProgramacaoFutura[]>('/assets/data/conteudos/programacoes.json')
    }).subscribe({
      next: ({ mensagens, eventos, programacoes }) => {
        this.mensagens = mensagens;
        this.eventos = eventos;
        this.programacoes = programacoes;
        this.carregando = false;
      },
      error: () => {
        this.carregando = false;
        this.erroCarregamento = true;
      }
    });
  }
}

