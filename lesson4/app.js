var superagent = require('superagent');
var cheerio = require('cheerio');
var eventproxy = require('eventproxy');
var url = require('url');
var cnodeUrl = "http://cnodejs.org";

superagent.get(cnodeUrl)
    .end(function(err,res){
        if(err){
            return console.log(err.message);
        }
        var $ = cheerio.load(res.text);
        var topicUrls = [];

        $('#topic_list .topic_title').each(function(i,element){
            var $element = $(element);
            var $title = $element.attr('title');
            var $href = url.resolve(cnodeUrl,$element.attr('href'));

            topicUrls.push($href);
        })
        console.log(topicUrls);
    })