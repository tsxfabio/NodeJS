# Tasks API

Primeiro
[DESAFIO](https://efficient-sloth-d85.notion.site/Desafio-01-2d48608f47644519a408b438b52d913f)
da trilha de NodeJS da RocketSeat.

O desafio consiste na criação de uma API para realizar o CRUD de tasks. Deve
conter as seguintes funcionalidades:

- Criação de uma task.
- Listagem de todas as tasks.
- Atualização de uma task pelo id.
- Deletar uma task pelo id.
- Através do id, marcar a task como completa.
- Importação de tasks em massa por meio de um arquivo CSV.

## Tips and Tricks

- O primeiro passo para iniciar um projeto em NodeJS, é a criação do arquivo
  package.json, que é feita da seguinte forma:

```
npm init -y
```

- Por padrão, o nodeJS utiliza o formado de commonJS para importação models.
  Para a utilização do padrão mais utilizado recentemente (ESModule), é
  necessário fazer uma alteração no package.js.

```
"type": "module",
```

- Middleware é todo tipo de função que está entre um pedido HTTP e a resposta
  final que o servidor envia de volta para o cliente.

- No node, a '#' serve para definir uma variável/função como privada. ex:

```
const #database

#log(data) {
console.log(data)
}
```
