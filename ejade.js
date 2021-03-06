ejade = {
  
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
        jQuery( '.show-for-' + device.toLowerCase() ).show();
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

  isMobile: function(){
    var userAgent = navigator.userAgent||navigator.vendor||window.opera;
    var deviceArray = [];
    var callback = false;
    var match = false;
    var deviceName = false;
    
    for(var i=0, l=arguments.length; i < l; ++i){
      if(typeof arguments[i] == "string"){
        deviceArray = arguments[i].split(",");
      }
      if(typeof arguments[i] == 'function'){
        callback = arguments[i];
      }      
    }
    
    if(deviceArray.length > 0){
      // if string search param passed match against supplied devices
      for(var i=0, l=deviceArray.length; i < l; ++i){
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

    if(typeof callback == "function"){
      callback(match, deviceName);
      return null;
    }
    return match;
  },
  
  // Get initial and current size and bootstrap narrow info
  // ejade.size.width('intitial')
  // ejade.size.width('current')
  // ejade.size.isNarrow('initial')
  // ejade.size.isNarrow('current')
    
  size: {
    
    initialSize: jQuery(window).width(),
    
    width: function(when){
      if(when == 'initial'){
        return ejade.initialSize;
      }else{
        return jQuery(window).width();
      }
    },
    isNarrow: function(when){
      if(when == "initial"){
        return ejade.size.narrowCheck(ejade.size.initialSize);
      }else{ 
        return ejade.size.narrowCheck();
      }
    },
    narrowCheck: function(size){
      size = size || jQuery(window).width();
      if( size < 768 ){
        return true; 
      }else{
        return false;
      }
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
      }
    }

    if(typeof callback == "function"){
      callback(retina);
      return null;
    }

    return retina;
    
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
    for (var i = 0, l=ie11Styles.length; i < l; ++i) {
       property = ie11Styles[i];
       if (document.body.style[property] != undefined) {
          document.documentElement.className+=' ie11 ie';
       }
    }
  },

  //Make ie8 support window.location.origin
  locationOriginFix: function(){
    if( !window.location.origin ){
      if(window.location.port){
        port = ':' + window.location.port
      }else{
        port = ''
      }
      window.location.origin = window.location.protocol + "//" + window.location.hostname + port
    }
  }

};


ejade.showForDevice('iphone, ipad, ipod, android, blackberry, kindle');
ejade.addIE10Class();
ejade.addIE11Class();
ejade.locationOriginFix();
