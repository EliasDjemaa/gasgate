import React from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';

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
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleSignIn}>
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleSignUp}>
            <Text style={styles.buttonText}>Sign Up</Text>
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
  },
  buttonContainer: {
    marginTop: 30,
  },
  button: {
    padding: 20,
    width: 270,
    borderRadius: 5,
    backgroundColor: 'black',
    marginBottom: 1,
  },
  buttonText: {
    color: 'white',  // Add this line to set the text color
    fontSize: 15,
    fontWeight: '400',
    textAlign: 'center',
  },
});

export default Home;
