// No node, a '#' serve para definir uma variável/função como privada.

import fs from "node:fs/promises";

//Criação do 'db.json' relativo a URL do arquivo database.js
const databasePath = new URL("../db.json", import.meta.url);

export class Database {
  #database = {};

  //Ao iniciar o servidor, tenta recuperar os arquivos contidos no db.json.
  //Caso o db.json não exista, ele cria o arquivo vazio.
  constructor() {
    fs.readFile(databasePath, "utf8")
      .then((data) => {
        this.#database = JSON.parse(data);
      })
      .catch(() => {
        this.#persist();
      });
  }

  #persist() {
    fs.writeFile(databasePath, JSON.stringify(this.#database));
  }

  select(table) {
    const data = this.#database[table] ?? [];
    return data;
  }

  insert(table, data) {
    if (Array.isArray(this.#database[table])) {
      this.database[table].push(data);
    } else {
      this.#database[table] = data;
    }

    //Persistência. Toda vez que um novo dado for inserido, será salvo no db.json
    this.#persist();

    return data;
  }
}
