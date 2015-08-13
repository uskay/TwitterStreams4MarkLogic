declareUpdate();
var sessionid = xdmp.getRequestField("sid");
var message = xdmp.getRequestField("msg");
var owner = xdmp.getRequestField("owner");
var mid = xdmp.getRequestField("mid");
var documentID = "/Messages/MS_"+ sessionid + ".json";
var messageObj = {msg:message, owner:owner, mid: mid};
var doc;
if(fn.exists(cts.doc(documentID))){
  var doc = fn.doc(documentID).next().value;
  for(var i=0; i< doc.toObject().length; i++){
    var node = doc.root[i];
    if(node.mid == mid){
      xdmp.nodeReplace(node, messageObj);
    }
  }
}
