const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const port = process.env.PORT || 9000;

// middleware

app.use(cors());
// parse application/json
app.use(bodyParser.json());
// env using
require("dotenv").config();

//  mongodb Connection Code
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.isfsk8s.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();
    const volunteerCollection = client
      .db("volunteerDb")
      .collection("volunteerData");

    // getting all data
    app.get("/db", async (req, res) => {
      const query = {};
      const cursor = volunteerCollection.find(query);
      const volunteers = await cursor.toArray();
      res.send(volunteers);
    });

    // getting single data
    app.get("/db/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const volunteer = await volunteerCollection.findOne(query);
      res.send(volunteer);
    });

    // post data
    app.post("/db", async (req, res) => {
      const newVolunteer = req.body;
      const result = await volunteerCollection.insertOne(newVolunteer);
      res.send(result);
    });

    // DELETE a document
    app.delete("/users/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const restResult = await volunteerCollection.deleteOne(query);
      res.send(restResult);
    });
  } finally {
    // await client.close();
  }
}

run().catch(console.dir);

// server

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
