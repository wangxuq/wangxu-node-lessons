var superagent = require('superagent');
var cheerio = require('cheerio');
var eventproxy = require('eventproxy');
var url = require('url');
var cnodeUrl = "http://cnodejs.org";

var ep = new eventproxy();

//get all topic urls
var topicUrls = [];
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

        //excute the final result
        ep.after('topic_html',topicUrls.length,function(topics){
            topics = topics.map(function(topicPair){
                var topicUrl = topicPair[0];
                var topicHtml = topicPair[1];
                var $ = cheerio.load(topicHtml);

                return {
                    title : $('.topic_full_title').text().trim(),
                    href : topicUrl,
                    commit1 : $('.reply_content').eq(0).text().trim()
                };
            });
            console.log('final:');
            console.log('topics:'+JSON.stringify(topics));
        });
        //excete per url and emit the topic_html
        topicUrls.forEach(function(topicUrl){
            superagent.get(topicUrl)
                .end(function(err,res){
                    console.log('getch the url successfully');
                    ep.emit('topic_html',[topicUrl, res.text]);
                });
        });
})

