import express from "express";
import cors from "cors";
import { print, example } from "./Services.js";
const app = express();
app.use(express.json());
const port = 3000;
app.use(cors());

app.post("/example", async (req, res) => {
  try {
    const commentContent = req.body;
    const result = await createComments(commentContent);
    res.send(result);
  } catch (error) {
    res.status(500).send("Internal Server Error!");
  }
});

app.get("/", (req, res) => {
  //   print();
  res.send("<h1>Up And Running</h1>");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
