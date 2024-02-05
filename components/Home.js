import React from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Pressable } from "native-base";
import { HStack } from 'native-base';
import { Box, Badge, Spacer, Flex, Input} from 'native-base';
import { LinearGradient } from 'expo-linear-gradient';

const Home = ({ navigation }) => {
  const handleSignIn = () => {
    navigation.navigate('SignIn');
  };

  const handleSignUp = () => {
    navigation.navigate('SignUp');
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/login_imgs/boiler.jpg')}
        style={styles.image}
      />

      <View style={styles.contentContainer}>
        <Text style={styles.welcomeText}>Welcome to the {"\n"}Gasgate portal</Text>

        {/* Button Container */}
        <TouchableOpacity onPress={handleSignIn}>
          <View style={styles.buttonParent}>
            <LinearGradient
              colors={['#EA6D42', '#E9582E']}
              style={styles.buttonGrad}></LinearGradient>
              <Text style={styles.buttonText}>Sign In</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.signUpContainer}>
          <TouchableOpacity onPress={handleSignUp}>
            <Text style={styles.signUpText}>Haven't registered yet? Sign up</Text>
          </TouchableOpacity>
        </View>


      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'left',
    backgroundColor: 'white',
  },
  image: {
    height: '60%',
    width: '100%',
    resizeMode: 'cover',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'flex-start',
    paddingLeft: 20,
  },
  welcomeText: {
    fontSize: 30,
    fontWeight: '400',
    paddingTop: 20,
    marginBottom:20,
  },

  signUpContainer: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  signUpText: {
    color: 'black',  
    fontSize: 15,
    fontWeight: '400',
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

export default Home;
