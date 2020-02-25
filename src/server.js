//Require 模組
const express = require('express');
const app = express();
const url = require('url');
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer({ dest: 'tmp_uploads/' });
const fs = require('fs');
const session = require('express-session');
const moment = require('moment-timezone');
// var favicon = require('serve-favicon');
const db = require(__dirname + '/db-connect');
var nodemailer = require('nodemailer');
const emailService = require(__dirname + '/w3cEmail');
var exec = require('child_process').exec;
const server = require('http').Server(app);
const io = require('socket.io')(server);


// ---------------Middlewire---------------------
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
    saveUninitialized: false,
    resave: false,
    secret: 'ksdhkasjhfjs',
    cookie: {
        maxAge: 1200000
    }
}));
io.on('connection', () => {});
// session帶著走.
app.use((req, res, next) => {
    if (req.session.loginUser) {
        res.locals.loginUser = req.session.loginUser;
    }
    // if (req.session.cart) {
    //     res.locals.cart = req.session.cart;
    // }
    // // 因為購物車使用運算子in 來判斷，in無法判斷undefined，故res.locals.cart為undefined時將其設為空物件.
    // if (!res.locals.cart) {
    //     res.locals.cart = {};
    // }
    next();
});

// ---------------Route Start Here---------------
app.get('/', (req, res) => {
    console.log(req.connection.remoteAddress)
    res.render('home');
});
app.get('/fitness', (req, res) => {
    res.render('fitness');
})
app.get('/match', (req, res) => {
    res.render('match');
})
// #################### login&logout ######################
app.get('/login', (req, res) => {
    let data = {
        // loginUser: req.session.loginUser || "",
        flashMsg: req.session.flashMsg
    };
    delete req.session.flashMsg;
    res.render('login', data);
});
app.post('/login', (req, res) => {
    const sql = "SELECT email, password FROM client_data WHERE email=?";
    db.queryAsync(sql, [
        req.body.email,
    ])
        .then(results => {
            if (req.body.email && results[0].password === req.body.password) {
                req.session.loginUser = req.body.email.split("@")[0];
                res.redirect('/');
            } else {
                req.session.flashMsg = 'Incorrect email or password.'
                res.redirect('/login');
            };
            // res.json(results[0].email);
        })
});
app.get('/logout', (req, res) => {
    delete req.session.loginUser;
    delete res.locals.loginUser;
    res.render('index');
});
app.get('/sign-up', (req, res) => {
    res.render('sign-up');
});
app.post('/sign-up', (req, res) => {
    const output = {
        success: false,
        code: 400,
        results: {},
        errorMsg: '',
        body: req.body
    };
    // console.log("req from sign up");
    if (!req.body.name || req.body.name.length < 2) {
        output.code = 410;
        output.errorMsg = '姓名請填兩個字以上';
        return res.json(output);
    }
    const sqlDuplicate = "SELECT * FROM `client_data` WHERE email=?";
    const sql = "INSERT INTO `client_data`(`email`, `password`, `client_name`, `birthday`, `address`, `fav_char`, `reg_time`, `class`) VALUES (?,?,?,?,?,'none', NOW(), 1)";
    req.body.completeAddress = req.body.address + req.body.address2 + req.body.city + req.body.zip;

    db.queryAsync(sqlDuplicate, [
        req.body.email,
    ])
        .then(results => {
            // console.log("results.length is " + results.length)
            // console.log(results)
            if (results.length > 0) {
                output.code = 411;
                output.errorMsg = 'Email duplicate!';
                // console.log("duplicate email")
                return res.json(output);
            } else {
                return db.queryAsync(sql, [
                    req.body.email,
                    req.body.password,
                    req.body.name,
                    req.body.birthday,
                    req.body.completeAddress,
                ]);
            }
        })
        .then(results => {
            // console.log(results);
            output.results = results;
            if (results.affectedRows === 1) {
                output.success = true;
                output.code = 200;
            } else {
                output.code = 420;
                output.errorMsg = '資料新增失敗';
            }
            res.json(output);
        })
        .catch(error => {
            //output
        });

});
// ################## Forget password Email ################
// TODO: email文本設計
app.get('/forget-password', (req, res) => {
    let data = {
        getmail: req.session.getmail || "",
        flashMsg: req.session.flashMsg
    };
    delete req.session.getmail
    delete req.session.flashMsg;
    res.render('forget-password', data);
});
app.post('/forget-password', (req, res) => {
    const list = {
        "b0227390004@gmail.com": "1234444444444444444444",
        "bbb@gmail.com": "aaaa"
    }
    if (req.body.email && list[req.body.email]) {
        req.session.getmail = req.body.email;
        mailtext = `Your password is "${list[req.body.email]}" \n Welcome back!  http://localhost:3000/`
        emailService(req.body.email, 'Your PoohFavor Password!', mailtext);
        res.redirect('/forget-password');
    } else {
        req.session.flashMsg = 'Incorrect email.'
        res.redirect('/forget-password');
    };
});

// ####################### Content #########################
app.get('/fitness/:text?', (req, res) => {
    switch (req.params.text) {
        case "benchdip":
            res.render("benchdip")
            break;
        case "squat":
            res.render("squat")
            break;
        case "frontraise":
            res.render("frontraise")
            break;
        case "plank":
            res.render("plank")
            break;
        default:
            res.render("fitness")
    }
});
app.post('/fitness/:pose?', (req, res) => {
    if (!req.params.pose){
        req.params.pose = "biceps";
    } 
    console.log(`processing ${req.params.pose}...`)        
    var comingPose = ` --exercise ${req.params.pose}`;
    if (req.params.pose == "biceps") {
        comingPose = "";
    }
    io.emit('processing', '1')
    var child = exec(`python ../Pose_trainer/main.py --video videos/${req.body.filename}${comingPose}`, () => {});
    res.json('123')
})
app.get('/feedback/:text?', (req, res) => {
    if (req.connection.remoteAddress == '::1') {
        console.log('localhost sent a feedback:')
        console.log(req.params.text)
        console.log('-------------------------------------')

        res.json(req.params.text)
    } else {
        console.log(req.connection.remoteAddress + ' is trying to sand a feedback: ' + req.params.text)
        res.render('home');
    }
});
app.get('/feedbackExercise/:text?', (req, res) => {
    if (req.connection.remoteAddress == '::1') {
        decodeFeedback = req.params.text.split(',');
        // benchdip消耗熱量
        calorie=0.39;        
        
        // console.log('feedbackMessage', `姿勢建議: ${decodeFeedback[0]}`);
        // console.log('feedbackMessage', `動作次數: ${decodeFeedback[1]}`);
        // console.log('feedbackMessage', `運動時間: ${decodeFeedback[2]}`); 
        
        io.emit('processing', '0')
        io.emit('feedbackMessage', `姿勢建議: ${decodeFeedback[0]}`);
        io.emit('feedbackMessage', `動作次數: ${decodeFeedback[1]}`);
        io.emit('feedbackMessage', `運動時間: ${decodeFeedback[2]}`);
        io.emit('feedbackMessage', `本次訓練預估消耗熱量: ${decodeFeedback[1]*calorie}`)
        io.emit('imageOn', '1')
        console.log('emit done')
        res.json('done')
    } else {
        console.log(req.connection.remoteAddress + ' is trying to sand a feedback: ' + req.params.text);
        res.render('home');
    }
});
app.post('/456', (req, res) => {
    console.log(req.body.gg)
    const gg = {
        "ininder": req.body.gg
    }
    res.json(gg)
});
app.get('/123', (req, res) => {
   io.emit('chat message', '12333')
})





// ###################### Socket.io ######################
io.on('connection', () => {});

// 404 要在 routes 的最後面
app.use((req, res) => {
    res.type('text/plain');
    res.status(404);
    res.send('404 !');
});
server.listen(3000, () => {
    console.log('server start, port: 3000');
});