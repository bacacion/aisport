//Require 模組
const express = require('express');
const url = require('url');
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer({ dest: 'tmp_uploads/' });
const fs = require('fs');
const session = require('express-session');
const moment = require('moment-timezone');
var favicon = require('serve-favicon');
const db = require(__dirname + '/db-connect');
var nodemailer = require('nodemailer');
const emailService = require(__dirname + '/w3cEmail');


// ---------------Middlewire---------------
const app = express();
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
// session帶著走.
app.use((req, res, next) => {
    if (req.session.loginUser) {
        res.locals.loginUser = req.session.loginUser;
    }
    if (req.session.cart) {
        res.locals.cart = req.session.cart;
    }
    // 因為購物車使用運算子in 來判斷，in無法判斷undefined，故res.locals.cart為undefined時將其設為空物件.
    if (!res.locals.cart) {
        res.locals.cart = {};
    }
    next();
});

// ---------------Route Start Here---------------
app.get('/', (req, res) => {
    res.render('index');
});
// ############login&logout############
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

// ############Content############
app.get('/main', (req, res) => {
    sql = "SELECT * FROM `good` LIMIT 10"
    data = {}
    // res.render('main');
    db.queryAsync(sql)
        .then(results => {
            data.rows = results
            return res.render('main', data);
        })
        .catch(error => {
            console.log(error);
            res.json(error);
        });
});
app.get('/main/product/:id?', (req, res) => {
    good_id = parseInt(req.params.id);
    sql = `SELECT * FROM good WHERE good_id=${good_id}`
    data = {}
    db.queryAsync(sql)
        .then(results => {
            data.rows = results
            return res.render('mainList', data);
            // res.json(results)
        })
        .catch(error => {
            console.log(error);
            res.json(error);
        });
});
app.get('/cart', (req, res) => {
    // 如果購物車沒東西則直接進入cart，不進入DB查詢.
    if(Object.keys(res.locals.cart).length == 0){
        return res.render('cart');
    }
    data = Object.keys(res.locals.cart)
    var target=""
    for (i = 0; i < data.length; i++) {
        target = target + `good_id="${data[i]}"`
        if(i< data.length-1){
            target = target + " OR "
        }
    }    
    sql = "SELECT * FROM good WHERE " + target;
    dataAll={};
    dataAll.data=res.locals.cart;   
    db.queryAsync(sql)
        .then(results => {
            dataAll.rows=results
            res.render('cart',dataAll)
        })
});
app.post('/cart', (req, res) => {
    cart = res.locals.cart;
    setCart = function (propertyName, Value) {
        return cart[propertyName] = parseInt(Value);
    };
    getVal = function (propertyName) {
        return parseInt(cart[propertyName]);
    }
    if (req.body.good_id in cart) {
        value = getVal(req.body.good_id) + parseInt(req.body.quantity);
        setCart(req.body.good_id, value);
    } else {
        setCart(req.body.good_id, parseInt(req.body.quantity))
    }
    req.session.cart = cart;
    res.json(cart);
});
app.post('/remove', (req, res) =>{
    function removeItem(good_id){
        delete req.session.cart[good_id]
    };
    removeItem(req.session.cart.good_id)
    res.redirect('/cart')
});



// 404 要在 routes 的最後面
app.use((req, res) => {
    res.type('text/plain');
    res.status(404);
    res.send('404 !!!!!!!!!!');
});
app.listen(3000, () => {
    console.log('server start');
});
