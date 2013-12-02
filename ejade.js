var ejade = {
  
  /*
  show things for specific devices
  setup your css beforehand to use classes like the following
  .show-for-iphone{ display: none; }
  .show-for-ipad{ display: none; }
  .show-for-ipod{ display: none; }
  .show-for-android{ display: none; }
  .show-for-blackberry{ display: none; }
  .show-for-kindle{ display: none; }
  example: ej.showForDevice('iphone, ipad, ipod, android, blackberry, kindle');
  */
  showForDevice: function(deviceList){
    ejade.isMobile(deviceList, function(match, device){
      if(match){
        $( '.show-for-' + device.toLowerCase() ).show();
      }
    });
  },


  /*
    ejade.isMobile() true || false

    ejade.isMobile(function(match, device){
      //match is true or false
      //device is false or device matched as a string
      console.log(match + " " + device);
    }); true || false

    ejade.isMobile('ipad, android, iphone', function(match, device){
      // you can pass in multiple params to match against
      // this case will check for a match against ipad || android || iphone
      // match is true or false
      // device is false or device matched as a string
      console.log("string match: " + match + " " + device);
    });
  */

  isMobile: function(device, callback){
    var userAgent = navigator.userAgent||navigator.vendor||window.opera;
    var deviceArray = [];
    var callbackfunction = false;
    var match = false;
    var deviceName = false;
    
    for(var i=0; i < arguments.length; i++){
      if(typeof arguments[i] == "string"){
        var deviceArray = arguments[i].split(",");
      }
      if(typeof arguments[i] == 'function'){
        callbackfunction = true;
        callback = arguments[i];
      }      
    }
    
    if(deviceArray.length > 0){
      // if string search param passed match against supplied devices
      for(var i=0; i < deviceArray.length; i++){
        var re = new RegExp(deviceArray[i].trim(), "i");
        if( userAgent.match(re) ){
          deviceName = navigator.userAgent.match(re)[0];
          match = true;
          break;
        }
      }   
    }else{
      // if no string search param passed do a match against mobile devices
      var mobileRegex = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|ad|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|webOS |windows (ce|phone)|xda|xiino|android|playbook|tablet/i;
      if( userAgent.match(mobileRegex) ){
        deviceName = userAgent.match(mobileRegex)[0];
        match = true;
      }
    }

    if(callbackfunction){
      callback(match, deviceName);
    }else{
      return match;
    }
    

  },

  /*
  Detect retina display
  ejade.isRetina() returns true || false
  ejade.isRetina(function(bool){
    console.log("Retina: " + bool);
  });
  */
  isRetina: function(callback){
    var retina = false;
    
    if (window.matchMedia) { 
      var mq = window.matchMedia("only screen and (-moz-min-device-pixel-ratio: 1.3), only screen and (-o-min-device-pixel-ratio: 2.6/2), only screen and (-webkit-min-device-pixel-ratio: 1.3), only screen  and (min-device-pixel-ratio: 1.3), only screen and (min-resolution: 1.3dppx)");
      if(mq && mq.matches) {
        retina = true;
      }else{
        retina = false;
      }
    }

    if(typeof callback == "function"){
      callback(retina);
    }else{
      return retina;
    }
    
  },
  
  //Add ie10 class to the document if the browser is ie10
  addIE10Class: function(){
    if(/*@cc_on!@*/false){
      document.documentElement.className+=' ie10 ie';
    }
  },

  //Add ie11 class to the document if the browser is ie11
  addIE11Class: function(){
    var ie11Styles = ['msTextCombineHorizontal'];
    for (var i = 0; i < ie11Styles.length; i++) {
       property = ie11Styles[i];
       if (document.body.style[property] != undefined) {
          document.documentElement.className+=' ie11 ie';
       }
    }
  }
  

};

ejade.showForDevice('iphone, ipad, ipod, android, blackberry, kindle');
ejade.addIE10Class();
ejade.addIE11Class();


