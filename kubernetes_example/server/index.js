const express = require('express');
const cors = require('cors');

const { Pool } = require('pg');
const { createClient } = require('redis');
const keys = require('./keys');

const app = express();
app.use(express.json());
app.use(cors());

const pgClient = new Pool({
  host: keys.pgHost,
  port: keys.pgPort,
  database: keys.pgDatabase,
  user: keys.pgUser,
  password: keys.pgPassword
});

pgClient.on('error', () => console.error('Lost PG connection'));

pgClient
  .query('CREATE TABLE IF NOT EXISTS values (number INT)')
  .catch(err => console.error(err));

const redisClient = createClient({
  url: `redis://@${keys.redisHost}:${keys.redisPort}`
});
let subscriber;

(async () => {
  redisClient.on('error', (err) => console.error('Redis client error', err));

  await redisClient.connect();

  subscriber = redisClient.duplicate();
  await subscriber.connect();
})();

app.get('/', (_, res) => {
  res.send('Hi');
});

app.get('/values/all', async (_, res) => {
  const values = await pgClient.query('SELECT * FROM values');

  res.send(values.rows);
});

app.get('/values/current', async (_, res) => {
  const values = await redisClient.hGetAll('values');

  res.send(values);
});

app.post('/values', async (req, res) => {
  const { index } = req.body;

  if (parseInt(index) > 40) {
    return res.status(422).send('Index too high');
  }

  await redisClient.hSet('values', index, 'Nothing yet!!');
  await subscriber.publish('insert', index);
  await pgClient.query('INSERT INTO values (number) VALUES ($1)', [index]);

  res.send({
    working: true
  });
});

app.listen(3001, () => {
  console.log('Listening on port 3001');
});

