import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TextInput, Linking, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios';




export default function CP17({ navigation }) {
    const [activeSlide, setActiveSlide] = useState(0);
    const [siteDetailsContainerHeight, setSiteDetailsContainerHeight] = useState(130);
    const [applianceDetailContainerHeight, setApplianceDetailContainerHeight] = useState(130);
    const [pipeworkContainerHeight, setPipeworkContainerHeight] = useState(130);
    const [finalDetailsContainerHeight, setFinalDetailsContainerHeight] = useState(130);
   

    const [jobNum, setJobNum] = useState('');
    const [siteName, setSiteName] = useState('');
    const [siteAddress, setSiteAddress] = useState('');
    const [sitePostCode, setSitePostCode] = useState('');
    const [siteContact, setSiteContact] = useState('');
    const [siteNum, setSiteNum] = useState('');


    const [appliLocation1, setAppliLocation1] = useState('');
    const [appliType1, setAppliType1] = useState('');
    const [appliMake1, setAppliMake1] = useState('');
    const [appliModel1, setAppliModel1] = useState('');
    const [safetyDeviceCorrect1, setSafetyDeviceCorrect1] = useState('');
    const [operatingPressure1, setOperatingPressure1] = useState('');
    const [ventilationProvision1, setVentilationProvision1] = useState('');
    const [flueType1, setFlueType1] = useState('');
    const [flueCondition1, setFlueCondition1] = useState('');
    const [flueFlow1, setFlueFlow1] = useState('');
    const [spillageTest1, setSpillageTest1] = useState('');
    const [appliSafe1, setAppliSafe1] = useState('');   

    const [appliLocation2, setAppliLocation2] = useState('');
    const [appliType2, setAppliType2] = useState('');
    const [appliMake2, setAppliMake2] = useState('');
    const [appliModel2, setAppliModel2] = useState('');
    const [safetyDeviceCorrect2, setSafetyDeviceCorrect2] = useState('');
    const [operatingPressure2, setOperatingPressure2] = useState('');
    const [ventilationProvision2, setVentilationProvision2] = useState('');
    const [flueType2, setFlueType2] = useState('');
    const [flueCondition2, setFlueCondition2] = useState('');
    const [flueFlow2, setFlueFlow2] = useState('');
    const [spillageTest2, setSpillageTest2] = useState('');
    const [appliSafe2, setAppliSafe2] = useState('');   


    const [appliLocation3, setAppliLocation3] = useState('');
    const [appliType3, setAppliType3] = useState('');
    const [appliMake3, setAppliMake3] = useState('');
    const [appliModel3, setAppliModel3] = useState('');
    const [safetyDeviceCorrect3, setSafetyDeviceCorrect3] = useState('');
    const [operatingPressure3, setOperatingPressure3] = useState('');
    const [ventilationProvision3, setVentilationProvision3] = useState('');
    const [flueType3, setFlueType3] = useState('');
    const [flueCondition3, setFlueCondition3] = useState('');
    const [flueFlow3, setFlueFlow3] = useState('');
    const [spillageTest3, setSpillageTest3] = useState('');
    const [appliSafe3, setAppliSafe3] = useState('');   

    const [appliLocation4, setAppliLocation4] = useState('');
    const [appliType4, setAppliType4] = useState('');
    const [appliMake4, setAppliMake4] = useState('');
    const [appliModel4, setAppliModel4] = useState('');
    const [safetyDeviceCorrect4, setSafetyDeviceCorrect4] = useState('');
    const [operatingPressure4, setOperatingPressure4] = useState('');
    const [ventilationProvision4, setVentilationProvision4] = useState('');
    const [flueType4, setFlueType4] = useState('');
    const [flueCondition4, setFlueCondition4] = useState('');
    const [flueFlow4, setFlueFlow4] = useState('');
    const [spillageTest4, setSpillageTest4] = useState('');
    const [appliSafe4, setAppliSafe4] = useState('');

    const [appliLocation5, setAppliLocation5] = useState('');
    const [appliType5, setAppliType5] = useState('');
    const [appliMake5, setAppliMake5] = useState('');
    const [appliModel5, setAppliModel5] = useState('');
    const [safetyDeviceCorrect5, setSafetyDeviceCorrect5] = useState('');
    const [operatingPressure5, setOperatingPressure5] = useState('');
    const [ventilationProvision5, setVentilationProvision5] = useState('');
    const [flueType5, setFlueType5] = useState('');
    const [flueCondition5, setFlueCondition5] = useState('');
    const [flueFlow5, setFlueFlow5] = useState('');
    const [spillageTest5, setSpillageTest5] = useState('');
    const [appliSafe5, setAppliSafe5] = useState('');

    const [appliLocation6, setAppliLocation6] = useState('');
    const [appliType6, setAppliType6] = useState('');
    const [appliMake6, setAppliMake6] = useState('');
    const [appliModel6, setAppliModel6] = useState('');
    const [safetyDeviceCorrect6, setSafetyDeviceCorrect6] = useState('');
    const [operatingPressure6, setOperatingPressure6] = useState('');
    const [ventilationProvision6, setVentilationProvision6] = useState('');
    const [flueType6, setFlueType6] = useState('');
    const [flueCondition6, setFlueCondition6] = useState('');
    const [flueFlow6, setFlueFlow6] = useState('');
    const [spillageTest6, setSpillageTest6] = useState('');
    const [appliSafe6, setAppliSafe6] = useState('');

    const [installAccessable, setInstallAccessable] = useState('');
    const [meterRoomVent, setMeterRoomVent] = useState('');
    const [meterRoomSecure, setMeterRoomSecure] = useState('');
    const [meterRoomClear, setMeterRoomClear] = useState('');
    const [meterRoomLocked, setMeterRoomLocked] = useState('');
    const [diagramFixed, setDiagramFixed] = useState('');
    const [diagramCurrent, setDiagramCurrent] = useState('');
    const [emergencyValve, setEmergencyValve] = useState('');
    const [emergencyValveHandles, setEmergencyValveHandles] = useState('');
    const [colorCoded, setColorCoded] = useState('');
    const [crossBonded, setCrossBonded] = useState('');
    const [isSleeved, setIsSleeved] = useState('');
    const [testsCarriedOut, setTestsCarriedOut] = useState('');

    const [detailsOfWork, setDetailsOfWork] = useState('');
    const [detailsOfRemedials, setDetailsOfRemedials] = useState('');
    const [warningAdvice, setWarningAdvice] = useState('');
    const [warningLabels, setWarningLabels] = useState('');
    const [respPerson, setRespPerson] = useState('');
    const [warningID, setWarningID] = useState('');


    const navigateBack = () => {
        navigation.navigate('CertifSelection');
    };

    const toggleSiteDetailsContainerHeight = () => {
        setSiteDetailsContainerHeight((prevHeight) => (prevHeight === 130 ? 400 : 130));
    };


    const toggleApplianceDetailContainerHeight = () => {
        setApplianceDetailContainerHeight((prevHeight) => (prevHeight === 130 ? 900 : 130));
    };


    const togglePipeworkHeight = () => {
        setPipeworkContainerHeight((prevHeight) => (prevHeight === 130 ? 900 : 130));
    };

    const toggleFinalDetailsContainerHeight = () => {
        setFinalDetailsContainerHeight((prevHeight) => (prevHeight === 130 ? 400 : 130));
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



    const carouselData = [
        {
            title: 'Slide 1',
            appliLocation : appliLocation1,
            setAppliLocation : setAppliLocation1,
            appliType : appliType1,
            setAppliType : setAppliType1,
            appliMake: appliMake1, 
            setAppliMake: setAppliMake1, 
            appliModel : appliModel1, 
            setAppliModel : setAppliModel1,
            safetyDeviceCorrect : safetyDeviceCorrect1, 
            SafetyDeviceCorrect : setSafetyDeviceCorrect1, 
            operatingPressure : operatingPressure1, 
            setOperatingPressure : setOperatingPressure1, 
            ventilationProvision : ventilationProvision1, 
            setVentilationProvision : setVentilationProvision1, 
            flueType : flueType1, 
            setFlueType : setFlueType1, 
            flueCondition : flueCondition1, 
            setFlueCondition : setFlueCondition1, 
            flueFlow : flueFlow1, 
            setFlueFlow : setFlueFlow1,
            spillageTest: spillageTest1,
            setSpillageTest: setSpillageTest1,
            appliSafe : appliSafe1,
            setAppliSafe : setAppliSafe1,
        },
        {
            title: 'Slide 2',
            appliLocation : appliLocation2,
            setAppliLocation : setAppliLocation2,
            appliType : appliType2,
            setAppliType : setAppliType2,
            appliMake: appliMake2, 
            setAppliMake: setAppliMake2, 
            appliModel : appliModel2, 
            setAppliModel : setAppliModel2,
            safetyDeviceCorrect : safetyDeviceCorrect2, 
            SafetyDeviceCorrect : setSafetyDeviceCorrect2, 
            operatingPressure : operatingPressure2, 
            setOperatingPressure : setOperatingPressure2, 
            ventilationProvision : ventilationProvision2, 
            setVentilationProvision : setVentilationProvision2, 
            flueType : flueType2, 
            setFlueType : setFlueType2, 
            flueCondition : flueCondition2, 
            setFlueCondition : setFlueCondition2, 
            flueFlow : flueFlow2, 
            setFlueFlow : setFlueFlow2,
            spillageTest: spillageTest2,
            setSpillageTest: setSpillageTest2,
            appliSafe : appliSafe2,
            setAppliSafe : setAppliSafe2,
        },
        {
            title: 'Slide 3',
            appliLocation : appliLocation3,
            setAppliLocation : setAppliLocation3,
            appliType : appliType3,
            setAppliType : setAppliType3,
            appliMake: appliMake3, 
            setAppliMake: setAppliMake3, 
            appliModel : appliModel3, 
            setAppliModel : setAppliModel3,
            safetyDeviceCorrect : safetyDeviceCorrect3, 
            SafetyDeviceCorrect : setSafetyDeviceCorrect3, 
            operatingPressure : operatingPressure3, 
            setOperatingPressure : setOperatingPressure3, 
            ventilationProvision : ventilationProvision3, 
            setVentilationProvision : setVentilationProvision3, 
            flueType : flueType3, 
            setFlueType : setFlueType3, 
            flueCondition : flueCondition3, 
            setFlueCondition : setFlueCondition3, 
            flueFlow : flueFlow3, 
            setFlueFlow : setFlueFlow3,
            spillageTest: spillageTest3,
            setSpillageTest: setSpillageTest3,
            appliSafe : appliSafe3,
            setAppliSafe : setAppliSafe3,
        },
        {
            title: 'Slide 4',
            appliLocation : appliLocation4,
            setAppliLocation : setAppliLocation4,
            appliType : appliType4,
            setAppliType : setAppliType4,
            appliMake: appliMake4, 
            setAppliMake: setAppliMake4, 
            appliModel : appliModel4, 
            setAppliModel : setAppliModel4,
            safetyDeviceCorrect : safetyDeviceCorrect4, 
            SafetyDeviceCorrect : setSafetyDeviceCorrect4, 
            operatingPressure : operatingPressure4, 
            setOperatingPressure : setOperatingPressure4, 
            ventilationProvision : ventilationProvision4, 
            setVentilationProvision : setVentilationProvision4, 
            flueType : flueType4, 
            setFlueType : setFlueType4, 
            flueCondition : flueCondition4, 
            setFlueCondition : setFlueCondition4, 
            flueFlow : flueFlow4, 
            setFlueFlow : setFlueFlow4,
            spillageTest: spillageTest4,
            setSpillageTest: setSpillageTest4,
            appliSafe : appliSafe4,
            setAppliSafe : setAppliSafe4,
        },
        {
            title: 'Slide 5',
            appliLocation : appliLocation5,
            setAppliLocation : setAppliLocation5,
            appliType : appliType5,
            setAppliType : setAppliType5,
            appliMake: appliMake5, 
            setAppliMake: setAppliMake5, 
            appliModel : appliModel5, 
            setAppliModel : setAppliModel5,
            safetyDeviceCorrect : safetyDeviceCorrect5, 
            SafetyDeviceCorrect : setSafetyDeviceCorrect5, 
            operatingPressure : operatingPressure5, 
            setOperatingPressure : setOperatingPressure5, 
            ventilationProvision : ventilationProvision5, 
            setVentilationProvision : setVentilationProvision5, 
            flueType : flueType5, 
            setFlueType : setFlueType5, 
            flueCondition : flueCondition5, 
            setFlueCondition : setFlueCondition5, 
            flueFlow : flueFlow5, 
            setFlueFlow : setFlueFlow5,
            spillageTest: spillageTest5,
            setSpillageTest: setSpillageTest5,
            appliSafe : appliSafe5,
            setAppliSafe : setAppliSafe5,
        },
        {
            title: 'Slide 6',
            appliLocation : appliLocation6,
            setAppliLocation : setAppliLocation6,
            appliType : appliType6,
            setAppliType : setAppliType6,
            appliMake: appliMake6, 
            setAppliMake: setAppliMake6, 
            appliModel : appliModel6, 
            setAppliModel : setAppliModel6,
            safetyDeviceCorrect : safetyDeviceCorrect6, 
            SafetyDeviceCorrect : setSafetyDeviceCorrect6, 
            operatingPressure : operatingPressure6, 
            setOperatingPressure : setOperatingPressure6, 
            ventilationProvision : ventilationProvision6, 
            setVentilationProvision : setVentilationProvision6, 
            flueType : flueType6, 
            setFlueType : setFlueType6, 
            flueCondition : flueCondition6, 
            setFlueCondition : setFlueCondition6, 
            flueFlow : flueFlow6, 
            setFlueFlow : setFlueFlow6,
            spillageTest: spillageTest6,
            setSpillageTest: setSpillageTest6,
            appliSafe : appliSafe6,
            setAppliSafe : setAppliSafe6,
        },
    ];

    const renderItem = ({ item }) => (
        <KeyboardAvoidingView
    behavior={Platform.OS === 'ios' ? 'padding' : null}
    style={styles.container}
    >
        <View style={{ paddingBottom: 20, flexDirection: 'column', marginBottom: 10,}}>
            <View>
                <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 2 }}>Appliance Location:</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder="Enter Location..."
                    value={item.appliLocation}
                    onChangeText={(text) => item.setAppliLocation(text)}
                />
            </View>
            <View>
                <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 20 }}>Appliance Type:</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder="Enter Type Of Appliance..."
                    value={item.appliType}
                    onChangeText={(text) => item.setAppliType(text)}
                />
            </View>
            <View>
                <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 20 }}>Appliance Make:</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder="Enter Make Of Appliance..."
                    value={item.appliMake}
                    onChangeText={(text) => item.setAppliMake(text)}
                />
            </View>
            <View>
                <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 20 }}>Appliance Model:</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder="Enter Appliance Model..."
                    value={item.appliModel}
                    onChangeText={(text) => item.setAppliModel(text)}
                />
            </View>
            <View>
                <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 20 }}>Safety Device(s) correct?</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder="Yes/No/N/A"
                    value={item.safetyDeviceCorrect}
                    onChangeText={(text) => item.setSafetyDeviceCorrect(text)}
                />
            </View>
            <View>
                <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 20 }}>Operating pressure or heat input:</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder="(kW/h)"
                    value={item.operatingPressure}
                    onChangeText={(text) => item.setOperatingPressure(text)}
                />
            </View>
            <View>
                <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 20 }}>Ventilation provision:</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder="..."
                    value={item.ventilationProvision}
                    onChangeText={(text) => item.setVentilationProvision(text)}
                />
            </View>
            <View>
                <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 20 }}>Flue Type:</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder="Enter Flue Type..."
                    value={item.flueType}
                    onChangeText={(text) => item.setFlueType(text)}
                />
            </View>
            <View>
                <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 20 }}>Visual condition of flue and termination:</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder="Enter Condition..."
                    value={item.flueCondition}
                    onChangeText={(text) => item.setFlueCondition(text)}
                />
            </View>
            <View>
                <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 20 }}>Flue Flow:</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder="Enter Flue Flow..."
                    value={item.flueFlow}
                    onChangeText={(text) => item.setFlueFlow(text)}
                />
            </View>
            <View>
                <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 20 }}>Spillage Test:</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder="Spillage Test..."
                    value={item.spillageTest}
                    onChangeText={(text) => item.setSpillageTest(text)}
                />
            </View>
            <View>
                <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 20 }}>Is Appliance Safe For Use?</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder="YES/NO/NA..."
                    value={item.appliSafe}
                    onChangeText={(text) => item.setAppliSafe(text)}
                />
            </View>
        </View>
        </KeyboardAvoidingView>
    );



    const openPdfInBrowser = async () => {
        try {
            const response = await axios.get('http://51.21.134.104:5000/get-pdf-url/');
            const { file_url } = response.data;
    
            // Use React Native's Linking.openURL with the full URL
            const publicUrl = `http://51.21.134.104:5000${file_url}`;
            
            // Open the PDF URL in the user's default browser
            await Linking.openURL(publicUrl);
        } catch (error) {
            console.error('Error fetching or opening PDF URL:', error);
        }
    };


    // Function to handle back end sending of data
    const sendDataToBackend = async () => {
    try {
        const backendURL = 'http://51.21.134.104/update_cp17';


        const dataToSend = {
            jobNum,
            siteName,
            siteAddress,
            sitePostCode,
            siteContact,
            siteNum,
            
            appliLocation1,
            appliType1,
            appliMake1,
            appliModel1,
            safetyDeviceCorrect1,
            operatingPressure1,
            ventilationProvision1,
            flueType1,
            flueCondition1,
            flueFlow1,
            spillageTest1,
            appliSafe1,
        
            appliLocation2,
            appliType2,
            appliMake2,
            appliModel2,
            safetyDeviceCorrect2,
            operatingPressure2,
            ventilationProvision2,
            flueType2,
            flueCondition2,
            flueFlow2,
            spillageTest2,
            appliSafe2,
        
            appliLocation3,
            appliType3,
            appliMake3,
            appliModel3,
            safetyDeviceCorrect3,
            operatingPressure3,
            ventilationProvision3,
            flueType3,
            flueCondition3,
            flueFlow3,
            spillageTest3,
            appliSafe3,
        
            appliLocation4,
            appliType4,
            appliMake4,
            appliModel4,
            safetyDeviceCorrect4,
            operatingPressure4,
            ventilationProvision4,
            flueType4,
            flueCondition4,
            flueFlow4,
            spillageTest4,
            appliSafe4,
        
            appliLocation5,
            appliType5,
            appliMake5,
            appliModel5,
            safetyDeviceCorrect5,
            operatingPressure5,
            ventilationProvision5,
            flueType5,
            flueCondition5,
            flueFlow5,
            spillageTest5,
            appliSafe5,
        
            appliLocation6,
            appliType6,
            appliMake6,
            appliModel6,
            safetyDeviceCorrect6,
            operatingPressure6,
            ventilationProvision6,
            flueType6,
            flueCondition6,
            flueFlow6,
            spillageTest6,
            appliSafe6,
        
            installAccessable,
            meterRoomVent,
            meterRoomSecure,
            meterRoomClear,
            meterRoomLocked,
            diagramFixed,
            diagramCurrent,
            emergencyValve,
            emergencyValveHandles,
            colorCoded,
            crossBonded,
            isSleeved,
            testsCarriedOut,
        
            detailsOfWork,
            detailsOfRemedials,
            warningAdvice,
            warningLabels,
            respPerson,
            warningID
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
      const response = await axios.get('http://51.21.134.104:5000/get_cp17_pdf_link');
  
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

                    {/* SITE CHECKLIST CONTAINER*/}
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

                    {/* APPLIANCE DETAILS CHECKLIST CONTAINER with Carousel */}
                    <TouchableOpacity onPress={toggleApplianceDetailContainerHeight}>
                        <View style={[cardContainerStyle(applianceDetailContainerHeight), { backgroundColor: 'white', height: applianceDetailContainerHeight }]}>
                            {applianceDetailContainerHeight === 130 && (
                                <View style={[styles.checkListIcon]}>
                                    <MaterialCommunityIcons style={styles.tickIconGlow} name="check" size={28} color="rgba(23, 214, 119, 0.8)" />
                                </View>
                            )}

                            {applianceDetailContainerHeight === 130 && (
                                <View style={{ flex: 1 }}>
                                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 2 }}>
                                        Appliance Details
                                    </Text>
                                </View>
                            )}

                            {applianceDetailContainerHeight === 900 && (
                                <View style={{ flex: 1 }}>
                                    <Carousel
                                        data={carouselData}
                                        renderItem={renderItem}
                                        sliderWidth={400}
                                        itemWidth={400}
                                        layout={'default'}
                                        loop={false}
                                        inactiveSlideOpacity={1}
                                        inactiveSlideScale={1}
                                        containerCustomStyle={{ overflow: 'visible' }}
                                        onSnapToItem={(index) => setActiveSlide(index)}
                                    />
                                    <Pagination
                                        dotsLength={carouselData.length}
                                        activeDotIndex={activeSlide}
                                        containerStyle={{ marginTop: -10, marginLeft: -90}}
                                        dotStyle={{
                                            width: 10,
                                            height: 10,
                                            borderRadius: 5,
                                            backgroundColor: '#7dd3fc', // Active dot color
                                        }}
                                        inactiveDotStyle={{
                                            // Customize inactive dot style if needed
                                        }}
                                        inactiveDotOpacity={0.6}
                                        inactiveDotScale={0.8}
                                    />
                                </View>
                            )}
                        </View>
                    </TouchableOpacity>

                    {/* PIPEWORK CHECKLIST CONTAINER*/}
                    <TouchableOpacity onPress={togglePipeworkHeight}>
                        <View style={[cardContainerStyle(pipeworkContainerHeight), { backgroundColor: 'white', height: pipeworkContainerHeight }]}>
                            {pipeworkContainerHeight === 130 && (
                                <View style={[styles.checkListIcon]}>
                                    <MaterialCommunityIcons style={iconGlow} name="check" size={28} color="rgba(23, 214, 119, 0.8)" />
                                </View>
                            )}

                            {pipeworkContainerHeight === 130 && (
                                <View style={{ flex: 1 }}>
                                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 2 }}>
                                     Pipework/Meter Installation Details
                                    </Text>
                                </View>
                            )}

                            {pipeworkContainerHeight === 900 && (
                                <View style={styles.textInputContainer}>
                                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 2 }}>
                                    Is the installation accessible?
                                    </Text>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="YES/NO/NA"
                                        value={installAccessable}
                                        onChangeText={(text) => setInstallAccessable(text)}
                                    />
                                </View>
                            )}

                            {pipeworkContainerHeight === 900 && (
                                <View style={styles.textInputContainer}>
                                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 2 }}>
                                    Is the meter room/compartment adequately ventilated?
                                    </Text>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="YES/NO/NA"
                                        value={meterRoomVent}
                                        onChangeText={(text) => setMeterRoomVent(text)}
                                    />
                                </View>
                            )}

                            {pipeworkContainerHeight === 900 && (
                                <View style={styles.textInputContainer}>
                                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 2 }}>
                                    Is the meter room/compartment secure?
                                    </Text>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="YES/NO/NA"
                                        value={meterRoomSecure}
                                        onChangeText={(text) => setMeterRoomSecure(text)}
                                    />
                                </View>
                            )}

                            {pipeworkContainerHeight === 900 && (
                                <View style={styles.textInputContainer}>
                                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 2 }}>
                                    Is the meter room/compartment clear of combustibles etc?
                                    </Text>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="YES/NO/NA"
                                        value={meterRoomClear}
                                        onChangeText={(text) => setMeterRoomClear(text)}
                                    />
                                </View>
                            )}

                            {pipeworkContainerHeight === 900 && (
                                <View style={styles.textInputContainer}>
                                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 2 }}>
                                    Is the meter room/compartment lock key clearly labelled?
                                    </Text>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="YES/NO/NA"
                                        value={meterRoomLocked}
                                        onChangeText={(text) => setMeterRoomLocked(text)}
                                    />
                                </View>
                            )}
                            {pipeworkContainerHeight === 900 && (
                                <View style={styles.textInputContainer}>
                                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 2 }}>
                                    Is a gas installation line diagram fixed near the primary meter?
                                    </Text>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="YES/NO/NA"
                                        value={diagramFixed}
                                        onChangeText={(text) => setDiagramFixed(text)}
                                    />
                                </View>
                            )}
                            {pipeworkContainerHeight === 900 && (
                                <View style={styles.textInputContainer}>
                                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 2 }}>
                                    Is the gas installation diagram current?
                                    </Text>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="YES/NO/NA"
                                        value={diagramCurrent}
                                        onChangeText={(text) => setDiagramCurrent(text)}
                                    />
                                </View>
                            )}
                            {pipeworkContainerHeight === 900 && (
                                <View style={styles.textInputContainer}>
                                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 2 }}>
                                    Are adequate emergencyisolation valves fitted?
                                    </Text>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="YES/NO/NA"
                                        value={emergencyValve}
                                        onChangeText={(text) => setEmergencyValve(text)}
                                    />
                                </View>
                            )}
                            {pipeworkContainerHeight === 900 && (
                                <View style={styles.textInputContainer}>
                                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 2 }}>
                                    Are emergencyisolation valve handles in place and suitably labelled
                                    </Text>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="YES/NO/NA"
                                        value={emergencyValveHandles}
                                        onChangeText={(text) => setEmergencyValveHandles(text)}
                                    />
                                </View>
                            )}
                            {pipeworkContainerHeight === 900 && (
                                <View style={styles.textInputContainer}>
                                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 2 }}>
                                    Is pipework colour coded/identified? 
                                    </Text>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="YES/NO/NA"
                                        value={colorCoded}
                                        onChangeText={(text) => setColorCoded(text)}
                                    />
                                </View>
                            )}
                            {pipeworkContainerHeight === 900 && (
                                <View style={styles.textInputContainer}>
                                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 2 }}>
                                    Is the gas installation electrically cross bonded?
                                    </Text>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="YES/NO/NA"
                                        value={crossBonded}
                                        onChangeText={(text) => setCrossBonded(text)}
                                    />
                                </View>
                            )}
                            {pipeworkContainerHeight === 900 && (
                                <View style={styles.textInputContainer}>
                                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 2 }}>
                                    Is pipework suitably sleeved and sealed as appropriate?
                                    </Text>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="YES/NO/NA"
                                        value={isSleeved}
                                        onChangeText={(text) => setIsSleeved(text)}
                                    />
                                </View>
                            )}
                            {pipeworkContainerHeight === 900 && (
                                <View style={styles.textInputContainer}>
                                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 2 }}>
                                    Has a gas strength/tightness test been carried out?
                                    </Text>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="YES/NO/NA"
                                        value={testsCarriedOut}
                                        onChangeText={(text) => setTestsCarriedOut(text)}
                                    />
                                </View>
                            )}
                        </View>
                    </TouchableOpacity>

                    {/* FINAL CHECKLIST CONTAINER*/}
                    <TouchableOpacity onPress={toggleFinalDetailsContainerHeight}>
                        <View style={[cardContainerStyle(finalDetailsContainerHeight), { backgroundColor: 'white', height: siteDetailsContainerHeight }]}>
                            {finalDetailsContainerHeight === 130 && (
                                <View style={[styles.checkListIcon]}>
                                    <MaterialCommunityIcons style={iconGlow} name="check" size={28} color="rgba(23, 214, 119, 0.8)" />
                                </View>
                            )}

                            {finalDetailsContainerHeight === 130 && (
                                <View style={{ flex: 1 }}>
                                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 2 }}>
                                        Final Details
                                    </Text>
                                </View>
                            )}

                            {finalDetailsContainerHeight === 400 && (
                                <View style={styles.textInputContainer}>
                                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 2 }}>
                                    Details of work Carried Out:
                                    </Text>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="Enter Job Number..."
                                        value={detailsOfWork}
                                        onChangeText={(text) => setDetailsOfWork(text)}
                                    />
                                </View>
                            )}

                            {finalDetailsContainerHeight === 400 && (
                                <View style={styles.textInputContainer}>
                                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 2 }}>
                                    Details of Remedials Required:
                                    </Text>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="Enter Site Name..."
                                        value={detailsOfRemedials}
                                        onChangeText={(text) => setDetailsOfRemedials(text)}
                                    />
                                </View>
                            )}

                            {finalDetailsContainerHeight === 400 && (
                                <View style={styles.textInputContainer}>
                                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 2 }}>
                                    Has a warningadvice notice been raised?
                                    </Text>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="Enter Address..."
                                        value={warningAdvice}
                                        onChangeText={(text) => setWarningAdvice(text)}
                                    />
                                </View>
                            )}

                            {finalDetailsContainerHeight === 400 && (
                                <View style={styles.textInputContainer}>
                                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 2 }}>
                                    Has a warning labels been attached?
                                    </Text>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="Enter Postcode..."
                                        value={warningLabels}
                                        onChangeText={(text) => setWarningLabels(text)}
                                    />
                                </View>
                            )}

                            {finalDetailsContainerHeight === 400 && (
                                <View style={styles.textInputContainer}>
                                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 2 }}>
                                    Has responsible person been advised?
                                    </Text>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="Enter Number..."
                                        value={respPerson}
                                        onChangeText={(text) => setRespPerson(text)}
                                    />
                                </View>
                            )}
                            {finalDetailsContainerHeight === 400 && (
                                <View style={styles.textInputContainer}>
                                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 2 }}>
                                    Warning notice ID Numberif applicable GP14:
                                    </Text>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="Enter Number..."
                                        value={warningID}
                                        onChangeText={(text) => setWarningID(text)}
                                    />
                                </View>
                            )}
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.submitButton} onPress={sendDataToBackend}>
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