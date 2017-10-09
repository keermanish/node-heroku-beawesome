const express = require('express');
const app = express();

app.get('/', function(req, res) {
  res.send('Hii');
});

app.listen(process.env.PORT || 8080, function() {
  console.log('App listen on 8080');
});
