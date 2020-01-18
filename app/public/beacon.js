const beaconId=[
  "MhVqE3QW/Wh/swgsgSJBPg==",
  "+OqhBk5GV+UHsgx3Eslb3g==",
  "oWgJHvsrCrGJhVeQbPXnnw=="
]

var setRSSI = firebase.functions().httpsCallable('setRSSI');

const rssi=[];

async function onButtonClick() {
  let options = {};
  // options.acceptAllAdvertisements = true;
  // options.acceptAllDevices= true;
  options.filters=[{name : 'WGX_iBeacon'}];

  try {
    log('Requesting Bluetooth Scan with options: ' + JSON.stringify(options));
    const scan = await navigator.bluetooth.requestLEScan(options);

    log('Scan started with:');
    log(' acceptAllAdvertisements: ' + scan.acceptAllAdvertisements);
    log(' active: ' + scan.active);
    log(' keepRepeatedDevices: ' + scan.keepRepeatedDevices);
    log(' filters: ' + JSON.stringify(scan.filters));

    navigator.bluetooth.addEventListener('advertisementreceived', event => {
      if (event.device.name == 'WGX_iBeacon'){
        // log('Advertisement received.');
        // log('  Device Name: ' + event.device.name);
        log('  Device ID: ' + event.device.id);
        log('  RSSI: ' + event.rssi);
        // log('  TX Power: ' + event.txPower);
        // log('  UUIDs: ' + event.uuids);
        event.manufacturerData.forEach((valueDataView, key) => {
          // logDataView('Manufacturer', key, valueDataView);
        });
        event.serviceData.forEach((valueDataView, key) => {
          // logDataView('Service', key, valueDataView);
        });
        rssi[beaconId.indexOf(event.device.id)] = event.rssi;
        // setRSSI({
        //     beaconId: beaconId.indexOf(event.device.id),
        //     rssi: event.rssi
        //   }).then(function (result) {
        //     console.log(result.data);
        //   }).catch(error => console.log(error));
        cal(event.rssi, beaconId.indexOf(event.device.id));
      }
      event.manufacturerData.forEach((valueDataView, key) => {
        // logDataView('Manufacturer', key , valueDataView);
      });
      event.serviceData.forEach((valueDataView, key) => {
        // logDataView('Service', key, valueDataView);
      });
    });

    setTimeout(stopScan, 30000);

    function stopScan() {
      log('Stopping scan...');
      scan.stop();
      log('Stopped.  scan.active = ' + scan.active);
    }
  } catch (error) {
    log('Argh! ' + error);
  }
}

const logDataView = (labelOfDataSource, key, valueDataView) => {
  const hexString = [...new Uint8Array(valueDataView.buffer)].map(b => {
    return b.toString(16).padStart(2, '0');
  }).join(' ');
  const textDecoder = new TextDecoder('ascii');
  const asciiString = textDecoder.decode(valueDataView.buffer);
  log(`  ${labelOfDataSource} Data: ` + key +
    '\n    (Hex) ' + hexString +
    '\n    (ASCII) ' + asciiString);
};

function log(text){
  console.log(text);
}

const origin=-45;
const far=-68;
const TxPower=-45;
// 3m
function cal(rssiData,id){
  var d = (TxPower - rssiData)/5.00
  setRSSI({
      beaconId: id,
      rssi: d
    }).then(function (result) {
      console.log(result.data);
    }).catch(error => console.log(error));
  console.log(d/2);
}