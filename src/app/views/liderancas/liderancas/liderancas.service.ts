import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Lideranca } from './liderancas.model';

@Injectable({
  providedIn: 'root'
})
export class LiderancasService {
  private readonly http = inject(HttpClient);

  buscarLiderancas(): Observable<Lideranca[]> {
    return this.http.get<Lideranca[]>('assets/data/liderancas.json');
  }
}
