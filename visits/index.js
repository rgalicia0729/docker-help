const express = require('express');
const redis = require('redis');

const app = express();
const redisClient = redis.createClient({
  host: 'redis-server',
  port: 6379
});
redisClient.set('visits', 0);

app.get('/', (_, res) => {
  redisClient.get('visits', (_, visits) => {
    res.send(`Number of visits is ${visits}`);
    redisClient.set('visits', visits + 1);
  });
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});