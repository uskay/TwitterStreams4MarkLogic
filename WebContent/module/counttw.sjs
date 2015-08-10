var count = function(duration, reqKeywords){
    var q = new Array();
    q.push(cts.jsonPropertyRangeQuery("timestamp_ms", ">=", currentTimeMillis - duration));
    if(reqKeywords){
        var keywords = reqKeywords.split(" ");
        for (var i=0; i<keywords.length; i++){
            if(keywords[i]){
                q.push(cts.jsonPropertyWordQuery("text", keywords[i]));
            }
        }
    }
    return cts.estimate(cts.andQuery(q));

    return cts.estimate(cts.jsonPropertyRangeQuery("timestamp_ms", ">=", currentTimeMillis - duration));
}

var currentTimeMillis = new Date().getTime();
var reqKeywords = xdmp.getRequestField("keywords");
var persec = count(1500, reqKeywords);
var permin = count(1000 * 60, reqKeywords);
var perhour = count(1000 * 60 * 60, reqKeywords);
var perday = count(1000 * 60 * 60 * 24, reqKeywords);
var result = { "persec": persec, "permin": permin, "perhour": perhour, "perday": perday };

result;


