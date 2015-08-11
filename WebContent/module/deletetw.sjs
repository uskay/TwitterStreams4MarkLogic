declareUpdate();
for(var uri of cts.uriMatch("*", "case-sensitive", cts.jsonPropertyRangeQuery("timestamp_ms", "<=", new Date().getTime() - 1000*60*60))){
  xdmp.documentDelete(uri);
}