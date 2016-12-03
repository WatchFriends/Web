//sample code van https://github.com/ciaranj/node-oauth

describe("OAuth2",function(){
  var oAuth = require("oauth");

   window.it("gets bearer token", function(done){
       const twitterConsumerKey = "your key",
           twitterConsumerSecret = "your secret";

       const oauth2 = new oAuth.OAuth2(server.config.keys.twitter.consumerKey,
         twitterConsumerSecret, 
         "https://api.twitter.com/", 
         null,
         "oauth2/token", 
         null);
     oauth2.getOAuthAccessToken(
       "",
       {'grant_type':"client_credentials"},
       function (e, access_token, refresh_token, results){
       console.log("bearer: ",access_token);
       done();
     });
   });
});