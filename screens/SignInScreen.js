import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { CheckBox } from 'react-native-elements';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const SignInScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [staySignedIn, setStaySignedIn] = useState(false);

  const navigation = useNavigation();

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
  const navigateBack = () => {
    navigation.navigate('Home');
};

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Specify behavior for iOS and Android
      style={styles.container}>
                {/* HEADER */}
                <View style={{ marginHorizontal: 14, alignItems: 'left', marginBottom: 25, flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity onPress={navigateBack}>
                        <View style={[styles.iconContainer]}>
                            <MaterialCommunityIcons name="keyboard-backspace" size={20} color="black" padding={10} />
                        </View>
                    </TouchableOpacity>
                </View>

      <View>
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

        {/* Button Container */}
        <TouchableOpacity onPress={handleSignIn}>
          <View style={styles.buttonParent}>
            <LinearGradient
              colors={['#EA6D42', '#E9582E']}
              style={styles.buttonGrad}></LinearGradient>
              <Text style={styles.buttonText}>Sign In</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={{marginTop: '20'}} onPress={() => navigation.navigate('SignUp')}>
          <Text >Don't have an account? Sign up here</Text>
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
    paddingHorizontal: 20,
    backgroundColor: 'white',
  },
  iconContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 6,
    marginRight: 10,
    borderColor: '#EBEBED', 
    borderWidth: 2,     

  },
  input: {
    height: 40,
    width: '400',
    borderColor: '#EBEBED',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: 'white',
  },
  signInButton: {
    backgroundColor: 'black',
    borderRadius: 5,
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginTop: 10,
    width: 330,
  },
  signInButtonText: {
    color: 'white',
    fontWeight: '400',
    fontSize: 15,
    textAlign: 'center',
  },


  buttonContainer: {
    marginTop: 30,
  },
  buttonText: {
    color: 'white', 
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
    paddingTop: 5,
  },
  buttonGrad: {
    height: 45,
    width: 330,
    borderRadius: 10,
    position: 'absolute',
    bottom: 5,
  },
  buttonParent: {
    height: 45,
    width: 330,
    borderRadius: 10,
    backgroundColor: 'rgba(233, 100, 60, 0.1)',
    elevation: 5,
  },
});

export default SignInScreen;
