const keys = require('./keys');


// Express App Setup
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Postgres Client Setup
const { Pool } = require('pg');
const pgClient = new Pool({
  user: keys.pgUser,
  host: keys.pgHost,
  database: keys.pgDatabase,
  password: keys.pgPassword,
  port: keys.pgPort
});
pgClient.on('error', () => console.log('Lost PG connection'));



app.get('/api/current', async (req, res) => {
  console.log('inside curr');
    res.send("abc");
  
});

app.use("/api/fecthUsers", async (req, res) => {
  console.log('inside fetch queries')
  //const client = await pgPool.connect();
  let searchText = req.query.searchText;
  console.log(searchText)
  let query = `select * from public.user where firstname ilike \'%${searchText}\%' 
  `.replace(/"/g, "")
  
 // query = 'select  concat(post,created_at)  as tweet from public.tweets where user_id = 'LPR1q8RgOJU74qQosz22cYPIjkI3';
console.log(query)
  try {
    var dbdata = await  pgClient.query(query);
    
  } catch (e) {
   // await client.release();
    res.status(400).send(e);
  }
  //await client.release();
  console.log(dbdata.rows)
  res.status(200).send(dbdata.rows);
});

app.use("/api/getMyTweets", async (req, res) => {
  console.log('inside my queries')
  //const client = await pgPool.connect();
  let userId = req.query.userId;
  console.log(userId)
  let query = `select post ,created_at from public.tweets where user_id = \'${userId}\' 
  `.replace(/"/g, "")
  
 // query = 'select  concat(post,created_at)  as tweet from public.tweets where user_id = 'LPR1q8RgOJU74qQosz22cYPIjkI3';
console.log(query)
  try {
    var dbdata = await  pgClient.query(query);
    
  } catch (e) {
   // await client.release();
    res.status(400).send(e);
  }
  //await client.release();
  console.log(dbdata.rows)
  res.status(200).send(dbdata.rows);
});

app.post('/api/register', async (req, res) => {
    console.log('came');
  const fId = req.body.firebaseId;
  const name = req.body.name;


  let query = 'INSERT INTO public.user(firebaseID, firstname) VALUES( $1 ,$2)';
  
  pgClient.query(query, [fId,name]);

  res.send({ registered: true });
});

app.post('/api/storetweet', async (req, res) => {
    console.log('came');
  const fId = req.body.firebaseId;
  const tweet = req.body.tweet;


  let query = 'INSERT INTO public.tweets(user_id, post) VALUES( $1 ,$2)';
  
  pgClient.query(query, [fId,tweet]);

  res.status(200).send({ tweeted: true });
});

var server = app.listen(5000, function () {
    var host = server.address().address
    var port = server.address().port
    
    console.log("Example app listening at http://%s:%s", host, port)
 })
