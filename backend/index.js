const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const {mongoose} = require('./database');
const {json} = require("express");

app.set('port',process.env.PORT || 3000);

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.use('/api/juguetes',require('./routes/juguetes.route'));
app.use('/',(req,res) => res.send('API situada en /api/juguetes'));

app.listen(app.get('port'), () => {
    console.log('Server en puerto: ', app.get('port'));
})
