import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AniversarianteItem {
  nome: string;
  data: string;
  foto?: string;
  ministerio?: string;
}

@Injectable({
  providedIn: 'root'
})
export class HomeAniversariantesService {
  private readonly http = inject(HttpClient);

  buscarAniversariantes(): Observable<AniversarianteItem[]> {
    return this.http.get<AniversarianteItem[]>('assets/data/aniversariantes.json');
  }
}
