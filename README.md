# ejade.js - javascript utility library

This library contains useful utility functions that I found myself writing more than once

## Requires 
* jQuery
* ejade.js 
* ejade.css

## Mobile Device Utility Methods

* ejade.isMobile();

```javascript
// returns true || false
var ejade.isMobile(); 
```

```javascript
var ejade.isMobile(function(match, device){
  console.log(match + " " + device);
}); 
```

```javascript
// check for ipad,iphone or android
// callback passes match true or false AND device name
var ejade.isMobile('ipad, iphone, android', function(match, device){
  console.log(match + " " + device );
}); 
```
* ejade.isRetina();

```javascript
// returns true || false
var ejade.isRetina(); 
```

```javascript
var ejade.isRetina(function(bool){
  console.log("Retina: " + bool);
}); 
```

* SHOW FOR DEVICE CSS - Adding one of the following classes to an html element will make it visible for the specified device

```
//CSS
* .show-for-android
* .show-for-iphone
* .show-for-ipad
* .show-for-ipod
* .show-for-blackberry
* .show-for-kindle
```

## IE Browser Utility Methods
* ejade.addIE10Class(); - adds "ie10" class to the html in the document for ie10 browser
* ejade.addIE11Class(); - adds "ie11" class to the html in the document for ie11 browser
* ejade.locationOriginFix(); - Polyfill - Adds support for window.location.origin in ie8

