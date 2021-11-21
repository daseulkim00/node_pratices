// core module
const express = require('express');
const path = require('path');
const http  = require('http');
const session = require('express-session');
const dotenv = require('dotenv');
const multer = require('multer');


//모듈
//const emaillistRouter = require('./routes/emaillist');

//구조분리하기
//1.Environment Variables
//dotenv라이브러리가 이를 도와준다
//app.env
dotenv.config({path: path.join(__dirname, 'config/app.env') });
dotenv.config({path: path.join(__dirname, 'config/db.env') });


//2. Application Routers
const { applicationRouter } = require('./routes');
const { SIGTERM } = require('constants');

// 3. Logger
const logger = require('./logging');

//4. Application Setup
const application = express()
//express();가 리턴하는 객체에서 바로 .use 사용가능
    //4-1. Session Enviroment
    .use(session({
        secret: "mysite-session",
        resave:false
    }))
    //4-2. request body parser
    .use(express.urlencoded({extended: true}))  // application/x-www-form-urlencoded
    .use(express.json())                        // application/json
    // 4-3. Multipart
    .use(multer({
        dest: path.join(__dirname, process.env.MULTER_TEMPORARY_STORE)
    }).single('file'))
    // 4-4. static resources
    .use(express.static(path.join(__dirname, process.env.STATIC_RESOURCES_DIRECTORY)))
    // 4-5. view engine setup
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs');
  

//5. Application Router Setup
applicationRouter.setup(application);


// 6. Server Setup
http.createServer(application)
    .on('listening', function(){
        logger.info(`http server runs on ${process.env.PORT}`);
    })
    .on('error', function(error){
        switch(error.code) {
            case 'EACCESS':
                logger.error(`${process.env.PORT} requires privileges`);
                process.exit(1);
                break;
            case 'EADDRINUSE':
                logger.error(`${process.env.PORT} is already in use`);
                process.exit(1);
                break;
            default:
                throw error;        
        }
    })
    .listen(process.env.PORT);