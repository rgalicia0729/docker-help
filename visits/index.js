const express = require('express');
const mongoose = require('mongoose');

const app = express();

(async () => {
  await mongoose.connect('mongodb://mongodb-server:27017/visits');
})();

const countSchema = new mongoose.Schema({
  key: String,
  value: Number
});

const CountVisit = mongoose.model('counts', countSchema);

app.get('/', async (_, res) => {
  const countVisit = await CountVisit.findOne({ key: 'visits' });

  if (!countVisit) {
    const countVisit = new CountVisit({
      key: 'visits',
      value: 1
    });
    await countVisit.save();
  } else {
    await CountVisit.updateOne({ key: 'visits' }, { value: countVisit ? countVisit.value + 1 : 0 });
  }


  res.send(`Number of visits ${countVisit ? countVisit.value : 0}`)
});


app.listen(3000, () => {
  console.log('Listening on port 3000');
});