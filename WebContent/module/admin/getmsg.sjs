var sessionid = xdmp.getRequestField("sid");
var documentID = "/Messages/MS_"+ sessionid + ".json";
cts.doc(documentID);
