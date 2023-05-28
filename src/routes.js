import { Database } from "./database.js";
import { randomUUID } from "node:crypto";

const database = new Database();

export const routes = [
  {
    method: "GET",
    path: "/tasks",
    handler: (req, res) => {
      const tasks = database.select("tasks");
      return res.end(JSON.stringify(tasks));
    },
  },
  {
    method: "POST",
    path: "/tasks",
    handler: (req, res) => {
      const { title, description } = req.body;
      const task = {
        id: randomUUID(),
        title,
        description,
        created_at: new Date(),
        completed_at: null,
        updated_at: null,
      };

      database.insert("tasks", task);
      return res.end();
    },
  },
];
