# vue-MD
use the vue-cli and iview ，koa add mongodb

USE

1.启动mongodb数据库

 mongod --dbpath=G:/MDdata1/db
 
 
2.运行koa+mong

 cnpm install
 
 node mongdb
 
 
3.运行vue-cli

 cnpm install 
 
 cnpm run dev

 4.运行mongooseMethods
 
 node mongooseMethods
 
 （此处包含 mongooseConnect连接、mongooseSchema数据模型、mongooseMethods方法）
 由于monk只能简单的增删改查，
 
 此处采用mongoose
 
 schema是mongoose里会用到的一种数据模式，可以理解为表结构的定义；每个schema会映射到mongodb中的一个collection，它不具备操作数据库的能力。
 （直白的说就是mongoose不能像monk一样指定连接某一张表，他会通过你自定义的schena自动生成一张表，并建立连接）
 
 定义一个Schema就这么简单，指定字段名和类型

　　Schema Types内置类型如下：

　　String

　　Number

　　Boolean | Bool

　　Array

　　Buffer

　　Date

　　ObjectId | Oid

　　Mixed

比如我要查询年龄范围条件应该怎么写呢？

　　User.find({userage: {$gte: 21, $lte: 65}}, callback);    //这表示查询年龄大于等21而且小于等于65岁

 

　　其实类似的还有：　

　　$or　　　　或关系

　　$nor　　　 或关系取反

　　$gt　　　　大于

　　$gte　　　 大于等于

　　$lt　　　　 小于

　　$lte　　　  小于等于

　　$ne            不等于

　　$in             在多个值范围内

　　$nin           不在多个值范围内

　　$all            匹配数组中多个值

　　$regex　　正则，用于模糊查询

　　$size　　　匹配数组大小

　　$maxDistance　　范围查询，距离（基于LBS）

　　$mod　　   取模运算

　　$near　　　邻域查询，查询附近的位置（基于LBS）

　　$exists　　  字段是否存在

　　$elemMatch　　匹配内数组内的元素

　　$within　　范围查询（基于LBS）

　　$box　　　 范围查询，矩形范围（基于LBS）

　　$center       范围醒询，圆形范围（基于LBS）

　　$centerSphere　　范围查询，球形范围（基于LBS）

　　$slice　　　　查询字段集合中的元素（比如从第几个之后，第N到第M个元素）