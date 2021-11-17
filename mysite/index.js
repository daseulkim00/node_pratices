const express = require('express');
const path = require('path');
const http  = require('http');
const dotenv = require('dotenv');

//모듈
//const emaillistRouter = require('./routes/emaillist');

//구조분리하기
//1.Environment Variables
//dotenv라이브러리가 이를 도와준다
//app.env
dotenv.config({
    path: path.join(__dirname, 'config/app.env')
});





//Application Setup
const application = express()
//express();가 리턴하는 객체에서 바로 .use 사용가능
    //1. static resources 
    .use(express.static(path.join(__dirname, 'public')))
    //2. request body parser
    .use(express.urlencoded({extended: true})) // application/x-www-form-urlencoded
    .use(express.json()) // application/json
    //3. view engine setup
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')
    //4. request router
    .all('*', function(req, res, next){
        res.locals.req = req;
        res.locals.res = res;
        next();
    })
    //매핑 처리 
    //.use('/', emaillistRouter)



//Server Setup
http.createServer(application)
.on('listening', function(){
    console.info(`http server runs on ${process.env.PORT}`)
}).on('error', function(){
    switch(error.code){
        case 'EACCESS' : 
            console.error(`${process.env.PORT} requires privileges`);
            process.exit(1);
            break;
        case 'EADDRINUSE' : 
            console.error(`${process.env.PORT} is already in use`);
            process.exit(1);
            break;
        default:
             throw error;
    }
}).listen(process.env.PORT);