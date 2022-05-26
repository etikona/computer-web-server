const express = require('express')
const cors = require('cors');
require('dotenv').config;
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express()
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://computer-bd:6Oa19KLbcD4IC9ru@cluster0.ars20.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
      try {
        await client.connect();
        const partsCollection = client.db('computer-bd').collection('parts');

        app.get('/parts', async(req, res) =>{
          const query = {};
          const cursor = partsCollection.find(query);
          const parts = await cursor.toArray();
          res.send(parts);
        })
      }

      finally {

      }
}

run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Hello from computer BD!')
})

app.listen(port, () => {
  console.log(`Computer BD listening on port ${port}`)
})