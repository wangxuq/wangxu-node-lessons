var express = require("express");
var cheerio = require("cheerio");
var superagent = require("superagent");

var app = express();

var cnodeUrl = "http://cnodejs.org";

app.get("/",function(req,res,next){
    superagent.get(cnodeUrl)
        .end(function(err,context){
            if(err) {
                return next(err);
            }
            var $ = cheerio.load(context.text);
            var item = [];
            $("#topic_list .topic_title").each(function(id,element){
                var $element = $(element);
                item.push({
                    title : $element.attr("title"),
                    href : $element.attr("href")
                });
            });
            res.send(item);
       });
});

app.listen(3000,function(){
    console.log("this application is listening on port 3000");
})