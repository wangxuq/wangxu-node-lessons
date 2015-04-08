var async = require('async');

var concurrenceCount = 0;
var fetchUrl = function(url,callback){
    var delay = parseInt(Math.random()*1000000%2000,10);
    concurrenceCount++;
    console.log('Now the concurrenceCount is'+concurrenceCount+' and url is'+url);
    setTimeout(function(){
        concurrenceCount--;
        callback(null,url+' html content');
    },delay);
}
var urlArray = [];
for(var  i=0;i<30;i++){
    urlArray.push('https://datasource'+i);
}
async.mapLimit(urlArray,5,function(url,callback){
    fetchUrl(url,callback);
    },function(err,result){
    if(err){
        console.log(err.message)
    }
    console.log('result is'+result);
})