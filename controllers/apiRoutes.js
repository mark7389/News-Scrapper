var mongoose = require("mongoose");
var cheerio = require("cheerio");
var axios = require("axios");
var db = require("../models");


module.exports = function(app){

        app.get("/scrape", function(req, res){

                axios.get("https://news.google.com/").then(function(response){
                    
                     var $ = cheerio.load(response.data); 
                     var articleCtr = 0;
                     $("c-wiz .kWyHVd").each(function(i, element){

                            var headline = $(this).children("a").text();
                            var link = $(this).children("a").attr("href");
                            var outlet = $(this).children("div").children(".Pc0Wt").text();
                            var timePassed = $(this).children("div").children(".oM4Eqe").find("span").text();
                            if(link){
                                
                              
                                    db.Article.create({
                                        headline:headline,
                                        link:link,
                                        outlet:outlet,
                                        timePassed: timePassed.split(" ")[0]
                                        
                                    }).then(function(dbArticle){
                                           
                                           console.log("document created")
                                            articleCtr++;
                                    }).catch(function(err){

                                            if(err.code == 11000){
                                                console.log("duplicate record, bypassing...");
                                                
                                            }
                                    });
                            }
                         
                     });
                     db.Article.find({}).then(function(dbArticle){
                            var hbsObj = {

                                story:dbArticle,
                                page:{home:true},
                                msg:{counter:articleCtr}
                            }
                            
                            res.render("index", hbsObj);
                     }).catch(function(err){
                         console.log(err);
                     });
                    
                });
                
        });

        app.get("/archive", function(req, res){

                db.Article.find({saved:true}).then(function(dbArticle){
                        console.log(dbArticle);
                        var hbsObj = {

                            story:dbArticle,
                            page:{home:false},
                            msg:{numSaved:dbArticle.length}
                        }
                        
                        res.render("index", hbsObj);

                }).catch(function(err){
                    console.log(err);
                });

        });
        
       

}