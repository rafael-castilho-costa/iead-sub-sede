import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

interface GoogleCalendarDate {
  date?: string;
  dateTime?: string;
}

interface GoogleCalendarAttachment {
  fileId?: string;
  fileUrl?: string;
  mimeType?: string;
  title?: string;
  iconLink?: string;
}

interface GoogleCalendarEvent {
  id: string;
  summary?: string;
  description?: string;
  location?: string;
  htmlLink?: string;
  status?: string;
  start?: GoogleCalendarDate;
  end?: GoogleCalendarDate;
  attachments?: GoogleCalendarAttachment[];
}

interface GoogleCalendarEventsResponse {
  items?: GoogleCalendarEvent[];
  error?: {
    message?: string;
  };
}

interface CalendarDayCell {
  date: Date;
  inCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  events: GoogleCalendarEvent[];
}

@Component({
  selector: 'app-agenda',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './agenda.component.html',
  styleUrl: './agenda.component.scss'
})
export class AgendaComponent implements OnInit {
  eventos: GoogleCalendarEvent[] = [];
  calendarioMes: CalendarDayCell[] = [];
  readonly semanaLabels = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  eventosDiaSelecionado: GoogleCalendarEvent[] = [];
  labelDiaSelecionado = '';
  isLoading = false;
  errorMessage = '';
  dataAtual = new Date();
  eventosExpandidos = new Set<number>();
  imagensFalharam = new Set<string>();
  imagemSelecionada: string | null = null;
  imagemSelecionadaTitulo: string | null = null;
  eventoPopup: GoogleCalendarEvent | null = null;
  descricaoPopupExpandida = false;
  readonly enderecoIgreja = '8W25+27 Jardim de Todos Os Santos, Sen. Canedo - GO';
  readonly mapsLinkIgreja = 'https://maps.app.goo.gl/4LxnSPhNCtEZXZKL6';
  private diaSelecionadoKey: string | null = null;

  private readonly calendarId = 'ieadmjts@gmail.com';
  private readonly apiKey = 'AIzaSyAM19ONBVMFZ5W0w3FuE1yXAD5_EabOo2M';
  private readonly timezone = 'America/Sao_Paulo';
  private requestVersion = 0;

  ngOnInit(): void {
    void this.buscarCalendario();
  }

  toggleDescricao(index: number): void {
    this.eventosExpandidos.has(index)
      ? this.eventosExpandidos.delete(index)
      : this.eventosExpandidos.add(index);
  }

  isDescricaoExpandida(index: number): boolean {
    return this.eventosExpandidos.has(index);
  }

  trackByEvento(_: number, evento: GoogleCalendarEvent): string {
    return evento.id;
  }

  private getMonthRange(date: Date): { timeMin: string; timeMax: string } {
    const inicio = new Date(date.getFullYear(), date.getMonth(), 1, 0, 0, 0, 0);
    const fim = new Date(date.getFullYear(), date.getMonth() + 1, 1, 0, 0, 0, 0);

    return {
      timeMin: this.toRfc3339Local(inicio),
      timeMax: this.toRfc3339Local(fim)
    };
  }

  async buscarCalendario(): Promise<void> {
    const currentRequest = ++this.requestVersion;
    const { timeMin, timeMax } = this.getMonthRange(this.dataAtual);

    const queryParams = new URLSearchParams({
      key: this.apiKey,
      timeMin,
      timeMax,
      singleEvents: 'true',
      orderBy: 'startTime',
      showDeleted: 'false',
      maxResults: '250',
      timeZone: this.timezone,
      supportsAttachments: 'true',
      fields: 'items(id,summary,description,location,htmlLink,status,start,end,attachments(fileId,fileUrl,mimeType,title,iconLink))'
    });

    this.isLoading = true;
    this.errorMessage = '';
    this.eventosExpandidos.clear();

    try {
      const response = await fetch(
        `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(this.calendarId)}/events?${queryParams.toString()}`,
        { headers: { Accept: 'application/json' } }
      );

      if (!response.ok) {
        throw new Error(`Google Calendar API retornou HTTP ${response.status}`);
      }

      const data = await response.json() as GoogleCalendarEventsResponse;

      if (data.error) {
        throw new Error(data.error.message || 'Erro ao carregar eventos do Google Agenda.');
      }

      if (currentRequest !== this.requestVersion) {
        return;
      }

      this.eventos = (data.items || [])
        .filter((evento) => evento.status !== 'cancelled')
        .filter((evento) => this.isEventInReferenceMonth(evento, this.dataAtual))
        .sort((a, b) => this.getEventDate(a).getTime() - this.getEventDate(b).getTime());
      this.montarCalendarioMes();
    } catch (error) {
      if (currentRequest !== this.requestVersion) {
        return;
      }

      this.eventos = [];
      this.calendarioMes = [];
      this.eventosDiaSelecionado = [];
      this.labelDiaSelecionado = '';
      this.errorMessage = 'Não foi possível carregar a agenda agora. Tente novamente.';
      console.error('Erro ao buscar eventos:', error);
    } finally {
      if (currentRequest === this.requestVersion) {
        this.isLoading = false;
      }
    }
  }

  mesAnterior(): void {
    this.dataAtual = new Date(this.dataAtual.getFullYear(), this.dataAtual.getMonth() - 1, 1);
    void this.buscarCalendario();
  }

  proximoMes(): void {
    this.dataAtual = new Date(this.dataAtual.getFullYear(), this.dataAtual.getMonth() + 1, 1);
    void this.buscarCalendario();
  }

  irParaMesAtual(): void {
    const hoje = new Date();
    this.dataAtual = new Date(hoje.getFullYear(), hoje.getMonth(), 1);
    void this.buscarCalendario();
  }

  getDataHoraFormatada(evento: GoogleCalendarEvent): string {
    if (evento.start?.date) {
      return 'Dia inteiro';
    }

    const data = this.getEventDate(evento);
    return `${data.toLocaleDateString('pt-BR')} às ${data.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    })}`;
  }

  getDia(evento: GoogleCalendarEvent): string {
    return this.getEventDate(evento).getDate().toString().padStart(2, '0');
  }

  getMesAbreviado(evento: GoogleCalendarEvent): string {
    const data = this.getEventDate(evento);
    const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    return meses[data.getMonth()];
  }

  getDiaSemanaAbreviado(evento: GoogleCalendarEvent): string {
    const data = this.getEventDate(evento);
    const dias = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    return dias[data.getDay()];
  }

  getNumeroDia(data: Date): string {
    return data.getDate().toString();
  }

  getHoraEvento(evento: GoogleCalendarEvent): string {
    if (evento.start?.date) {
      return 'Dia inteiro';
    }

    const data = this.getEventDate(evento);
    return data.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  getMapsLink(evento: GoogleCalendarEvent): string {
    const destinoEvento = evento.location?.trim();
    if (!destinoEvento) {
      return this.mapsLinkIgreja;
    }

    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(destinoEvento)}`;
  }

  selecionarDia(celula: CalendarDayCell): void {
    this.aplicarSelecaoDia(this.getDateKey(celula.date));
  }

  trackByDia(_: number, celula: CalendarDayCell): string {
    const ano = celula.date.getFullYear();
    const mes = String(celula.date.getMonth() + 1).padStart(2, '0');
    const dia = String(celula.date.getDate()).padStart(2, '0');
    return `${ano}-${mes}-${dia}`;
  }

  getDescricaoLimpa(descricao?: string): string {
    if (!descricao) {
      return 'Sem descrição.';
    }

    return descricao
      .replace(/<[^>]*>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  getImagemEvento(evento: GoogleCalendarEvent): string | null {
    if (this.imagensFalharam.has(evento.id)) {
      return null;
    }

    const anexos = evento.attachments?.filter((anexo) => anexo.mimeType?.startsWith('image/')) ?? [];
    if (anexos.length) {
      const anexo = anexos[0];
      if (anexo.fileId) {
        return this.getDriveThumbnail(anexo.fileId);
      }
      if (anexo.fileUrl) {
        const fileId = this.extrairDriveFileId(anexo.fileUrl);
        if (fileId) {
          return this.getDriveThumbnail(fileId);
        }
        return anexo.fileUrl;
      }
    }

    return this.extrairImagemDaDescricao(evento.description);
  }

  registrarErroImagem(evento: GoogleCalendarEvent): void {
    this.imagensFalharam.add(evento.id);
  }

  abrirImagem(url: string, titulo?: string): void {
    this.imagemSelecionada = url;
    this.imagemSelecionadaTitulo = titulo ?? null;
  }

  abrirPopupEvento(evento: GoogleCalendarEvent): void {
    this.eventoPopup = evento;
    this.descricaoPopupExpandida = false;
  }

  fecharPopupEvento(): void {
    this.eventoPopup = null;
    this.descricaoPopupExpandida = false;
  }

  toggleDescricaoPopup(): void {
    this.descricaoPopupExpandida = !this.descricaoPopupExpandida;
  }

  fecharImagem(): void {
    this.imagemSelecionada = null;
    this.imagemSelecionadaTitulo = null;
  }

  private getEventDate(evento: GoogleCalendarEvent): Date {
    const dateTime = evento.start?.dateTime;
    if (dateTime) {
      return new Date(dateTime);
    }

    const date = evento.start?.date;
    if (date) {
      const [ano, mes, dia] = date.split('-').map(Number);
      return new Date(ano, mes - 1, dia);
    }

    return new Date();
  }

  private isEventInReferenceMonth(evento: GoogleCalendarEvent, referencia: Date): boolean {
    const refMes = referencia.getMonth() + 1;
    const refAno = referencia.getFullYear();

    if (evento.start?.date) {
      const [anoStr, mesStr] = evento.start.date.split('-');
      return Number(anoStr) === refAno && Number(mesStr) === refMes;
    }

    const data = this.getEventDate(evento);
    return data.getFullYear() === refAno && data.getMonth() + 1 === refMes;
  }

  private toRfc3339Local(data: Date): string {
    const ano = data.getFullYear();
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const dia = String(data.getDate()).padStart(2, '0');
    const hora = String(data.getHours()).padStart(2, '0');
    const minuto = String(data.getMinutes()).padStart(2, '0');
    const segundo = String(data.getSeconds()).padStart(2, '0');
    const offsetMinutos = -data.getTimezoneOffset();
    const sinal = offsetMinutos >= 0 ? '+' : '-';
    const absOffset = Math.abs(offsetMinutos);
    const offsetHora = String(Math.floor(absOffset / 60)).padStart(2, '0');
    const offsetMin = String(absOffset % 60).padStart(2, '0');
    return `${ano}-${mes}-${dia}T${hora}:${minuto}:${segundo}${sinal}${offsetHora}:${offsetMin}`;
  }

  private extrairImagemDaDescricao(descricao?: string): string | null {
    if (!descricao) {
      return null;
    }

    const matchDireto = descricao.match(/https?:\/\/\S+\.(?:png|jpe?g|gif|webp)(?:\?\S+)?/i);
    if (matchDireto) {
      return matchDireto[0];
    }

    const matchDrive = descricao.match(/https?:\/\/\S*drive\.google\.com\/\S+/i);
    if (matchDrive) {
      const fileId = this.extrairDriveFileId(matchDrive[0]);
      if (fileId) {
        return this.getDriveThumbnail(fileId);
      }
    }

    return null;
  }

  private getDriveThumbnail(fileId: string): string {
    return `https://drive.google.com/thumbnail?id=${fileId}&sz=w1200`;
  }

  private extrairDriveFileId(url: string): string | null {
    const byId = url.match(/[?&]id=([^&]+)/i);
    if (byId) {
      return byId[1];
    }

    const byFile = url.match(/\/file\/d\/([^/]+)/i);
    if (byFile) {
      return byFile[1];
    }

    return null;
  }

  private montarCalendarioMes(): void {
    const inicioMes = new Date(this.dataAtual.getFullYear(), this.dataAtual.getMonth(), 1);
    const fimMes = new Date(this.dataAtual.getFullYear(), this.dataAtual.getMonth() + 1, 0);
    const inicioGrade = new Date(inicioMes);
    inicioGrade.setDate(inicioMes.getDate() - inicioMes.getDay());
    const fimGrade = new Date(fimMes);
    fimGrade.setDate(fimMes.getDate() + (6 - fimMes.getDay()));

    const eventosPorDia = new Map<string, GoogleCalendarEvent[]>();
    for (const evento of this.eventos) {
      const key = this.getEventDateKey(evento);
      const eventosDoDia = eventosPorDia.get(key) ?? [];
      eventosDoDia.push(evento);
      eventosPorDia.set(key, eventosDoDia);
    }

    for (const eventosDoDia of eventosPorDia.values()) {
      eventosDoDia.sort((a, b) => this.getEventDate(a).getTime() - this.getEventDate(b).getTime());
    }

    const hoje = new Date();
    const hojeKey = this.getDateKey(hoje);
    const celulas: CalendarDayCell[] = [];

    for (let data = new Date(inicioGrade); data <= fimGrade; data.setDate(data.getDate() + 1)) {
      const key = this.getDateKey(data);
      celulas.push({
        date: new Date(data),
        inCurrentMonth: data.getMonth() === this.dataAtual.getMonth(),
        isToday: key === hojeKey,
        isSelected: false,
        events: eventosPorDia.get(key) ?? []
      });
    }

    this.calendarioMes = celulas;

    const diaPreferido = this.resolverDiaSelecionadoInicial(eventosPorDia);
    this.aplicarSelecaoDia(diaPreferido);
  }

  private resolverDiaSelecionadoInicial(eventosPorDia: Map<string, GoogleCalendarEvent[]>): string {
    const hoje = new Date();
    const hojeNoMes = hoje.getMonth() === this.dataAtual.getMonth() && hoje.getFullYear() === this.dataAtual.getFullYear();
    const hojeKey = this.getDateKey(hoje);

    if (hojeNoMes && eventosPorDia.has(hojeKey)) {
      return hojeKey;
    }

    if (this.diaSelecionadoKey && eventosPorDia.has(this.diaSelecionadoKey)) {
      return this.diaSelecionadoKey;
    }

    const primeiroComEvento = this.calendarioMes.find((celula) => celula.inCurrentMonth && celula.events.length > 0);
    if (primeiroComEvento) {
      return this.getDateKey(primeiroComEvento.date);
    }

    return this.getDateKey(new Date(this.dataAtual.getFullYear(), this.dataAtual.getMonth(), 1));
  }

  private aplicarSelecaoDia(key: string): void {
    this.diaSelecionadoKey = key;
    this.calendarioMes = this.calendarioMes.map((celula) => ({
      ...celula,
      isSelected: this.getDateKey(celula.date) === key
    }));

    const selecionado = this.calendarioMes.find((celula) => this.getDateKey(celula.date) === key);
    this.eventosDiaSelecionado = selecionado?.events ?? [];
    this.labelDiaSelecionado = selecionado
      ? selecionado.date.toLocaleDateString('pt-BR', {
          weekday: 'long',
          day: '2-digit',
          month: 'long'
        })
      : '';
  }

  private getEventDateKey(evento: GoogleCalendarEvent): string {
    return this.getDateKey(this.getEventDate(evento));
  }

  private getDateKey(data: Date): string {
    const ano = data.getFullYear();
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const dia = String(data.getDate()).padStart(2, '0');
    return `${ano}-${mes}-${dia}`;
  }
}
