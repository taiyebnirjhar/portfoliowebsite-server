const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");

const app = express();
const port = process.env.PORT || 5000;

// middle_wares

app.use(cors());
app.use(express.json());

/****************************/

const uri =
  "mongodb+srv://taiyebnirjhor:root@cluster0.nwfsz3t.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

(async function () {
  try {
    const menu = client.db("portfolio").collection("projects");

    /*****************************[read]***********************************/

    app.get("/", async (req, res) => {
      const query = {};
      const cursor = menu.find(query);
      const services = await cursor.toArray();
      res.send(services);
    });

    app.get("/projects/:id", async (req, res) => {
      const id = req.params.id;

      const query = {
        name: `${id}`,
      };
      console.log(id, query);
      const cursor = menu.find(query);

      const selectedProject = await cursor.toArray();

      console.log(query);
      res.send(selectedProject);
    });
    /*************************************/
  } finally {
    console.log("done");
  }
})().catch((err) => console.error(err));

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
