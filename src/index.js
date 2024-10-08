import e from "express";
import "dotenv/config.js";
import "./config/db.js";
import user_router from "./routes/user-route.js";
import post_router from "./routes/post-route.js"

const app = e();

app.get("/", (req, res) => {
  res.send("servidor rodando")
           })

app.use(e.json());
app.use("/user", user_router);
app.use("/post", post_router);

app.listen(process.env.API_PORT, () => console.log("Server running"));
