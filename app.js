const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const stackRouter = require('./app/routes/api/stack.route');

const DEFAULT_PORT = 3000;

app.use(bodyParser.json())
app.use('/api/stack', stackRouter);

app.set('port', process.env.PORT || DEFAULT_PORT);

app.listen(app.get('port'), () => {
  console.log(`Listening at http://localhost:` + app.get('port'));
})
