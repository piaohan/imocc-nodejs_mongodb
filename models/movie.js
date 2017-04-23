var mongoose = require('mongoose');
var MovieSchema = require('../schemas/movie');
// 根据模式创建模型
var Movie = mongoose.model('Movie', MovieSchema);

module.exports = Movie;