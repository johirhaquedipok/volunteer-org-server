const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 9000;

// middleware

app.use(cors());
// parse application/json
app.use(bodyParser.json());

//  mongodb Connection Code

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://monogodbuserDipok:<password>@cluster0.isfsk8s.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
client.connect((err) => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  console.log("mongoDb Connected");
  client.close();
});

// server

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
