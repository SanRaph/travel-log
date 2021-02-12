const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();


const middlewares = require('./middlewares');

const logs = require('./api/logs');


const app = express();

mongoose.connect( 'mongodb+srv://sanraph:sanraph1990@travel-log.opg3j.mongodb.net/travel-log?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true,} );

if(process.env.NODE_ENV === 'production') {
    app.use(express.static("client/build"));
}

app.use(morgan('common'));
app.use(helmet());
app.use(cors( ));
//app.use(cors( {origin: process.env.CORS_ORIGIN,} ));
app.use(express.json());
app.get('/', (req, res) => {
    res.json({
        message: 'Hello world'
    });
});

app.use('/api/logs', logs);

app.use( middlewares.notFound );


app.use( middlewares.errorHandler );

const PORT = process.env.PORT || 5000;

app.listen( PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`)
});