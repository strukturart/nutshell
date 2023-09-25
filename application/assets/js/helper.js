'use strict';
import { events } from '../../app.js';

export function sort_array(arr, itemKey, type) {
  const sortFunction = (a, b) => {
    if (type === 'date') {
      return new Date(b[itemKey]) - new Date(a[itemKey]);
    } else if (type === 'number') {
      return b[itemKey] - a[itemKey];
    } else if (type === 'string') {
      return a[itemKey].localeCompare(b[itemKey], undefined, {
        sensitivity: 'base',
      });
    }
  };

  arr.sort(sortFunction);
}

export function sort_array_last_mod() {
  console.log(events);
  // Custom comparison function to sort by date-like properties
  function compareDateObjects(a, b) {
    const dateA = new Date(
      a['LAST-MODIFIED']['_time'].year,
      a['LAST-MODIFIED']['_time'].month - 1,
      a['LAST-MODIFIED']['_time'].day,
      a['LAST-MODIFIED']['_time'].hour,
      a['LAST-MODIFIED']['_time'].minute,
      a['LAST-MODIFIED']['_time'].second
    );
    const dateB = new Date(
      b['LAST-MODIFIED']['_time'].year,
      b['LAST-MODIFIED']['_time'].month - 1,
      b['LAST-MODIFIED']['_time'].day,
      b['LAST-MODIFIED']['_time'].hour,
      b['LAST-MODIFIED']['_time'].minute,
      b['LAST-MODIFIED']['_time'].second
    );

    return dateB - dateA;
  }

  events.sort(compareDateObjects);
}

export let notification = '';
let notify = function (param_title, param_text, param_silent) {
  var options = {
    body: param_text,
    silent: param_silent,
    requireInteraction: false,
    //actions: [{ action: "test", title: "test" }],
  };

  // Let's check whether notification permissions have already been granted
  if (Notification.permission === 'granted') {
    // If it's okay let's create a notification
    notification = new Notification(param_title, options);
  }

  // Otherwise, we need to ask the user for permission
  if (Notification.permission !== 'denied') {
    Notification.requestPermission().then(function (permission) {
      // If the user accepts, let's create a notification
      if (permission === 'granted') {
        notification = new Notification(param_title, options);
      }
    });
  }
};

//https://notifications.spec.whatwg.org/#dictdef-notificationaction

export let pushLocalNotification = function (title, body) {
  window.Notification.requestPermission().then((result) => {
    var notification = new window.Notification(title, {
      body: body,
      //requireInteraction: true,
    });

    notification.onerror = function (err) {
      console.log(err);
    };
    notification.onclick = function (event) {
      if (window.navigator.mozApps) {
        var request = window.navigator.mozApps.getSelf();
        request.onsuccess = function () {
          if (request.result) {
            notification.close();
            request.result.launch();
          }
        };
      } else {
        window.open(document.location.origin, '_blank');
      }
    };
    notification.onshow = function () {
      // notification.close();
    };
  });
};
if (navigator.mozSetMessageHandler) {
  navigator.mozSetMessageHandler('alarm', function (message) {
    pushLocalNotification('Greg', message.data.note);
  });
}

export let validate = function (url) {
  var pattern =
    /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
  if (pattern.test(url)) {
    return true;
  }
  return false;
};

export let getManifest = function (callback) {
  if (!navigator.mozApps) {
    return false;
  }
  let self = navigator.mozApps.getSelf();
  self.onsuccess = function () {
    callback(self.result);
  };
  self.onerror = function () {};
};

//popup
export let popup = function (text, action) {
  let m = document.querySelector('div#popup');
  let mm = document.querySelector('div#popup div div');
  if (action == 'show') {
    m.style.display = 'block';
    mm.innerText = text;
  }
  if (action == 'close') {
    m.style.display = 'none';
    mm.innerText = '';
  }
};

//top toaster
let queue = [];
let timeout;
export let toaster = function (text, time) {
  queue.push({ text: text, time: time });
  if (queue.length === 1) {
    toast_q(text, time);
  }
};

let toast_q = function (text, time) {
  var x = document.querySelector('div#toast');
  x.innerHTML = queue[0].text;

  x.style.transform = 'translate(0px, 0px)';

  timeout = setTimeout(function () {
    timeout = null;
    x.style.transform = 'translate(0px, -100px)';
    queue = queue.slice(1);
    if (queue.length > 0) {
      setTimeout(() => {
        toast_q(text, time);
      }, 1000);
    }
  }, time);
};

//side toaster

let queue_st = [];
let ttimeout;
export let side_toaster = function (text, time) {
  queue_st.push({ text: text, time: time });
  if (queue_st.length === 1) {
    toast_qq(text, time);
  }
};

let toast_qq = function (text, time) {
  var x = document.querySelector('div#side-toast');
  x.innerHTML = queue_st[0].text;

  x.style.transform = 'translate(0vh, 0px)';

  timeout = setTimeout(function () {
    ttimeout = null;
    x.style.transform = 'translate(-100vh,0px)';
    queue_st = queue.slice(1);
    if (queue_st.length > 0) {
      setTimeout(() => {
        toast_qq(text, time);
      }, 1000);
    }
  }, time);
};

//bottom bar
export let bottom_bar = function (left, center, right) {
  document.querySelector('div#bottom-bar div#button-left').innerHTML = left;
  document.querySelector('div#bottom-bar div#button-center').innerHTML = center;
  document.querySelector('div#bottom-bar div#button-right').innerHTML = right;

  if (left == '' && center == '' && right == '') {
    document.querySelector('div#bottom-bar').style.display = 'none';
  } else {
    document.querySelector('div#bottom-bar').style.display = 'block';
  }
};

//top bar
export let top_bar = function (left, center, right) {
  document.querySelector('div#top-bar div.button-left').innerHTML = left;
  document.querySelector('div#top-bar div.button-center').textContent = center;
  document.querySelector('div#top-bar div.button-right').textContent = right;

  if (left == '' && center == '' && right == '') {
    document.querySelector('div#top-bar').style.display = 'none';
  } else {
    document.querySelector('div#top-bar').style.display = 'block';
  }
};

let lock;
export let screenlock = function (stat) {
  if (typeof window.navigator.requestWakeLock === 'undefined') {
    return false;
  }
  if (stat == 'lock') {
    lock = window.navigator.requestWakeLock('screen');
    lock.onsuccess = function () {};
    lock.onerror = function () {
      alert('An error occurred: ' + this.error.name);
    };
  }

  if (stat == 'unlock') {
    if (lock.topic == 'screen') {
      lock.unlock();
    }
  }
};

//pick image
export let pick_image = function (cb) {
  var activity = new MozActivity({
    name: 'pick',
    data: {
      type: ['image/png', 'image/jpg', 'image/jpeg'],
    },
  });

  activity.onsuccess = function () {
    console.log('Activity successfuly handled');

    let p = this.result.blob;
    cb(p);
  };

  activity.onerror = function () {
    console.log('The activity encouter en error: ' + this.error);
  };
};

//delete file
export let deleteFile = function (storage, path, notification) {
  let sdcard = navigator.getDeviceStorages('sdcard');

  let requestDel = sdcard[storage].delete(path);

  requestDel.onsuccess = function () {
    if (notification == 'notification') {
      toaster(
        'File "' + name + '" successfully deleted frome the sdcard storage area'
      );
    }
  };

  requestDel.onerror = function () {
    toaster('Unable to delete the file: ' + this.error);
  };
};

export let list_files = function (filetype, callback) {
  try {
    var d = navigator.getDeviceStorage('sdcard');
    var t = false;
    var cursor = d.enumerate();

    cursor.onsuccess = function () {
      if (!this.result) {
        console.log('finished');
      }

      if (cursor.result.name !== null) {
        var file = cursor.result;
        let n = file.name.split('.');
        let file_type = n[n.length - 1];

        if (file_type == filetype) {
          callback(file.name);
          t = true;
        }
        this.continue();
      }
    };

    cursor.onerror = function () {
      console.warn('No file found: ' + this.error);
    };
  } catch (e) {
    console.log(e);
  }
  if ('b2g' in navigator) {
    try {
      var sdcard = navigator.b2g.getDeviceStorage('sdcard');
      var iterable = sdcard.enumerate();
      async function printAllFiles() {
        for await (let file of iterable) {
          let n = file.name.split('.');
          let file_type = n[n.length - 1];

          if (file_type == filetype) {
            callback(file.name);
            t = true;
          }
        }
      }
      printAllFiles();
    } catch (e) {
      console.log(e);
    }
  }
};

//polyfill
if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = Array.prototype.forEach;
}

function share(url) {
  var activity = new MozActivity({
    name: 'share',
    data: {
      type: 'url',
      url: url,
    },
  });

  activity.onsuccess = function () {};

  activity.onerror = function () {
    console.log('The activity encounter en error: ' + this.error);
  };
}

function delete_file(filename) {
  var sdcard = navigator.getDeviceStorages('sdcard');
  var request = sdcard[1].delete(filename);

  request.onsuccess = function () {
    //toaster("File deleted", 2000);
  };

  request.onerror = function () {
    //toaster("Unable to delete the file: " + this.error, 2000);
  };
}

export function get_file(filename, cb) {
  try {
    var sdcard = navigator.getDeviceStorage('sdcard');
    var request = sdcard.get(filename);

    request.onsuccess = function () {
      var file = this.result;

      let reader = new FileReader();

      reader.onerror = function (event) {
        helper.toaster("can't read file", 3000);
        reader.abort();
      };

      reader.onloadend = function (event) {
        cb(reader.result);
      };

      reader.readAsText(file);
    };

    request.onerror = function () {
      alert('Unable to get the file: ' + this.error);
    };
  } catch (e) {
    console.log(e);
  }
  if ('b2g' in navigator) {
    try {
      var sdcard = navigator.b2g.getDeviceStorage('sdcard');
      var request = sdcard.get(filename).then(function (r) {
        let reader = new FileReader();

        reader.onerror = function (event) {
          console.log('filereader error: ' + event);
          reader.abort();
        };

        reader.onloadend = function (event) {
          cb(reader.result);
        };

        reader.readAsText(r);
      });
    } catch (e) {
      alert(e);
    }
  }
}

function write_file(data, filename) {
  var sdcard = navigator.getDeviceStorages('sdcard');
  var file = new Blob([data], {
    type: 'text/plain',
  });
  var request = sdcard[1].addNamed(file, filename);

  request.onsuccess = function () {
    var name = this.result;
    //toaster('File "' + name + '" successfully wrote on the sdcard storage area', 2000);
  };

  // An error typically occur if a file with the same name already exist
  request.onerror = function () {
    toaster('Unable to write the file: ' + this.error, 2000);
  };
}
