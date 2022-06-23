const express = require('express');
const app = express();

const cookieParser = require('cookie-parser'); //middleware
app.use(cookieParser());

const cookieSession = require('cookie-session')
app.set('trust proxy', 1) // trust first proxy

const port = process.env.PORT || 3000;

// Session Counting
app.use(cookieSession({
    name: 'session',
    keys: ['key1', 'key2']
}))




app.get('', function(req, res, next) {
    res.cookie('username', 'riddhijain9230@gmail.com', { maxAge: 9000 }).send(`<h1> Cookie has been set :</h1> <br/>Hit url for setCookies : http://localhost:3000/get <br/> Hit url for deleteCookies : http://localhost:3000/delete <br/>Hit url for Count Visit : http://localhost:3000/count`);

})

app.get('/get', function(req, res) {

    // Print Cookies on bro 
    res.send(req.cookies)
        // Print Cookies in Console
    console.log(req.cookies);

})

app.get('/delete', function(req, res) {
    res.clearCookie('username').send('Cookie has been removed')
})

app.get('/count', function(req, res, next) {
    // Update views
    req.session.views = (req.session.views || 0) + 1

    // Write response
    res.end('<h1> ' + req.session.views + ' views </h1>')
})


app.listen(port);
console.log('port' + port)