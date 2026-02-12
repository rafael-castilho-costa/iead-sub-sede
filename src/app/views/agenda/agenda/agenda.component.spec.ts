import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendaComponent } from './agenda.component';

describe('AgendaComponent', () => {
  let component: AgendaComponent;
  let fixture: ComponentFixture<AgendaComponent>;

  beforeEach(async () => {
    registerLocaleData(localePt, 'pt-BR');

    spyOn(window, 'fetch').and.callFake(() =>
      Promise.resolve(
        new Response(JSON.stringify({ items: [] }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        })
      )
    );

    await TestBed.configureTestingModule({
      imports: [AgendaComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(AgendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deve buscar eventos ao iniciar', async () => {
    await fixture.whenStable();
    expect(window.fetch).toHaveBeenCalled();
  });

  it('deve avançar e voltar meses corretamente', () => {
    const dataInicial = new Date(component.dataAtual);

    component.proximoMes();
    expect(component.dataAtual.getMonth()).toBe((dataInicial.getMonth() + 1) % 12);

    component.mesAnterior();
    expect(component.dataAtual.getMonth()).toBe(dataInicial.getMonth());
  });
});
