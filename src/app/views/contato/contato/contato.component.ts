import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-contato',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './contato.component.html',
  styleUrl: './contato.component.scss'
})
export class ContatoComponent {
  readonly whatsappLink = 'https://wa.me/5562999999999?text=Ol%C3%A1%2C%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es%20sobre%20a%20igreja.';
  readonly telefoneLink = 'tel:+5562999999999';
  readonly emailLink = 'mailto:contato@ieadsubsede.org.br';
  readonly mapsLink = 'https://maps.google.com/?q=Igreja+Evangelica+Assembleia+de+Deus+Senador+Canedo';
}
