var express = require('express');
var router = express.Router();
const fs = require("fs");
/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('index', { title: 'Express' });
});

router.get('/vscode',function(req,res){
  fs.readdir('./uploads',{withFileTypes:true},function(err,files){
    res.render('vscode',{files:files});
  })
})

/* this route for refresh button */
router.get("/refresh",function(req,res){
  res.redirect("back");
})

/* this route for - showing file data in cross button div */
/*  if we write some data in a file in baceknd it show in forntend*/

router.get('/file/:filename',function(req,res){
  fs.readdir(`./uploads`,{withFileTypes:true},function(err,files){
    fs.readFile(`./uploads/${req.params.filename}`,"utf-8",function(err,filedata){
    res.render("opened",{files:files,filename:req.params.filename,filedata});
  })
})
})

/* this route for - if we update the some content in a frontend it show in backend by clicking save button  */
router.post('/update/:filename',function(req,res){
  fs.writeFile(`./uploads/${req.params.filename}`,req.body.data,function(err){
    res.redirect("back");
  })
})

/*this route is for creating a file  */
router.get('/createfile',function(req,res){
  fs.writeFile(`./uploads/${req.query.filename}`,"",function(err){
    if(err) res.send(err);
    else 
    res.redirect("back")
  })
})

/*this route is for creating a folder  */
router.get('/createfolder',function(req,res){
  fs.mkdir(`./uploads/${req.query.foldername}`,function(err){
      if(err) res.send(err);
      else
      res.redirect("back");
  })
})

/*this route is for delete a file  */
// router.get('/delete/:filename',function(req,res){
//   fs.unlink(`./uploads/${req.params.filename}`,function(err){
//     res.redirect("back");
// })
// })

/* this route is for delet a file and Folder */
router.get('/delete/:type/:filename',function(req,res){
  if(req.params.type === "folder"){
    fs.rmdir(`./uploads/${req.params.filename}`,function(err){
      res.redirect("back");
    })
  }
  else{
    fs.unlink(`./uploads/${req.params.filename}`,function(err){
      res.redirect("back");
  })
  }
})
 // roter for upadte a file name
 router.post(`/updatename/:oldname`,function(req,res){
  fs.rename(`./uploads/${req.params.oldname}`,`./uploads/${req.body.newname}`,function(err){
    if(err) console.log(err);
    else res.redirect("back");
  })
 })

module.exports = router;
