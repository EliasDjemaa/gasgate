import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import axios from 'axios';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

export default function Completed({ navigation }) {
    const [pdfData, setPdfData] = useState([]);

    useEffect(() => {
        fetchPdfData();
    }, []);

    const fetchPdfData = async () => {
        try {
            const response = await axios.get('http://51.21.134.104:5000/get_pdf_info');
            setPdfData(response.data);
        } catch (error) {
            console.error('Error fetching PDF data:', error);
        }
    };

    const navigateToHome = () => {
        navigation.navigate('AppHome');
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
                            <Text style={styles.headerText}>All completed certificates shown below</Text>
                        </View>
                    </View>
                </View>

                {/* Fetched data is rendered into cards */}
                {pdfData.map((pdf, index) => (
                    <TouchableOpacity key={index} onPress={() => Linking.openURL(pdf.file_url)}>
                        <View style={[styles.cardContainer, { backgroundColor: 'white', borderColor: '#EBEBED', borderWidth: 1 }]}>
                            <View style={[styles.iconContainer, { backgroundColor: 'white', borderColor: '#EBEBED', borderWidth: 1.4 }]}>
                                <MaterialCommunityIcons style={styles.materialIconStyle1} name="file" size={20} color="rgba(23, 214, 119, 0.8)" />
                            </View>
                            <View style={styles.textContainer}>
                                <Text style={{ fontSize: wp(4), fontWeight: 'bold', color: 'black' }}>{pdf.filename}</Text>
                                <Text style={{ fontSize: wp(3), fontWeight: 'normal', color: 'black', marginTop: 5 }}>{pdf.date_created}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
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
        width: 350,
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
        shadowColor: 'rgba(23, 214, 119, 1)',
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.8,
        shadowRadius: 10,
        elevation: 5,
    },
});
