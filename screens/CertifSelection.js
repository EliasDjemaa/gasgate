import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import axios from 'axios';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function CertifSelection({ navigation }) {

    const navigateToHome = () => {
        // Navigate to home.js
        navigation.navigate('AppHome');
    };

    const navigateToCP12 = () => {
        // Navigate to cp12.js
        navigation.navigate('CP12');
    };
    const navigateToAladin = () => {
        // Navigate to cp12.js
        navigation.navigate('C12Screen');
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
                        <Text style={[styles.headerTextContainer, { fontSize: wp(3), fontWeight: 'bold', color: 'black', marginLeft: 120, backgroundColor: '#7dd3fc' }]}>Certificate selection</Text>
                    </View>
                    
                </View>

                {/* CP12 */}
                <TouchableOpacity onPress={navigateToCP12}>
                    <View style={[styles.cardContainer, { backgroundColor: '#f5f5f4' }]} >
                    <View style={[styles.iconContainer, { backgroundColor: '#e2e8f0' }]}>
                        <MaterialCommunityIcons name="file" size={24} color="black"/>
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={{ fontSize: wp(4), fontWeight: 'bold', color: 'black' }}>CP12</Text>
                        <Text style={{ fontSize: wp(3), fontWeight: 'normal', color: 'black', marginTop: 5 }}>Domestic Servicing</Text>
                    </View>
                    </View>
                </TouchableOpacity>
                {/* CP14 */}
                <TouchableOpacity onPress={navigateToAladin}>
                    <View style={[styles.cardContainer, { backgroundColor: '#f5f5f4' }]} >
                    <View style={[styles.iconContainer, { backgroundColor: '#e2e8f0' }]}>
                        <MaterialCommunityIcons name="file" size={24} color="black"/>
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={{ fontSize: wp(4), fontWeight: 'bold', color: 'black' }}>CP14</Text>
                        <Text style={{ fontSize: wp(3), fontWeight: 'normal', color: 'black', marginTop: 5 }}>Warning Notice</Text>
                    </View>
                    </View>
                </TouchableOpacity>
                {/* CP15 */}
                <TouchableOpacity>
                    <View style={[styles.cardContainer, { backgroundColor: '#f5f5f4' }]} >
                    <View style={[styles.iconContainer, { backgroundColor: '#e2e8f0' }]}>
                        <MaterialCommunityIcons name="file" size={24} color="black"/>
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={{ fontSize: wp(4), fontWeight: 'bold', color: 'black' }}>CP15</Text>
                        <Text style={{ fontSize: wp(3), fontWeight: 'normal', color: 'black', marginTop: 5 }}>Commerical Servicing</Text>
                    </View>
                    </View>
                </TouchableOpacity>
                {/* CP16 */}
                <TouchableOpacity>
                    <View style={[styles.cardContainer, { backgroundColor: '#f5f5f4' }]} >
                    <View style={[styles.iconContainer, { backgroundColor: '#e2e8f0' }]}>
                        <MaterialCommunityIcons name="file" size={24} color="black"/>
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={{ fontSize: wp(4), fontWeight: 'bold', color: 'black' }}>CP16</Text>
                        <Text style={{ fontSize: wp(3), fontWeight: 'normal', color: 'black', marginTop: 5 }}>Gas Tightness-Purging-Strength</Text>
                    </View>
                    </View>
                </TouchableOpacity>
                {/* CP17 */}
                <TouchableOpacity>
                    <View style={[styles.cardContainer, { backgroundColor: '#f5f5f4' }]} >
                    <View style={[styles.iconContainer, { backgroundColor: '#e2e8f0' }]}>
                        <MaterialCommunityIcons name="file" size={24} color="black"/>
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={{ fontSize: wp(4), fontWeight: 'bold', color: 'black' }}>CP17</Text>
                        <Text style={{ fontSize: wp(3), fontWeight: 'normal', color: 'black', marginTop: 5 }}>Breakdown</Text>
                    </View>
                    </View>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
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
    headerTextContainer: {
        marginLeft: 10,
        borderRadius: 8,
        padding: 10,

    },
    iconContainer: {
        backgroundColor: '#e2e8f0',
        borderRadius: 10,  // Make it a circle
        padding: 6,       // Adjust padding for the circle background
        marginRight: 10,   // Add margin to separate the icon from text
    },
    headerTextWrapper: {
        marginLeft: 60,
        borderRadius: 8,
        overflow: 'hidden', // This is important for the borderRadius to take effect
        width: 260,
    },
});
