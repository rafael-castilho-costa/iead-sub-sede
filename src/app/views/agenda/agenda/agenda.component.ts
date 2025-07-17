import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { raw } from 'body-parser';

@Component({
  selector: 'app-agenda',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './agenda.component.html',
  styleUrl: './agenda.component.scss'
})

export class AgendaComponent implements OnInit {
  eventos: any[] = [];
  calendarId = '9d2fa71088dd0d42b7ae86340904dbc4415abaa0156c9978716f0862624cb800@group.calendar.google.com';
  apiKey = 'AIzaSyBMODYR22u6NiHsHoVkdRf8gu6u8otzusY';

  dataAtual: Date = new Date();
  eventosExpandidos = new Set<number>();

  toggleDescricao(index: number): void {
    if (this.eventosExpandidos.has(index)) {
      this.eventosExpandidos.delete(index);
    } else {
      this.eventosExpandidos.add(index);
    }
  }

  isDescricaoExpandida(index: number): boolean {
    return this.eventosExpandidos.has(index);
  }

  ngOnInit() {
    this.buscarCalendario();
  }

  getMonthRange(date: Date) {
    const inicio = new Date(date.getFullYear(), date.getMonth(), 1, 0, 0, 0, 0);
    const fim = new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59, 999);

    return {
      timeMin: inicio.toISOString(),
      timeMax: fim.toISOString()
    };
  }

  buscarCalendario() {
    const { timeMin, timeMax } = this.getMonthRange(this.dataAtual);

    fetch(`https://www.googleapis.com/calendar/v3/calendars/${this.calendarId}/events?key=${this.apiKey}&timeMin=${timeMin}&timeMax=${timeMax}&singleEvents=true&orderBy=startTime`)
      .then(response => response.json())
      .then(data => {
        console.log('Eventos recebidos:', data.items);
        this.eventos = this.filtrarEventosDoMes(data.items || [], this.dataAtual);

        this.eventos.forEach(evento => {
          if (evento.attachments) {
            evento.attachments.forEach((att: any) => {
              console.log('fileUrl:', att.fileUrl);
              console.log('fileId:', att.fileId );

          });
        }
      });
    })
    .catch(err => console.error('Erro ao buscar eventos:', err));

  }

  mesAnterior() {
    this.dataAtual = new Date(this.dataAtual);
    this.dataAtual.setDate(this.dataAtual.getDate() - 30);
    this.buscarCalendario();
  }

  proximoMes() {
    this.dataAtual = new Date(this.dataAtual);
    this.dataAtual.setDate(this.dataAtual.getDate() + 30);
    this.buscarCalendario();
  }

  /* Retorna a data formatada em pt-BR com hora */
  getDataHoraFormatada(evento: any): string {
    const rawDate = evento.start?.dateTime || evento.start?.date;
    if (evento.start?.date){
      return 'Dia Inteiro';
    }
    const data = new Date(rawDate);
    return `${data.toLocaleDateString('pt-BR')} às ${data.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    })}`;
  }

  /** Retorna o dia do mês com 2 dígitos */
  getDia(evento: any): string {
    const rawDate = evento.start?.dateTime || evento.start?.date;
    if (evento.start?.date){
      return rawDate.split('-')[2];
    }
    return new Date(rawDate).getDate().toString().padStart(2, '0');
  }

  /** Retorna o mês abreviado (ex: Jan, Fev, Mar...) */
  getMesAbreviado(evento: any): string {
    const rawDate = evento.start?.dateTime || evento.start?.date;
    const data = new Date(rawDate);
    const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    let mes;

    if (evento.start?.date){
      mes = parseInt(rawDate.split('-')[1],10)-1;
    } else {
      mes = new Date(rawDate).getMonth();
    }
    return meses[mes];
  }

  /** Retorna o dia da semana abreviado (ex: Dom, Seg, Ter...) */
  getDiaSemanaAbreviado(evento: any): string {
    const rawDate = evento.start?.dateTime || evento.start?.date;
    const dias = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    let data;
    if (evento.start?.date) {
      const [ano, mes, dia] = rawDate.split('-');
      data = new Date(Number(ano), Number(mes) -1, Number(dia));
    } else {
      data = new Date(rawDate);
    }
    return dias[data.getDay()];
  }

  private filtrarEventosDoMes(eventos: any[], dataReferencia: Date): any [] {
    const mes = dataReferencia.getMonth();
    const ano = dataReferencia.getFullYear();

    return eventos.filter(evento => {
      const rawDate = evento.start?.dateTime || evento.start?.date;
      const dataEvento = new Date(rawDate);
      console.log('Evento:', dataEvento, 'Mês:', dataEvento.getMonth(), 'Ano:', dataEvento.getFullYear(), 'Referência:', mes, ano);
      return (dataEvento.getMonth() === mes &&
             dataEvento.getFullYear() === ano
      );
    });
  }
}
