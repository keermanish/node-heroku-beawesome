const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const dbConnection = require('./db');
const Todo = require('./model');
const {avatarUpload} = require('./upload');

const app = express();

/* parse application/x-www-form-urlencoded */
app.use(bodyParser.urlencoded({ 'extended': false }));

/* parse application/json */
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('by');
});

app.post('/', (req, res) => {
  res.send('Hii');
});

app.post('/avatar', avatarUpload, (req, res) => {
  res.send(req.file.filename);
});

app.get('/uploads/avatar/:file', (req, res) => {
  if(req.params.file) {
    res.sendFile(path.join(__dirname, './uploads/avatar', req.params.file));
  } else {
    res.status(404).send('No such file or directory');
  }
});

app.listen(process.env.PORT || 8080, ()  => {
  console.log('App listen on 8080');
});
