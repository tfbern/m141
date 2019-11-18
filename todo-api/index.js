const express = require('express')
const app = express()
app.use(express.json())

// add routes
const router = require('./router.js');
app.use('/api', router);

app.listen(3000, () => console.log("Listening on port 3000"))