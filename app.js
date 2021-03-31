const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const stackRouter = require('./app/routes/api/stack.route');
const ttlRouter = require('./app/routes/api/ttl.route');

const DEFAULT_PORT = 3000;

app.use(bodyParser.json())
app.use('/api/stack', stackRouter);
app.use('/api/ttl', ttlRouter);

app.set('port', process.env.PORT || DEFAULT_PORT);

const server = app.listen(app.get('port'), () => {
  console.log(`Listening at http://localhost:` + app.get('port'));
})

module.exports = server
