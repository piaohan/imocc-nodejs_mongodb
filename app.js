var express =require('express');
var path = require('path');
var bodyParser= require('body-parser');

var port= process.env.PORT|| 3000;
var app =express();

app.set('views','./views/pages');
app.set('view engine','jade');

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'bower_components')));

app.listen(port);

console.log('test start port='+port);

// 首页
app.get('/',function (req,res) {
 res.render('index',{
   title: '测试首页',
   movies:[{
     _id:1,
     title:"X战警1",
     poster:'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=3761908213,2818501903&fm=58&bpow=400&bpoh=600',
   },{
     _id:2,
     title:"X战警2",
     poster:'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=3761908213,2818501903&fm=58&bpow=400&bpoh=600',
   },{
     _id:3,
     title:"X战警3",
     poster:'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=3761908213,2818501903&fm=58&bpow=400&bpoh=600',
   },{
     _id:4,
     title:"X战警4",
     poster:'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=3761908213,2818501903&fm=58&bpow=400&bpoh=600',
   },],
 });
});
// 后台
app.get('/admin/movie',function (req,res) {
 res.render('admin',{
  title: '后台页',
  movie: {
    title: '',
    flash: '',
    doctor: '',
    country: '',
    language: '',
    year: '',
    poster: '',
    summary: '',
   },
 });
});
// 详细
app.get('/movie/:id',function (req,res) {
 res.render('detail',{
   title: '详细页',
   movie: {
    title: '电影名字',
    flash: 'http://player.youku.com/player.php/sid/XNzg0NDE1NjU2/v.swf',
    doctor: '电影导演的名字:飘寒',
    country: '国家:中国',
    language: '语言中文',
    year: '2016',
    summary: '这是一端电影描述',
   },
 });
});
// 列表
app.get('/admin/list',function (req,res) {
 res.render('list',{
   title: '列表页',
   movies: [{
    title:'机器学习',
    _id:'1',
    poster:'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=3761908213,2818501903&fm=58&bpow=400&bpoh=600',
    docter:'飘寒',
    country:'中国',
    flash: 'http://player.youku.com/player.php/sid/XNzg0NDE1NjU2/v.swf',
    year:'2016',
   }],
 });
});
