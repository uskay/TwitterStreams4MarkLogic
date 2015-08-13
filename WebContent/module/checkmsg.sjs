var sessionid = xdmp.getRequestField("sid");
var documentID = "/Messages/MS_"+ sessionid + ".json";
var ret = {isnewupdate: false};
if(fn.exists(cts.doc(documentID))){
  var doc = fn.doc(documentID).next().value;
  for(var i=0; i< doc.toObject().length; i++){
    var node = doc.root[i];
    if(node.seen && node.seen == false){
      ret = {isnewupdate: true};
    }
  }
}
ret;