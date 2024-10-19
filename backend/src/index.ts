import "reflect-metadata";
import express from "express";
import cors from "cors";
import { dataSource } from "./datasource";

import { router as AdsRouter } from "./controllers/ads";
import { router as CategoriesRouter } from "./controllers/categories";
import { router as TagsRouter } from "./controllers/tags";

const app = express();
const port = 3000;

app.use(express.json())
app.use(
  cors({
    origin:"http://localhost:5173"
}))

app.use("/ads", AdsRouter);
app.use("/categories", CategoriesRouter);
app.use("/tags", TagsRouter);

app.get("/", (req, res) => {
  res.json("Hello World!");
});

async function initialize() {
  await dataSource.initialize()
  console.log("Database is connected")
  app.listen(port, () => {
    console.log(`The-good-corner app listening on port ${port} 🚀`);
  });
}

initialize();