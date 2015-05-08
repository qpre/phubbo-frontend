export function initialize(/* container, application */) {
  window.fbAsyncInit = function() {
    window.FB.init({
      appId  : '293516484105634',
      status : true, // check login status
      cookie : true, // enable cookies to allow the server to access the session
      xfbml  : true  // parse XFBML
    });
  };

  (function(d) {
    var js, id = 'facebook-jssdk'; if (d.getElementById(id)) {return;}
    js = d.createElement('script'); js.id = id; js.async = true;
    js.src = "//connect.facebook.net/en_US/all.js";
    d.getElementsByTagName('head')[0].appendChild(js);
  }(document));
}

export default {
  name: 'facebook-sdk',
  initialize: initialize
};
