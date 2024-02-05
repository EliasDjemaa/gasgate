import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TextInput, Linking, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios';




export default function CP12({ navigation }) {
    const [activeSlide, setActiveSlide] = useState(0);
    const [jobAddressContainerHeight, setJobAddressContainerHeight] = useState(130);
    const [landlordContainerHeight, setLandlordContainerHeight] = useState(130);
    const [applianceDetailContainerHeight, setApplianceDetailContainerHeight] = useState(130);
    const [inspectionDetailContainerHeight, setInspectionDetailContainerHeight] = useState(130);
    const [audibleContainerHeight, setAudibleContainerHeight] = useState(130);
    const [inspectionContainerHeight, setInspectionContainerHeight] = useState(130);
    const [remedialContainerHeight, setRemedialContainerHeight] = useState(130);
    const [finalContainerHeight, setFinalContainerHeight] = useState(130);

    const [jobAddress, setJobAddress] = useState('');
    const [jobPostCode, setJobPostCode] = useState('');
    const [jobNum, setJobNum] = useState('');
    const [jobTele, setJobTele] = useState('');

    const [landlordName, setLandlordName] = useState('');
    const [landLordAddress, setLandlordAddress] = useState('');
    const [landLordPostcode, setLandlordPostcode] = useState('');
    const [landLordNum, setLandlordNum] = useState('');
    const [landLordNAT, setLandlordNAT] = useState('');

    const [appliLocation1, setAppliLocation1] = useState('');
    const [appliType1, setAppliType1] = useState('');
    const [appliMake1, setAppliMake1] = useState('');
    const [appliModel1, setAppliModel1] = useState('');
    const [landlordsAppi1, setLandlordsAppi1] = useState('');
    const [landlordsInsp1, setLandlordsInsp1] = useState('');
    const [flueType1, setFlueType1] = useState('');

    const [appliLocation2, setAppliLocation2] = useState('');
    const [appliType2, setAppliType2] = useState('');
    const [appliMake2, setAppliMake2] = useState('');
    const [appliModel2, setAppliModel2] = useState('');
    const [landlordsAppi2, setLandlordsAppi2] = useState('');
    const [landlordsInsp2, setLandlordsInsp2] = useState('');
    const [flueType2, setFlueType2] = useState('');

    const [appliLocation3, setAppliLocation3] = useState('');
    const [appliType3, setAppliType3] = useState('');
    const [appliMake3, setAppliMake3] = useState('');
    const [appliModel3, setAppliModel3] = useState('');
    const [landlordsAppi3, setLandlordsAppi3] = useState('');
    const [landlordsInsp3, setLandlordsInsp3] = useState('');
    const [flueType3, setFlueType3] = useState('');

    const [appliLocation4, setAppliLocation4] = useState('');
    const [appliType4, setAppliType4] = useState('');
    const [appliMake4, setAppliMake4] = useState('');
    const [appliModel4, setAppliModel4] = useState('');
    const [landlordsAppi4, setLandlordsAppi4] = useState('');
    const [landlordsInsp4, setLandlordsInsp4] = useState('');
    const [flueType4, setFlueType4] = useState('');

    const [pressure1, setPressure1] = useState('');
    const [initCombustion1, setInitCombustion1] = useState('');
    const [finalCombustion1, setFinalCombustion1] = useState('');
    const [safetyDevice1, setSafetyDevice1] = useState('');
    const [ventilationProv1, setVentilationProv1] = useState('');
    const [chimneyCond1, setChimneyCond1] = useState('');
    const [flueCheck1, setFlueCheck1] = useState('');
    const [applianceServiced1, setApplianceServiced1] = useState('');
    const [applianceSafe1, setApplianceSafe1] = useState('');

    const [pressure2, setPressure2] = useState('');
    const [initCombustion2, setInitCombustion2] = useState('');
    const [finalCombustion2, setFinalCombustion2] = useState('');
    const [safetyDevice2, setSafetyDevice2] = useState('');
    const [ventilationProv2, setVentilationProv2] = useState('');
    const [chimneyCond2, setChimneyCond2] = useState('');
    const [flueCheck2, setFlueCheck2] = useState('');
    const [applianceServiced2, setApplianceServiced2] = useState('');
    const [applianceSafe2, setApplianceSafe2] = useState('');

    const [pressure3, setPressure3] = useState('');
    const [initCombustion3, setInitCombustion3] = useState('');
    const [finalCombustion3, setFinalCombustion3] = useState('');
    const [safetyDevice3, setSafetyDevice3] = useState('');
    const [ventilationProv3, setVentilationProv3] = useState('');
    const [chimneyCond3, setChimneyCond3] = useState('');
    const [flueCheck3, setFlueCheck3] = useState('');
    const [applianceServiced3, setApplianceServiced3] = useState('');
    const [applianceSafe3, setApplianceSafe3] = useState('');

    const [pressure4, setPressure4] = useState('');
    const [initCombustion4, setInitCombustion4] = useState('');
    const [finalCombustion4, setFinalCombustion4] = useState('');
    const [safetyDevice4, setSafetyDevice4] = useState('');
    const [ventilationProv4, setVentilationProv4] = useState('');
    const [chimneyCond4, setChimneyCond4] = useState('');
    const [flueCheck4, setFlueCheck4] = useState('');
    const [applianceServiced4, setApplianceServiced4] = useState('');
    const [applianceSafe4, setApplianceSafe4] = useState('');

    const [approvedAlarm1, setApprovedAlarm1] = useState('');
    const [alarmInDate1, setAlarmInDate1] = useState('');
    const [alarmTest1, setAlarmTest1] = useState('');

    const [approvedAlarm2, setApprovedAlarm2] = useState('');
    const [alarmInDate2, setAlarmInDate2] = useState('');
    const [alarmTest2, setAlarmTest2] = useState('');
    
    const [approvedAlarm3, setApprovedAlarm3] = useState('');
    const [alarmInDate3, setAlarmInDate3] = useState('');
    const [alarmTest3, setAlarmTest3] = useState('');

    const [approvedAlarm4, setApprovedAlarm4] = useState('');
    const [alarmInDate4, setAlarmInDate4] = useState('');
    const [alarmTest4, setAlarmTest4] = useState('');

    const [inspectionDescription, setInspectionDescription] = useState('');
    const [warningSerial, setWarningSerial] = useState('');

    const [remedialDescription, setRemedialDescription] = useState('');

    const [visualInspection, setVisualInspection] = useState('');
    const [emergencyControl, setEmergencyControl] = useState('');
    const [gasTightness, setGasTightness] = useState('');
    const [protectiveEquipment, setProtectiveEquipment] = useState('');



    const navigateBack = () => {
        navigation.navigate('CertifSelection');
    };

    const toggleJobAddressContainerHeight = () => {
        setJobAddressContainerHeight((prevHeight) => (prevHeight === 130 ? 250 : 130));
    };

    const toggleLandlordContainerHeight = () => {
        setLandlordContainerHeight((prevHeight) => (prevHeight === 130 ? 280 : 130));
    };

    const toggleApplianceDetailContainerHeight = () => {
        setApplianceDetailContainerHeight((prevHeight) => (prevHeight === 130 ? 590 : 130));
    };

    const toggleInspectionDetailContainerHeight = () => {
        setInspectionDetailContainerHeight((prevHeight) => (prevHeight === 130 ? 700 : 130));
    };

    const toggleAudibleContainerHeight = () => {
        setAudibleContainerHeight((prevHeight) => (prevHeight === 130 ? 300 : 130));
    };

    const toggleInspectionContainerHeight = () => {
        setInspectionContainerHeight((prevHeight) => (prevHeight === 130 ? 360 : 130));
    };

    const toggleRemedialContainerHeight = () => {
        setRemedialContainerHeight((prevHeight) => (prevHeight === 130 ? 260 : 130));
    };

    const toggleFinalContainerHeight = () => {
        setFinalContainerHeight((prevHeight) => (prevHeight === 130 ? 290 : 130));
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
            appliLocation: appliLocation1,
            setAppliLocation: setAppliLocation1,
            appliType: appliType1,
            setAppliType: setAppliType1,
            appliMake: appliMake1,
            setAppliMake: setAppliMake1,
            appliModel: appliModel1,
            setAppliModel: setAppliModel1,
            landlordsAppi: landlordsAppi1,
            setLandlordsAppi: setLandlordsAppi1,
            landlordsInsp: landlordsInsp1,
            setLandlordsInsp: setLandlordsInsp1,
            flueType: flueType1,
            setFlueType: setFlueType1,
        },
        {
            title: 'Slide 2',
            appliLocation: appliLocation2,
            setAppliLocation: setAppliLocation2,
            appliType: appliType2,
            setAppliType: setAppliType2,
            appliMake: appliMake2,
            setAppliMake: setAppliMake2,
            appliModel: appliModel2,
            setAppliModel: setAppliModel2,
            landlordsAppi: landlordsAppi2,
            setLandlordsAppi: setLandlordsAppi2,
            landlordsInsp: landlordsInsp2,
            setLandlordsInsp: setLandlordsInsp2,
            flueType: flueType2,
            setFlueType: setFlueType2,
        },
        {
            title: 'Slide 3',
            appliLocation: appliLocation3,
            setAppliLocation: setAppliLocation3,
            appliType: appliType3,
            setAppliType: setAppliType3,
            appliMake: appliMake3,
            setAppliMake: setAppliMake3,
            appliModel: appliModel3,
            setAppliModel: setAppliModel3,
            landlordsAppi: landlordsAppi3,
            setLandlordsAppi: setLandlordsAppi3,
            landlordsInsp: landlordsInsp3,
            setLandlordsInsp: setLandlordsInsp3,
            flueType: flueType3,
            setFlueType: setFlueType3,
        },
        {
            title: 'Slide 4',
            appliLocation: appliLocation4,
            setAppliLocation: setAppliLocation4,
            appliType: appliType4,
            setAppliType: setAppliType4,
            appliMake: appliMake4,
            setAppliMake: setAppliMake4,
            appliModel: appliModel4,
            setAppliModel: setAppliModel4,
            landlordsAppi: landlordsAppi4,
            setLandlordsAppi: setLandlordsAppi4,
            landlordsInsp: landlordsInsp4,
            setLandlordsInsp: setLandlordsInsp4,
            flueType: flueType4,
            setFlueType: setFlueType4,
        },
    ];

    const carouselData1 = [
        {
            title: 'Slide 1',
            pressure: pressure1,
            setPressure: setPressure1,
            initCombustion: initCombustion1,
            setInitCombustion: setInitCombustion1,
            finalCombustion: finalCombustion1,
            setFinalCombustion: setFinalCombustion1,
            safetyDevice: safetyDevice1,
            setSafetyDevice: setSafetyDevice1,
            ventilationProv: ventilationProv1,
            setVentilationProv: setVentilationProv1,
            chimneyCond: chimneyCond1,
            setChimneyCond: setChimneyCond1,
            flueCheck: flueCheck1,
            setFlueCheck: setFlueCheck1,
            applianceServiced: applianceServiced1,
            setApplianceServiced: setApplianceServiced1,
            applianceSafe: applianceSafe1,
            setApplianceSafe: setApplianceSafe1,
        },
        {
            title: 'Slide 2',
            pressure: pressure2,
            setPressure: setPressure2,
            initCombustion: initCombustion2,
            setInitCombustion: setInitCombustion2,
            finalCombustion: finalCombustion2,
            setFinalCombustion: setFinalCombustion2,
            safetyDevice: safetyDevice2,
            setSafetyDevice: setSafetyDevice2,
            ventilationProv: ventilationProv2,
            setVentilationProv: setVentilationProv2,
            chimneyCond: chimneyCond2,
            setChimneyCond: setChimneyCond2,
            flueCheck: flueCheck2,
            setFlueCheck: setFlueCheck2,
            applianceServiced: applianceServiced2,
            setApplianceServiced: setApplianceServiced2,
            applianceSafe: applianceSafe2,
            setApplianceSafe: setApplianceSafe2,
        },
        {
            title: 'Slide 3',
            pressure: pressure3,
            setPressure: setPressure3,
            initCombustion: initCombustion3,
            setInitCombustion: setInitCombustion3,
            finalCombustion: finalCombustion3,
            setFinalCombustion: setFinalCombustion3,
            safetyDevice: safetyDevice3,
            setSafetyDevice: setSafetyDevice3,
            ventilationProv: ventilationProv3,
            setVentilationProv: setVentilationProv3,
            chimneyCond: chimneyCond3,
            setChimneyCond: setChimneyCond3,
            flueCheck: flueCheck3,
            setFlueCheck: setFlueCheck3,
            applianceServiced: applianceServiced3,
            setApplianceServiced: setApplianceServiced3,
            applianceSafe: applianceSafe3,
            setApplianceSafe: setApplianceSafe3,
        },
        {
            title: 'Slide 4',
            pressure: pressure4,
            setPressure: setPressure4,
            initCombustion: initCombustion4,
            setInitCombustion: setInitCombustion4,
            finalCombustion: finalCombustion4,
            setFinalCombustion: setFinalCombustion4,
            safetyDevice: safetyDevice4,
            setSafetyDevice: setSafetyDevice4,
            ventilationProv: ventilationProv4,
            setVentilationProv: setVentilationProv4,
            chimneyCond: chimneyCond4,
            setChimneyCond: setChimneyCond4,
            flueCheck: flueCheck4,
            setFlueCheck: setFlueCheck4,
            applianceServiced: applianceServiced4,
            setApplianceServiced: setApplianceServiced4,
            applianceSafe: applianceSafe4,
            setApplianceSafe: setApplianceSafe4,
        },
    ];

    const carouselData2 = [

        {
            title: 'Slide 1',
            approvedAlarm: approvedAlarm1,
            setApprovedAlarm: setApprovedAlarm1,
            alarmInDate: alarmInDate1,
            setAlarmInDate: setAlarmInDate1,
            alarmTest: alarmTest1,
            setAlarmTest: setAlarmTest1,
        },
        {
            title: 'Slide 2',
            approvedAlarm: approvedAlarm2,
            setApprovedAlarm: setApprovedAlarm2,
            alarmInDate: alarmInDate2,
            setAlarmInDate: setAlarmInDate2,
            alarmTest: alarmTest2,
            setAlarmTest: setAlarmTest2,
        },
        {
            title: 'Slide 3',
            approvedAlarm: approvedAlarm3,
            setApprovedAlarm: setApprovedAlarm3,
            alarmInDate: alarmInDate3,
            setAlarmInDate: setAlarmInDate3,
            alarmTest: alarmTest3,
            setAlarmTest: setAlarmTest3,
        },
        {
            title: 'Slide 4',
            approvedAlarm: approvedAlarm4,
            setApprovedAlarm: setApprovedAlarm4,
            alarmInDate: alarmInDate4,
            setAlarmInDate: setAlarmInDate4,
            alarmTest: alarmTest4,
            setAlarmTest: setAlarmTest4,
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
                <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 20 }}>Landlord’s appliance?</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder="Yes/No/N/A"
                    value={item.landlordsAppi}
                    onChangeText={(text) => item.setLandlordsAppi(text)}
                />
            </View>
            <View>
                <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 20 }}>Landlord’s inspected?</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder="Yes/No"
                    value={item.landlordsInsp}
                    onChangeText={(text) => item.setLandlordsInsp(text)}
                />
            </View>
            <View>
                <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 20 }}>Flue Type:</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder="OF/RS/FL"
                    value={item.flueType}
                    onChangeText={(text) => item.setFlueType(text)}
                />
            </View>
        </View>
        </KeyboardAvoidingView>
    );

    
    const renderItem1 = ({ item }) => (
        <View style={{ paddingBottom: 20, flexDirection: 'column', marginBottom: 10,}}>
            <View>
                <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 2 }}>Operating pressure:</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder="mbar or heat input inkW..."
                    value={item.pressure}
                    onChangeText={(text) => item.setPressure(text)}
                />
            </View>
            <View>
                <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 20 }}>Initial combustion:</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder="if applicable..."
                    value={item.initCombustion}
                    onChangeText={(text) => item.setInitCombustion(text)}
                />
            </View>
            <View>
                <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 20 }}>Final combustion:</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder="if applicable..."
                    value={item.finalCombustion}
                    onChangeText={(text) => item.setFinalCombustion(text)}
                />
            </View>
            <View>
                <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 20 }}>Safety device(s) correct operation?</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder="Yes/No/N/A"
                    value={item.safetyDevice}
                    onChangeText={(text) => item.setSafetyDevice(text)}
                />
            </View>
            <View>
                <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 20 }}>Ventilation provision?</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder="Yes/No"
                    value={item.ventilationProv}
                    onChangeText={(text) => item.setVentilationProv(text)}
                />
            </View>
            <View>
                <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 20 }}>Visual condition of chimney?</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder="Pass/Fail/N/A"
                    value={item.chimneyCond}
                    onChangeText={(text) => item.setChimneyCond(text)}
                />
            </View>
            <View>
                <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 20 }}>Flue performance checks?</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder="Pass/Fail/N/A"
                    value={item.flueCheck}
                    onChangeText={(text) => item.setFlueCheck(text)}
                />
            </View>
            <View>
                <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 20 }}>Appliance serviced?</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder="Yes/No"
                    value={item.applianceServiced}
                    onChangeText={(text) => item.setApplianceServiced(text)}
                />
            </View>
            <View>
                <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 20 }}>Appliance safe?</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder="Yes/No"
                    value={item.applianceSafe}
                    onChangeText={(text) => item.setApplianceSafe(text)}
                />
            </View>
        </View>
    );

    const renderItem2 = ({ item }) => (
        <View style={{ paddingBottom: 20, flexDirection: 'column', marginBottom: 10,}}>
            <View>
                <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 2 }}>Approved CO alarm fitted:</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder="Yes/No/N/A"
                    value={item.approvedAlarm}
                    onChangeText={(text) => item.setApprovedAlarm(text)}
                />
            </View>
            <View>
                <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 20 }}>Is CO alarm in date:</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder="Yes/No/N/A..."
                    value={item.alarmInDate}
                    onChangeText={(text) => item.setAlarmInDate(text)}
                />
            </View>
            <View>
                <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 20 }}>Testing of CO alarm satisfactory:</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder="Yes/No/N/A"
                    value={item.alarmTest}
                    onChangeText={(text) => item.setAlarmTest(text)}
                />
            </View>
        </View>
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
        const backendURL = 'http://51.21.134.104/update_pdf';


    const dataToSend = {
        jobNum,
        jobAddress,
        jobPostCode,
        jobTele,
        landlordName,
        landLordAddress,
        landLordPostcode,
        landLordNum,
        landLordNAT,
        appliLocation1,
        appliType1,
        appliMake1,
        appliModel1,
        landlordsAppi1,
        landlordsInsp1,
        flueType1,
        appliLocation2,
        appliType2,
        appliMake2,
        appliModel2,
        landlordsAppi2,
        landlordsInsp2,
        flueType2,
        appliLocation3,
        appliType3,
        appliMake3,
        appliModel3,
        landlordsAppi3,
        landlordsInsp3,
        flueType3,
        appliLocation4,
        appliType4,
        appliMake4,
        appliModel4,
        landlordsAppi4,
        landlordsInsp4,
        flueType4,
        pressure1,
        initCombustion1,
        finalCombustion1,
        safetyDevice1,
        ventilationProv1,
        chimneyCond1,
        flueCheck1,
        applianceServiced1,
        applianceSafe1,
        pressure2,
        initCombustion2,
        finalCombustion2,
        safetyDevice2,
        ventilationProv2,
        chimneyCond2,
        flueCheck2,
        applianceServiced2,
        applianceSafe2,
        pressure3,
        initCombustion3,
        finalCombustion3,
        safetyDevice3,
        ventilationProv3,
        chimneyCond3,
        flueCheck3,
        applianceServiced3,
        applianceSafe3,
        pressure4,
        initCombustion4,
        finalCombustion4,
        safetyDevice4,
        ventilationProv4,
        chimneyCond4,
        flueCheck4,
        applianceServiced4,
        applianceSafe4,
        approvedAlarm1,
        alarmInDate1,
        alarmTest1,
        approvedAlarm2,
        alarmInDate2,
        alarmTest2,
        approvedAlarm3,
        alarmInDate3,
        alarmTest3,
        approvedAlarm4,
        alarmInDate4,
        alarmTest4,
        inspectionDescription,
        warningSerial,
        remedialDescription,
        visualInspection,
        emergencyControl,
        gasTightness,
        protectiveEquipment,
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
      // Call the Flask endpoint to update the PDF and get the public URL
      const response = await axios.post('http://51.21.134.104:5000/update_pdf_link', {});

      // Log the response for debugging purposes
      console.log('Response from server:', response.data);

      const { file_url } = response.data;

      // Check if file_url is present in the response - YAYO
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

                    {/* JOB ADDRESS CHECKLIST CONTAINER*/}
                    <TouchableOpacity onPress={toggleJobAddressContainerHeight}>
                        <View style={[cardContainerStyle(jobAddressContainerHeight), { backgroundColor: 'white', height: jobAddressContainerHeight }]}>
                            {jobAddressContainerHeight === 130 && (
                                <View style={[styles.checkListIcon]}>
                                    <MaterialCommunityIcons style={iconGlow} name="check" size={28} color="rgba(23, 214, 119, 0.8)" />
                                </View>
                            )}

                            {jobAddressContainerHeight === 130 && (
                                <View style={{ flex: 1 }}>
                                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 2 }}>
                                        Job Details
                                    </Text>
                                </View>
                            )}

                            {jobAddressContainerHeight === 250 && (
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

                            {jobAddressContainerHeight === 250 && (
                                <View style={styles.textInputContainer}>
                                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 2 }}>
                                        Job Address:
                                    </Text>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="Enter Address..."
                                        value={jobAddress}
                                        onChangeText={(text) => setJobAddress(text)}
                                    />
                                </View>
                            )}

                            {jobAddressContainerHeight === 250 && (
                                <View style={styles.textInputContainer}>
                                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 2 }}>
                                        Postcode:
                                    </Text>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="Enter Postcode..."
                                        value={jobPostCode}
                                        onChangeText={(text) => setJobPostCode(text)}
                                    />
                                </View>
                            )}

                            {jobAddressContainerHeight === 250 && (
                                <View style={styles.textInputContainer}>
                                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 2 }}>
                                        Telephone:
                                    </Text>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="Enter Number..."
                                        value={jobTele}
                                        onChangeText={(text) => setJobTele(text)}
                                    />
                                </View>
                            )}
                        </View>
                    </TouchableOpacity>

                    {/* LANDLORD DETAILS CHECKLIST CONTAINER*/}
                    <TouchableOpacity onPress={toggleLandlordContainerHeight}>
                        <View style={[cardContainerStyle(landlordContainerHeight), { backgroundColor: 'white', height: landlordContainerHeight }]}>
                            {landlordContainerHeight === 130 && (
                                <View style={[styles.checkListIcon]}>
                                    <MaterialCommunityIcons style={styles.tickIconGlow} name="check" size={28} color="rgba(23, 214, 119, 0.8)" />
                                </View>
                            )}

                            {landlordContainerHeight === 130 && (
                                <View style={{ flex: 1 }}>
                                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 2 }}>
                                        Landlord Details
                                    </Text>
                                </View>
                            )}

                            {landlordContainerHeight === 280 && (
                                <View style={styles.textInputContainer}>
                                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 2 }}>
                                        Landlord Name:
                                    </Text>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="Enter Name..."
                                        value={landlordName}
                                        onChangeText={(text) => setLandlordName(text)}
                                    />
                                </View>
                            )}

                            {landlordContainerHeight === 280 && (
                                <View style={styles.textInputContainer}>
                                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 2 }}>
                                        Landlord Address:
                                    </Text>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="Enter Address..."
                                        value={landLordAddress}
                                        onChangeText={(text) => setLandlordAddress(text)}
                                    />
                                </View>
                            )}

                            {landlordContainerHeight === 280 && (
                                <View style={styles.textInputContainer}>
                                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 2 }}>
                                        Postcode:
                                    </Text>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="Enter Postcode..."
                                        value={landLordPostcode}
                                        onChangeText={(text) => setLandlordPostcode(text)}
                                    />
                                </View>
                            )}

                            {landlordContainerHeight === 280 && (
                                <View style={styles.textInputContainer}>
                                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 2 }}>
                                        Telephone:
                                    </Text>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="Enter Number..."
                                        value={landLordNum}
                                        onChangeText={(text) => setLandlordNum(text)}
                                    />
                                </View>
                            )}

                            {landlordContainerHeight === 280 && (
                                <View style={styles.textInputContainer}>
                                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 2 }}>
                                        Number Of Appliances Tested:
                                    </Text>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="Enter Amount..."
                                        value={landLordNAT}
                                        onChangeText={(text) => setLandlordNAT(text)}
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

                            {applianceDetailContainerHeight === 590 && (
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

                        {/* INSPECTION CHECKLIST CONTAINER*/}
                        <TouchableOpacity onPress={toggleInspectionDetailContainerHeight}>
                        <View style={[cardContainerStyle(inspectionDetailContainerHeight), { backgroundColor: 'white', height: inspectionDetailContainerHeight }]}>
                            {inspectionDetailContainerHeight === 130 && (
                                <View style={[styles.checkListIcon]}>
                                    <MaterialCommunityIcons style={styles.tickIconGlow} name="check" size={28} color="rgba(23, 214, 119, 0.8)" />
                                </View>
                            )}

                            {inspectionDetailContainerHeight === 130 && (
                                <View style={{ flex: 1 }}>
                                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 2 }}>
                                        Inspection Details
                                    </Text>
                                </View>
                            )}

                            {inspectionDetailContainerHeight === 700 && (
                                <View style={{ flex: 1 }}>
                                    <Carousel
                                        data={carouselData1}
                                        renderItem={renderItem1}
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
                                        containerStyle={{ marginTop: 10, marginLeft: -90}}
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

                    {/* AUDIBLE CO ALARM CHECKLIST CONTAINER*/}
                    <TouchableOpacity onPress={toggleAudibleContainerHeight}>
                        <View style={[cardContainerStyle(audibleContainerHeight), { backgroundColor: 'white', height: audibleContainerHeight }]}>
                            {audibleContainerHeight === 130 && (
                                <View style={[styles.checkListIcon]}>
                                    <MaterialCommunityIcons style={styles.tickIconGlow} name="check" size={28} color="rgba(23, 214, 119, 1)" />
                                </View>
                            )}

                            {audibleContainerHeight === 130 && (
                                <View style={{ flex: 1 }}>
                                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 2 }}>
                                        Audible CO Alarm
                                    </Text>
                                </View>
                            )}


                            {audibleContainerHeight === 300 && (
                                <View style={{ flex: 1 }}>
                                <Carousel
                                    data={carouselData2}
                                    renderItem={renderItem2}
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
                                    containerStyle={{ marginTop: 10, marginLeft: -90}}
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

                    {/* INSPECTION DESCRIPTION CHECKLIST CONTAINER*/}
                    <TouchableOpacity onPress={toggleInspectionContainerHeight}>
                        <View style={[cardContainerStyle(inspectionContainerHeight), { backgroundColor: 'white', height: inspectionContainerHeight }]}>
                            {inspectionContainerHeight === 130 && (
                                <View style={[styles.checkListIcon]}>
                                    <MaterialCommunityIcons style={styles.tickIconGlow} name="check" size={28} color="rgba(23, 214, 119, 0.8)" />
                                </View>
                            )}

                            {inspectionContainerHeight === 130 && (
                                <View style={{ flex: 1 }}>
                                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 2 }}>
                                        Inspection Description
                                    </Text>
                                </View>
                            )}

                            {inspectionContainerHeight === 360 && (
                                <View style={styles.textInputContainer}>
                                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 2 }}>
                                        Inspection Details:
                                    </Text>
                                    <TextInput
                                        style={[styles.textInput, {height: 160}]}
                                        placeholder="Enter Inspection Details:..."
                                        value={inspectionDescription}
                                        onChangeText={(text) => setInspectionDescription(text)}
                                    />
                                </View>
                            )}

                            {inspectionContainerHeight === 360 && (
                                <View style={[styles.textInputContainer, {marginTop:80}]}>
                                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 2 }}>
                                    If Warning/Advise Notice issued insert serial No.* 
                                    </Text>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="Enter Serial..."
                                        value={warningSerial}
                                        onChangeText={(text) => setWarningSerial(text)}
                                    />
                                </View>
                            )}
                        </View>
                    </TouchableOpacity>

                    {/* REMEDIAL DESCRIPTION CHECKLIST CONTAINER*/}
                    <TouchableOpacity onPress={toggleRemedialContainerHeight}>
                        <View style={[cardContainerStyle(remedialContainerHeight), { backgroundColor: 'white', height: remedialContainerHeight }]}>
                            {remedialContainerHeight === 130 && (
                                <View style={[styles.checkListIcon]}>
                                    <MaterialCommunityIcons style={styles.tickIconGlow} name="check" size={28} color="rgba(23, 214, 119, 0.8)" />
                                </View>
                            )}

                            {remedialContainerHeight === 130 && (
                                <View style={{ flex: 1 }}>
                                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 2 }}>
                                        Remedial Action
                                    </Text>
                                </View>
                            )}

                            {remedialContainerHeight === 260 && (
                                <View style={styles.textInputContainer}>
                                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 2 }}>
                                        Remedial Action Required?
                                    </Text>
                                    <TextInput
                                        style={[styles.textInput, {height: 200}]}
                                        placeholder="Enter Remedial Action Details:..."
                                        value={remedialDescription}
                                        onChangeText={(text) => setRemedialDescription(text)}
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

                            {finalContainerHeight === 290 && (
                                <View style={styles.textInputContainer}>
                                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 2 }}>
                                        Gas installation pipework satisfactory?
                                    </Text>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="Yes/No..."
                                        value={visualInspection}
                                        onChangeText={(text) => setVisualInspection(text)}
                                    />
                                </View>
                            )}

                            {finalContainerHeight === 290 && (
                                <View style={styles.textInputContainer}>
                                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 2 }}>
                                        Emergency Control Valve (ECV) accessible?
                                    </Text>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="Yes/No"
                                        value={emergencyControl}
                                        onChangeText={(text) => setEmergencyControl(text)}
                                    />
                                </View>
                            )}

                            {finalContainerHeight === 290 && (
                                <View style={styles.textInputContainer}>
                                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 2 }}>
                                        Satisfactory gas tightness test?
                                    </Text>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="Yes/No/N/A"
                                        value={gasTightness}
                                        onChangeText={(text) => setGasTightness(text)}
                                    />
                                </View>
                            )}
                            
                            {finalContainerHeight === 290 && (
                                <View style={styles.textInputContainer}>
                                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 2 }}>
                                        Protective equipment bonding satisfactory?
                                    </Text>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="Yes/No"
                                        value={protectiveEquipment}
                                        onChangeText={(text) => setProtectiveEquipment(text)}
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