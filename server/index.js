const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();


//Del archivo requiero la conexion (mongoose)
const { mongoose } = require('./database');

//settings
app.set('port', process.env.PORT || 3000);


//Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());


//Routes
app.use('/api/employees',require('./routes/employee.routes'));


//Starting the server
app.listen(app.get('port'),()=>{
    console.log('Server on port ', app.get('port'));
    
})

