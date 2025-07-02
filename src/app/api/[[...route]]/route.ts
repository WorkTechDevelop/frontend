import { Hono } from "hono";
import { logger } from "hono/logger";
import { handle } from "hono/vercel";

// Создаем базовое приложение Hono без старых роутов Appwrite
const app = new Hono().basePath("/api");

app.use(logger());

// Временная заглушка для API
app.get("/health", (c) => {
  return c.json({ status: "ok", message: "WorkTech API ready" });
});

// Fallback для неизвестных роутов
app.all("*", (c) => {
  return c.json({ error: "Not Found" }, 404);
});

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);
