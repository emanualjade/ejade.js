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
    ej.isMobile() true || false

    ej.isMobile(function(match, device){
      //match is true or false
      //device is false or device matched as a string
      console.log(match + " " + device);
    }); true || false

    ej.isMobile('ipad, android, iphone', function(match, device){
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
    }
    return match;

  }

};
ejade.showForDevice('iphone, ipad, ipod, android, blackberry, kindle');