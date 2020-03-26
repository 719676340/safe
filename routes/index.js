var express = require('express');
var router = express.Router();
var udb=require('../db/db.js')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/change',function(req,res,next){
  // client=udb.Connection();
  // var sql="INSERT into info VALUES ('11111','2222');"
  // client.query(sql,function(err,rows){
  //   if(!err){
  //     res.end('successchangedb')
  //   }else{ 
  //     res.end('false')
  //   }
  // })
  res.send('Hello world')

})



module.exports = router;
//gulp server