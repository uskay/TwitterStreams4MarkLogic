declareUpdate();
var sessionid = xdmp.getRequestField("sid");
var mid = xdmp.getRequestField("mid");
var documentID = "/Messages/MS_"+ sessionid + ".json";
var doc;
if(fn.exists(cts.doc(documentID))){
  var doc = fn.doc(documentID).next().value;
  for(var i=0; i< doc.toObject().length; i++){
    var node = doc.root[i];
    if(node.mid == mid){
      xdmp.nodeDelete(node);
    }
  }
}
