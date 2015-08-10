var searchText = function(duration, reqKeywords, limit){
    var q = new Array();
    q.push(cts.jsonPropertyRangeQuery("timestamp_ms", ">=", currentTimeMillis - duration));
    if(reqKeywords){
        var keywords = reqKeywords.split(" ");
        for (var i=0; i<keywords.length; i++){
            if(keywords[i] && keywords[i].trim()){
                q.push(cts.jsonPropertyWordQuery("text", keywords[i]));
            }
        }
    }
    return fn.subsequence(cts.search(cts.andQuery(q)), 1, limit);
}

var currentTimeMillis = new Date().getTime();
var reqKeywords = xdmp.getRequestField("keywords");
var results = searchText(1000 * 60 * 60 * 24, reqKeywords, 10);
var array = new Array();
for (var result of results) {
    var text = result.root.text;
    array.push(text);
}
array;