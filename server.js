const path = require('path');
const express = require('express');

const app = express();

app.use(express.static(path.join(__dirname, 'dist')));
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'), (err) => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

app.set('port', process.env.PORT || 8080);

const server = app.listen(app.get('port'), () => {
  // eslint-disable-next-line no-console
  console.log('listening on port ', server.address().port);
});
