const express = require('express');
const res = require('express/lib/response');
const app = express();
const morgan = require('morgan');
const path = require('path');

// configuracion
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));

// rutas
//app.use(require('./routes/rutas'));

app.get('/login',(req,res)=> {
    res.sendFile(path.join(__dirname,'views','index.html'));
});

// middlewares
app.use(morgan('dev'));

// static files
app.use(express.static(path.join(__dirname, 'public')));

// listening the Server
app.listen(app.get('port'), () => {
    console.log('INDEX servidor corriendo', app.get('port'));
  });