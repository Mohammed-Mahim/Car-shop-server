const express = require('express')
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config()

const app = express()
const port = process.env.PORT || 5000;
const ObjectId = require('mongodb').ObjectId;

// middleware 
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.1hx2i.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
console.log(uri);


async function run(){
    try{
        await client.connect();
        const database = client.db("carItem");
        const productsCollection = database.collection("products");
        
        // get packages to server
        app.get('/products', async (req,res)=>{
            const result = await productsCollection.find({}).toArray();
            console.log(result);
            res.json(result);
        });
    }
    finally{
        // await
    }
}


app.get('/', (req, res) => {
  res.send('Car Server Running...')
})
console.log('database connected');
app.listen(port, () => {
  console.log(`Example app listening at ${port}`)
})