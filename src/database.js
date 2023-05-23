// No node, a '#' serve para definir uma variável/função como privada.

import fs from "node:fs/promises";

//Criação do 'db.json' relativo a URL do arquivo database.js
const databasePath = new URL("../db.json", import.meta.url);

export class Database {
  #database = {};

  constructor() {}

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

    this.#persist();

    return data;
  }
}
