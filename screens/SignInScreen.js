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
        <View style={styles.inputContainer}> 
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
        </View>
        
      <View style={styles.views}>
        {/* Button Container */}
        <TouchableOpacity onPress={handleSignIn}>
          <View style={styles.buttonParent}>
            <LinearGradient
              colors={['#E60A0A', '#922929']}
              style={styles.buttonGrad}></LinearGradient>
              <Text style={styles.buttonText}>Sign In</Text>
          </View>
        </TouchableOpacity>
      </View>
        

        <TouchableOpacity style={{marginTop: '20'}} onPress={() => navigation.navigate('SignUp')}>
          <Text >Don't have an account? Sign up</Text>
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
    borderRadius: 12,
    padding: 6,
    marginRight: 10,
    borderColor: '#EBEBED', 
    borderWidth: 2,     

  },

  inputContainer: {
    paddingBottom: 20, 

  },

  views: {
    paddingBottom: 20, 

  },

  input: {
    height: 55,
    width: '400',
    borderColor: '#EBEBED',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 12,
  },



  buttonContainer: {
    marginTop: 30,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
    paddingTop: 12,
    textShadowColor: 'rgba(0, 0, 0, 0.5)', // Dark shadow color
    textShadowOffset: { width: 0, height: 2 }, // Offset for the dark shadow
    textShadowRadius: 3, // Radius of the dark shadow
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
    borderRadius: 12,
    backgroundColor: 'rgba(80, 21, 21,  0.075)',
    elevation: 5,
  },
});

export default SignInScreen;
