import { isPlatformBrowser, CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { Lideranca } from './liderancas.model';
import { LiderancasService } from './liderancas.service';

@Component({
  standalone: true,
  selector: 'app-liderancas',
  imports: [CommonModule],
  templateUrl: './liderancas.component.html',
  styleUrls: ['./liderancas.component.scss']
})
export class LiderancasComponent implements OnInit, OnDestroy {
  liderancas: Lideranca[] = [];
  isLoading = true;
  errorMessage = '';
  biografiasExpandidas = new Set<number>();

  private readonly destroy$ = new Subject<void>();
  private readonly platformId = inject(PLATFORM_ID);
  private readonly liderancasService = inject(LiderancasService);

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      this.isLoading = false;
      return;
    }

    this.carregarLiderancas();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  carregarLiderancas(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.liderancasService
      .buscarLiderancas()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (dados) => {
          this.liderancas = dados;
          this.biografiasExpandidas.clear();
          this.isLoading = false;
        },
        error: (erro) => {
          console.error('Erro ao carregar lideranças:', erro);
          this.liderancas = [];
          this.errorMessage = 'Não foi possível carregar as lideranças agora. Tente novamente.';
          this.isLoading = false;
        }
      });
  }

  trackByNome(_: number, item: Lideranca): string {
    return item.nome;
  }

  toggleBiografia(index: number): void {
    this.biografiasExpandidas.has(index)
      ? this.biografiasExpandidas.delete(index)
      : this.biografiasExpandidas.add(index);
  }

  isBiografiaExpandida(index: number): boolean {
    return this.biografiasExpandidas.has(index);
  }
}
