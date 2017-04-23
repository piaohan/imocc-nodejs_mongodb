var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongooes = require('mongoose');
var Movie = require('./models/movie');
var _ = require('underscore');

var port = process.env.PORT || 3000;
var app = express();

mongooes.Promise = global.Promise;  
mongooes.connect('mongodb://localhost/movie');

app.set('views', './views/pages');
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.static(path.join(__dirname, 'bower_components')));
app.locals.moment=require('moment');

app.listen(port);

console.log('test start port=' + port);

// 首页
app.get('/', function (req, res) {
  Movie.fetch(function (err, movies) {
    if (err) {
      console.log("数据获取错误,错误=" + err);
    }
    res.render('index', {
      title: '测试首页',
      movies: movies
    });
  });
});

// 详细
app.get('/movie/:id', function (req, res) {
  var id = req.params.id;
  Movie.findById(id, function (err, movie) {
    res.render('detail', {
      title: 'Movie ' + movie.title + ' 详情',
      movie: movie
    });

  });
});

// 后台
app.get('/admin/movie', function (req, res) {
  console.log('进入后台');
  res.render('admin', {
    title: '后台页',
    movie: {
      title: '',
      flash: '',
      doctor: '',
      country: '',
      language: '',
      year: '',
      poster: '',
      summary: ''
    },
  });
});

//录入时新增或者更新
app.get('/admin/movie/new', function (req, res) {
  var id = req.body.movie._id;
  var movieOBJ = req.body.movie;
  console.log('获取的数据:'+movieOBJ);
  var _movie;
  //更新
  if (id !== 'undefined') {
    Movie.findById(id, function (err, movie) {
      if (err) {
        console.log('查询错误,错误如下: ' + err);
      }
      _movie = _.extend(movie, movieOBJ);
      _movie.save(function (err, movie) {
        console.log('查询错误,错误如下: ' + err);
      });
      res.redirect('/movie/' + movie._id);
    });
  } else {
    _movie = new Movie({
      doctor: movieOBJ.doctor,
      title: movieOBJ.title,
      country: movieOBJ.country,
      flash: movieOBJ.flash,
      year: movieOBJ.year,
      summary: movieOBJ.summary,
      language: movieOBJ.language,
      poster: movieOBJ.poster,
    });
    _movie.save(function (err, movie) {
      console.log('查询错误,错误如下: ' + err);
    });
    res.redirect('/movie/' + movie._id);
  };
});


// 修改
app.get('/admin/update/:id',function (req,res) { 
  if (id) {
    Movie.findById(id, function (err, movie) {
      if (err) {
        console.log('修改查询错误,错误如下: ' + err);
      }
      _movie = _.extend(movie, movieOBJ);
      _movie.save(function (err, movie) {
        console.log('修改查询错误,错误如下: ' + err);
      });
      res.redirect('/movie/' + movie._id);
    });
  } 
 });

// 列表
app.get('/admin/list', function (req, res) {
  Movie.fetch(function (err, movies) {
    if (err) {
      console.log("数据获取错误,错误=" + err);
    }
    res.render('list', {
      title: '列表页',
      movies: movies,
    });
  });
});