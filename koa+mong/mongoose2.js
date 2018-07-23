const mongoose = require('mongoose');//引用库、、简书地址https://www.jianshu.com/p/8af0552831f6
mongoose.connect('mongodb://localhost:27017/test');//连接地址
var db = mongoose.connection;//定义连接
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log(`we're connected!`)
});

var kittySchema = mongoose.Schema({
  text: String,
  parent: String
});

var Kitten = mongoose.model('Kitten', kittySchema);
//var felyne = new Kitten({ name: 'Felyne' });
//console.log(felyne.name); // 'Felyne'
////追加一个speak方法
//kittySchema.methods.speak = function () {
//var greeting = this.name
//  ? "Meow name is " + this.name
//  : "I don't have a name";
//console.log(greeting);
//}
//
//var Kitten = mongoose.model('Kitten', kittySchema);
//var fluffy = new Kitten({ name: 'fluffy' });
//fluffy.speak(); // "Meow name is fluffy"
//保存到库
//felyne.save(function (err, fluffy) {
//  if (err) return console.error(err);
//});
  //查询
Kitten.find(function (err, test2) {
  if (err) return console.error(err);
  console.log(test2);
})