import Express from "express";
import router from "./routes";
import cors from "cors";

const app = Express();
const Port = 3000;

app.use(cors());
app.use(Express.json());

app.use("/api/v1", router);

app.listen(Port, () => {
  return console.log(`Express is listening at  http://localhost:${Port} `);
});
