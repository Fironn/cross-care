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
var LED_SERVICE_UUID                        = '0000ffa0-0000-1000-8000-00805f9b34fb';
var LED_TEXT_CHARACTERISTIC_UUID            =  '0000ffa3-0000-1000-8000-00805f9b34fb';

// var LED_SERVICE_UUID                        = '0000fff0-0000-1000-8000-00805f9b34fb';
// var LED_TEXT_CHARACTERISTIC_UUID            =  '0000ffa2-0000-1000-8000-00805f9b34fb';

//ボタンイベントリスナー
d3.select("#connect").on("click", connect);
d3.select("#disconnect").on("click", disconnect);    
d3.select("#send").on("click");    


// //chibi:bitに接続する
// function connect() {
//   let options = {};

  
// //   options.acceptAllDevices = true;
  
//   options.filters = [
//     {services: [LED_SERVICE_UUID]}, // <- 重要
//     {namePrefix: "WGX_iBeacon"}
//   ];
  
//   navigator.bluetooth.requestDevice(options)
//   .then(device => {
//     bluetoothDevice = device;
//     console.log("device", device);
//     console.log("device", device);
//     return device.gatt.connect();
//   })
//   .then(server =>{
//     console.log("server", server);
//     console.log(server.gatt);
//     return server.getPrimaryService(LED_SERVICE_UUID);
//   })
//   .then(service => {
//     console.log("service", service)
//     return service.getCharacteristic(LED_TEXT_CHARACTERISTIC_UUID)
//   })
//   .then(chara => {
//     console.log("characteristic", chara)
//     alert("BLE接続が完了しました。");
//     characteristic = chara;
//     return chara.readValue();
//   })
//   .then(value => {
//     console.log(value.getUint8(0))
//   })  
//   .catch(error => {
//     console.log(error);
//   });    
// }

// //LEDに表示するメッセージを送信
// function sendMessage() {
//   if (!bluetoothDevice || !bluetoothDevice.gatt.connected || !characteristic) return ;
//   var text = document.querySelector("#message").value;
//   var arrayBuffe = new TextEncoder().encode(text);
//   characteristic.writeValue(arrayBuffe);        
// }


// //BEL切断処理
// function disconnect() {
//   if (!bluetoothDevice || !bluetoothDevice.gatt.connected) return ;
//   bluetoothDevice.gatt.disconnect();
//   alert("BLE接続を切断しました。")
// }



var known_service = "fda50693-a4e2-4fb1-afcf-c6eb07647825";

function connect(){
  let options = {};
    options.acceptAllDevices = true;
    // filters: [{
    //   services: [
    //     'link_loss',
    //     'immediate_alert',
    //     'tx_power'
    //   ]
    // }]
    // options.filters = [
    //   {services: [known_service]}, // <- 重要
    // ];
    
  // ① デバイスのスキャン
  navigator.bluetooth.requestDevice(options).then(device => {
      // ② デバイス見つかったので、接続する
      return device.connectGATT();
  }).then(server => {
      // ③ デバイスに接続できたので、そのデバイスのServiceを調べる
      return Promise.all([
        server.getPrimaryService('link_loss'),
        server.getPrimaryService('immediate_alert'),
        server.getPrimaryService('tx_power')
      ]);
  }).then(services => {
      // ④ Serviceを全部調べたので、次はサービスに紐づくCharacteristicsを調べる
      return Promise.all([
        services[0].getCharacteristic('alert_level'),
        services[1].getCharacteristic('alert_level'),
        services[2].getCharacteristic('tx_power_level')
      ]);
  }).then(characteristics => {
      // ⑤ 全部の Chracteristics をゲット
      // あとはその Characteristics を Read/Writeしていく
  }).catch(error => {
      // エラー時はここにくる
      console.log(error);
  });
}

function interpretIBeacon(event) {
  var rssi = event.rssi;
  var appleData = event.manufacturerData.get(0x004C);
  if (appleData.byteLength != 23 ||
    appleData.getUint16(0, false) !== 0x0215) {
    console.log({isBeacon: false});
  }
  var uuidArray = new Uint8Array(appleData.buffer, 2, 16);
  var major = appleData.getUint16(18, false);
  var minor = appleData.getUint16(20, false);
  var txPowerAt1m = -appleData.getInt8(22);
  console.log({
      isBeacon: true,
      uuidArray,
      major,
      minor,
      pathLossVs1m: txPowerAt1m - rssi});
};
