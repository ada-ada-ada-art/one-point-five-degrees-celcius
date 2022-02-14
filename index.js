const express = require('express')

const app = express()
const port = 4000

app.use(express.json()) // for parsing application/json


app.use('/public', express.static('public'))
app.use('/node_modules', express.static('node_modules'))
app.get('/', (req, res) => {
    res.sendFile('index_dev.html', { root: __dirname })
})

app.listen(port, () => {
    console.log(`Success! Your application is running on port ${port}.`)
})
