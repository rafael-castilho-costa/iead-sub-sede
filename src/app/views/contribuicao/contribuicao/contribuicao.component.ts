import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-contribuicao',
  imports: [CommonModule, RouterModule],
  templateUrl: './contribuicao.component.html',
  styleUrl: './contribuicao.component.scss'
})
export class ContribuicaoComponent {
  readonly pixKey = 'senadorcanedo@adgoiania.com.br';
  readonly pixQrCodePath = '/assets/pix-qrcode.svg';
  qrCodeDisponivel = true;

  copiarChavePix(): void {
    if (!navigator?.clipboard?.writeText) {
      return;
    }

    navigator.clipboard.writeText(this.pixKey);
  }

  tratarErroQrCode(): void {
    this.qrCodeDisponivel = false;
  }

}
