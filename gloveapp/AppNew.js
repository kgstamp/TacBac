import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Button, PermissionsAndroid } from 'react-native';
import { React, useState } from 'react';
import { BleManager, Device } from 'react-native-ble-plx';
import { Slider } from '@miblanchard/react-native-slider';

const BLTManager = new BleManager();
const SERVICE_UUID = '4fafc201-1fb5-459e-8fcc-c5c9c331914b';
const SLIDER_UUID = '6d68efe5-04b6-4a85-abc4-c2670b7bf7fd';

function StringToBool(input) {
  if (input == '1') {
    return true;
  } else {
    return false;
  }
}

function BoolToString(input) {
  if (input == true) {
    return '1';
  } else {
    return '0';
  }
}

export default function App() {

  const connectPage = useState(true)  //Is connect page displayed
  const [isConnected, setIsConnected] = useState(false);  //Is a device connected?
  const [connectedDevice, setConnectedDevice] = useState();  //What device is connected?
  const [vibrationValue, setVibrationValue] = useState(50);

  // Scans availbale BLT Devices and then call connectDevice
  async function scanDevices() {
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Permission Localisation Bluetooth',
        message: 'Requirement for Bluetooth',
        buttonNeutral: 'Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    ).then(answer => {
      console.log('scanning');
      // display the Activityindicator

      BLTManager.startDeviceScan(null, null, (error, scannedDevice) => {
        if (error) {
          console.warn(error);
        }

        if (scannedDevice && scannedDevice.name == 'CIRCUITPYe644') {
          BLTManager.stopDeviceScan();
          connectDevice(scannedDevice);
        }
      });

      // stop scanning devices after 5 seconds
      setTimeout(() => {
        BLTManager.stopDeviceScan();
      }, 5000);
    });
  }

  // handle the device disconnection (poorly)
  async function disconnectDevice() {
    console.log('Disconnecting start');

    if (connectedDevice != null) {
      const isDeviceConnected = await connectedDevice.isConnected();
      if (isDeviceConnected) {
        BLTManager.cancelTransaction('messagetransaction');
        BLTManager.cancelTransaction('nightmodetransaction');

        BLTManager.cancelDeviceConnection(connectedDevice.id).then(() =>
          console.log('DC completed'),
        );
      }

      const connectionStatus = await connectedDevice.isConnected();
      if (!connectionStatus) {
        setIsConnected(false);
      }
    }
  }

  //Connect the device and start monitoring characteristics
  async function connectDevice(device) {
    console.log('connecting to Device:', device.name);

    device
      .connect()
      .then(device => {
        setConnectedDevice(device);
        setIsConnected(true);
        return device.discoverAllServicesAndCharacteristics();
      })
      .then(device => {
        //  Set what to do when DC is detected
        BLTManager.onDeviceDisconnected(device.id, (error, device) => {
          console.log('Device DC');
          setIsConnected(false);
        });

        //Read inital values

        //SliderValue
        device
          .readCharacteristicForService(SERVICE_UUID, SLIDER_UUID)
          .then(valenc => {
            setBoxValue(base64.decode(valenc?.value));
          });

        //monitor values and tell what to do when receiving an update

        //Message
        device.monitorCharacteristicForService(
          SERVICE_UUID,
          MESSAGE_UUID,
          (error, characteristic) => {
            if (characteristic?.value != null) {
              setMessage(base64.decode(characteristic?.value));
              console.log(
                'Message update received: ',
                base64.decode(characteristic?.value),
              );
            }
          },
          'messagetransaction',
        );

        //BoxValue
        device.monitorCharacteristicForService(
          SERVICE_UUID,
          SLIDER_UUID,
          (error, characteristic) => {
            if (characteristic?.value != null) {
              setMessage(base64.decode(characteristic?.value));
              console.log(
                'Slider value update received: ',
                base64.decode(characteristic?.value),
              );
            }
          },
          'slidertransaction',
        );

        console.log('Connection established');
      });


  }

  //Function to send data to ESP32
  async function sendSliderValue(value) {
    BLTManager.writeCharacteristicWithResponseForDevice(
      connectedDevice?.id,
      SERVICE_UUID,
      SLIDER_UUID,
      base64.encode(value.toString()),
    ).then(characteristic => {
      console.log('SliderValue changed to :', base64.decode(characteristic.value));
    });
  }

  return (
    <View style={{ width: '100%', height: '100%', backgroundColor: '#ddebff', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
      <View style={{ position: 'absolute', width: '90%' }}>
        <Text style={{ textAlign: 'center', fontSize: 100, fontWeight: 'bold', fontFamily: 'serif' }}>
          TacBac
        </Text>
        <View style={{ width: '100%' }}>
          <TouchableOpacity style={{ width: '100%' }}>
            {!isConnected ? (
              <TouchableOpacity onPress={() => { scanDevices(); }} style={{ marginHorizontal: 70, marginVertical: 20, padding: 15, borderRadius: 10, backgroundColor: '#1d64d0', alignItems: 'center' }}>
                <Text style={{ textAlign: 'center', fontSize: 20, color: 'white' }}>
                  Connect Bluetooth
                </Text>
              </TouchableOpacity>
            ) : (
              <Button
                title="Disconnect"
                onPress={() => {
                  disconnectDevice();
                }}
                disabled={false}
              />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>

  );
}

var styles = StyleSheet.create({
  container: {
    justifyContent: 'center', alignContent: 'center'
  },
});
