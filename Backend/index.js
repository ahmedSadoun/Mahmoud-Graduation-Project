import express from "express";
import cors from "cors";
import {
  print,
  logIn,
  getGroups,
  createUser,
  createUserGroups,
  getPages,
  createGroup,
  createGroupPages,
} from "./Services.js";
const app = express();
app.use(express.json());
const port = 3000;
app.use(cors());

app.get("/login", async (req, res) => {
  try {
    const { username, password } = req.headers;
    // console.log(username, password);
    const result = await logIn(username, password);
    // console.log(result);
    res.send(result);
  } catch (error) {
    res.status(500).send("Internal Server Error!");
  }
});
app.get("/groups", async (req, res) => {
  try {
    const { group_name } = req.query;
    // console.log(req.query);
    const result = await getGroups(group_name);
    // console.log(result);
    res.send(result);
  } catch (error) {
    res.status(500).send("Internal Server Error!");
  }
});
app.get("/pages", async (req, res) => {
  try {
    // console.log(req.query);
    const result = await getPages();
    // console.log(result);
    res.send(result);
  } catch (error) {
    res.status(500).send("Internal Server Error!");
  }
});
app.post("/createUser", async (req, res) => {
  try {
    const reqBody = req.body;
    // console.log(req.query);
    const result = await createUser(reqBody);
    // console.log(result);
    res.send(result);
  } catch (error) {
    res.status(500).send("Internal Server Error!");
  }
});
app.post("/createGroup", async (req, res) => {
  try {
    const reqBody = req.body;
    // console.log(req.query);
    const result = await createGroup(reqBody);
    // console.log(result);
    res.send(result);
  } catch (error) {
    res.status(500).send("Internal Server Error!");
  }
});
app.post("/createUserGroups", async (req, res) => {
  try {
    const reqBody = req.body;
    const { user_id } = req.query;
    // console.log(req.query);
    const result = await createUserGroups(reqBody, user_id);
    // console.log(result);
    res.send(result);
  } catch (error) {
    res.status(500).send("Internal Server Error!");
  }
});
app.post("/createGroupPages", async (req, res) => {
  try {
    const reqBody = req.body;
    const { group_id } = req.query;
    // console.log(req.query);
    const result = await createGroupPages(reqBody, group_id);
    // console.log(result);
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
