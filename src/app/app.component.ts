import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Subject, filter, startWith, takeUntil } from 'rxjs';
import { FooterComponent } from './core/components/footer/footer.component';
import { HeaderComponent } from "./core/components/header/header.component";
import { SeoService } from './core/seo/seo.service';
import { SeoData } from './core/seo/seo.types';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FooterComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'iead-sub-sede';
  menuAberto = false;
  private readonly destroy$ = new Subject<void>();

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly seoService: SeoService
  ) {}

  ngOnInit(): void {
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        startWith(new NavigationEnd(0, this.router.url, this.router.url)),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        const seoData = this.findSeoData(this.route);
        if (seoData) {
          this.seoService.applySeo(seoData);
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private findSeoData(route: ActivatedRoute): SeoData | null {
    let current = route;
    while (current.firstChild) {
      current = current.firstChild;
    }

    for (let i = current.pathFromRoot.length - 1; i >= 0; i--) {
      const data = current.pathFromRoot[i].snapshot.data['seo'] as SeoData | undefined;
      if (data) {
        return data;
      }
    }

    return null;
  }
}
