# Attus

Projeto de exemplificação de reatividade e boas práticas com Angular, cobrindo estrutura de projeto, RxJS, conceitos de estados, observables e Angular Material.

## Páginas

- `/` — Home
- `/users` — Usuários
- `/cart` — Carrinho de itens
- `/person` — Pessoas
- `/todo` — Lista de tarefas

## Conceitos abordados

- Router
- BehaviourSubject + Observables
- Signals (input/output)
- Estado de navegação em service global (root)
- API service global e por página
- Refatoração de código
- `ChangeDetectionStrategy.OnPush`

> Logs de debug estão presentes nos desafios que iteram ou alteram estados.

Cada página segue um padrão diferente para mostrar casos de uso distintos. Para um projeto completo em padrão único, a referência são as páginas **Users** e **Todo-list**.

## Desafios técnicos

Os desafios estão em `./src/app/objectives`.

Para localizar cada exercício no código, pesquise por: `//*exercicio`

## Como rodar

```bash
npm i
npm run start
```

## Testes

```bash
npm run test
```
