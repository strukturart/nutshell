parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"pX43":[function(require,module,exports) {
var e=function(){var e=function(e,t,r,n){e=(e=e.split(/\r\n|\n/)).join("\r\n");var a=ICAL.parse(e),o=new ICAL.Component(a),i="",l="",c="";if(o.getAllSubcomponents("vevent").forEach(function(e){if(""==e.getFirstPropertyValue("dtstart")&&""==e.getFirstPropertyValue("summary"))return!1;var t=null,r=null,a=null;null!=e.getFirstPropertyValue("dtend")&&(t=ICAL.design.icalendar.value["date-time"].toICAL(e.getFirstPropertyValue("dtend")),r=(t=new Date(e.getFirstPropertyValue("dtend"))).getFullYear()+"-"+"0".concat(t.getMonth()+1).slice(-2)+"-"+"0".concat(t.getDate()).slice(-2),a="0".concat(t.getHours()).slice(-2)+":"+"0".concat(t.getMinutes()).slice(-2)+":"+"0".concat(t.getSeconds()).slice(-2),c=(c=(c=r+"T"+a).replace(/-/g,"")).replace(/:/g,""));var o=null,s=null,u=null,d=null;null!=e.getFirstPropertyValue("dtstart")&&(o=ICAL.design.icalendar.value["date-time"].toICAL(e.getFirstPropertyValue("dtstart")),d=(d=(d=(s=(o=new Date(e.getFirstPropertyValue("dtstart"))).getFullYear()+"-"+"0".concat(o.getMonth()+1).slice(-2)+"-"+"0".concat(o.getDate()).slice(-2))+"T"+(u="0".concat(o.getHours()).slice(-2)+":"+"0".concat(o.getMinutes()).slice(-2)+":"+"0".concat(o.getSeconds()).slice(-2))).replace(/-/g,"")).replace(/:/g,"")),multidayevent=!1,new Date(r).getTime()>new Date(s).getTime()&&(multidayevent=!0);var g=new Date(e.getFirstPropertyValue("last-modified")).getTime();u==a&&(u="",a=""),i="",l="";var p={BEGIN:"VEVENT",UID:e.getFirstPropertyValue("uid"),SUMMARY:e.getFirstPropertyValue("summary"),LOCATION:e.getFirstPropertyValue("location"),DESCRIPTION:e.getFirstPropertyValue("description"),ATTACH:e.getFirstPropertyValue("attach"),RRULE:function(){var t="";null!=e.getFirstPropertyValue("rrule")&&(t=e.getFirstPropertyValue("rrule").toString());return t}(),"LAST-MODIFIED":g,CLASS:"PRIVATE",DTSTAMP:d,DTSTART:d,DTEND:c,END:"VEVENT",dateStart:s,dateEnd:r,time_start:u,time_end:a,notification:" ",alarm:"none",isSubscription:n,multidayevent:multidayevent,rrule_:function(){var t="none";null!=e.getFirstPropertyValue("rrule")&&(t=e.getFirstPropertyValue("rrule").freq);return t}()};i=p.UID,l=p.date,events.push(p)}),r){var s=events.filter(function(e){return!1===e.isSubscription});localforage.setItem("events",s).then(function(e){helper.side_toaster("<img src='assets/image/E25C.svg'>",2500)}).catch(function(e){helper.toaster(e)})}t(i,l)};return{export_ical:function(e,t){if(!navigator.getDeviceStorage)return!1;var r=navigator.getDeviceStorage("sdcard");r.delete(e).onsuccess=function(){},setTimeout(function(){var n="";n+="BEGIN:VCALENDAR\r\n",n+="VERSION:2.0\r\n",n+="PRODID:GREG\r\n",n+="METHOD:PUBLISHED\r\n",t.forEach(function(e){var t=-1;for(var r in e)0==++t&&(n+="BEGIN:VEVENT\r\n"),"BEGIN"!=r&&"END"!=r&&"date"!=r&&"time_start"!=r&&"time_end"!=r&&"dateStart"!=r&&"dateEnd"!=r&&"notification"!=r&&"alarm"!=r&&"isSubscription"!=r&&"multidayevent"!=r&&"alarmTrigger"!=r&&"rrule_"!=r&&(n+="".concat(r,":").concat(e[r])+"\r\n"),t==Object.keys(e).length-1&&(n+="END:VEVENT\r\n")}),n+="END:VCALENDAR\r\n";var a=new Blob([n],{type:"text/calendar"}),o=r.addNamed(a,e);o.onsuccess=function(){helper.side_toaster("<img src='assets/image/E25C.svg'>",2500)},o.onerror=function(){helper.toaster("Unable to write the file",2e3)}},2e3)},list_ics:function(){var e=new Applait.Finder({type:"sdcard",debugMode:!1});e.search(".ics"),e.on("searchComplete",function(e,t){}),e.on("fileFound",function(e,t,r){document.querySelector("div#import-text").style.display="block","greg.ics"!=t.name&&document.querySelector("div#options div#import-text").insertAdjacentHTML("afterend",'<button class="item dynamic" data-function="import" data-filename="'+t.name+'">'+t.name+"</button>"),document.querySelectorAll("div#options button").forEach(function(e,t){})})},loadICS:function(t,r){var n=new Applait.Finder({type:"sdcard",debugMode:!1});n.search(t),n.on("searchComplete",function(e,t){0==t&&helper.toaster("xxx",2e3)}),n.on("fileFound",function(t,n,a){var o=new FileReader;o.onerror=function(e){helper.toaster("can't read file",3e3),o.abort()},o.onloadend=function(t){var n=t.target.result;e(n,r,!0,!1)},o.readAsText(t)})},share:function(e,t){var r=new MozActivity({name:"share",data:{type:"text/calendar",number:1,blobs:[e],filenames:[t]}});r.onsuccess=function(){},r.onerror=function(){}},fetch_ics:function(t,r){var n=new XMLHttpRequest({mozSystem:!0});n.open("GET",t+"?time="+(new Date).getTime(),!0),n.timeout=25e3,n.onload=function(){if(n.readyState===n.DONE&&200===n.status){var t=n.response;e(t,r,!1,!0)}},n.onerror=function(){helper.toaster("subscription could not be loaded",2e3)},n.send(null)}}}();
},{}]},{},["pX43"], null)