import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Alert, Dimensions } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import axios from 'axios';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const cardWidth = width - 28;

export default function Requested({ navigation }) {
    const [certificates, setCertificates] = useState([]);

    useEffect(() => {
        fetchCertificates();
    }, []);

    const fetchCertificates = async () => {
        try {
            const response = await axios.get('http://51.21.134.104:5000/fetch_requested_certs');
            setCertificates(response.data.certificates);
        } catch (error) {
            console.error('Error fetching certificates:', error);
            Alert.alert('Error', 'Failed to fetch certificates. Please try again later.');
        }
    };

    const navigateToHome = () => {
        navigation.navigate('AppHome');
    };

    const navigateToCertificateScreen = (certificateType) => {
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
                // Handle default case or unknown certificate types
                break;
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 10 }} contentContainerStyle={{ paddingVertical: 20 }}>
                {/* HEADER */}
                <View style={{ marginHorizontal: 14, alignItems: 'left', marginBottom: 25, flexDirection: 'row', alignItems: 'center' }}>
                    {/* BACK BUTTON */}
                    <TouchableOpacity onPress={navigateToHome}>
                        <View style={[styles.iconContainer]}>
                            <MaterialCommunityIcons name="keyboard-backspace" size={20} color="black" padding={10} />
                        </View>
                    </TouchableOpacity>
                    {/* HEADER-TEXT */}
                    <View style={styles.headerTextWrapper}>
                        <View style={styles.iconWrapper}>
                            <MaterialCommunityIcons name="alert-box-outline" size={20} color="black" />
                        </View>
                        <View style={styles.textWrapper}>
                            <Text style={styles.headerText}>Here are all the requested Certificates</Text>
                        </View>
                    </View>
                </View>

                {/* Display certificates */}
                {certificates.map((certificate, index) => (
                    <TouchableOpacity key={index} onPress={() => navigateToCertificateScreen(certificate.certificate_type)}>
                        <View style={[styles.cardContainer, { width: cardWidth }]}>
                            <View style={[styles.iconContainer, { backgroundColor: 'white', borderColor: '#EBEBED', borderWidth: 1.4 }]}>
                                <MaterialCommunityIcons style={styles.materialIconStyle1} name="file" size={20} color="rgba(117, 119, 230, 0.8)" />
                            </View>
                            <View style={styles.textContainer}>
                                <Text style={{ fontSize: wp(4), fontWeight: 'bold', color: 'black' }}>{certificate.certificate_type}</Text>
                                <Text style={{ fontSize: wp(3), fontWeight: 'normal', color: 'black', marginTop: 5 }}>Jobs Number: {certificate.jobId}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    headerTextWrapper: {
        flexDirection: 'row',
        alignItems: 'left',
        borderRadius: 8,
        overflow: 'hidden',
        backgroundColor: '#FFF4D8',
        width: 260,
    },
    iconWrapper: {
        padding: 10,
        width: 40,
    },
    textWrapper: {
        flex: 1, 
        paddingTop: 3,
    },
    headerText: {
        fontSize: wp(3),
        fontWeight: 'normal',
        color: 'black',
        padding: 10,
    },
    cardContainer: {
        marginRight: 5,
        marginLeft: 14,
        marginTop: 24,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 13,
        borderRadius: 8,
    },
    textContainer: {
        marginLeft: 10,
        borderRadius: 8,
        padding: 10,
    },
    iconContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 6,
        marginRight: 10,
        borderColor: '#EBEBED', 
        borderWidth: 2,     
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
});
