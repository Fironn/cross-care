import { createConnection } from "net";

    //  WGX_iBeacon
     //  fda50693-a4e2-4fb1-afcf-c6eb07647825
    //  00002a00-0000-1000-8000-00805f9b34fb generic
    //  00002a23-0000-1000-8000-00805f9b34fb information

    //  00002a28-0000-1000-8000-00805f9b34fb'
    //  00002a00-0000-1000-8000-00805f9b34fb'
    //  00002a19-0000-1000-8000-00805f9b34fb'


    //  0000ffa2-0000-1000-8000-00805f9b34fb'

var bluetoothDevice;
var characteristic;

//chibi:bit BLE UUID
var LED_SERVICE_UUID = 'fda50693-a4e2-4fb1-afcf-c6eb07647825';
var SERVICE_UUID =  '0000fff0-0000-1000-8000-00805f9b34fb';
var CHARACTERISTIC_UUID =  '0000fff4-0000-1000-8000-00805f9b34fb';

// var LED_SERVICE_UUID                        = '0000fff0-0000-1000-8000-00805f9b34fb';
// var LED_TEXT_CHARACTERISTIC_UUID            =  '0000ffa2-0000-1000-8000-00805f9b34fb';

//ボタンイベントリスナー
d3.select("#connect").on("click", connect);
d3.select("#disconnect").on("click", disconnect);    
d3.select("#send").on("click");    

function connect(){
  options={}
  // options.acceptAllDevices = true;

  options.filters = [
    { services: [SERVICE_UUID]}, // <- 重要
    {namePrefix: "WGX_iBeacon"}
  ];
  
  navigator.bluetooth.requestDevice(options)
  .then(device => {
    bluetoothDevice = device;
    console.log("device", device);
    return device.gatt.connect();
  })
  .then(server =>{
    console.log("server", server);
    return server.getPrimaryService(SERVICE_UUID);
  })
  .then(service => {
    console.log("service", service)
    return service.getCharacteristic(CHARACTERISTIC_UUID)
  })
  .then(chara => {
    console.log("characteristic", chara)
    alert("BLE接続が完了しました。");
    characteristic = chara;
    return chara.readValue();
  })
  .then(value => {
    console.log(value.getUint8(0))
  })  
  .catch(error => {
    console.log(error);
  });    
}

dConnect.checkDeviceConnect(
  function (apiVersion) {
    // 動作している場合
  }, function (errorCode, errorMessage) {
    // 動作していない場合
  });

var scopes = Array("battery", "serviceinformation",
  "servicediscovery", "file",
  "mediastream_recording", "omnidirectional_image"
);

// createConnection/ble/
var dc = new DeviceConnect({
  applicationName: "cross-care"
});
dc.setup()
  .then(function () {
    // 準備完了
  }, function (error) {
    // エラー
    alert(error.errorMessage)
  });


var DeviceConnect = (function () {
  var scopes = Array("DeviceConnect");

  var DeviceConnect = function (args) {
    this.applicationName = args.applicationName;
    this.clientId = localStorage.getItem('clientId') || "";
    this.host = args.host || host;
    this.scopes = args.scopes || scopes;
    this.accessToken = localStorage.getItem('accessToken') || "";
    this.services = [];
  }

  var p = DeviceConnect.prototype;

  p.findService = function (name) {
    for (i in this.services) {
      if (this.services[i].id.toLowerCase().indexOf(name.toLowerCase()) == 0) {
        return this.services[i].id;
      }
    }
  }

  p.setLocalStorage = function () {
    localStorage.setItem('clientId', me.clientId);
    localStorage.setItem('accessToken', me.accessToken);
  }

  p.setup = function () {
    var me = this;
    var p = new Promise(function (resolve, reject) {
      me.check()
        .then(function (res) {
          return me.grant()
        }, function (res) {
          return reject(res);
        })
        .then(function (res) {
          me.accessToken = res.accessToken;
          me.clientId = res.clientId;
          me.setLocalStorage()
          return me.discover()
        }, function (res) {
          return reject(res);
        })
        .then(function (services) {
          me.services = services;
          return resolve(res);
        }, function (res) {
          return reject(res);
        })
    });
    return p;
  };

  p.discover = function () {
    me = this;
    var p = new Promise(function (resolve, reject) {
      dConnect.discoverDevices(me.accessToken,
        function (json) {
          return resolve(json.services);
        },
        function (errorCode, errorMessage) {
          return reject({ errorCode: errorCode, errorMessage: errorMessage })
        });
    });
    return p;
  };

  p.grant = function () {
    me = this;
    var p = new Promise(function (resolve, reject) {
      if (me.clientId && me.accessToken != "") {
        return resolve({ clientId: me.clientId, accessToken: me.accessToken });
      }
      dConnect.authorization(me.scopes, me.applicationName,
        function (clientId, accessToken) {
          return resolve({ clientId: clientId, accessToken: accessToken });
        },
        function (errorCode, errorMessage) {
          return reject({ errorCode: errorCode, errorMessage: errorMessage })
        });
    });
    return p;
  };

  p.check = function () {
    var p = new Promise(function (resolve, reject) {
      dConnect.checkDeviceConnect(
        function (apiVersion) {
          return resolve({ apiVersion: apiVersion });
        }, function (errorCode, errorMessage) {
          return reject({ errorCode: errorCode, errorMessage: errorMessage })
        });
    });
    return p;
  }
  return DeviceConnect;
})();
