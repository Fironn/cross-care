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
var applicationName = "YOUR_APPLICATION_NAME";
dConnect.authorization(scopes, applicationName,
  function (clientId, accessToken) {
    // 許可が得られた場合
  },
  function (errorCode, errorMessage) {
    // 許可が得られなかった場合
  });

// accessToken は先ほど取得したものを使います
dConnect.discoverDevices(accessToken,
  function (json) {
    // json.servicesの中にデバイス情報が返ってきます
  },
  function (errorCode, errorMessage) {
    // 認証が得られなかった場合
  });
  