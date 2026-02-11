import { CommonModule } from '@angular/common';
import { Component, DestroyRef, HostListener, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})


export class HeaderComponent {
  menuAberto = false;
  subMenuAberto = false;
  private readonly destroyRef = inject(DestroyRef);

  constructor(private readonly router: Router) {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => this.fecharMenuCompleto());
  }

  toggleMenu(): void {
    this.menuAberto = !this.menuAberto;

    if (!this.menuAberto) {
      this.subMenuAberto = false;
    }
  }

  toggleSubMenu() {
    this.subMenuAberto = !this.subMenuAberto;
  }

  fecharMenuCompleto(): void {
    this.menuAberto = false;
    this.subMenuAberto = false;
  }

  fecharMenu(): void {
    this.fecharMenuCompleto();
  }

  aoClicarLink(): void {
    this.fecharMenuCompleto();
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.fecharMenuCompleto();
  }

  @HostListener('window:resize')
  onResize(): void {
    if (window.innerWidth > 1024 && this.menuAberto) {
      this.fecharMenuCompleto();
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.menuAberto) {
      return;
    }

    const target = event.target as HTMLElement | null;
    if (!target) {
      return;
    }

    const clicouDentroDoHeader = !!target.closest('.header');
    if (!clicouDentroDoHeader) {
      this.fecharMenuCompleto();
    }
  }
}

