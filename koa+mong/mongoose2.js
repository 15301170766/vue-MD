const mongoose = require('mongoose');//引用库、、简书地址https://www.jianshu.com/p/8af0552831f6
mongoose.connect('mongodb://localhost:27017/test');//连接地址
var db = mongoose.connection;//定义连接
db.on('error', console.error.bind(console, '数据库连接失败'));
db.once('open', function() {
  // we're connected!
  console.log(`数据库连接成功!`)
});

var PersonSchema = new mongoose.Schema({
    name : { type:String },
    home : { type:String },
    age  : { type:Number, default:0 },
    time : { type:Date, default:Date.now },
    email: { type:String,default:''}
});

//创建模型，可以用它来操作数据库中的person集合，指的是整体
var PersonModel = db.model("person", PersonSchema);

//根据模型创建实体，是指的个体对象
var personEntity = new PersonModel({
    name : "zf",
    age  : 6,
    email: "zf@qq.com",
    home:'beijing'
});
//用save 方法把自己保存到数据库中
personEntity.save(function(error,doc){
    if(error){
        console.log("error :" + error);
    }else{
        console.log(doc);
    }
});
PersonModel.find({},function(error,docs){
    //若没有向find传递参数，默认的是显示所有文档
    console.log(docs);
})