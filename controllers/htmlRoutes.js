module.exports = function(app){


        app.get("/", function(req, res){
            
            res.redirect("/scrape");

        });
    
        app.get("/saved", function(req, res){

            res.redirect("/archive");

        });




}