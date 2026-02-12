# IeadSubSede

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.0.7.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## Importar aniversariantes (Excel -> JSON)

Esta aplicação usa o arquivo `src/assets/data/aniversariantes.json` para exibir os aniversariantes da semana na Home.

### Pré-requisitos

1. Ter Python instalado e disponível no terminal (`python --version`).
2. Ter a planilha `.xlsx` ou `.xltx` com os aniversariantes por mês.

### Passo a passo

1. Coloque/atualize a planilha em um caminho local (exemplo: `C:\Users\seu.usuario\Downloads\Aniversariantes Sub Sede - 2026.xltx.xlsx`).
2. Rode o import com o caminho da planilha:

```bash
npm run import:aniversariantes -- --input "C:\Users\seu.usuario\Downloads\Aniversariantes Sub Sede - 2026.xltx.xlsx" --output "src/assets/data/aniversariantes.json" --strict-sheet-month
```

3. O script vai gerar/atualizar o JSON em `src/assets/data/aniversariantes.json`.
4. Suba a aplicação (`npm start`) e confira a seção de aniversariantes na Home.

### O que cada parâmetro faz

- `--input`: caminho do arquivo Excel.
- `--output`: caminho do JSON de saída.
- `--strict-sheet-month`: se a data estiver com mês diferente do nome da aba, o script ajusta para o mês da aba e emite aviso.

### Observações sobre o formato

- O JSON final fica no padrão:
  - `nome`
  - `data` em `MM-DD` (ex.: `02-14`)
- O ano da planilha não é usado, porque aniversário recorrente considera apenas mês/dia.
