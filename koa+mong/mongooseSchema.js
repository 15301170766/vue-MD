/**
 * 用户信息
 */
var mongoose = require('./mongooseConnect.js'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({          
//  username : { type: String },                    //用户账号
//  username2 : { type: String },                    //用户账号
//  userpwd: {type: String},                        //密码
//  userage: {type: Number},                        //年龄
//  logindate : { type: Date}                       //最近登录时间
  text : { type: String },                    
  parent : { type: String },                    
});

module.exports = mongoose.model('organize',UserSchema);//此处mondel用什么名字就会生成什么表