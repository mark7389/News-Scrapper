var mongoose = require("mongoose");
var db = require("../models");


module.exports = function(app){


           app.post("/comment/:articleId", function(req, res){
                console.log(req.body);
                 db.Comment.create(req.body).then(function(dbComment){
                            console.log("-------\n"+dbComment+
                                        "   >><<  "+dbComment._id);
                            return db.Article.findOneAndUpdate({"_id":req.params.articleId}, {$push:{comments:dbComment._id}}, {new:true});
                 }).then(dbArticle=>{
                    
                     res.json({result:"comment saved !"});
                }).catch(err=>{

                     console.log(err);
                 });   

           }); 
           app.get("/article_comment/:articleId", function(req, res){
               
                db.Article.findOne({"_id":req.params.articleId}).populate({
                    path:"comments",
                    model: "Comment"
                })
               .then(dbArticle=>{
                        console.log(dbArticle);
                        res.json(dbArticle.comments);
                }).catch(err=>{
                    
                    console.log(err);
                });


           });
           app.delete("/comment/:id/:articleId", function(req, res){
                
               db.Comment.findOneAndRemove({"_id":req.params.id}).then(function(dbComment){
                            console.log(dbComment);
                            return db.Article.update({"_id":req.params.articleId}, {$pull:{comments:req.params.id}});
               }).then(dbArticle=>{
                   
                        if(dbArticle.ok == 1){
                            res.json({result: "Deleted!"})
                        }
                   
               }).catch(err=>{

                    console.log(err);
               });
                    
           });
           










}