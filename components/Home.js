import React, { useState } from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import axios from 'axios';

const Home = ({ navigation }) => {

  const handleSignUp = () => {
    navigation.navigate('SignUp');
  };

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    try {
      const response = await axios.post('http://51.21.134.104/signin', {
        username,
        password,
      });

      console.log('Sign In successful:', response.data);

      navigation.navigate('AppHome');
    } catch (error) {
      console.error('Error during sign-in:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../assets/login_imgs/certs.png')}
          style={styles.logo}
        />
        <Text style={styles.logoText}>Certs</Text>
      </View>

      <View  style={styles.loginContent}>
        <Text style={styles.loginHeader}>Log in to your account</Text>
        <Text style={styles.loginSubHeader}>Certs is the one central point for all your gas certificates</Text>
      </View>

      <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={text => setUsername(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={text => setPassword(text)}
          />
        </View>

        <TouchableOpacity onPress={handleSignIn}>
          <View style={styles.buttonParent}>
            <LinearGradient
              colors={['#121212', '#121212']}
              style={styles.buttonGrad}
            />
            <Text style={styles.buttonText}>Sign In</Text>
          </View>

          <TouchableOpacity onPress={handleSignUp}>
            <View style={styles.signUpContainer}>
              <Text style={styles.signUpText}>Not registered? </Text>
              <Text style={[styles.signUpText, { color: '#FF673D' }]}>Create an Account</Text>
            </View>
          </TouchableOpacity>
        </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'left',
    alignItems: 'left', 
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'left',
    marginBottom: 20,
    marginTop: 200,
    marginLeft: 40,
  },
  logo: {
    height: 30,
    width: 30,
    resizeMode: 'contain',
  },
  logoText: {
    fontSize: 22,
    fontWeight: '600',
    marginLeft: 10,
    paddingTop: 3,
  },
  loginContent: {
    flexDirection: 'column',
    alignItems: 'left',
    marginBottom: 20,
    marginLeft: 30,
  },
  loginHeader: {
    fontSize: 30,
    fontWeight: '350',
    marginLeft: 10,
  },
  loginSubHeader: {
    fontSize: 11,
    fontWeight: '350',
    marginLeft: 10,
    paddingTop: 10,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center', 
    justifyContent: 'center',
  },

  inputContainer: {
    marginBottom: 20,
    marginLeft: 40,
  },
  input: {
    height: 55,
    width: 330,
    borderColor: '#A4A19E',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: '400',
    paddingTop: 0,
    marginBottom: 50,
    textAlign: 'center',
  },
  signUpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 40,
  },
  signUpText: {
    fontSize: 17,
    fontWeight: '400',
    textAlign: 'center',
    paddingTop: 20,
    color: 'black',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
    paddingTop: 12,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 3,
  },
  buttonGrad: {
    height: 55,
    width: 330,
    borderRadius: 12,
    position: 'absolute',
    bottom: 5,
  },
  buttonParent: {
    height: 55,
    width: 330,
    borderRadius: 8,
    backgroundColor: 'rgba(80, 21, 21, 0.075)',
    elevation: 5,
    marginLeft: 40,
  },
});

export default Home;
