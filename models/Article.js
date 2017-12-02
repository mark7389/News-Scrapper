var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ArticleSchema = new Schema({


        headline:{
            type:String,
            unique:true,
            required: true

        },
        link: {
            type:String,
            required:true

        },
        outlet:{
            type:String,
            required:true
        
        },
        timePassed:{
            type: String,
            required:true
        },
        saved:{
            type: Boolean,
            default: false

        },
        comments:{
            type:[Schema.Types.ObjectId],
            ref:"Comment"
        },
        createdAt:{
            type:Date,
            default:Date.now()
        }


});

var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;