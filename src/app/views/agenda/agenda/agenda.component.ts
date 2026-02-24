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

@Component({
  selector: 'app-agenda',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './agenda.component.html',
  styleUrl: './agenda.component.scss'
})
export class AgendaComponent implements OnInit {
  eventos: GoogleCalendarEvent[] = [];
  isLoading = false;
  errorMessage = '';
  dataAtual = new Date();
  eventosExpandidos = new Set<number>();
  imagensFalharam = new Set<string>();
  imagemSelecionada: string | null = null;
  imagemSelecionadaTitulo: string | null = null;

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
    } catch (error) {
      if (currentRequest !== this.requestVersion) {
        return;
      }

      this.eventos = [];
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
}
