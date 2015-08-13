declareUpdate();
var sessionid = xdmp.getRequestField("sid");
var documentID = "/Messages/MS_"+ sessionid + ".json";
if(fn.exists(cts.doc(documentID))){
  var doc = fn.doc(documentID).next().value;
  for(var i=0; i< doc.toObject().length; i++){
    var node = doc.root[i];
    if(node.owner == "@uskay"){
      var nodeObject = doc.toObject()[i];
      nodeObject.seen = true;
      xdmp.nodeReplace(node, nodeObject);
    }
  }
}
cts.doc(documentID);
