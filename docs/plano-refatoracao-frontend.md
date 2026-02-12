# Plano de Refatoração Incremental (sem backend)

Este plano melhora a arquitetura atual do projeto sem exigir backend agora.

## Restrição atual

- A `apiKey` do Google Calendar permanecerá no frontend temporariamente.
- Enquanto isso, manter a chave restrita no Google Cloud:
  - Restrição por HTTP referrer (domínio de produção e localhost)
  - Restrição por API (Google Calendar API)

## Objetivo geral

- Padronizar arquitetura Angular
- Melhorar manutenção e legibilidade
- Reduzir risco de regressões
- Preparar terreno para futura migração para backend

---

## Fase 1 - Padronização estrutural (baixo risco)

### 1.1 Padronizar por feature standalone
- Manter feature routes lazy-loaded
- Evitar mistura de padrões (module-only vs standalone-only)
- Definir padrão único para novas páginas

### 1.2 Organização de pastas por feature
Cada feature deve ter:
- `*.component.ts/html/scss`
- `*.service.ts` (quando aplicável)
- `*.model.ts` (tipos/interfaces)

### 1.3 Corrigir encoding UTF-8
- Normalizar arquivos com caracteres quebrados (`Ã`, `Â` etc.)
- Garantir padrão UTF-8 em todos os templates e textos estáticos

Critério de aceite:
- Build sem erro
- Rotas funcionando
- Textos com acentuação correta

---

## Fase 2 - Dados e serviços (médio impacto)

### 2.1 Padronizar acesso a dados
- Evitar `fetch` direto nos componentes
- Usar serviços + `HttpClient` em todas as features

### 2.2 Padronizar modelos
- Centralizar interfaces por feature (`agenda.model.ts`, `home.model.ts`, etc.)
- Remover `any` e tipagens implícitas

### 2.3 Agenda Google (sem backend, por ora)
- Manter `apiKey` no frontend
- Encapsular chamada no serviço de agenda
- Padronizar tratamento de erro/estado de loading

Critério de aceite:
- Componentes sem regra pesada de acesso HTTP
- Tipagem mais estrita
- Fluxo da agenda centralizado em serviço

---

## Fase 3 - UX técnica e confiabilidade (médio/alto impacto)

### 3.1 Testes essenciais por feature
- Agenda: navegação de mês e filtro correto
- Home: aniversariantes da semana
- Contato: renderização dos blocos principais

### 3.2 Revisão de estilos grandes
- Reduzir peso de SCSS por componente
- Extrair padrões repetidos (botões, cards, labels)

### 3.3 Preparação para backend futuro
- Definir interface de contrato para agenda
- Isolar configuração da chave em ponto único

Critério de aceite:
- Testes principais passando
- Menos warnings de budget
- Migração para backend facilitada no futuro

---

## Ordem recomendada de execução

1. Fase 1.3 (encoding)
2. Fase 2.1 + 2.2 (serviços e modelos)
3. Fase 2.3 (agenda encapsulada, mantendo apiKey)
4. Fase 3.1 (testes)
5. Fase 3.2 (otimização de estilos)

---

## Checklist rápido de segurança para a apiKey (agora)

- [ ] Restringir por referrer (`https://seu-dominio/*` e `http://localhost:*/*`)
- [ ] Restringir por API (somente Google Calendar API)
- [ ] Monitorar uso da chave no console do Google Cloud

---

## Próxima execução sugerida

Iniciar pela normalização de encoding + padronização de texto em:
- `header`
- `home`
- `agenda`
- `rotas`

Isso já melhora manutenção e reduz bugs visuais sem impacto de arquitetura profunda.
