import { Database } from "./database.js";
import { randomUUID } from "node:crypto";
import { buildRoutePath } from "./utils/build-route-path.js";

const database = new Database();

export const routes = [
  {
    method: "GET",
    path: buildRoutePath("/tasks"),
    handler: (req, res) => {
      const tasks = database.select("tasks");
      return res.end(JSON.stringify(tasks));
    },
  },
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
          completed_at: false,
        };
        database.insert("tasks", task);
        return res.end();
      } catch {
        return res.writeHead(400).end();
      }
    },
  },
  {
    method: "PUT",
    path: buildRoutePath("/tasks/:id"),
    handler: (req, res) => {
      const { id } = req.params;
      const task = database.selectById("tasks", id);
      try {
        const { title, description } = req.body;
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
