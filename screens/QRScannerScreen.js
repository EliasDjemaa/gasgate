// screens/QRScannerScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

const QRScannerScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState('');

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      console.log('Camera Permission Status:', status);
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ data }) => {
    console.log('Scanned Data:', data);
    setScanned(true);
    setScannedData(data);
    // You can add more logic here based on the scanned data
    // For now, just navigate back to the home screen
    navigation.navigate('');
  };

  if (hasPermission === null) {
    return <Text>Requesting camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={{ flex: 1 }}
      />
      {scanned && (
        <View style={{ position: 'absolute', top: 20, left: 20 }}>
          <Text>{scannedData}</Text>
        </View>
      )}
    </View>
  );
};

export default QRScannerScreen;
