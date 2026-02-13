import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

interface LocalPageSection {
  title: string;
  content: string;
}

interface LocalPageData {
  heading: string;
  intro: string;
  sections: LocalPageSection[];
}

@Component({
  selector: 'app-local-seo-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './local-seo-page.component.html',
  styleUrl: './local-seo-page.component.scss'
})
export class LocalSeoPageComponent {
  readonly pageData: LocalPageData;

  constructor(private readonly route: ActivatedRoute) {
    const data = this.route.snapshot.data['localPage'] as LocalPageData | undefined;
    this.pageData = data ?? {
      heading: 'IEAD Jardim Todos os Santos em Senador Canedo - GO',
      intro: 'Conheça nossa igreja e acompanhe a programação.',
      sections: []
    };
  }
}

