require('./config/conexion');
const express = require('express');
const PORT = (process.env.PORT || 3000);
const session = require('express-session');
const cors = require('cors');
//express
const app = express();

//sesion
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}))

app.use(cors());
//admitir
app.use(express.json())

//Config
app.set('port',PORT)

//Routes
app.use('/api', require('./rutas'))


//iniciar express
app.listen(app.get('port'),(error)=>{
    if(error){
        console.log('Error initializing server ' + error)
    }
    else{
        console.log('Server connected in port: ' + PORT)
    }
})



