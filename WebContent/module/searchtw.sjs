var searchText = function(reqKeywords, limit){
    var q = new Array();
    if(reqKeywords){
        var keywords = reqKeywords.split(" ");
        for (var i=0; i<keywords.length; i++){
            if(keywords[i] && keywords[i].trim()){
                q.push(cts.jsonPropertyWordQuery("text", keywords[i]));
            }
        }
    }
    return fn.subsequence(cts.search(cts.andQuery(q), cts.indexOrder(cts.elementReference("timestamp_ms"), "descending")), 1, limit);
}

var currentTimeMillis = new Date().getTime();
var reqKeywords = xdmp.getRequestField("keywords");
var results = searchText(reqKeywords, 5);
var array = new Array();
for (var result of results) {
    var text = result.root.text;
    var imgURL = result.root.user.profile_image_url_https;
    var username = "@" + result.root.user.screen_name;
    var tweet = {"text": text, "imgURL": imgURL, "username": username};
    array.push(tweet);
}
array;