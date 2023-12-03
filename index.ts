import express, { Express, Request, Response } from "express";
const PORT = 8000;

const app: Express = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from express + TS");
});
app.get("/hi", (req: Request, res: Response) => {
  res.send("Ciao");
});

app.listen(PORT, () => {
  console.log(`now listening on port ${PORT}`);
});
