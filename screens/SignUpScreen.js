import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';

const SignUpScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [gasSafeLicenseNo, setGasSafeLicenseNo] = useState('');
  const [positionHeld, setPositionHeld] = useState('');

  const handleSignUp = async () => {
    try {
      const response = await axios.post('http://51.21.134.104/signup', {
        username,
        email,
        password,
        gasSafeLicenseNo, // Include new field
        positionHeld, // Include new field
      });

      console.log('Signup successful:', response.data);

      // Optionally, navigate to another screen if needed
      // navigation.navigate('NextScreen');
    } catch (error) {
      console.error('Error during signup:', error.message);
    }
  };

  const validatePassword = () => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
    return passwordRegex.test(password);
  };

  const passwordsMatch = password === confirmPassword;

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Full name"
          value={username}
          onChangeText={(text) => setUsername(text)}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          keyboardType="email-address"
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Gas Safe License No"
          value={gasSafeLicenseNo}
          onChangeText={(text) => setGasSafeLicenseNo(text)}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Position Held"
          value={positionHeld}
          onChangeText={(text) => setPositionHeld(text)}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
        />
      </View>

      {!passwordsMatch && (
        <Text style={styles.errorText}>
          Passwords must match and include at least one capital letter and one number.
        </Text>
      )}

      <TouchableOpacity
        onPress={handleSignUp}
        style={[styles.button, { backgroundColor: passwordsMatch && validatePassword() ? 'blue' : 'gray' }]}
        disabled={!passwordsMatch || !validatePassword()}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: 300,
    marginBottom: 10,
    alignSelf: 'stretch',
    marginLeft: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    alignSelf: 'stretch',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  button: {
    width: 300,
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default SignUpScreen;
