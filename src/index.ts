import express from "express";
import CORS from "cors";
import router from "./router";
import { connect } from "./config/sequelize";

const port = process.env.PORT;

const app = express();
app.use(CORS());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

app.listen(port, () => {
  connect();
  console.log(`Listening on port ${port}, http://localhost:${port}`);
});
