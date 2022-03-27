const express=require("express");
const app=express();
const bodyparser=require("body-parser");
const ejs=require("ejs");
const mongoose=require("mongoose");
var _=require("lodash");
const homecontact="lorem3234234234";
const  aboutcontact="lorem3234234234 wdfasdfasfasd";
const ccontact="lorem3234234234 werwertertetwetsgsgsdgsdfgsdfgsfgsfg";

app.set('view engine', 'ejs');
app.use(bodyparser.urlencoded({extended: true}));
app.use(express.static("static"));
mongoose.connect("mongodb://localhost:27017/blogdb")
const postSchema={
    title:String,
    content:String
}
const Post=mongoose.model("Post",postSchema)
let a=[];

app.get("/",(req,res)=>{
    // res.render("home",{con:homecontact,ss:a})
    Post.find({}, function(err, posts){
        res.render("home", {
         con: homecontact,
          ss: posts
          });
      });
})
app.get("/about",(req,res)=>{
    res.render("about",{con1:aboutcontact});
})
app.get("/contact",(req,res)=>{
    res.render("contact",{con2:ccontact});
})
app.get("/compose",(req,res)=>{
    res.render("compose")
})

app.post("/detail",(req,res)=>{

    // console.log(a);
    var post= new Post({
        title:req.body.cc,
        content:req.body.art,
    })
    post.save((er)=>{
        if(!er){
            res.redirect("/")
        }
    });

 
})
app.get("/detail/:postId",(req,res)=>{
const b=_.lowerCase(req.params.postId);

a.forEach(function(post){
    var st=_.lowerCase(post.title);
    console.log(st);
    if(st===b){
        Post.findOne({_id: requestedPostId}, function(err, post){

            res.render("post", {
         
              title: post.title,
         
              content: post.content
         
            });
         
          });
    }
})
})








app.listen(800,()=>{
    console.log("started");
})