import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Alert} from 'react-native';
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
        gasSafeLicenseNo,
        positionHeld,
      });
  
      console.log('Signup successful:', response.data);
  
      // Display a native iOS pop-up notification
      Alert.alert(
        'Success',
        'Account successfully created!',
        [
          {
            text: 'OK',
            onPress: () => {
              // Navigate to the sign-in screen or any other screen
              navigation.navigate('SignIn');
            },
          },
        ],
        { cancelable: false }
      );
  
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
    <KeyboardAvoidingView
    behavior={Platform.OS === 'ios' ? 'padding' : null}
    style={styles.container}
    >
    <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Full name"
          value={username}
          onChangeText={(text) => setUsername(text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          keyboardType="email-address"
        />

        <TextInput
          style={styles.input}
          placeholder="Gas Safe License No"
          value={gasSafeLicenseNo}
          onChangeText={(text) => setGasSafeLicenseNo(text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Position Held"
          value={positionHeld}
          onChangeText={(text) => setPositionHeld(text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />


        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
        />

      {!passwordsMatch && (
        <Text style={styles.errorText}>
          Passwords must match and include at least one capital letter and one number.
        </Text>
      )}

      <TouchableOpacity
        onPress={handleSignUp}
        style={[styles.button, { backgroundColor: passwordsMatch && validatePassword() ? 'black' : 'gray' }]}
        disabled={!passwordsMatch || !validatePassword()}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  input: {
    height: 40,
    width: 330,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  button: {
    width: 330,
    padding: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default SignUpScreen;
