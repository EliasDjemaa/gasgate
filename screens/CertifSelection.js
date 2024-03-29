import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import axios from 'axios';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity as GestureHandlerTouchableOpacity } from 'react-native-gesture-handler';

const { width } = Dimensions.get('window');
const buttonWidth = width - 28;

export default function CertifSelection({ navigation }) {

    const navigateToHome = () => {
        navigation.navigate('AppHome');
    };

    const navigateToCP12 = () => {
        navigation.navigate('CP12');
    };
    const navigateToCP15 = () => {
        navigation.navigate('CP15');
    };
    const navigateToCP16 = () => {
        navigation.navigate('CP16');
    };
    const navigateToCP17 = () => {
        navigation.navigate('CP17');
    };
    const navigateToAladin = () => {
        navigation.navigate('C12Screen');
    };
    const navigateToBarcode = () => {
        navigation.navigate('QRScanner');
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
                            <Text style={styles.headerText}>Please select a certificate type</Text>
                        </View>
                    </View>
                    
                </View>

                {/* CP12 */}
                <GestureHandlerTouchableOpacity onPress={navigateToCP12}>
                    <View style={[styles.cardContainer, { width: buttonWidth }]} >
                    <View style={[styles.iconContainer, { backgroundColor: 'white' , borderColor: '#EBEBED', borderWidth: 1.4,}]}>
                        <MaterialCommunityIcons style={styles.materialIconStyle1} name="file" size={20} color="rgba(117, 119, 230, 0.8)"/>
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={{ fontSize: wp(4), fontWeight: 'bold', color: 'black' }}>CP12</Text>
                        <Text style={{ fontSize: wp(3), fontWeight: 'normal', color: 'black', marginTop: 5 }}>Domestic Servicing</Text>
                    </View>
                    </View>
                </GestureHandlerTouchableOpacity>
                {/* CP14 */}
                <GestureHandlerTouchableOpacity onPress={navigateToAladin}>
                    <View style={[styles.cardContainer, { width: buttonWidth }]} >
                    <View style={[styles.iconContainer, { backgroundColor: 'white' , borderColor: '#EBEBED', borderWidth: 1.4,}]}>
                        <MaterialCommunityIcons style={styles.materialIconStyle1} name="file" size={20} color="rgba(117, 119, 230, 0.8)"/>
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={{ fontSize: wp(4), fontWeight: 'bold', color: 'black' }}>CP14</Text>
                        <Text style={{ fontSize: wp(3), fontWeight: 'normal', color: 'black', marginTop: 5 }}>Warning Notice</Text>
                    </View>
                    </View>
                </GestureHandlerTouchableOpacity>
                {/* CP15 */}
                <GestureHandlerTouchableOpacity onPress={navigateToCP15}>
                    <View style={[styles.cardContainer, { width: buttonWidth }]} >
                    <View style={[styles.iconContainer, { backgroundColor: 'white' , borderColor: '#EBEBED', borderWidth: 1.4,}]}>
                        <MaterialCommunityIcons style={styles.materialIconStyle1} name="file" size={20} color="rgba(117, 119, 230, 0.8)"/>
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={{ fontSize: wp(4), fontWeight: 'bold', color: 'black' }}>CP15</Text>
                        <Text style={{ fontSize: wp(3), fontWeight: 'normal', color: 'black', marginTop: 5 }}>Commerical Servicing</Text>
                    </View>
                    </View>
                </GestureHandlerTouchableOpacity>
                {/* CP16 */}
                <GestureHandlerTouchableOpacity onPress={navigateToCP16}>
                    <View style={[styles.cardContainer, { width: buttonWidth }]} >
                    <View style={[styles.iconContainer, { backgroundColor: 'white' , borderColor: '#EBEBED', borderWidth: 1.4,}]}>
                        <MaterialCommunityIcons style={styles.materialIconStyle1} name="file" size={20} color="rgba(117, 119, 230, 0.8)"/>
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={{ fontSize: wp(4), fontWeight: 'bold', color: 'black' }}>CP16</Text>
                        <Text style={{ fontSize: wp(3), fontWeight: 'normal', color: 'black', marginTop: 5 }}>Gas Tightness-Purging-Strength</Text>
                    </View>
                    </View>
                </GestureHandlerTouchableOpacity>
                {/* CP17 */}
                <GestureHandlerTouchableOpacity onPress={navigateToCP17}>
                    <View style={[styles.cardContainer, { width: buttonWidth }]} >
                    <View style={[styles.iconContainer, { backgroundColor: 'white' , borderColor: '#EBEBED', borderWidth: 1.4,}]}>
                        <MaterialCommunityIcons style={styles.materialIconStyle1} name="file" size={20} color="rgba(117, 119, 230, 0.8)"/>
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={{ fontSize: wp(4), fontWeight: 'bold', color: 'black' }}>CP17</Text>
                        <Text style={{ fontSize: wp(3), fontWeight: 'normal', color: 'black', marginTop: 5 }}>Breakdown</Text>
                    </View>
                    </View>
                </GestureHandlerTouchableOpacity>
                {/* CP17 */}
                <GestureHandlerTouchableOpacity onPress={navigateToBarcode}>
                    <View style={[styles.cardContainer, { width: buttonWidth }]} >
                    <View style={[styles.iconContainer, { backgroundColor: 'white' , borderColor: '#EBEBED', borderWidth: 1.4,}]}>
                        <MaterialCommunityIcons style={styles.materialIconStyle1} name="file" size={20} color="rgba(117, 119, 230, 0.8)"/>
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={{ fontSize: wp(4), fontWeight: 'bold', color: 'black' }}>Import readings</Text>
                        <Text style={{ fontSize: wp(3), fontWeight: 'normal', color: 'black', marginTop: 5 }}>Scan and import reading from your testo</Text>
                    </View>
                    </View>
                </GestureHandlerTouchableOpacity>
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
    headerTextContainer: {
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
