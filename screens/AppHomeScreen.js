import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { CheckBox } from 'react-native-elements';

const certificateOptions = ['C12', 'c14', 'c15', 'c16', 'c17'];

const AppHomeScreen = ({ navigation }) => {
  const [startDocumentVisible, setStartDocumentVisible] = useState(true);
  const [selectedCertificates, setSelectedCertificates] = useState([]);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const handleStartDocument = () => {
    // Animate out the current card
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }).start(() => {
      // After animation completion, update state to hide the current card
      setStartDocumentVisible(false);
      console.log('Starting Gas Certification Document');
    });
  };

  const handleSelectCertificate = () => {
    // Navigate to the corresponding certificate screen based on selection
    if (selectedCertificates.length > 0) {
      const selectedCertificate = selectedCertificates[0];
      navigation.navigate(selectedCertificate);  // Use the correct screen name, e.g., 'C12'
    } else {
      // Handle case when no certificate is selected
      console.log('No certificate selected');
    }
  };

  const handleCertificateToggle = (certificate) => {
    setSelectedCertificates((prevSelected) =>
      prevSelected.includes(certificate)
        ? prevSelected.filter((selected) => selected !== certificate)
        : [...prevSelected, certificate]
    );
  };

  const handleBack = () => {
    // Animate in the previous card
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: false,
    }).start(() => {
      // After animation completion, update state to show the previous card
      setStartDocumentVisible(true);
    });
  };

  return (
    <View style={styles.container}>
      {startDocumentVisible ? (
        <Animated.View style={{ ...styles.card, opacity: fadeAnim }}>
          <Text style={styles.cardTitle}>Gas Certification Document</Text>
          <Text style={styles.cardDescription}>
            Do you wish to complete a gas certification document?
          </Text>
          {/* Start Button */}
          <TouchableOpacity style={styles.startButton} onPress={handleStartDocument}>
            <Text style={styles.buttonText}>Start</Text>
          </TouchableOpacity>
        </Animated.View>
      ) : (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Select Certificate Type</Text>
          <Text style={styles.cardDescription}>Please select a certificate type:</Text>

          {/* Certificate Checkboxes */}
          {certificateOptions.map((certificate) => (
            <CheckBox
              key={certificate}
              title={certificate}
              checked={selectedCertificates.includes(certificate)}
              onPress={() => handleCertificateToggle(certificate)}
            />
          ))}

          {/* Next and Back Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleBack}>
              <Text style={styles.buttonText}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleSelectCertificate}>
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cardDescription: {
    fontSize: 18,
    marginBottom: 20,
  },
  startButton: {
    backgroundColor: 'green',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    backgroundColor: 'grey',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
  },
});

export default AppHomeScreen;
