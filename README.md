# Tasks API

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
