import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import env from "dotenv";
import compression from "compression";
import { errorHandler } from "./middlewares/filter.error.js";
import connentDB from "./utils/init.mongodb.js";
import profileRoter from "./routers/profile.router.js";
import authRouter from "./routers/authen.router.js";
import postRouter from "./routers/post.router.js";
import commentRouter from "./routers/comment.router.js";

const app = express();
env.config();

const PORT = process.env.PORT || 5000;

app.use(
  compression({
    level: 6,
    threshold: 100 * 1000,
    filter: function (req, res) {
      if (req.headers["x-no-compress"]) return;

      return compression.filter(req, res);
    },
  })
);
app.use(cors());
app.use(bodyParser.json());

app.use("/api/profile", profileRoter);
app.use("/api/comment",commentRouter)
app.use("/api/auth", authRouter);
app.use("/api/post", postRouter);

app.use(errorHandler);

connentDB()
  .then((data) => {
    console.log(data);
    app.listen(PORT, () => console.log("server is running" + " " + PORT));
  })
  .catch((err) => {
    console.log(err);
    console.log("server not running ...");
  });
