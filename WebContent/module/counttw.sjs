var count = function(duration, reqKeywords){
  var q = new Array();
  q.push(cts.jsonPropertyRangeQuery("timestamp_ms", ">=", currentTimeMills - duration));
  if(reqKeywords){
    var keywords = reqKeywords.split(" ");
    for (var i=0; i<keywords.length; i++){
      if(keywords[i]){
        q.push(cts.jsonPropertyWordQuery("text", keywords[i]));      
      }    
    }
  }
  return cts.estimate(cts.andQuery(q));
}
    
var latestTimestamp = function(){
  var latest = fn.subsequence(cts.search("*", cts.indexOrder(cts.elementReference("timestamp_ms"), "descending")), 1, 1);
  var latest_timestamp;
  for (var doc of latest) {
    latest_timestamp = doc.root.timestamp_ms;
  }
  return latest_timestamp;
}

//var currentTimeMills = new Date().getTime();
var currentTimeMills = latestTimestamp();
var reqKeywords = xdmp.getRequestField("keywords");
var persec = count(1000, reqKeywords);
var permin = count(1000 * 60, reqKeywords);
var perhour = count(1000 * 60 * 60, reqKeywords);
var result = { "persec": persec, "permin": permin, "perhour": perhour};
result;


