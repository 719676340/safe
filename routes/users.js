var express = require('express');
var router = express.Router();
var udb=require('../db/db.js')
var request=require('request')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Hello world');
  
});
router.get('/change',function(req,res,next){
  client=udb.Connection();
  var sql="INSERT into info VALUES ('22222','2222');"
  client.query(sql,function(err,rows){
    if(!err){
      res.end('successchangedb')
    }else{ 
      res.end('false')
    }
  })
  client.end()
})
// router.get('/change', function(req, res, next) {
//   res.send('Hello world1');
// });
router.post('/login',function(req,res,next){
  var username=req.body.username
  var password=req.body.password
  console.log(username,password)
  client=udb.Connection();
  var sql="SELECT COUNT(*) AS num FROM `info` WHERE account='"+username+"' AND `password`='"+password+"';"
  client.query(sql,function(err,rows){
    if(err){
      res.end('false')
    }else{
      // if(rows.length==0){
      //   res.end('false')
      // }else{
      //   if(rows[0].password==password){
      //     console.log(rows)
      //     // res.end("1111")
      //     res.end(JSON.stringify(rows))
      //   }
      // }
      console.log(rows)
      res.end(JSON.stringify(rows))
    }
  })
  client.end()
})
//获取所有的公司信息
router.get('/companysinfo',function(req,res,next){
  client=udb.Connection();
  var sql="SELECT * FROM company;"
  client.query(sql,function(err,rows){
    if(!err){
      res.end(JSON.stringify(rows)) //返回前端
    }else{ 
      // res.end('false')
      res.end(JSON.stringify(err))
    }
  })
  client.end()
})
//删除某条的公司信息 搜索条件为ID值

router.post('/deletecompany',function(req,res,next){
  // var datalist=JSON.parse(req.body);
  var id=req.body.id  // 这里时拿前端的数据 //这里只有req.query里面有数据 我也不知道为什么和之前的不一样 看了一下解释 应该是我的bodyParser 有问题就用不了
  console.log(req.body); // 改成了application/json 问题就解决了 仅仅是在postman上面的操作
  client=udb.Connection(); //连接数据库
  var sql="DELETE FROM company WHERE company.id='"+id+"';" //完善sql语句
  client.query(sql,function(err,rows){  //执行sql语句 err是错误  rows是返回信息
    if(!err){
      res.end('succesdeletecompany')   //res.end 发送回前端
    }else{ 
      res.end('falsedeletecompany')
    }
  })
  var sql="DELETE FROM evaluation WHERE evaluation.companyid='"+id+"';"
  client.query(sql,function(err,rows){
    if(!err){
      res.end('succesdeletecompany')
    }else{ 
      res.end('falsedeletecompany')
    }
  })
  client.end() //关闭数据库
})


router.post('/newcompany',function(req,res,next){
  var name= req.body.name;
  var peoplenum=req.body.peoplenum;
  var dangerresources= req.body.dangerresources;
  var tel= req.body.tel;
  var level= req.body.level;
  var dangername= req.body.dangername;
  var maindanger= req.body.maindanger;
  var evalname= req.body.evalname;
  console.log(name);
  console.log(peoplenum);
  console.log(dangerresources);
  console.log(tel);
  console.log(level);
  console.log(dangername);
  console.log(evalname);

  client=udb.Connection();
  var sql="INSERT INTO company VALUES(id, '"+name+"','"+peoplenum+"','"+dangerresources+"','"+tel+"','"+level+"','"+dangername+"','"+maindanger+"','"+evalname+"',now());"
  console.log(sql);

  client.query(sql,function(err,rows){
    if(!err){
      res.end('succesnewcompany')
      console.log('succesnewcompany')
    }else{ 
      res.end('falsenewcompany')
      console.log('falsenewcompany')
    }
  })
  client.end()
})

router.post('/updatecompany',function(req,res,next){
  var id= req.body.id;
  var name= req.body.name;
  var peoplenum=req.body.peoplenum;
  var dangerresources= req.body.dangerresources;
  var tel= req.body.tel;
  var level= req.body.level;
  var dangername= req.body.dangername;
  var maindanger= req.body.maindanger;
  var evalname= req.body.evalname;
  client=udb.Connection();
  // var sql="INSERT INTO company VALUES(id, '"+name+"','"+peoplenum+"','"+dangerresources+"','"+tel+"','"+level+"','"+dangername+"','"+maindanger+"','"+evalname+"',now());"
  var sql="UPDATE company SET name='"+name+"',peoplenum='"+peoplenum+"',dangerresources='"+dangerresources+"',tel='"+tel+"',level='"+level+"',dangername='"+dangername+"',maindanger='"+maindanger+"',evalname='"+evalname+"' WHERE company.id='"+id+"';"
  console.log(sql);
  client.query(sql,function(err,rows){
    if(!err){
      res.end('succesupdatecompany')
      console.log('succesupdatecompany')
    }else{ 
      res.end('falseupdatecompany')
      console.log('falseupdatecompany')
    }
  })
  client.end()
})
router.get('/from1',function(req,res,next){
  client=udb.Connection();
  var sql="SELECT * FROM from1;"
  client.query(sql,function(err,rows){
    if(!err){
      res.end(JSON.stringify(rows))
    }else{ 
      res.end('false')
    }
  })
  client.end()
})
router.get('/from2',function(req,res,next){
  client=udb.Connection();
  var sql="SELECT * FROM from2;"
  client.query(sql,function(err,rows){
    if(!err){
      res.end(JSON.stringify(rows))
    }else{ 
      res.end('false')
    }
  })
  client.end()
})
router.get('/from3',function(req,res,next){
  client=udb.Connection();
  var sql="SELECT * FROM from3;"
  client.query(sql,function(err,rows){
    if(!err){
      res.end(JSON.stringify(rows))
    }else{ 
      res.end('false')
    }
  })
  client.end()
})

router.post('/updatecompany',function(req,res,next){
  var id= req.body.id;
  var name= req.body.name;
  var peoplenum=req.body.peoplenum;
  var dangerresources= req.body.dangerresources;
  var tel= req.body.tel;
  var level= req.body.level;
  var dangername= req.body.dangername;
  var maindanger= req.body.maindanger;
  var evalname= req.body.evalname;
  client=udb.Connection();
  // var sql="INSERT INTO company VALUES(id, '"+name+"','"+peoplenum+"','"+dangerresources+"','"+tel+"','"+level+"','"+dangername+"','"+maindanger+"','"+evalname+"',now());"
  var sql="UPDATE company SET name='"+name+"',peoplenum='"+peoplenum+"',dangerresources='"+dangerresources+"',tel='"+tel+"',level='"+level+"',dangername='"+dangername+"',maindanger='"+maindanger+"',evalname='"+evalname+"' WHERE company.id='"+id+"';"
  console.log(sql);
  client.query(sql,function(err,rows){
    if(!err){
      res.end('succesupdatecompany')
      console.log('succesupdatecompany')
    }else{ 
      res.end('falseupdatecompany')
      console.log('falseupdatecompany')
    }
  })
  client.end()
})

//根据公司名字和表明拿数据
router.post('/getfrom',function(req,res,next){
  var companyid=req.body.companyid;
  var fromno=req.body.fromno;
  client=udb.Connection();
  var sql="SELECT * FROM evaluation WHERE companyid='"+companyid+"' AND fromno='"+fromno+"';"
  client.query(sql,function(err,rows){
    if(!err){
      res.end(JSON.stringify(rows))
    }else{ 
      res.end('false')
    }
  })
  client.end()
})
router.post('/updatefrom',function(req,res,next){
  var companyid=req.body.companyid;
  var fromno=req.body.fromno;
  var fromid=req.body.fromid;
  var real=req.body.real;
  var result=req.body.result;
  var note=req.body.note; 
  client=udb.Connection();
  var sql="UPDATE evaluation SET `real`='"+real+"',`result`='"+result+"',`note`='"+note+"' WHERE companyid='"+companyid+"' AND fromno='"+fromno+"' AND fromid='"+fromid+"';"
  client.query(sql,function(err,rows){
    if(!err){
      res.end('succesupdatefrom')
    }else{ 
      res.end('false')
    }
  })
  client.end()
})
router.get('/newfrom',function(req,res,next){
  // var newid=2;
  client=udb.Connection();
  var sql="INSERT INTO evaluation (companyid,fromno,fromid,name,bigno,smallno,content,basis) SELECT (SELECT MAX(id) from company),fromno,id,name,bigno,smallno,content,basis FROM from1;"
  client.query(sql,function(err,rows){
    if(!err){
      res.end('succesnewfrom')
    }else{ 
      res.end('falsenewfrom')
    }
  })
  var sql="INSERT INTO evaluation (companyid,fromno,fromid,name,bigno,smallno,content,basis) SELECT (SELECT MAX(id) from company),fromno,id,name,bigno,smallno,content,basis FROM from2;"
  client.query(sql,function(err,rows){
    if(!err){
      res.end('succesnewfrom')
    }else{ 
      res.end('falsenewfrom')
    }
  })
  var sql="INSERT INTO evaluation (companyid,fromno,fromid,name,bigno,smallno,content,basis) SELECT (SELECT MAX(id) from company),fromno,id,name,bigno,smallno,content,basis FROM from3;"
  client.query(sql,function(err,rows){
    if(!err){
      res.end('succesnewfrom')
    }else{ 
      res.end('falsenewfrom')
    }
  })
  client.end()
})
module.exports = router;
