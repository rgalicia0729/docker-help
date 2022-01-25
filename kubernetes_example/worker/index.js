const { createClient } = require('redis');
const keys = require('./keys');

const redisClient = createClient({
  url: `redis://@${keys.redisHost}:${keys.redisPort}`
});

const fib = (index) => {
  if (index < 2) return 1;
  return fib(index - 1) + fib(index - 2);
};

(async () => {
  redisClient.on('error', (err) => console.error('Redis client error', err));

  await redisClient.connect();

  const subscriber = redisClient.duplicate();
  await subscriber.connect();

  await subscriber.subscribe('insert', (message) => {
    redisClient.hSet('values', message, fib(parseInt(message)));
  });
})();
