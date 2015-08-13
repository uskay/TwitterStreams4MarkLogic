# TwitterSTREAMS
I was interested in [MarkLogic](http://jp.marklogic.com/) in the way that it is buzzing around the internet on behalf of **"The only enterprise NoSQL database"**. This application is a sample App to understand MarkLogic more deeply.<br><br>
![tw_img](https://raw.githubusercontent.com/uskay/TwitterStreams4MarkLogic/master/WebContent/img/tw_img.png)

##What is TwitterSTREAMS?
Since I wanted to make something that has both "real-time" and "big-data" aspects, I decided to use the Twitter Streaming API. This app retrieves realtime twitter streams using the Twitter Streaming API and insert it into MarkLogic8(Hosted on AWS). Provides a front-end app to analyze the quantity of the stream coming in from Twitter. It also provides a real-time search function.
![tw_model](https://raw.githubusercontent.com/uskay/TwitterStreams4MarkLogic/master/WebContent/img/tw_model.png)

##Trailer
A screen capture of the live website with annotations for function description.<br>
[http://youtu.be/_y-xsLOeLO0](http://youtu.be/_y-xsLOeLO0)

##Libraries used
- [Rickshaw](http://code.shutterstock.com/rickshaw/) for drawing graphs
- [Twitter4j](http://twitter4j.org/en/index.html) for handling Twitter Streaming API
- [JQuery](https://jquery.com/) ...you wouldn't need any explanation on this lib

##Add on feature: Messenger
Since I was not using much of update methods provided by MarkLogic, I additionally developed a feature: **Messenger**, which is integrated right in the main TwitterSTREAMS and actually does CRUD operation + Web API(MANDRILL) requests to communicate with me.<br><br>
![messenger_img](https://raw.githubusercontent.com/uskay/TwitterStreams4MarkLogic/master/WebContent/img/messenger_img.png)
###Component Model for Messenger
You can use this messenger like a chat room which lasts during your session. If you enter the website with a different session(ie. session expired, different client..), you will start with a whole new conversation.
![messenger](https://raw.githubusercontent.com/uskay/TwitterStreams4MarkLogic/master/WebContent/img/messenger.png)
###Trailer for Messenger
A screen capture of the live website with annotations for function description.<br>
[https://youtu.be/m9P1fiLGYsc](https://youtu.be/m9P1fiLGYsc)
