var getMID = function() {
    var n = 10;
    var a = 'abcdefghijklmnopqrstuvwxyz'
            + 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
            + '0123456789';
    a = a.split('');
    var s = 'MID_';
    for (var i = 0; i < n; i++) {
        s += a[Math.floor(Math.random() * a.length)];
    }
    s = s + "_" + new Date().getTime();
    return s;
};

declareUpdate();
var sessionid = xdmp.getRequestField("sid");
var message = xdmp.getRequestField("msg");
var documentID = "/Messages/MS_"+ sessionid + ".json";
var messageObj = {msg:message, owner: "@uskay", mid: getMID(), seen: false};
var doc;
if(fn.exists(cts.doc(documentID))){
  var doc = fn.doc(documentID).next().value;
  xdmp.nodeInsertAfter(doc.root[doc.toObject().length - 1], messageObj);
} else {
  doc = new Array();
  doc.push(messageObj);
  xdmp.documentInsert(documentID, doc);
}