import { Database } from "./database.js";
import { randomUUID } from "node:crypto";
import { buildRoutePath } from "./utils/build-route-path.js";

const database = new Database();

export const routes = [
  /* Listagem de Tasks */
  {
    method: "GET",
    path: buildRoutePath("/tasks"),
    handler: (req, res) => {
      const tasks = database.select("tasks");
      return res.end(JSON.stringify(tasks));
    },
  },
  /* Criação de uma Task */
  {
    method: "POST",
    path: buildRoutePath("/tasks"),
    handler: (req, res) => {
      try {
        const { title, description } = req.body;
        const task = {
          id: randomUUID(),
          title,
          description,
          created_at: new Date(),
          updated_at: new Date(),
          completed_at: null,
        };
        database.insert("tasks", task);
        return res.end();
      } catch {
        return res.writeHead(400).end();
      }
    },
  },
  /* Edição de uma Task */
  {
    method: "PUT",
    path: buildRoutePath("/tasks/:id"),
    handler: (req, res) => {
      const { id } = req.params;
      const task = database.selectById("tasks", id);
      try {
        const { title, description, completed_at } = req.body;
        if (!!title || !!description) {
          const taskEdit = {
            ...task,
            title: title ?? task.title,
            description: description ?? task.description,
            updated_at: new Date(),
          };
          database.edit("tasks", id, taskEdit);

          return res.end();
        } else {
          return res.writeHead(400).end();
        }
      } catch {
        return res.writeHead(400).end();
      }
    },
  },
  /* Marcar uma Task como completa */
  {
    method: "PATCH",
    path: buildRoutePath("/tasks/:id/complete"),
    handler: (req, res) => {
      const { id } = req.params;
      const task = database.selectById("tasks", id);
      if (task) {
        if (task.completed_at) {
          const taskEdit = {
            ...task,
            completed_at: null,
          };
          database.edit("tasks", id, taskEdit);
        } else {
          const taskEdit = {
            ...task,
            completed_at: new Date(),
          };
          database.edit("tasks", id, taskEdit);
        }
        return res.end();
      }
      return res.writeHead(404).end();
    },
  },
  /* Deletar uma Task */
  {
    method: "DELETE",
    path: buildRoutePath("/tasks/:id"),
    handler: (req, res) => {
      const { id } = req.params;
      database.delete("tasks", id);
      return res.writeHead(204).end();
    },
  },
];
