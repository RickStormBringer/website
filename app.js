var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var i18n = require('i18n');
var i18n_conf = require('./conf/i18n');
i18n.configure(i18n_conf);
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var app = express();
// view engine setup
if ((!process.env.NODE_ENV) || process.env.NODE_ENV == 'dev') {
    app.set('views', path.join(__dirname, 'views'));
    app.use(express.static(path.join(__dirname, 'public')));
} else {
    app.set('views', path.join(__dirname, 'dist/views'));
    app.use(express.static(path.join(__dirname, 'dist')));

}
// app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(i18n.init);

app.use('/index', indexRouter);

app.get('/', function (req, res) {
    let localeLang = req.getLocale();
    if (localeLang != 'en') {
        res.status(302).redirect(`/${req.getLocale()}`)
    } else {
        res.render('index_en');
    }
});
// app.all('/:lang',function(req,res,next){
//   console.log(req.params.lang);
//   i18n.setLocale(req, req.params.lang);
//   res.render('index');
// });
app.get('/zh', function (req, res) {
    i18n.setLocale(req, 'zh');
    res.render('index_zh');
});

app.get('/en', function (req, res) {
    i18n.setLocale(req, 'en');
    res.render('index_en');
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    if (err.status == 404) {
        res.status(404);
        return res.render('404');
    }
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;