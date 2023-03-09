const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;

// user: dbuser2
// pass: jTqDJbMl6b3MeAct

app.use(cors());
app.use(express.json());

const uri =
  "mongodb+srv://dbuser2:jTqDJbMl6b3MeAct@cluster0.xgh8h2c.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
async function run() {
  try {
    const userCollection = client.db("nodeMongoCrud").collection("users");
    app.get("/users", async (req, res) => {
      const query = {};
      const cursor = userCollection.find(query);
      const users = await cursor.toArray();
      res.send(users);
    });
    app.get("/users/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const user = await userCollection.findOne(query);
      res.send(user);
    });
    app.post("/users", async (req, res) => {
      const user = req.body;
      const result = await userCollection.insertOne(user);
      res.send(result);
      console.log(user);
    });
    app.delete("/users/:id", async (req, res) => {
      const id = req.params.id;
      //   console.log("trying to delete ", id);
      const ID = new ObjectId(id);
      const query = { _id: ID };
      console.log(query);
      const result = await userCollection.deleteOne(query);
      console.log(result);
      res.send(result);
    });
  } finally {
  }
}

run().catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello from node mongo crud server");
});
app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
