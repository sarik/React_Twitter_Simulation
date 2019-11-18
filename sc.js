//const keys = require('./keys');


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
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "postgres_password",
  port: "5432"
});
pgClient.on('error', () => console.log('Lost PG connection'));




pgClient.connect().
then(client => {
  client.query("drop table IF EXISTS public.userr");
  return client
}).
then(client => {
  client.query("drop table IF EXISTS public.user2");
  return client
}).
then(client => {
  client.query("drop table IF EXISTS public.user3");
  return client
}).then(client => {
  client.query("CREATE TABLE IF NOT EXISTS USERc (firebaseID varchar PRIMARY key ,firstname varchar,lastname varchar,created_at timestamp default now())");
  return client
})
  .then(client => {
    client.query(`CREATE TABLE IF NOT EXISTS public.tweetsc (
      id SERIAL PRIMARY key ,
      user_id varchar,
      post varchar(140),
      created_at timestamp default now()
    )`);
    return client
  }).then(client => {
    client.query(`CREATE TABLE IF NOT EXISTS public.followersc (
      id  varchar PRIMARY key ,
      followers varchar[],
      updated_at timestamp default now()
     
    )`);
    return client
  }).then(client => client.release())








app.get('/current', async (req, res) => {
  console.log('inside curr');
  res.send("abc");

});

app.use("/fecthUsersold", async (req, res) => {
  try {
    console.log('inside fetch queries')
    //const client = await pgPool.connect();
    let searchText = req.query.searchText;
    console.log(searchText)
    let query = `select * from user where firstname ilike \'%${searchText}\%' 
  `.replace(/"/g, "")

    // query = 'select  concat(post,created_at)  as tweet from tweets where user_id = 'LPR1q8RgOJU74qQosz22cYPIjkI3';
    console.log(query)


    const client = await pgClient.connect();
    var dbdata = await client.query(query);
    await client.release();
    //await client.release();
    console.log(dbdata.rows)
    res.status(200).send(dbdata.rows);

  } catch (e) {
    if (client)
      await client.release();
    res.status(400).send(e);
  }

});

app.use("/fecthUsers", async (req, res) => {
  try {
    console.log('inside fetch queries')
    //const client = await pgPool.connect();
    let searchText = req.query.searchText;
    let userId = req.query.userId;
    console.log(searchText)

    let query = `select *,
 array[firebaseid] <@ (select followers from followers where id = \'${userId}\'  ) as dofollow
   from user where firstname ilike \'%${searchText}\%' 
   `.replace(/"/g, "")

    //let query = `select * from user where firstname ilike \'%${searchText}\%' 
    //`.replace(/"/g, "")

    // query = 'select  concat(post,created_at)  as tweet from tweets where user_id = 'LPR1q8RgOJU74qQosz22cYPIjkI3';
    console.log(query)



    const client = await pgClient.connect();
    var dbdata = await client.query(query);
    await client.release();
    //var dbdata = await pgClient.query(query);

    console.log(dbdata.rows)
    res.status(200).send(dbdata.rows);

  } catch (e) {
    if (client)
      await client.release();
    res.status(400).send(e);
  }
  //await client.release();

});

app.use("/getMyTweets", async (req, res) => {
  try {
    console.log('inside my queries')
    //const client = await pgPool.connect();
    let userId = req.query.userId;
    console.log(userId)
    let query = `select post ,created_at from tweets where user_id = \'${userId}\' 
  `.replace(/"/g, "")

    // query = 'select  concat(post,created_at)  as tweet from tweets where user_id = 'LPR1q8RgOJU74qQosz22cYPIjkI3';
    console.log(query)

    //var dbdata = await pgClient.query(query);
    //await client.release();
    const client = await pgClient.connect();
    var dbdata = await client.query(query);
    await client.release();
    console.log(dbdata.rows)
    res.status(200).send(dbdata.rows);

  } catch (e) {
    if (client)
      await client.release();
    res.status(400).send(e);
  }

});

app.use("/getFollowerTweets", async (req, res) => {
  try {
    console.log('inside my queries')
    //const client = await pgPool.connect();
    let userId = req.query.userId;
    console.log(userId)

    let query = `select post ,a.created_at as created_at ,firstname from tweets a
  join "user" b
  on b.firebaseid = a.user_id
    where  array[a.user_id] <@  (select followers from followers where id =  \'${userId}\' )`.
      replace(/"/g, "")

    console.log(query)

    const client = await pgClient.connect();
    var dbdata = await client.query(query);
    await client.release();
    // var dbdata = await pgClient.query(query);

    //await client.release();
    console.log(dbdata.rows)
    res.status(200).send(dbdata.rows);

  } catch (e) {
    if (client)
      await client.release();
    res.status(400).send(e);
  }

});




app.post('/register', async (req, res) => {
  try {
    console.log('came');
    const fId = req.body.firebaseId;
    const name = req.body.name;


    let query = 'INSERT INTO user(firebaseID, firstname) VALUES( $1 ,$2)';

    await pgClient.query(query, [fId, name]);

    query = 'INSERT INTO followers(id) VALUES( $1)';

    const client = await pgClient.connect();
    var dbdata = await client.query(query, [fId]);
    await client.release();
    //await pgClient.query(query, [fId]);

    res.status(200).send({ registered: true });

  } catch (e) {
    if (client)
      await client.release();
    res.status(400).send({ registered: false });

  }
});

app.post('/toggleFollowing', async (req, res) => {
  try {
    console.log('came');
    const user = req.body.user;
    const follower = req.body.follower;
    const action = req.body.action;

    let query = "";
    if (action === "follow")

      query = 'UPDATE followers SET followers = array_append(followers, $2 ) where id = $1';

    else
      query = 'UPDATE followers SET followers = array_remove(followers, $2 ) where id = $1';

    //pgClient.query(query, [user, follower]);
    const client = await pgClient.connect();
    var dbdata = await client.query(query, [user, follower]);
    await client.release();

    res.status(200).send({ registered: true });

  } catch (e) {
    if (client)
      await client.release();
    res.status(400).send({ registered: false });
  }
});

app.post('/storetweet', async (req, res) => {
  try {
    console.log('came');
    const fId = req.body.firebaseId;
    const tweet = req.body.tweet;


    let query = 'INSERT INTO tweets(user_id, post) VALUES( $1 ,$2)';

    const client = await pgClient.connect();
    var dbdata = await client.query(query, [fId, tweet]);
    await client.release();
    //pgClient.query(query, [fId, tweet]);

    res.status(200).send({ tweeted: true });
  }
  catch (e) {
    if (client)
      await client.release();
    res.status(400).send({ tweeted: false });

  }
});

var server = app.listen(5000, function () {
  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

})
