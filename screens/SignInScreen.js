import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { CheckBox } from 'react-native-elements';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';


const SignInScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [staySignedIn, setStaySignedIn] = useState(false);

  const navigation = useNavigation(); // Get the navigation prop

  const handleSignIn = async () => {
    try {
      const response = await axios.post('http://192.168.0.40:5000/signin', {
        username,
        password,
      });

      console.log('Sign In successful:', response.data);

      // Successful sign-in, navigate to AppHome
      navigation.navigate('AppHome');
    } catch (error) {
      console.error('Error during sign-in:', error.message);
    }
  };

  return (
    <View style={styles.container}>


    {/* Back button to navigate to Home screen */}
    <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
      <Text>Don't have an account? Sign up here</Text>
    </TouchableOpacity>


      {/* Input fields for username and password */}
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />

      {/* Stay signed in checkbox */}
      <View style={styles.checkboxContainer}>
        <CheckBox
          checked={staySignedIn}
          onPress={() => setStaySignedIn(!staySignedIn)}
          title="Stay signed in"
          textStyle={{ color: 'black' }} // Customize text color
          checkedColor="green" // Customize checked color
        />
      </View>



      {/* Sign In button */}
      <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
        <Text style={styles.signInButtonText}>Sign In</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  signInButton: {
    backgroundColor: 'green',
    borderRadius: 5,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginTop: 10,
    width: 270,
  },
  signInButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default SignInScreen;
