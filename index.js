const express = require('express')
const { getConnection } = require('./db/db-connect-mongo');
const cors = require('cors')
require('dotenv').config();

const app = express()
const port = process.env.PORT || 9000

app.use(cors())

getConnection();

app.use(express.json());


app.use('/usuario', require('./router/usuario'))
app.use('/deporte', require('./router/deporte'))
app.use('/equipo', require('./router/equipo'))
app.use('/evento', require('./router/evento'))


app.listen(port, () => {
    console.log(`API REST corriendo en el puerto ${port}`)
})