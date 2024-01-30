import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import axios from 'axios';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function AppHomeScreen({ navigation }) {
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Fetch current username when the component mounts
    getCurrentUsername();
  }, []);

  const getCurrentUsername = async () => {
    try {
      const response = await axios.get('http://192.168.0.40:5000/get_current_username');
      const { username } = response.data;
      setUsername(username);
    } catch (error) {
      console.error('Error fetching username:', error.message);
    }
  };

  const navigateToCertifSelection = () => {
    // Navigate to CertifSelection.js
    navigation.navigate('CertifSelection');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 10 }} contentContainerStyle={{ paddingVertical: 20 }}>
        <View style={{ marginHorizontal: 14, alignItems: 'left', marginBottom: 25}}>
          <Text style={{ fontSize: wp(6), fontWeight: 'bold', color: 'black' }}>Hi {username} 👋</Text>
          <Text style={{ fontSize: wp(3), fontWeight: 'normal', color: 'black',  marginTop: 5}}>Let's get productive</Text>
        </View>

    {/* Quick select */}
    <View style={{ marginHorizontal: 14, alignItems: 'left', marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
      {/* Write */}
      <TouchableOpacity onPress={navigateToCertifSelection}>
        <View style={[styles.cardContainer, { backgroundColor: '#7dd3fc' }]} >
          <View style={[styles.iconContainer, { backgroundColor: '#0e7490' }]}>
            <MaterialCommunityIcons name="file" size={24} color="white"/>
          </View>
          <View style={styles.textContainer}>
            <Text style={{ fontSize: wp(4), fontWeight: 'bold', color: 'black' }}>Write</Text>
            <Text style={{ fontSize: wp(3), fontWeight: 'normal', color: 'black', marginTop: 5 }}>4 certificates</Text>
          </View>
        </View>
      </TouchableOpacity>
      {/* Requested */}
      <TouchableOpacity>
        <View style={[styles.cardContainer, { backgroundColor: '#fde047' }]}>
          <View style={[styles.iconContainer, { backgroundColor: '#facc15' }]}>
            <MaterialCommunityIcons name="file-question" size={24} color="white" />
          </View>
          <View style={styles.textContainer}>
            <Text style={{ fontSize: wp(4), fontWeight: 'bold', color: 'black' }}>Requested</Text>
            <Text style={{ fontSize: wp(3), fontWeight: 'normal', color: 'black', marginTop: 5 }}>0 certificates</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>

    {/* Second row */}
    <View style={{ marginHorizontal: 14, alignItems: 'left', marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
      {/* Completed */}
      <TouchableOpacity>
        <View style={[styles.cardContainer, { backgroundColor: '#86efac' }]}>
          <View style={[styles.iconContainer, { backgroundColor: '#15803d' }]}>
            <MaterialCommunityIcons name="file-check" size={24} color="white" />
          </View>
          <View style={styles.textContainer}>
            <Text style={{ fontSize: wp(4), fontWeight: 'bold', color: 'black' }}>Completed</Text>
            <Text style={{ fontSize: wp(3), fontWeight: 'normal', color: 'black', marginTop: 5 }}>0 certificates</Text>
          </View>
        </View>
      </TouchableOpacity>
      {/* Incomplete */}
      <TouchableOpacity>
        <View style={[styles.cardContainer, { backgroundColor: '#ea580c' }]}>
          <View style={[styles.iconContainer, { backgroundColor: '#7c2d12' }]}>
            <MaterialCommunityIcons name="file-clock" size={24} color="white" />
          </View>
          <View style={styles.textContainer}>
            <Text style={{ fontSize: wp(4), fontWeight: 'bold', color: 'black' }}>Incomplete</Text>
            <Text style={{ fontSize: wp(3), fontWeight: 'normal', color: 'black', marginTop: 5 }}>0 certificates</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
        {/* Quick select */}

        {/* Recent certificates */}
        <View style={{ marginHorizontal: 14, backgroundColor: '#ffedd5', borderRadius: 8, marginTop: 3}}> 
          <View style={{ marginHorizontal: 14, alignItems: 'left', marginBottom: 25 }}>
            <Text style={{ fontSize: wp(5), fontWeight: '600', color: 'black',  marginTop: 14 }}>Recent Certificates</Text>
            <Text style={{ fontSize: wp(4), fontWeight: 'normal', color: 'black',  marginTop: 7 , textAlign: 'left',}}>Here are all the recent requested and completed certificates.</Text>
          </View>
          <TouchableOpacity>
            <View style={{backgroundColor: 'white', width: 300, alignItems: 'center', marginHorizontal: 30, marginBottom: 40, padding: 10, borderRadius: 8,}}>
              <Text style={{ fontSize: wp(4), fontWeight: 'normal', color: 'black',  marginTop: 0 , textAlign: 'left', textAlign: 'center',}}> Got it</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    marginRight: 5,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 13,
    borderRadius: 8,
    width: 170,
  },
  textContainer: {
    marginLeft: 10,
  },
  iconContainer: {
    borderRadius: 50,  // Make it a circle
    padding: 6,       // Adjust padding for the circle background
    marginRight: 0,   // Add margin to separate the icon from text
  },
});
