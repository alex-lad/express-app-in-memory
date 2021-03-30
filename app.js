const express = require('express')
const app = express()

app.set('port', process.env.PORT || 3000);

app.get('/', (req, res) => {
  res.send('')
})

app.listen(app.get('port'), () => {
  console.log(`Listening at http://localhost:` + app.get('port'))
})