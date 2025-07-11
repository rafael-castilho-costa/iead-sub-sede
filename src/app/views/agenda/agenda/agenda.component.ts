import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-agenda',
  imports: [RouterModule, CommonModule],
  templateUrl: './agenda.component.html',
  styleUrl: './agenda.component.scss'
})
export class AgendaComponent implements OnInit{
  eventos: any[] = [];
  calendarId = '9d2fa71088dd0d42b7ae86340904dbc4415abaa0156c9978716f0862624cb800@group.calendar.google.com';
  apiKey = 'AIzaSyBMODYR22u6NiHsHoVkdRf8gu6u8otzusY';

  dataAtual: Date = new Date();

  ngOnInit() {
    this.buscarCalendario();
  }

  getMonthRange(date: Date) {
    const inicio = new Date(date);
    inicio.setHours(0, 0, 0, 0);


    const fim = new Date(inicio);
    fim.setDate(fim.getDate() + 29);
    fim.setHours(23, 59, 59, 999);

    return {
      timeMin: inicio.toISOString(),
      timeMax: fim.toISOString()
    };
  }

  buscarCalendario() {
    const { timeMin, timeMax } = this.getMonthRange(this.dataAtual);

    fetch(`https://www.googleapis.com/calendar/v3/calendars/${this.calendarId}/events?key=${this.apiKey}&timeMin=${timeMin}&singleEvents=true&orderBy=startTime`)
      .then(response => response.json())
      .then(data => {
        this.eventos = data.items || [];
      })
      .catch(err => console.error('Erro ao buscar eventos:', err));
  }

  mesAnterior() {
    this.dataAtual = new Date(this.dataAtual);
    this.dataAtual.setDate(this.dataAtual.getDate() - 30)
    this.buscarCalendario();
  }

  proximoMes() {
    this.dataAtual = new Date(this.dataAtual);
    this.dataAtual.setDate(this.dataAtual.getDate() + 30);
    this.buscarCalendario();
  }

}
