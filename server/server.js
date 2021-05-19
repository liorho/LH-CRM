const express = require('express');
const app = express();
const api = require('./routes/api');
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://liorho:hoshea1234@cluster-1.fbmhg.mongodb.net/lh-crm?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useFindAndModify: false,
});

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', api);

const port = process.env.PORT || 4000;
app.listen(port, function () {
  console.log(`Running server on port ` + port);
});