const express = require('express');
const router = express.Router();
const Client = require('../models/Client');

router.post('/admin/populate-data', async (req, res) => {
  await Client.deleteMany({});
  const data = require('../data.json');
  const promises = [];
  data.forEach((c) => {
    const client = new Client(c);
    promises.push(client.save());
  });
  const clients = await Promise.all(promises);
  res.json({ status: 'success', data: clients });
});

router.post('/clients', async (req, res) => {
  const client = new Client(req.body);
  await client.save();
  res.send(client);
});

router.get('/clients', async (req, res) => {
  Client.find({})
    .sort({ firstContact: -1 })
    .exec((err, clients) => res.send(clients));
});

router.put('/clients', async (req, res) => {
  const data = req.body;
  Client.findByIdAndUpdate(data._id, data, (err, data) => {
    res.send(data);
  });
});

router.delete('/clients/:_id', async (req, res) => {
  const { _id } = req.params;
  Client.findByIdAndDelete({ _id }, (err, data) => {
    res.send(data);
  });
});

module.exports = router;
