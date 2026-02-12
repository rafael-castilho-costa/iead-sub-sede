# Checklist de Padrão (UI + Texto)

Use esta lista antes de subir alterações no site.

## 1. Texto e idioma

- [ ] Todos os textos visíveis estão em português correto (acentos e grafia).
- [ ] Evitar palavras com encoding quebrado (`Ã`, `Â`) quando não fizerem parte da palavra correta.
- [ ] Labels, botões e títulos usam termos consistentes entre páginas.

## 2. Estrutura Angular

- [ ] Novas features seguem o padrão da pasta em `src/app/views/<feature>`.
- [ ] Evitar lógica HTTP diretamente no componente (usar serviço).
- [ ] Tipos/interfaces em arquivo `*.model.ts` quando houver dados estruturados.

## 3. Roteamento e âncoras

- [ ] Rotas usam caminhos sem acentos em nomes de pastas/arquivos.
- [ ] Links com fragmento (`#secao`) testados com `anchorScrolling`.
- [ ] Navegação entre páginas não quebra no mobile.

## 4. Estilo e responsividade

- [ ] Tela funciona no desktop e no mobile (menu, cards, botões e espaçamentos).
- [ ] Evitar crescer SCSS sem necessidade (reutilizar classes utilitárias).
- [ ] Verificar contraste e legibilidade dos textos.

## 5. Validação antes do commit

- [ ] Rodar `npm run build`.
- [ ] Se possível, testar rotas principais manualmente: Home, Agenda, Contato, Contribuição, Lideranças.
- [ ] Confirmar que não há placeholders esquecidos em produção.
