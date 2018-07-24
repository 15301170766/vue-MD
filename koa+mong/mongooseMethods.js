var User = require("./mongooseSchema.js");
/**
 * 插入
 */
function insert() {
 
    var user = new User({
        username : 'Tracy McGrady',                 //用户账号
        username2 : 'Tracy McGrady2',                 //用户账号
        userpwd: 'abcd',                            //密码
        userage: 666,                                //年龄
        logindate : new Date()                      //最近登录时间
    });

    user.save(function (err, res) {

        if (err) {
            console.log("Error:" + err);
        }
        else {
            console.log("Res:" + res);
        }

    });
}

function update(){
    var wherestr = {'username' : 'Tracy McGrady'};
    var updatestr = {'userpwd': 'zzzz'};
    
    User.update(wherestr, updatestr, function(err, res){
        if (err) {
            console.log("Error:" + err);
        }
        else {
            console.log("Res:" + res);
        }
    })
}

update();

function findByIdAndUpdate(){
    var id = '56f2558b2dd74855a345edb2';
    var updatestr = {'userpwd': 'abcd'};
    
    User.findByIdAndUpdate(id, updatestr, function(err, res){
        if (err) {
            console.log("Error:" + err);
        }
        else {
            console.log("Res:" + res);
        }
    })
}

findByIdAndUpdate();

function del(){
    var wherestr = {'username' : 'Tracy McGrady'};
    
    User.remove(wherestr, function(err, res){
        if (err) {
            console.log("Error:" + err);
        }
        else {
            console.log("Res:" + res);
        }
    })
}

del();

function getByConditions(){
    var wherestr = {'username' : 'Tracy McGrady'};
    
    User.find(wherestr, function(err, res){
        if (err) {
            console.log("Error:" + err);
        }
        else {
            console.log("Res:" + res);
        }
    })
}

getByConditions();