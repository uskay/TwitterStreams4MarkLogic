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
var messageObj = {msg:message, owner: "@You", mid: getMID()};
var doc;
if(fn.exists(cts.doc(documentID))){
  var doc = fn.doc(documentID).next().value;
  xdmp.nodeInsertAfter(doc.root[doc.toObject().length - 1], messageObj);
} else {
  doc = new Array();
  doc.push(messageObj);
  xdmp.documentInsert(documentID, doc);
}

var payload =  {
  'key': 'PR2DGYKCxL3oYEAbaNWxew',
  'message': {
    'from_email': 'marklogic@example.com',
    'to': [
      {
        'email': 'uskay23@gmail.com',
        'name': 'uskay',
        'type': 'to'
      }
    ],
    'subject': 'new message',
    'text': 'http://52.68.48.176:8003/admin.html?' + sessionid + "   message:" + message
  }
}


xdmp.httpPost("https://mandrillapp.com/api/1.0/messages/send.json",
     {
       "data" : xdmp.quote(payload),
       "headers" : {
         'Content-Type': 'application/json; charset=utf-8'
       }
     });