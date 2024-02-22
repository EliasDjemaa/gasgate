import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import axios from 'axios';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function AppHomeScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [requestedCertificates, setRequestedCertificates] = useState([]);
  const [completedPdfCount, setCompletedPdfCount] = useState(0);

  
  useEffect(() => {
    getCurrentUsername();
    fetchRequestedCertificates();
    fetchPdfUrls();
  }, []);

  const getCurrentUsername = async () => {
    try {
      const response = await axios.get('http://51.21.134.104/get_current_username'); 
      const { username } = response.data;
      setUsername(username);
    } catch (error) {
      console.error('Error fetching username:', error.message);
    }
  };

  const fetchRequestedCertificates = async () => {
    try {
      const response = await axios.get('http://51.21.134.104/fetch_requested_certs');
      const { certificates } = response.data;
      setRequestedCertificates(certificates);
    } catch (error) {
      console.error('Error fetching requested certificates:', error);
    }
  };

  const fetchPdfUrls = async () => {
    try {
      const response = await axios.get('http://51.21.134.104/cp12_pdfs');
      const { pdf_urls } = response.data;
      // Assuming you have logic to set completedPdfCount based on fetched pdf_urls
      setCompletedPdfCount(pdf_urls.length);
    } catch (error) {
      console.error('Error fetching PDF URLs:', error);
    }
  };

  const navigateToCertifSelection = () => {
    navigation.navigate('CertifSelection');
  };

  const navigateToRequested = () => {
    navigation.navigate('Requested');
  };

  const navigateToCompleted = () => {
    navigation.navigate('Completed', { completedPdfCount });
  };

  const navigateToScreen = (certificateType) => {
    switch (certificateType) {
      case 'CP12':
        navigation.navigate('CP12');
        break;
      case 'CP14':
        navigation.navigate('CP14');
        break;
      case 'CP15':
        navigation.navigate('CP15');
        break;
      case 'CP16':
        navigation.navigate('CP16');
        break;
      case 'CP17':
        navigation.navigate('CP17');
        break;
      default:
        console.warn(`No screen defined for certificate type: ${certificateType}`);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 10 }} contentContainerStyle={{ paddingVertical: 20 }}>
        <View style={{ marginHorizontal: 14, alignItems: 'left', marginBottom: 25 }}>
          <Text style={{ fontSize: wp(6), fontWeight: 'bold', color: 'black' }}>Hi {username} 👋</Text>
          <Text style={{ fontSize: wp(3), fontWeight: 'normal', color: 'black', marginTop: 5 }}>1066 Team</Text>
        </View>

        {/* Quick select */}
        <View style={{ marginHorizontal: 14, alignItems: 'left', marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
          {/* Write */}
          <TouchableOpacity onPress={navigateToCertifSelection}>
            <View style={[styles.cardContainer, { backgroundColor: 'white', borderColor: '#EBEBED',}]}>
              <View style={[styles.iconContainer, { backgroundColor: 'white' , borderColor: '#EBEBED', borderWidth: 1.4,}]}>
                <MaterialCommunityIcons style={styles.materialIconStyle1} name="file" size={20} color="rgba(117, 119, 230, 0.8)"/>
              </View>
              <View style={styles.textContainer}>
                <Text style={{ fontSize: wp(4), fontWeight: 'bold', color: 'black' }}>Write</Text>
                <Text style={{ fontSize: wp(3), fontWeight: 'normal', color: '#515151', marginTop: 5 }}>5 certificates</Text>
              </View>
            </View>
          </TouchableOpacity>
          {/* Requested */}
          <TouchableOpacity onPress={navigateToRequested}>
            <View style={[styles.cardContainer, { backgroundColor: 'white', borderColor: '#EBEBED'}]}>
              <View style={[styles.iconContainer, { backgroundColor: 'white' , borderColor: '#EBEBED', borderWidth: 1.4,}]}>
                <MaterialCommunityIcons style={styles.materialIconStyle2} name="file-question" size={20} color="rgba(246, 171, 31, 0.8)" />
              </View>
              <View style={styles.textContainer}>
                <Text style={{ fontSize: wp(4), fontWeight: 'bold', color: 'black' }}>Requested</Text>
                <Text style={{ fontSize: wp(3), fontWeight: 'normal', color: '#515151', marginTop: 5 }}>{requestedCertificates.length} certificates</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        {/* Second row */}
        <View style={{ marginHorizontal: 14, alignItems: 'left', marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
          {/* Completed */}
          <TouchableOpacity onPress={navigateToCompleted}>
            <View style={[styles.cardContainer, { backgroundColor: 'white', borderColor: '#EBEBED'}]}>
              <View style={[styles.iconContainer, { backgroundColor: 'white' , borderColor: '#EBEBED', borderWidth: 1.4,}]}>
                <MaterialCommunityIcons style={styles.materialIconStyle3} name="file-check" size={20} color="rgba(23, 214, 119, 0.8)" />
              </View>
              <View style={styles.textContainer}>
                <Text style={{ fontSize: wp(4), fontWeight: 'bold', color: 'black' }}>Completed</Text>
                <Text style={{ fontSize: wp(3), fontWeight: 'normal', color: '#515151', marginTop: 5 }}>{completedPdfCount} certificates</Text>
              </View>
            </View>
          </TouchableOpacity>
          {/* Incomplete */}
          <TouchableOpacity>
            <View style={[styles.cardContainer, { backgroundColor: 'white', borderColor: '#EBEBED'}]}>
              <View style={[styles.iconContainer, { backgroundColor: 'white' , borderColor: '#EBEBED', borderWidth: 1.4,}]}>
                <MaterialCommunityIcons style={styles.materialIconStyle4} name="file-clock" size={20} color="rgba(244, 85, 82, 1)" />
              </View>
              <View style={styles.textContainer}>
                <Text style={{ fontSize: wp(4), fontWeight: 'bold', color: 'black' }}>Incomplete</Text>
                <Text style={{ fontSize: wp(3), fontWeight: 'normal', color: '#515151', marginTop: 5 }}>0 certificates</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        {/* Recent REQUESTED certificates */}
        <View style={{ marginHorizontal: 14, backgroundColor: '#ffedd5', borderRadius: 8, marginTop: 3 }}>
          <View style={{ marginHorizontal: 14, alignItems: 'left', marginBottom: 25 }}>
            <Text style={{ fontSize: wp(5), fontWeight: '600', color: 'black', marginTop: 14 }}>Requests</Text>
            <Text style={{ fontSize: wp(4), fontWeight: 'normal', color: 'black', marginTop: 7, textAlign: 'left' }}>Here are all the recent requested certificates.</Text>
          </View>
          {requestedCertificates.map((certificate, index) => (
            <TouchableOpacity key={index} onPress={() => navigateToScreen(certificate.type)}>
              <View style={styles.certificateCard}>
                <Text style={styles.certificateText}>{certificate.certificate_type} - Job Number: {certificate.jobId}</Text>
              </View>
            </TouchableOpacity>
          ))}
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
    borderWidth: 1.4,
    borderColor: '#E0DFE4',
    width: 170,
    
  },
  textContainer: {
    marginLeft: 10,
  },
  iconContainer: {
    borderRadius: 10,  
    padding: 6,       
    marginRight: 0,  
    elevation: 5, 
  },
  pdfCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
    marginHorizontal: 30,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  pdfCardText: {
    fontSize: wp(4),
    fontWeight: 'normal',
    color: 'black',
    marginLeft: 10,
  },
  materialIconStyle1: {
    shadowColor: 'rgba(117, 119, 230, 1)',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.8, 
    shadowRadius: 10,
    elevation: 5,
  },
  materialIconStyle2: {
    shadowColor: 'rgba(246, 171, 31, 1)',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.8, 
    shadowRadius: 10,
    elevation: 5, 
  },
  materialIconStyle3: {
    shadowColor: 'rgba(23, 214, 119, 1)',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.8, 
    shadowRadius: 10,
    elevation: 5, 
  },
  materialIconStyle4: {
    shadowColor: 'rgba(244, 85, 82, 1)',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.8, 
    shadowRadius: 10,
    elevation: 5, 
  },
  certificateCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
    marginHorizontal: 30,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  certificateText: {
    fontSize: wp(4),
    fontWeight: 'normal',
    color: 'black',
    marginLeft: 10,
  },
  certificateCard: {
    backgroundColor: 'white',
    padding: 15,
    marginHorizontal: 10,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  certificateText: {
    fontSize: wp(4),
    fontWeight: 'normal',
    color: 'black',
  },
});
