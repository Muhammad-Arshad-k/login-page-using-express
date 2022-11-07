const express = require('express')
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
const app = express()
const products = require('./app.json')
app.set('view engine','hbs')

const oneDay = 1000 * 60 * 60 * 24;
app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false 
}));
// privent storing cache
app.use((req,res, next)=> {
    res.header('cache-control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0')
    next();
    
})
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//serving public file
app.use(cookieParser());
//username and password
const email = 'muhammadarshad8935@gmail.com'
const password = '12345'

// a variable to save a session
var session;

app.get('/',(req,res)=>{
    session=req.session;
   if(session.userid){
    res.redirect('home')
   }else{
    res.render('login')
   }
   
})
let a = 'invalid user name or password'
app.post('/login',(req,res)=>{
    
    if (req.body.email === email && req.body.pass=== password){
        console.log(req.body)
        //session creation
        session = req.session
        session.userid = req.body.email
        console.log(req.session)
        res.redirect('home');
    } else {
        res.render('login',{a})
    }
})

app.get('/home',(req,res)=>{
    
    session = req.session
    if (session.userid){
        res.render('home',{products})
    }else{
        
        res.render('login')
    }
})

app.get('/signout',(req,res)=>{
    req.session.destroy();
    res.redirect('/')
})


app.listen(9000,()=> console.log('Program Running'));