import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TextInput, Linking, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios';




export default function CP16({ navigation }) {
    const [siteDetailsContainerHeight, setSiteDetailsContainerHeight] = useState(130);
    const [strengthTestContainerHeight, setStrengthTestContainerHeight] = useState(130);
    const [tightnessContainerHeight, setTightnessContainerHeight] = useState(130);
    const [purgingContainerHeight, setPurgingContainerHeight] = useState(130);
    const [remedialContainerHeight, setRemedialContainerHeight] = useState(130);
    const [finalContainerHeight, setFinalContainerHeight] = useState(130);

    const [jobNum, setJobNum] = useState('');
    const [siteName, setSiteName] = useState('');
    const [siteAddress, setSiteAddress] = useState('');
    const [sitePostCode, setSitePostCode] = useState('');
    const [siteContact, setSiteContact] = useState('');
    const [siteNum, setSiteNum] = useState('');

    const [testMethod, setTestMethod] = useState('');
    const [installation, setInstallation] = useState('');
    const [isolatedComp, setIsolatedComp] = useState('');
    const [calcStrength, setCalcStrength] = useState('');
    const [testMedium, setTestMedium] = useState('');
    const [stabilisationPeriod, setStabilisationPeriod] = useState('');
    const [strengthTestDur, setStrengthTestDur] = useState('');
    const [permPressure, setPermPressure] = useState('');
    const [calmPressure, setCalcPressure] = useState('');
    const [findings, setFindings] = useState('');
    const [pressureDrop, setsetPressureDrop] = useState('');
    const [strengthPF, setStrengthPF] = useState('');

    const [gasType, setGasType] = useState('');
    const [tightnessTestMethod, setTightnessTestMethod] = useState('');
    const [weatherChange, setWeatherChange] = useState('');
    const [meterType, SetMeterType] = useState('');
    const [meterDesignation, setMeterDesignation] = useState('');
    const [meterBypass, setMeterBypass] = useState('');
    const [installationVolume, setInstallationVolume] = useState('');
    const [installationPipework, setInstallationPipework] = useState('');
    const [totalIV, setTotalIV] = useState('');
    const [testMediumFGA, setTestMediumFGA] = useState('');
    const [tightnessTestPressure, setTightnessTestPressure] = useState('');
    const [pressureGuageType, setPressureGuageType] = useState('');
    const [maxLeak, setMaxLeak] = useState('');
    const [testPeriod, setTestPeriod] = useState('');
    const [stablePeriod, setStablePeriod] = useState('');
    const [tightnessTestDuration, setTightnessTestDuration] = useState('');
    const [ventilatedAreas, setVentilatedAreas] = useState('');
    const [barometricPressure, setBarometricPressure] = useState('');
    const [tightnessFindings, setTightnessFindings] = useState('');
    const [pressureDropActual, setPressureDropActual] = useState('');
    const [leakRateActual, setLeakRateActual] = useState('');
    const [ventilatedAreasChecked, setVentilatedAreasChecked] = useState('');
    const [tightnessPass, setTightnessPass] = useState('');

    const [riskAssessment, setRiskAssessment] = useState('');
    const [purgeWriteUp, setPurgeWriteUp] = useState('');
    const [noSmoking, setNoSmoking] = useState('');
    const [purgeAdvice, setPurgeAdvice] = useState('');
    const [valveLabeling, setValveLabeling] = useState('');
    const [nitrogenCheck, setNitrogenCheck] = useState('');
    const [extinguisherCheck, setExtinguisherCheck] = useState('');
    const [radioCheck, setRadioCheck] = useState('');
    const [elecBondCheck, setElecBondCheck] = useState('');
    const [calcPurgeVolume, setCalcPurgeVolume] = useState('');
    const [pipeworkFittingCheck, setPipeworkFittingCheck] = useState('');
    const [totalPurgeVolume, setTotalPurgeVolume] = useState('');
    const [gasDeviceCheck, setGasDeviceCheck] = useState('');
    const [purgeFindings, setPurgeFindings] = useState('');
    const [purgeNoting, setPurgeNoting] = useState('');
    const [purgePass, setPurgePass] = useState('');

    const [remedialDescription, setRemedialDescription] = useState('');
    const [strengthTest, setStregthTest] = useState('');
    const [purgeTest, setPurgeTest] = useState('');
    const [tightnessTest, setTightnessTest] = useState('');
    const [emailedTo, setEmailedTo] = useState('');
    const [copyDeclined, setCopyDeclined] = useState('');

    const navigateBack = () => {
        navigation.navigate('CertifSelection');
    };

    const toggleSiteDetailsContainerHeight = () => {
        setSiteDetailsContainerHeight((prevHeight) => (prevHeight === 130 ? 400 : 130));
    };

    const toggleStrengthTestContainerHeight = () => {
        setStrengthTestContainerHeight((prevHeight) => (prevHeight === 130 ? 1300 : 130));
    };

    const toggleTightnessContainerHeight = () => {
        setTightnessContainerHeight((prevHeight) => (prevHeight === 130 ? 1700 : 130));
    };

    const togglePurgingContainerHeight = () => {
        setPurgingContainerHeight((prevHeight) => (prevHeight === 130 ? 1200 : 130));
    };

    const toggleFinalContainerHeight = () => {
        setFinalContainerHeight((prevHeight) => (prevHeight === 130 ? 430 : 130));
    };



    const cardContainerStyle = (containerHeight) => ({
        marginRight: 5,
        marginTop: 24,
        flexDirection: containerHeight > 130 ? 'column' : 'row',
        alignItems: containerHeight > 130 ? 'left' : 'center',
        padding: 13,
        borderRadius: 8,
        width: 340,
        borderWidth: 1,
        borderColor: '#EBEBED',
        shadowColor: "#000",
    });


    // Function to handle back end sending of data
    const sendCP16Data = async () => {
    try {
        const backendURL = 'http://51.21.134.104/update_cp16';


    const dataToSend = {
        jobNum,
        siteName,
        siteAddress,
        sitePostCode,
        siteContact,
        siteNum,

        testMethod,
        installation,
        isolatedComp,
        calcStrength,
        testMedium,
        stabilisationPeriod,
        strengthTestDur,
        permPressure,
        calmPressure,
        findings,
        pressureDrop,
        strengthPF,
        gasType,
        tightnessTestMethod,
        weatherChange,
        meterType,
        meterDesignation,
        meterBypass,
        installationVolume,
        installationPipework,
        totalIV,
        testMediumFGA,
        tightnessTestPressure,
        pressureGuageType,
        maxLeak,
        testPeriod,
        stablePeriod,
        tightnessTestDuration,
        ventilatedAreas,
        barometricPressure,
        tightnessFindings,
        pressureDropActual,
        leakRateActual,
        ventilatedAreasChecked,
        tightnessPass,
        riskAssessment,
        purgeWriteUp,
        noSmoking,
        purgeAdvice,
        valveLabeling,
        nitrogenCheck,
        extinguisherCheck,
        radioCheck,
        elecBondCheck,
        calcPurgeVolume,
        pipeworkFittingCheck,
        totalPurgeVolume,
        gasDeviceCheck,
        purgeFindings,
        purgeNoting,
        purgePass,
        remedialDescription,
        strengthTest,
        purgeTest,
        tightnessTest,
        emailedTo,
        copyDeclined,
    };

    const response = await fetch(backendURL, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
    });

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json();
      console.log(responseData); // Log the response from the server

    // Check if the server returned a file URL
    if (responseData.fileURL) {
      // Set the PDF file URL in the state
    setPdfFileURL(responseData.fileURL);

      // Optionally, you can open the PDF in a new tab or window
    window.open(responseData.fileURL, '_blank');
    }
    } catch (error) {
    console.error('Error sending data to backend:', error.message);
    }
};

const updateAndDownloadPdf = async () => {
    try {
      // Call the Flask endpoint to get the public URL for the CP16 PDF
      const response = await axios.get('http://51.21.134.104:5000/get_cp16_pdf_link');
  
      // Log the response for debugging purposes
      console.log('Response from server:', response.data);
  
      const { file_url } = response.data;
  
      // Check if file_url is present in the response
      if (file_url) {
        // Open the PDF URL in the user's default browser
        await Linking.openURL(file_url);
      } else {
        console.error('No file URL received from the server.');
      }
    } catch (error) {
      console.error('Error updating or downloading PDF:', error);
    }
  };
  

  const iconGlow = {
        shadowColor: 'rgba(23, 214, 119, 0.8)',
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowOpacity: 1, 
        shadowRadius: 10,
        elevation: 5, 
  };



    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 10 }} contentContainerStyle={{ paddingVertical: 20 }} keyboardShouldPersistTaps="handled">
                {/* HEADER */}
                <View style={{ marginHorizontal: 14, alignItems: 'left', marginBottom: 25, flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity onPress={navigateBack}>
                        <View style={[styles.iconContainer]}>
                            <MaterialCommunityIcons name="keyboard-backspace" size={20} color="black" padding={10} />
                        </View>
                    </TouchableOpacity>
                    <View style={styles.headerTextWrapper}>
                            <View style={styles.iconWrapper}>
                                <MaterialCommunityIcons name="alert-box-outline" size={20} color="black" />
                            </View>
                        <View style={styles.textWrapper}>
                            <Text style={styles.headerText}>Press on a section to reveal questions</Text>
                        </View>
                    </View>
                </View>

                {/* CHECKLIST */}
                <View style={{ marginHorizontal: 14, alignItems: 'left', marginBottom: 25 }}>

                    {/* Site CHECKLIST CONTAINER*/}
                    <TouchableOpacity onPress={toggleSiteDetailsContainerHeight}>
                        <View style={[cardContainerStyle(siteDetailsContainerHeight), { backgroundColor: 'white', height: siteDetailsContainerHeight }]}>
                            {siteDetailsContainerHeight === 130 && (
                                <View style={[styles.checkListIcon]}>
                                    <MaterialCommunityIcons style={iconGlow} name="check" size={28} color="rgba(23, 214, 119, 0.8)" />
                                </View>
                            )}

                            {siteDetailsContainerHeight === 130 && (
                                <View style={{ flex: 1 }}>
                                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 2 }}>
                                        Site Details
                                    </Text>
                                </View>
                            )}

                            {siteDetailsContainerHeight === 400 && (
                                <View style={styles.textInputContainer}>
                                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 2 }}>
                                        Job Number:
                                    </Text>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="Enter Job Number..."
                                        value={jobNum}
                                        onChangeText={(text) => setJobNum(text)}
                                    />
                                </View>
                            )}

                            {siteDetailsContainerHeight === 400 && (
                                <View style={styles.textInputContainer}>
                                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 2 }}>
                                        Site Name:
                                    </Text>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="Enter Site Name..."
                                        value={siteName}
                                        onChangeText={(text) => setSiteName(text)}
                                    />
                                </View>
                            )}

                            {siteDetailsContainerHeight === 400 && (
                                <View style={styles.textInputContainer}>
                                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 2 }}>
                                        Site Address:
                                    </Text>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="Enter Address..."
                                        value={siteAddress}
                                        onChangeText={(text) => setSiteAddress(text)}
                                    />
                                </View>
                            )}

                            {siteDetailsContainerHeight === 400 && (
                                <View style={styles.textInputContainer}>
                                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 2 }}>
                                        Postcode:
                                    </Text>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="Enter Postcode..."
                                        value={sitePostCode}
                                        onChangeText={(text) => setSitePostCode(text)}
                                    />
                                </View>
                            )}

                            {siteDetailsContainerHeight === 400 && (
                                <View style={styles.textInputContainer}>
                                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 2 }}>
                                        Site Contact:
                                    </Text>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="Enter Number..."
                                        value={siteContact}
                                        onChangeText={(text) => setSiteContact(text)}
                                    />
                                </View>
                            )}
                            {siteDetailsContainerHeight === 400 && (
                                <View style={styles.textInputContainer}>
                                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 2 }}>
                                        Contact Number:
                                    </Text>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="Enter Number..."
                                        value={siteNum}
                                        onChangeText={(text) => setSiteNum(text)}
                                    />
                                </View>
                            )}
                        </View>
                    </TouchableOpacity>

                    {/* Strength DETAILS CHECKLIST CONTAINER*/}
                    <TouchableOpacity onPress={toggleStrengthTestContainerHeight}>
                        <View style={[cardContainerStyle(strengthTestContainerHeight), { backgroundColor: 'white', height: strengthTestContainerHeight }]}>
                            {strengthTestContainerHeight === 130 && (
                                <View style={[styles.checkListIcon]}>
                                    <MaterialCommunityIcons style={styles.tickIconGlow} name="check" size={28} color="rgba(23, 214, 119, 0.8)" />
                                </View>
                            )}

                            {strengthTestContainerHeight === 130 && (
                                <View style={{ flex: 1 }}>
                                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 2 }}>
                                        Strength Test Details
                                    </Text>
                                </View>
                            )}

                            {strengthTestContainerHeight === 1300 && (
                                <View style={styles.textInputContainer}>
                                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 2 }}>
                                        State test method: 
                                    </Text>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="Pneumatic (P) or Hydrostatic (H)..."
                                        value={testMethod}
                                        onChangeText={(text) => setTestMethod(text)}
                                    />
                                </View>
                            )}

                            {strengthTestContainerHeight === 1300 && (
                                <View style={styles.textInputContainer}>
                                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 2 }}>
                                    Installation :
                                    </Text>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="New (N) - New Extension (NE) - Existing (E)..."
                                        value={installation}
                                        onChangeText={(text) => setInstallation(text)}
                                    />
                                </View>
                            )}

                            {strengthTestContainerHeight === 1300 && (
                                <View style={styles.textInputContainer}>
                                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 2 }}>
                                    Have components not suitable for strength testing been removed or isolated from installation as necessary:
                                    </Text>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="(Yes/No)"
                                        value={isolatedComp}
                                        onChangeText={(text) => setIsolatedComp(text)}
                                    />
                                </View>
                            )}

                            {strengthTestContainerHeight === 1300 && (
                                <View style={styles.textInputContainer}>
                                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 2 }}>
                                    Calculated strength test pressure (STP):
                                    </Text>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="(mbar/bar)"
                                        value={calcStrength}
                                        onChangeText={(text) => setCalcStrength(text)}
                                    />
                                </View>
                            )}

                            {strengthTestContainerHeight === 1300 && (
                                <View style={styles.textInputContainer}>
                                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 2 }}>
                                    Test medium:
                                    </Text>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="air, nitrogen, water, (hydrostatic test) etc"
                                        value={testMedium}
                                        onChangeText={(text) => setTestMedium(text)}
                                    />
                                </View>
                            )}

                            {strengthTestContainerHeight === 1300 && (
                                <View style={styles.textInputContainer}>
                                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 2 }}>
                                    Stabilisation period:
                                    </Text>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="Mins..."
                                        value={stabilisationPeriod}
                                        onChangeText={(text) => setStabilisationPeriod(text)}
                                    />
                                </View>
                            )}
                            {strengthTestContainerHeight === 1300 && (
                                <View style={styles.textInputContainer}>
                                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 2 }}>
                                    Stabilisation period:
                                    </Text>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="Mins..."
                                        value={stabilisationPeriod}
                                        onChangeText={(text) => setStabilisationPeriod(text)}
                                    />
                                </View>
                            )}  
                            {strengthTestContainerHeight === 1300 && (
                                <View style={styles.textInputContainer}>
                                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 2 }}>
                                    Strength test duration:
                                    </Text>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="Mins..."
                                        value={strengthTestDur}
                                        onChangeText={(text) => setStrengthTestDur(text)}
                                    />
                                </View>
                            )}  
                            {strengthTestContainerHeight === 1300 && (
                                <View style={styles.textInputContainer}>
                                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 2 }}>
                                    Permitted pressure drop:
                                    </Text>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="%STP..."
                                        value={permPressure}
                                        onChangeText={(text) => setPermPressure(text)}
                                    />
                                </View>
                            )}  
                            {strengthTestContainerHeight === 1300 && (
                                <View style={styles.textInputContainer}>
                                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 2 }}>
                                    Calculated pressure drop:
                                    </Text>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="mbar/bar..."
                                        value={calmPressure}
                                        onChangeText={(text) => setCalcPressure(text)}
                                    />
                                </View>
                            )}  
                            {strengthTestContainerHeight === 1300 && (
                                <View style={styles.textInputContainer}>
                                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 2 }}>
                                    Findings:
                                    </Text>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="..."
                                        value={findings}
                                        onChangeText={(text) => setFindings(text)}
                                    />
                                </View>
                            )}  
                            {strengthTestContainerHeight === 1300 && (
                                <View style={styles.textInputContainer}>
                                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 2 }}>
                                    Actual pressure drop:
                                    </Text>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="mbar/bar..."
                                        value={pressureDrop}
                                        onChangeText={(text) => setsetPressureDrop(text)}
                                    />
                                </View>
                            )} 
                            {strengthTestContainerHeight === 1300 && (
                                <View style={styles.textInputContainer}>
                                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 2 }}>
                                    Strength test:
                                    </Text>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="Pass or Fail..."
                                        value={strengthPF}
                                        onChangeText={(text) => setStrengthPF(text)}
                                    />
                                </View>
                            )}    
                        </View>
                    </TouchableOpacity>

                    {/* TIGHTNESS DETAILS CHECKLIST CONTAINER*/}
                    <TouchableOpacity onPress={toggleTightnessContainerHeight}>
                        <View style={[cardContainerStyle(tightnessContainerHeight), { backgroundColor: 'white', height: tightnessContainerHeight }]}>
                            {tightnessContainerHeight === 130 && (
                                <View style={[styles.checkListIcon]}>
                                    <MaterialCommunityIcons style={styles.tickIconGlow} name="check" size={28} color="rgba(23, 214, 119, 0.8)" />
                                </View>
                            )}

                            {tightnessContainerHeight === 130 && (
                                <View style={{ flex: 1 }}>
                                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 2 }}>
                                        Tightness Test Details
                                    </Text>
                                </View>
                            )}

                            {tightnessContainerHeight === 1700 && (
                                <View style={styles.textInputContainer}>
                                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 2 }}>
                                        Gas Type: 
                                    </Text>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="Natural Gas (NG) Liquefied Petroleum Gas (LPG)..."
                                        value={gasType}
                                        onChangeText={(text) => setGasType(text)}
                                    />
                                </View>
                            )}

                            {tightnessContainerHeight === 1700 && (
                                <View style={styles.textInputContainer}>
                                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 2 }}>
                                    Installation :
                                    </Text>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="New (N) - New Extension (NE) - Existing (E)..."
                                        value={tightnessTestMethod}
                                        onChangeText={(text) => setTightnessTestMethod(text)}
                                    />
                                </View>
                            )}

                            {tightnessContainerHeight === 1700 && (
                                <View style={styles.textInputContainer}>
                                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 2 }}>
                                    Could weather/changes in temperature affect test?:
                                    </Text>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="(Yes/No)"
                                        value={weatherChange}
                                        onChangeText={(text) => setWeatherChange(text)}
                                    />
                                </View>
                            )}

                            {tightnessContainerHeight === 1700 && (
                                <View style={styles.textInputContainer}>
                                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 2 }}>
                                    Meter type:
                                    </Text>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="(Diaphregm,Rotary etc)"
                                        value={meterType}
                                        onChangeText={(text) => SetMeterType(text)}
                                    />
                                </View>
                            )}

                            {tightnessContainerHeight === 1700 && (
                                <View style={styles.textInputContainer}>
                                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 2 }}>
                                    Meter designation
                                    </Text>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="(U16,U40,P7 etc)"
                                        value={meterDesignation}
                                        onChangeText={(text) => setMeterDesignation(text)}
                                    />
                                </View>
                            )}

                            {tightnessContainerHeight === 1700 && (
                                <View style={styles.textInputContainer}>
                                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 2 }}>
                                    Meter bypass installed?
                                    </Text>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="Yes/No..."
                                        value={meterBypass}
                                        onChangeText={(text) => setMeterBypass(text)}
                                    />
                                </View>
                            )}
                            {tightnessContainerHeight === 1700 && (
                                <View style={styles.textInputContainer}>
                                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 2 }}>
                                    Installation volume:
                                    </Text>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="Gas meter (m3)..."
                                        value={installationVolume}
                                        onChangeText={(text) => setInstallationVolume(text)}
                                    />
                                </View>
                            )}  
                            {tightnessContainerHeight === 1700 && (
                                <View style={styles.textInputContainer}>
                                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 2 }}>
                                    Installation pipework and fittings:
                                    </Text>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="(m3)..."
                                        value={installationPipework}
                                        onChangeText={(text) => setInstallationPipework(text)}
                                    />
                                </View>
                            )}  
                            {tightnessContainerHeight === 1700 && (
                                <View style={styles.textInputContainer}>
                                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 2 }}>
                                    Total IV:
                                    </Text>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="(m3)"
                                        value={totalIV}
                                        onChangeText={(text) => setTotalIV(text)}
                                    />
                                </View>
                            )}  
                            {tightnessContainerHeight === 1700 && (
                                <View style={styles.textInputContainer}>
                                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 2 }}>
                                    Test medium:
                                    </Text>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="fuel, gas, air..."
                                        value={testMediumFGA}
                                        onChangeText={(text) => setTestMediumFGA(text)}
                                    />
                                </View>
                            )}  
                            {tightnessContainerHeight === 1700 && (
                                <View style={styles.textInputContainer}>
                                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 2 }}>
                                    Tightness test pressure (TTP):
                                    </Text>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="mbar/bar"
                                        value={tightnessTestPressure}
                                        onChangeText={(text) => setTightnessTestPressure(text)}
                                    />
                                </View>
                            )}  
                            {tightnessContainerHeight === 1700 && (
                                <View style={styles.textInputContainer}>
                                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 2 }}>
                                    Pressure Gauge type:
                                    </Text>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="water, high SG, electronic..."
                                        value={pressureGuageType}
                                        onChangeText={(text) => setPressureGuageType(text)}
                                    />
                                </View>
                            )} 
                            {tightnessContainerHeight === 1700 && (
                                <View style={styles.textInputContainer}>
                                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 2 }}>
                                    Maximum permitted leak rate:
                                    </Text>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="m3/hr..."
                                        value={maxLeak}
                                        onChangeText={(text) => setMaxLeak(text)}
                                    />
                                </View>
                            )}    
                            {tightnessContainerHeight === 1700 && (
                                <View style={styles.textInputContainer}>
                                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 2 }}>
                                    Let-by test period existing installations:
                                    </Text>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="(minutes)..."
                                        value={testPeriod}
                                        onChangeText={(text) => setTestPeriod(text)}
                                    />
                                </View>
                            )} 
                            {tightnessContainerHeight === 1700 && (
                                <View style={styles.textInputContainer}>
                                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 2 }}>
                                    Stabilisation period:
                                    </Text>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="(minutes)..."
                                        value={stablePeriod}
                                        onChangeText={(text) => setStablePeriod(text)}
                                    />
                                </View>
                            )} 
                            {tightnessContainerHeight === 1700 && (
                                <View style={styles.textInputContainer}>
                                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 2 }}>
                                    Tightness test duration:
                                    </Text>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="(TTD)..."
                                        value={tightnessTestDuration}
                                        onChangeText={(text) => setTightnessTestDuration(text)}
                                    />
                                </View>
                            )} 
                            {tightnessContainerHeight === 1700 && (
                                <View style={styles.textInputContainer}>
                                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 2 }}>
                                    Any inadequate ventilated areas to check?
                                    </Text>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="(Yes / No)..."
                                        value={ventilatedAreas}
                                        onChangeText={(text) => setVentilatedAreas(text)}
                                    />
                                </View>
                            )} 
                            {tightnessContainerHeight === 1700 && (
                                <View style={styles.textInputContainer}>
                                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 2 }}>
                                    Is barometric pressure correction necessary?
                                    </Text>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="(Yes / No)..."
                                        value={barometricPressure}
                                        onChangeText={(text) => setBarometricPressure(text)}
                                    />
                                </View>
                            )} 
                            {tightnessContainerHeight === 1700 && (
                                <View style={styles.textInputContainer}>
                                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 2 }}>
                                    Findings?
                                    </Text>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="(Yes / No)..."
                                        value={tightnessFindings}
                                        onChangeText={(text) => setTightnessFindings(text)}
                                    />
                                </View>
                            )} 
                            {tightnessContainerHeight === 1700 && (
                                <View style={styles.textInputContainer}>
                                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 2 }}>
                                    Actual pressure drop (if any) mbar?
                                    </Text>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="mbar..."
                                        value={pressureDropActual}
                                        onChangeText={(text) => setPressureDropActual(text)}
                                    />
                                </View>
                            )} 
                            {tightnessContainerHeight === 1700 && (
                                <View style={styles.textInputContainer}>
                                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 2 }}>
                                    Actual leak rate?
                                    </Text>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="m3bar..."
                                        value={leakRateActual}
                                        onChangeText={(text) => setLeakRateActual(text)}
                                    />
                                </View>
                            )} 
                            {tightnessContainerHeight === 1700 && (
                                <View style={styles.textInputContainer}>
                                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 2 }}>
                                    Have inadequetely ventilated areas been checked?
                                    </Text>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder=" Yes / No..."
                                        value={ventilatedAreasChecked}
                                        onChangeText={(text) => setVentilatedAreasChecked(text)}
                                    />
                                </View>
                            )} 
                            {tightnessContainerHeight === 1700 && (
                                <View style={styles.textInputContainer}>
                                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 2 }}>
                                    Tightness test Pass or Fail?
                                    </Text>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder=" Yes / No..."
                                        value={tightnessPass}
                                        onChangeText={(text) => setTightnessPass(text)}
                                    />
                                </View>
                            )} 
                            
                        </View>
                    </TouchableOpacity>

                    {/* PURGING DETAILS CHECKLIST CONTAINER*/}
                    <TouchableOpacity onPress={togglePurgingContainerHeight}>
                        <View style={[cardContainerStyle(purgingContainerHeight), { backgroundColor: 'white', height: purgingContainerHeight }]}>
                            {purgingContainerHeight === 130 && (
                                <View style={[styles.checkListIcon]}>
                                    <MaterialCommunityIcons style={styles.tickIconGlow} name="check" size={28} color="rgba(23, 214, 119, 0.8)" />
                                </View>
                            )}

                            {purgingContainerHeight === 130 && (
                                <View style={{ flex: 1 }}>
                                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 2 }}>
                                        Purgeing Test Details
                                    </Text>
                                </View>
                            )}

                            {purgingContainerHeight === 1200 && (
                                <View style={styles.textInputContainer}>
                                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 2 }}>
                                    Has a risk assessment been carried out?
                                    </Text>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="Yes/No"
                                        value={riskAssessment}
                                        onChangeText={(text) => setRiskAssessment(text)}
                                    />
                                </View>
                            )}

                            {purgingContainerHeight === 1200 && (
                                <View style={styles.textInputContainer}>
                                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 2 }}>
                                    Has a written procedure for the purge been prepared?
                                    </Text>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="Yes/No"
                                        value={purgeWriteUp}
                                        onChangeText={(text) => setPurgeWriteUp(text)}
                                    />
                                </View>
                            )}

                            {purgingContainerHeight === 1200 && (
                                <View style={styles.textInputContainer}>
                                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 2 }}>
                                    Have 'NO SMOKING' signs etc been displayed as necessary?
                                    </Text>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="(Yes/No)"
                                        value={noSmoking}
                                        onChangeText={(text) => setNoSmoking(text)}
                                    />
                                </View>
                            )}

                            {purgingContainerHeight === 1200 && (
                                <View style={styles.textInputContainer}>
                                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 2 }}>
                                    Have persons in the vacinity of the purge been advised accordingly?
                                    </Text>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="(Yes/No)"
                                        value={purgeAdvice}
                                        onChangeText={(text) => setPurgeAdvice(text)}
                                    />
                                </View>
                            )}

                            {purgingContainerHeight === 1200 && (
                                <View style={styles.textInputContainer}>
                                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 2 }}>
                                    Have all appropriate valves to and from the section of pipe been labelled?
                                    </Text>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="(Yes/No)"
                                        value={valveLabeling}
                                        onChangeText={(text) => setValveLabeling(text)}
                                    />
                                </View>
                            )}

                            {purgingContainerHeight === 1200 && (
                                <View style={styles.textInputContainer}>
                                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 2 }}>
                                    Where Nitrogen gas is being used for an indirect purge have the gas cylinders been checked/verified for their correct content?
                                    </Text>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="Yes/No..."
                                        value={nitrogenCheck}
                                        onChangeText={(text) => setNitrogenCheck(text)}
                                    />
                                </View>
                            )}
                            {purgingContainerHeight === 1200 && (
                                <View style={styles.textInputContainer}>
                                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 2 }}>
                                    Are suitable fire extinguishers available in case of an incident?
                                    </Text>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="Yes/No..."
                                        value={extinguisherCheck}
                                        onChangeText={(text) => setExtinguisherCheck(text)}
                                    />
                                </View>
                            )}  
                            {purgingContainerHeight === 1200 && (
                                <View style={styles.textInputContainer}>
                                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 2 }}>
                                    Are two way radios (intrisically safe) available? 
                                    </Text>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="(Yes/No)"
                                        value={radioCheck}
                                        onChangeText={(text) => setRadioCheck(text)}
                                    />
                                </View>
                            )}  
                            {purgingContainerHeight === 1200 && (
                                <View style={styles.textInputContainer}>
                                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 2 }}>
                                    Are all electrical bonds fitted as necessary?
                                    </Text>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="(Yes/No)"
                                        value={elecBondCheck}
                                        onChangeText={(text) => setElecBondCheck(text)}
                                    />
                                </View>
                            )}  
                            {purgingContainerHeight === 1200 && (
                                <View style={styles.textInputContainer}>
                                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 2 }}>
                                    Calculate purge volume Gas Meter:
                                    </Text>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="(m3)"
                                        value={calcPurgeVolume}
                                        onChangeText={(text) => setCalcPurgeVolume(text)}
                                    />
                                </View>
                            )}  
                            {purgingContainerHeight === 1200 && (
                                <View style={styles.textInputContainer}>
                                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 2 }}>
                                    Installation pipework and fittings:
                                    </Text>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="(m3)"
                                        value={pipeworkFittingCheck}
                                        onChangeText={(text) => setPipeworkFittingCheck(text)}
                                    />
                                </View>
                            )}  
                            {purgingContainerHeight === 1200 && (
                                <View style={styles.textInputContainer}>
                                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 2 }}>
                                    Total purge volume 
                                    </Text>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="(m3)"
                                        value={totalPurgeVolume}
                                        onChangeText={(text) => setTotalPurgeVolume(text)}
                                    />
                                </View>
                            )} 
                            {purgingContainerHeight === 1200 && (
                                <View style={styles.textInputContainer}>
                                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 2 }}>
                                    Is gas detector/oxygen measuring device as appropriate intrinsically safe?
                                    </Text>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="(Yes/No)"
                                        value={gasDeviceCheck}
                                        onChangeText={(text) => setGasDeviceCheck(text)}
                                    />
                                </View>
                            )}    
                            {purgingContainerHeight === 1200 && (
                                <View style={styles.textInputContainer}>
                                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 2 }}>
                                    Carry out purge noting final test criteria readings (O2% or LFL%)
                                    </Text>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="(minutes)..."
                                        value={purgeNoting}
                                        onChangeText={(text) => setPurgeNoting(text)}
                                    />
                                </View>
                            )} 
                            {purgingContainerHeight === 1200 && (
                                <View style={styles.textInputContainer}>
                                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 2 }}>
                                    Purge Pass or Fail?
                                    </Text>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="Pass/Fail"
                                        value={purgePass}
                                        onChangeText={(text) => setPurgePass(text)}
                                    />
                                </View>
                            )}
                        </View>
                    </TouchableOpacity>

                    {/* FINAL CHECKLIST CONTAINER*/}
                    <TouchableOpacity onPress={toggleFinalContainerHeight}>
                        <View style={[cardContainerStyle(finalContainerHeight), { backgroundColor: 'white', height: finalContainerHeight }]}>
                            {finalContainerHeight === 130 && (
                                <View style={[styles.checkListIcon]}>
                                    <MaterialCommunityIcons style={styles.tickIconGlow} name="check" size={28} color="rgba(23, 214, 119, 0.8)" />
                                </View>
                            )}

                            {finalContainerHeight === 130 && (
                                <View style={{ flex: 1 }}>
                                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 2 }}>
                                        Final Checks
                                    </Text>
                                </View>
                            )}

                            {finalContainerHeight === 430 && (
                                <View style={styles.textInputContainer}>
                                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 2 }}>
                                    DETAILS OF WORKS CARRIED OUT/REMEDIALS REQUIRED
                                    </Text>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="..."
                                        value={remedialDescription}
                                        onChangeText={(text) => setRemedialDescription(text)}
                                    />
                                </View>
                            )}

                            {finalContainerHeight === 430 && (
                                <View style={styles.textInputContainer}>
                                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 2 }}>
                                    Strength test:
                                    </Text>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="..."
                                        value={strengthTest}
                                        onChangeText={(text) => setStregthTest(text)}
                                    />
                                </View>
                            )}

                            {finalContainerHeight === 430 && (
                                <View style={styles.textInputContainer}>
                                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 2 }}>
                                    Purge:
                                    </Text>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="..."
                                        value={purgeTest}
                                        onChangeText={(text) => setPurgeTest(text)}
                                    />
                                </View>
                            )}
                            
                            {finalContainerHeight === 430 && (
                                <View style={styles.textInputContainer}>
                                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 2 }}>
                                    Tightness test:
                                    </Text>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="..."
                                        value={tightnessTest}
                                        onChangeText={(text) => setTightnessTest(text)}
                                    />
                                </View>
                            )}
                            {finalContainerHeight === 430 && (
                                <View style={styles.textInputContainer}>
                                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 2 }}>
                                    A copy of this form has been emailed to:
                                    </Text>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="..."
                                        value={emailedTo}
                                        onChangeText={(text) => setEmailedTo(text)}
                                    />
                                </View>
                            )}
                            {finalContainerHeight === 430 && (
                                <View style={styles.textInputContainer}>
                                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 2 }}>
                                    Copy declined::
                                    </Text>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="..."
                                        value={copyDeclined}
                                        onChangeText={(text) => setCopyDeclined(text)}
                                    />
                                </View>
                            )}
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.submitButton} onPress={sendCP16Data}>
                        <Text style={styles.submitButtonText}>Submit</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{
                        marginTop: 20,
                        padding: 20,
                        backgroundColor: '#7dd3fc',
                        borderRadius: 5,
                        width: 340,
                        }}
                        onPress={updateAndDownloadPdf}
                    >
                        <Text style={{ color: 'black' , textAlign: 'center',}}>Update and Download PDF</Text>
                    </TouchableOpacity>


                </View>
            </ScrollView>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    cardContainer: {
        marginRight: 5,
        marginTop: 24,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 13,
        borderRadius: 8,
        width: 340,
        borderWidth: 1,
        borderColor: '#EBEBED',
        shadowColor: 'rgba(0, 0, 0, 1)',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 1, 
        shadowRadius: 4,
      },
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
        paddingTop: 16,
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
    iconContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 6,
        marginRight: 10,
        borderColor: '#EBEBED', 
        borderWidth: 2,     
    
      },
    checkListIcon: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 6,
        marginRight: 10,
        borderWidth: 1,
        borderColor: '#EBEBED',
    },
    textInputContainer: {
        flex: 1,



    },
    textInput: {
        fontSize: wp(3),
        fontWeight: '600',
        color: 'black',
        marginTop: 2,
        borderWidth: 1,
        borderColor: '#EBEBED',
        padding: 8,
        borderRadius: 8,
        width: 300,
        marginTop: 3.
    },
    itemContainer: {
        paddingHorizontal: 20,
        paddingBottom: 20,
        flexDirection: 'column',
        marginBottom: 10,
    },
    label: {
        fontSize: wp(3),
        fontWeight: '600',
        color: 'black',
        marginTop: 2,
    },
    input: {
        fontSize: wp(3),
        fontWeight: '600',
        color: 'black',
        marginTop: 2,
        borderWidth: 1,
        borderColor: '#EBEBED',
        padding: 8,
        borderRadius: 8,
        width: 300,
    },
    submitButton: {
        backgroundColor: 'black',
        paddingVertical: 20,
        borderRadius: 5,
        marginTop: 10,
        width: 340,
      },
      submitButtonText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
      },

      tickIconGlow: {
        shadowColor: 'rgba(23, 214, 119, 0.8)',
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowOpacity: 0.8, 
        shadowRadius: 10,
        elevation: 5, 
      },
});