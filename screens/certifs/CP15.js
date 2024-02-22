import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TextInput, Linking, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios';




export default function CP15({ navigation }) {
    const [activeSlide, setActiveSlide] = useState(0);
    const [siteDetailsContainerHeight, setSiteDetailsContainerHeight] = useState(130);
    const [applianceContainerHeight, setApplianceContainerHeight] = useState(130);
    const [cumbustionChecksContainerHeight, setCumbustionChecksContainerHeight] = useState(130);
    const [additionalChecksContainerHeight, setAdditionalChecksContainerHeight] = useState(130);
    const [generalSafteyContainerHeight, setGeneralSafteyContainerHeight] = useState(130);
    const [ventilationContainerHeight, setVentilationContainerHeight] = useState(130);
    const [remedialContainerHeight, setRemedialContainerHeight] = useState(130);
    const [safetyValvesDetailsContainerHeight, setSafetyValvesDetailsContainerHeight] = useState(130);
    const [gasBoostersContainerHeight, setGasBoostersContainerHeight] = useState(130);
    const [finalDetailsContainerHeight, setFinalDetailsContainerHeight] = useState(130);
   
    const [jobNum, setJobNum] = useState('');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [postCode, setPostCode] = useState('');
    const [siteContact, setSiteContact] = useState('');
    const [contactNo, setContactNo] = useState('');

    const [gasSafeCardSerialNo, setGasSafeCardSerialNo] = useState('');
    const [engineerName, setEngineerName] = useState('');
    const [positionHeld, setPositionHeld] = useState('');
    const [dateOfWork, setDateOfWork] = useState('');

    const [unit1Name, setUnit1Name] = useState('');
    const [no1Location, setNo1Location] = useState('');
    const [no1BoilerType, setNo1BoilerType] = useState('');
    const [no1BoilerModel, setNo1BoilerModel] = useState('');
    const [no1BoilerSerialNo, setNo1BoilerSerialNo] = useState('');
    const [no1BurnerManufacturerModel, setNo1BurnerManufacturerModel] = useState('');
    const [no1FlueType, setNo1FlueType] = useState('');
    const [date1, setDate1] = useState('');
    const [date2, setDate2] = useState('');
    const [maximumOperatingPressureOfBoilerBar, setMaximumOperatingPressureOfBoilerBar] = useState('');
    const [applianceSTU1, setApplianceSTU1] = useState('');


    const [unit2Name, setUnit2Name] = useState('');
    const [no2Location, setNo2Location] = useState('');
    const [no2BoilerType, setNo2BoilerType] = useState('');
    const [no2BoilerModel, setNo2BoilerModel] = useState('');
    const [no2BoilerSerialNo, setNo2BoilerSerialNo] = useState('');
    const [no2BurnerManufacturerModel, setNo2BurnerManufacturerModel] = useState('');
    const [no2FlueType, setNo2FlueType] = useState('');
    const [date3, setDate3] = useState('');
    const [date4, setDate4] = useState('');
    const [maximumOperatingPressureOfBoilerBar2, setMaximumOperatingPressureOfBoilerBar2] = useState('');
    const [applianceSTU2, setApplianceSTU2] = useState('');
    

    const [unit3Name, setUnit3Name] = useState('');
    const [no3Location, setNo3Location] = useState('');
    const [no3BoilerType, setNo3BoilerType] = useState('');
    const [no3BoilerModel, setNo3BoilerModel] = useState('');
    const [no3BoilerSerialNo, setNo3BoilerSerialNo] = useState('');
    const [no3BurnerManufacturerModel, setNo3BurnerManufacturerModel] = useState('');
    const [no3FlueType, setNo3FlueType] = useState('');
    const [date5, setDate5] = useState('');
    const [date6, setDate6] = useState('');
    const [maximumOperatingPressureOfBoilerBar3, setMaximumOperatingPressureOfBoilerBar3] = useState('');
    const [applianceSTU3, setApplianceSTU3] = useState('');
    
    const [lowHeatInputRatingKW, setLowHeatInputRatingKW] = useState('');
    const [lowGasBurnerPressureMbar, setLowGasBurnerPressureMbar] = useState('');
    const [lowGasRateM3hr, setLowGasRateM3hr] = useState('');
    const [lowAirGasRatioControlSetting, setLowAirGasRatioControlSetting] = useState('');
    const [lowAmbientRoomTemperature, setLowAmbientRoomTemperature] = useState('');
    const [lowOFlueGasTemperatureGross, setLowOFlueGasTemperatureGross] = useState('');
    const [lowOFlueGasTemperatureNet, setLowOFlueGasTemperatureNet] = useState('');
    const [lowFlueDraughtPressureMbar, setLowFlueDraughtPressureMbar] = useState('');
    const [lowOxygenO2, setLowOxygenO2] = useState('');
    const [lowCarbonMonoxideCOppm, setLowCarbonMonoxideCOppm] = useState('');
    const [lowCarbonDioxideCO2, setLowCarbonDioxideCO2] = useState('');
    const [lowNOx, setLowNOx] = useState('');
    const [lowExcessAir, setLowExcessAir] = useState('');
    const [lowCOCO2Ratio, setLowCOCO2Ratio] = useState('');
    const [lowGrossEfficiency, setLowGrossEfficiency] = useState('');
    const [lowCOFlueDilutionPPM, setLowCOFlueDilutionPPM] = useState('');
    
    const [highHeatInputRatingKW, setHighHeatInputRatingKW] = useState('');
    const [highGasBurnerPressureMbar, setHighGasBurnerPressureMbar] = useState('');
    const [highGasRateM3hr, setHighGasRateM3hr] = useState('');
    const [highAirGasRatioControlSetting, setHighAirGasRatioControlSetting] = useState('');
    const [highAmbientRoomTemperature, setHighAmbientRoomTemperature] = useState('');
    const [highOFlueGasTemperatureGross, setHighOFlueGasTemperatureGross] = useState('');
    const [highOFlueGasTemperatureNet, setHighOFlueGasTemperatureNet] = useState('');
    const [highFlueDraughtPressureMbar, setHighFlueDraughtPressureMbar] = useState('');
    const [highOxygenO2, setHighOxygenO2] = useState('');
    const [highCarbonMonoxideCOppm, setHighCarbonMonoxideCOppm] = useState('');
    const [highCarbonDioxideCO2, setHighCarbonDioxideCO2] = useState('');
    const [highNOx, setHighNOx] = useState('');
    const [highExcessAir, setHighExcessAir] = useState('');
    const [highCOCO2Ratio, setHighCOCO2Ratio] = useState('');
    const [highGrossEfficiency, setHighGrossEfficiency] = useState('');
    const [highCOFlueDilutionPPM, setHighCOFlueDilutionPPM] = useState('');

    const [lowHeatInputRatingKW2, setLowHeatInputRatingKW2] = useState('');
    const [lowGasBurnerPressureMbar2, setLowGasBurnerPressureMbar2] = useState('');
    const [lowGasRateM3hr2, setLowGasRateM3hr2] = useState('');
    const [lowAirGasRatioControlSetting2, setLowAirGasRatioControlSetting2] = useState('');
    const [lowAmbientRoomTemperature2, setLowAmbientRoomTemperature2] = useState('');
    const [lowOFlueGasTemperatureGross2, setLowOFlueGasTemperatureGross2] = useState('');
    const [lowOFlueGasTemperatureNet2, setLowOFlueGasTemperatureNet2] = useState('');
    const [lowFlueDraughtPressureMbar2, setLowFlueDraughtPressureMbar2] = useState('');
    const [lowOxygenO2_2, setLowOxygenO2_2] = useState('');
    const [lowCarbonMonoxideCOppm_2, setLowCarbonMonoxideCOppm_2] = useState('');
    const [lowCarbonDioxideCO2_2, setLowCarbonDioxideCO2_2] = useState('');
    const [lowNOx_2, setLowNOx_2] = useState('');
    const [lowExcessAir_2, setLowExcessAir_2] = useState('');
    const [lowCOCO2Ratio_2, setLowCOCO2Ratio_2] = useState('');
    const [lowGrossEfficiency_2, setLowGrossEfficiency_2] = useState('');
    const [lowCOFlueDilutionPPM_2, setLowCOFlueDilutionPPM_2] = useState('');

    const [highHeatInputRatingKW2, setHighHeatInputRatingKW2] = useState('');
    const [highGasBurnerPressureMbar2, setHighGasBurnerPressureMbar2] = useState('');
    const [highGasRateM3hr2, setHighGasRateM3hr2] = useState('');
    const [highAirGasRatioControlSetting2, setHighAirGasRatioControlSetting2] = useState('');
    const [highAmbientRoomTemperature2, setHighAmbientRoomTemperature2] = useState('');
    const [highOFlueGasTemperatureGross2, setHighOFlueGasTemperatureGross2] = useState('');
    const [highOFlueGasTemperatureNet2, setHighOFlueGasTemperatureNet2] = useState('');
    const [highFlueDraughtPressureMbar2, setHighFlueDraughtPressureMbar2] = useState('');
    const [highOxygenO2_2, setHighOxygenO2_2] = useState('');
    const [highCarbonMonoxideCOppm_2, setHighCarbonMonoxideCOppm_2] = useState('');
    const [highCarbonDioxideCO2_2, setHighCarbonDioxideCO2_2] = useState('');
    const [highNOx_2, setHighNOx_2] = useState('');
    const [highExcessAir_2, setHighExcessAir_2] = useState('');
    const [highCOCO2Ratio_2, setHighCOCO2Ratio_2] = useState('');
    const [highGrossEfficiency_2, setHighGrossEfficiency_2] = useState('');
    const [highCOFlueDilutionPPM_2, setHighCOFlueDilutionPPM_2] = useState('');

    const [lowHeatInputRatingKW3, setLowHeatInputRatingKW3] = useState('');
    const [lowGasBurnerPressureMbar3, setLowGasBurnerPressureMbar3] = useState('');
    const [lowGasRateM3hr3, setLowGasRateM3hr3] = useState('');
    const [lowAirGasRatioControlSetting3, setLowAirGasRatioControlSetting3] = useState('');
    const [lowAmbientRoomTemperature3, setLowAmbientRoomTemperature3] = useState('');
    const [lowOFlueGasTemperatureGross3, setLowOFlueGasTemperatureGross3] = useState('');
    const [lowOFlueGasTemperatureNet3, setLowOFlueGasTemperatureNet3] = useState('');
    const [lowFlueDraughtPressureMbar3, setLowFlueDraughtPressureMbar3] = useState('');
    const [lowOxygenO2_3, setLowOxygenO2_3] = useState('');
    const [lowCarbonMonoxideCOppm_3, setLowCarbonMonoxideCOppm_3] = useState('');
    const [lowCarbonDioxideCO2_3, setLowCarbonDioxideCO2_3] = useState('');
    const [lowNOx_3, setLowNOx_3] = useState('');
    const [lowExcessAir_3, setLowExcessAir_3] = useState('');
    const [lowCOCO2Ratio_3, setLowCOCO2Ratio_3] = useState('');
    const [lowGrossEfficiency_3, setLowGrossEfficiency_3] = useState('');
    const [lowCOFlueDilutionPPM_3, setLowCOFlueDilutionPPM_3] = useState('');

    const [highHeatInputRatingKW3, setHighHeatInputRatingKW3] = useState('');
    const [highGasBurnerPressureMbar3, setHighGasBurnerPressureMbar3] = useState('');
    const [highGasRateM3hr3, setHighGasRateM3hr3] = useState('');
    const [highAirGasRatioControlSetting3, setHighAirGasRatioControlSetting3] = useState('');
    const [highAmbientRoomTemperature3, setHighAmbientRoomTemperature3] = useState('');
    const [highOFlueGasTemperatureGross3, setHighOFlueGasTemperatureGross3] = useState('');
    const [highOFlueGasTemperatureNet3, setHighOFlueGasTemperatureNet3] = useState('');
    const [highFlueDraughtPressureMbar3, setHighFlueDraughtPressureMbar3] = useState('');
    const [highOxygenO2_3, setHighOxygenO2_3] = useState('');
    const [highCarbonMonoxideCOppm_3, setHighCarbonMonoxideCOppm_3] = useState('');
    const [highCarbonDioxideCO2_3, setHighCarbonDioxideCO2_3] = useState('');
    const [highNOx_3, setHighNOx_3] = useState('');
    const [highExcessAir_3, setHighExcessAir_3] = useState('');
    const [highCOCO2Ratio_3, setHighCOCO2Ratio_3] = useState('');
    const [highGrossEfficiency_3, setHighGrossEfficiency_3] = useState('');
    const [highCOFlueDilutionPPM_3, setHighCOFlueDilutionPPM_3] = useState('');

    const [flueFlowTestSatisfactory, setFlueFlowTestSatisfactory] = useState('');
    const [spillageTestSatisfactory, setSpillageTestSatisfactory] = useState('');
    const [ventilationSatisfactory, setVentilationSatisfactory] = useState('');
    const [airGasPressureSwitchOperatingCorrectly, setAirGasPressureSwitchOperatingCorrectly] = useState('');
    const [flameProvidingSafetyDevicesOperatingCorrectly, setFlameProvidingSafetyDevicesOperatingCorrectly] = useState('');
    const [burnerLockoutTimeSeconds, setBurnerLockoutTimeSeconds] = useState('');
    const [temperatureAndLimitThermostatsOperatingCorrectly, setTemperatureAndLimitThermostatsOperatingCorrectly] = useState('');
    const [applianceServiced, setApplianceServiced] = useState('');
    const [standingPressureGasMbar, setStandingPressureGasMbar] = useState('');
    const [workingGasPressureAllBoilersRunMbar, setWorkingGasPressureAllBoilersRunMbar] = useState('');
    const [gasLineDiagramInPlace, setGasLineDiagramInPlace] = useState('');
    
    const [flueFlowTestSatisfactory2, setFlueFlowTestSatisfactory2] = useState('');
    const [spillageTestSatisfactory2, setSpillageTestSatisfactory2] = useState('');
    const [ventilationSatisfactory2, setVentilationSatisfactory2] = useState('');
    const [airGasPressureSwitch2, setAirGasPressureSwitch2] = useState('');
    const [flameProvidingSafetyDevicesOperatingCorrectly2, setFlameProvidingSafetyDevicesOperatingCorrectly2] = useState('');
    const [burnerLockoutTimeSeconds2, setBurnerLockoutTimeSeconds2] = useState('');
    const [temperatureAndLimitThermostatsOperatingCorrectly2, setTemperatureAndLimitThermostatsOperatingCorrectly2] = useState('');
    const [applianceServiced2, setApplianceServiced2] = useState('');
    const [standingPressureGasMbar2, setStandingPressureGasMbar2] = useState('');
    const [workingGasPressureAllBoilersRunMbar2, setWorkingGasPressureAllBoilersRunMbar2] = useState('');
    const [gasLineDiagramInPlace2, setGasLineDiagramInPlace2] = useState('');
    
    const [flueFlowTestSatisfactory3, setFlueFlowTestSatisfactory3] = useState('');
    const [spillageTestSatisfactory3, setSpillageTestSatisfactory3] = useState('');
    const [ventilationSatisfactory3, setVentilationSatisfactory3] = useState('');
    const [airGasPressureSwitchOperatingCorrectly3, setAirGasPressureSwitchOperatingCorrectly3] = useState('');
    const [flameProvidingSafetyDevicesOperatingCorrectly3, setFlameProvidingSafetyDevicesOperatingCorrectly3] = useState('');
    const [burnerLockoutTimeSeconds3, setBurnerLockoutTimeSeconds3] = useState('');
    const [temperatureAndLimitThermostatsOperatingCorrectly3, setTemperatureAndLimitThermostatsOperatingCorrectly3] = useState('');
    const [applianceServiced3, setApplianceServiced3] = useState('');
    const [standingPressureGasMbar3, setStandingPressureGasMbar3] = useState('');
    const [workingGasPressureAllBoilersRunMbar3, setWorkingGasPressureAllBoilersRunMbar3] = useState('');
    const [gasLineDiagramInPlace3, setGasLineDiagramInPlace3] = useState('');
    
    const [gasBoostersCompressorsOperatingCorrectly, setGasBoostersCompressorsOperatingCorrectly] = useState('');
    const [gasTightnessTest, setGasTightnessTest] = useState('');
    const [gasInstallationPipeworkAdequatelySupported, setGasInstallationPipeworkAdequatelySupported] = useState('');
    const [gasInstallationPipeworkSleevedLabelledPaintedAsNecessary, setGasInstallationPipeworkSleevedLabelledPaintedAsNecessary] = useState('');
    const [flueSystemInstalledInAccordanceWithAppropriateStandards, setFlueSystemInstalledInAccordanceWithAppropriateStandards] = useState('');
    const [flueRouteIncVoidsTerminationSatisfactory, setFlueRouteIncVoidsTerminationSatisfactory] = useState('');
    const [fanFlueInterlockOperatingCorrectly, setFanFlueInterlockOperatingCorrectly] = useState('');
    
    const [ventilationType, setVentilationType] = useState('');
    const [plantRoomCompartmentVentilationLowLevelFreeArea, setPlantRoomCompartmentVentilationLowLevelFreeArea] = useState('');
    const [highLevelFreeArea, setHighLevelFreeArea] = useState('');
    const [mechanicalVentilationFlowRateInlet, setMechanicalVentilationFlowRateInlet] = useState('');
    const [mechanicalVentilationFlowRateExtract, setMechanicalVentilationFlowRateExtract] = useState('');
    const [mechanicalVentilationInterlockOperatingCorrectly, setMechanicalVentilationInterlockOperatingCorrectly] = useState('');
    const [ventilationSati, setVentilationSati] = useState('');
    
    const [remedialDescription, setRemedialDescription] = useState('');

    const [valveDmake1, setValveDmake1] = useState('');
    const [valveDtype1, setValveDtype1] = useState('');
    const [valveDsize1, setValveDsize1] = useState('');
    const [valveDsetting1, setValveDsetting1] = useState('');
    const [valveDdate1, setValveDdate1] = useState('');

    const [valveDmake2, setValveDmake2] = useState('');
    const [valveDtype2, setValveDtype2] = useState('');
    const [valveDsize2, setValveDsize2] = useState('');
    const [valveDsetting2, setValveDsetting2] = useState('');
    const [valveDdate2, setValveDdate2] = useState('');

    const [valveDmake3, setValveDmake3] = useState('');
    const [valveDtype3, setValveDtype3] = useState('');
    const [valveDsize3, setValveDsize3] = useState('');
    const [valveDsetting3, setValveDsetting3] = useState('');
    const [valveDdate3, setValveDdate3] = useState('');


    const [boosterManufacturer1, setBoosterManufacturer1] = useState('');
    const [boosterModel1, setBoosterModel1] = useState('');
    const [boosterSerial1, setBoosterSerial1] = useState('');
    const [boosterDate1, setBoosterDate1] = useState('');
    const [boosterSafe1, setBoosterSafe1] = useState('');
    const [boosterInlet1, setBoosterInlet1] = useState('');
    const [boosterPressure1, setBoosterPressure1] = useState('');
    const [boosterOutlet1, setBoosterOutlet1] = useState('');
    const [boosterCutOff1, setBoosterCutOff1] = useState('');
    const [booster10mbar1, setBooster10mbar1] = useState('');

    const [boosterManufacturer2, setBoosterManufacturer2] = useState('');
    const [boosterModel2, setBoosterModel2] = useState('');
    const [boosterSerial2, setBoosterSerial2] = useState('');
    const [boosterDate2, setBoosterDate2] = useState('');
    const [boosterSafe2, setBoosterSafe2] = useState('');
    const [boosterInlet2, setBoosterInlet2] = useState('');
    const [boosterPressure2, setBoosterPressure2] = useState('');
    const [boosterOutlet2, setBoosterOutlet2] = useState('');
    const [boosterCutOff2, setBoosterCutOff2] = useState('');
    const [booster10mbar2, setBooster10mbar2] = useState('');

    const [boosterManufacturer3, setBoosterManufacturer3] = useState('');
    const [boosterModel3, setBoosterModel3] = useState('');
    const [boosterSerial3, setBoosterSerial3] = useState('');
    const [boosterDate3, setBoosterDate3] = useState('');
    const [boosterSafe3, setBoosterSafe3] = useState('');
    const [boosterInlet3, setBoosterInlet3] = useState('');
    const [boosterPressure3, setBoosterPressure3] = useState('');
    const [boosterOutlet3, setBoosterOutlet3] = useState('');
    const [boosterCutOff3, setBoosterCutOff3] = useState('');
    const [booster10mbar3, setBooster10mbar3] = useState('');

    const [warningAdviceSI, setWarningAdviceSI] = useState('');
    const [warningLabelsAttatched, setWarningLabelsAttatched] = useState('');
    const [respPersonAdSI, setRespPersonAdSI] = useState('');
    const [warningNoticeID, setWarningNoticeID] = useState('');
    


    const navigateBack = () => {
        navigation.navigate('CertifSelection');
    };

    const toggleSiteDetailsContainerHeight = () => {
        setSiteDetailsContainerHeight((prevHeight) => (prevHeight === 130 ? 400 : 130));
    };

    const toggleApplianceContainerHeight = () => {
        setApplianceContainerHeight((prevHeight) => (prevHeight === 130 ? 900 : 130));
    };

    const toggleCumbustionChecksContainerHeight = () => {
        setCumbustionChecksContainerHeight((prevHeight) => (prevHeight === 130 ? 1550 : 130));
    };


    const toggleAdditionalChecksContainerHeight = () => {
        setAdditionalChecksContainerHeight((prevHeight) => (prevHeight === 130 ? 900 : 130));
    };

    const toggleGeneralSafteyContainerHeight = () => {
        setGeneralSafteyContainerHeight((prevHeight) => (prevHeight === 130 ? 900 : 130));
    };

    const toggleVentilationContainerHeight = () => {
        setVentilationContainerHeight((prevHeight) => (prevHeight === 130 ? 1000 : 130));
    };

    const toggleRemedialContainerHeight = () => {
        setRemedialContainerHeight((prevHeight) => (prevHeight === 130 ? 260 : 130));
    };

    const toggleSafetyValvesDetailsContainerHeight = () => {
        setSafetyValvesDetailsContainerHeight((prevHeight) => (prevHeight === 130 ? 1400 : 130));
    };

    const toggleGasBoostersContainerHeight = () => {
        setGasBoostersContainerHeight((prevHeight) => (prevHeight === 130 ? 800 : 130));
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
            unitName : unit1Name,
            setUnitName : setUnit1Name,
            noLocation : no1Location,
            setNoLocation : setNo1Location,
            noBoilerType : no1BoilerType,
            setNoBoilerType: setNo1BoilerType, 
            noBoilerModel: no1BoilerModel, 
            setNoBoilerModel : setNo1BoilerModel, 
            noBoilerSerialNo : no1BoilerSerialNo,
            setNoBoilerSerialNo : setNo1BoilerSerialNo, 
            noBurnerManufacturerModel : no1BurnerManufacturerModel, 
            setNoBurnerManufacturerModel : setNo1BurnerManufacturerModel, 
            noFlueType : no1FlueType, 
            setNo1FlueType : setNo1FlueType, 
            date : date1, 
            setDate : setDate1, 
            datee : date2, 
            setDatee : setDate2, 
            maximumOperatingPressureOfBoilerBarr : maximumOperatingPressureOfBoilerBar, 
            setMaximumOperatingPressureOfBoilerBarr : setMaximumOperatingPressureOfBoilerBar, 
            applianceSTU : applianceSTU1, 
            setApplianceSTU : setApplianceSTU1, 
        },
        {
            title: 'Slide 2',
            unitName : unit2Name,
            setUnitName : setUnit2Name,
            noLocation : no2Location,
            setNoLocation : setNo2Location,
            noBoilerType : no2BoilerType,
            setNoBoilerType: setNo2BoilerType, 
            noBoilerModel: no2BoilerModel, 
            setNoBoilerModel : setNo2BoilerModel, 
            noBoilerSerialNo : no2BoilerSerialNo,
            setNoBoilerSerialNo : setNo2BoilerSerialNo, 
            noBurnerManufacturerModel : no2BurnerManufacturerModel, 
            setNoBurnerManufacturerModel : setNo2BurnerManufacturerModel, 
            noFlueType : no2FlueType, 
            setNo1FlueType : setNo2FlueType, 
            date : date3, 
            setDate : setDate3, 
            datee : date4, 
            setDatee : setDate4, 
            maximumOperatingPressureOfBoilerBarr : maximumOperatingPressureOfBoilerBar2, 
            setMaximumOperatingPressureOfBoilerBarr : setMaximumOperatingPressureOfBoilerBar2, 
            applianceSTU : applianceSTU2, 
            setApplianceSTU : setApplianceSTU2, 
        },
        {
            title: 'Slide 3',
            unitName : unit3Name,
            setUnitName : setUnit3Name,
            noLocation : no3Location,
            setNoLocation : setNo3Location,
            noBoilerType : no3BoilerType,
            setNoBoilerType: setNo3BoilerType, 
            noBoilerModel: no3BoilerModel, 
            setNoBoilerModel : setNo3BoilerModel, 
            noBoilerSerialNo : no3BoilerSerialNo,
            setNoBoilerSerialNo : setNo3BoilerSerialNo, 
            noBurnerManufacturerModel : no3BurnerManufacturerModel, 
            setNoBurnerManufacturerModel : setNo3BurnerManufacturerModel, 
            noFlueType : no3FlueType, 
            setNo1FlueType : setNo3FlueType, 
            date : date5, 
            setDate : setDate5, 
            datee : date6, 
            setDatee : setDate6, 
            maximumOperatingPressureOfBoilerBarr : maximumOperatingPressureOfBoilerBar3, 
            setMaximumOperatingPressureOfBoilerBarr : setMaximumOperatingPressureOfBoilerBar3, 
            applianceSTU : applianceSTU3, 
            setApplianceSTU : setApplianceSTU3, 
        },
    ];

    const carouselCombustion = [
        {
            title: 'Slide 1',
            lowHeatInputRating: lowHeatInputRatingKW,
            setLowHeatInputRating: setLowHeatInputRatingKW,
            lowGasBurnerPressure: lowGasBurnerPressureMbar,
            setLowGasBurnerPressure: setLowGasBurnerPressureMbar,
            lowGasRate: lowGasRateM3hr,
            setLowGasRateM: setLowGasRateM3hr,
            lowAirGasRatioControlS: lowAirGasRatioControlSetting,
            setLowAirGasRatioControlS: setLowAirGasRatioControlSetting,
            lowAmbientRoomTemp: lowAmbientRoomTemperature,
            setLowAmbientRoomTemp: setLowAmbientRoomTemperature,
            lowOFlueGasTemperatureG: lowOFlueGasTemperatureGross,
            setLowOFlueGasTemperatureG: setLowOFlueGasTemperatureGross,
            lowOFlueGasTemperatureN: lowOFlueGasTemperatureNet,
            setLowOFlueGasTemperatureN: setLowOFlueGasTemperatureNet,
            lowFlueDraughtPressureM: lowFlueDraughtPressureMbar,
            setLowFlueDraughtPressureM: setLowFlueDraughtPressureMbar,
            lowOxygen: lowOxygenO2,
            setLowOxygen: setLowOxygenO2,
            lowCarbonMonoCOppm: lowCarbonMonoxideCOppm,
            setLowCarbonMonoCOppm: setLowCarbonMonoxideCOppm,
            lowCarbonDioxide: lowCarbonDioxideCO2,
            setLowCarbonDioxide: setLowCarbonDioxideCO2,
            lowNO: lowNOx,
            setLowNO: setLowNOx,
            lowExcessA: lowExcessAir,
            setLowExcessA: setLowExcessAir,
            lowCOCO2Rat: lowCOCO2Ratio,
            setLowCOCO2Rat: setLowCOCO2Ratio,
            lowGrossEffic: lowGrossEfficiency,
            setLowGrossEffic: setLowGrossEfficiency,
            lowCOFlueDilution: lowCOFlueDilutionPPM,
            setLowCOFlueDilution: setLowCOFlueDilutionPPM,
    
            highHeatInputRating: highHeatInputRatingKW,
            setHighHeatInputRating: setHighHeatInputRatingKW,
            highGasBurnerPressure: highGasBurnerPressureMbar,
            setHighGasBurnerPressure: setHighGasBurnerPressureMbar,
            highGasRate: highGasRateM3hr,
            setHighGasRateM: setHighGasRateM3hr,
            highAirGasRatioControlS: highAirGasRatioControlSetting,
            setHighAirGasRatioControlS: setHighAirGasRatioControlSetting,
            highAmbientRoomTemp: highAmbientRoomTemperature,
            setHighAmbientRoomTemp: setHighAmbientRoomTemperature,
            highOFlueGasTemperatureG: highOFlueGasTemperatureGross,
            setHighOFlueGasTemperatureG: setHighOFlueGasTemperatureGross,
            highOFlueGasTemperatureN: highOFlueGasTemperatureNet,
            setHighOFlueGasTemperatureN: setHighOFlueGasTemperatureNet,
            highFlueDraughtPressureM: highFlueDraughtPressureMbar,
            setHighFlueDraughtPressureM: setHighFlueDraughtPressureMbar,
            highOxygen: highOxygenO2,
            setHighOxygen: setHighOxygenO2,
            highCarbonMonoCOppm: highCarbonMonoxideCOppm,
            setHighCarbonMonoCOppm: setHighCarbonMonoxideCOppm,
            highCarbonDioxide: highCarbonDioxideCO2,
            setHighCarbonDioxide: setHighCarbonDioxideCO2,
            highNO: highNOx,
            setHighNO: setHighNOx,
            highExcessA: highExcessAir,
            setHighExcessA: setHighExcessAir,
            highCOCO2Rat: highCOCO2Ratio,
            setHighCOCO2Rat: setHighCOCO2Ratio,
            highGrossEffic: highGrossEfficiency,
            setHighGrossEffic: setHighGrossEfficiency,
            highCOFlueDilution: highCOFlueDilutionPPM,
            setHighCOFlueDilution: setHighCOFlueDilutionPPM,
        },
        {
            title: 'Slide 2',
            lowHeatInputRating: lowHeatInputRatingKW2,
            setLowHeatInputRating: setLowHeatInputRatingKW2,
            lowGasBurnerPressure: lowGasBurnerPressureMbar2,
            setLowGasBurnerPressure: setLowGasBurnerPressureMbar2,
            lowGasRate: lowGasRateM3hr2,
            setLowGasRateM: setLowGasRateM3hr2,
            lowAirGasRatioControlS: lowAirGasRatioControlSetting2,
            setLowAirGasRatioControlS: setLowAirGasRatioControlSetting2,
            lowAmbientRoomTemp: lowAmbientRoomTemperature2,
            setLowAmbientRoomTemp: setLowAmbientRoomTemperature2,
            lowOFlueGasTemperatureG: lowOFlueGasTemperatureGross2,
            setLowOFlueGasTemperatureG: setLowOFlueGasTemperatureGross2,
            lowOFlueGasTemperatureN: lowOFlueGasTemperatureNet2,
            setLowOFlueGasTemperatureN: setLowOFlueGasTemperatureNet2,
            lowFlueDraughtPressureM: lowFlueDraughtPressureMbar2,
            setLowFlueDraughtPressureM: setLowFlueDraughtPressureMbar2,
            lowOxygen: lowOxygenO2_2,
            setLowOxygen: setLowOxygenO2_2,
            lowCarbonMonoCOppm: lowCarbonMonoxideCOppm_2,
            setLowCarbonMonoCOppm: setLowCarbonMonoxideCOppm_2,
            lowCarbonDioxide: lowCarbonDioxideCO2_2,
            setLowCarbonDioxide: setLowCarbonDioxideCO2_2,
            lowNO: lowNOx_2,
            setLowNO: setLowNOx_2,
            lowExcessA: lowExcessAir_2,
            setLowExcessA: setLowExcessAir_2,
            lowCOCO2Rat: lowCOCO2Ratio_2,
            setLowCOCO2Rat: setLowCOCO2Ratio_2,
            lowGrossEffic: lowGrossEfficiency_2,
            setLowGrossEffic: setLowGrossEfficiency_2,
            lowCOFlueDilution: lowCOFlueDilutionPPM_2,
            setLowCOFlueDilution: setLowCOFlueDilutionPPM_2,
    
            highHeatInputRating: highHeatInputRatingKW2,
            setHighHeatInputRating: setHighHeatInputRatingKW2,
            highGasBurnerPressure: highGasBurnerPressureMbar2,
            setHighGasBurnerPressure: setHighGasBurnerPressureMbar2,
            highGasRate: highGasRateM3hr2,
            setHighGasRateM: setHighGasRateM3hr2,
            highAirGasRatioControlS: highAirGasRatioControlSetting2,
            setHighAirGasRatioControlS: setHighAirGasRatioControlSetting2,
            highAmbientRoomTemp: highAmbientRoomTemperature2,
            setHighAmbientRoomTemp: setHighAmbientRoomTemperature2,
            highOFlueGasTemperatureG: highOFlueGasTemperatureGross2,
            setHighOFlueGasTemperatureG: setHighOFlueGasTemperatureGross2,
            highOFlueGasTemperatureN: highOFlueGasTemperatureNet2,
            setHighOFlueGasTemperatureN: setHighOFlueGasTemperatureNet2,
            highFlueDraughtPressureM: highFlueDraughtPressureMbar2,
            setHighFlueDraughtPressureM: setHighFlueDraughtPressureMbar2,
            highOxygen: highOxygenO2_2,
            setHighOxygen: setHighOxygenO2_2,
            highCarbonMonoCOppm: highCarbonMonoxideCOppm_2,
            setHighCarbonMonoCOppm: setHighCarbonMonoxideCOppm_2,
            highCarbonDioxide: highCarbonDioxideCO2_2,
            setHighCarbonDioxide: setHighCarbonDioxideCO2_2,
            highNO: highNOx_2,
            setHighNO: setHighNOx_2,
            highExcessA: highExcessAir_2,
            setHighExcessA: setHighExcessAir_2,
            highCOCO2Rat: highCOCO2Ratio_2,
            setHighCOCO2Rat: setHighCOCO2Ratio_2,
            highGrossEffic: highGrossEfficiency_2,
            setHighGrossEffic: setHighGrossEfficiency_2,
            highCOFlueDilution: highCOFlueDilutionPPM_2,
            setHighCOFlueDilution: setHighCOFlueDilutionPPM_2,
        },
        {
            title: 'Slide 3',
            lowHeatInputRating: lowHeatInputRatingKW3,
            setLowHeatInputRating: setLowHeatInputRatingKW3,
            lowGasBurnerPressure: lowGasBurnerPressureMbar3,
            setLowGasBurnerPressure: setLowGasBurnerPressureMbar3,
            lowGasRate: lowGasRateM3hr3,
            setLowGasRateM: setLowGasRateM3hr3,
            lowAirGasRatioControlS: lowAirGasRatioControlSetting3,
            setLowAirGasRatioControlS: setLowAirGasRatioControlSetting3,
            lowAmbientRoomTemp: lowAmbientRoomTemperature3,
            setLowAmbientRoomTemp: setLowAmbientRoomTemperature3,
            lowOFlueGasTemperatureG: lowOFlueGasTemperatureGross3,
            setLowOFlueGasTemperatureG: setLowOFlueGasTemperatureGross3,
            lowOFlueGasTemperatureN: lowOFlueGasTemperatureNet3,
            setLowOFlueGasTemperatureN: setLowOFlueGasTemperatureNet3,
            lowFlueDraughtPressureM: lowFlueDraughtPressureMbar3,
            setLowFlueDraughtPressureM: setLowFlueDraughtPressureMbar3,
            lowOxygen: lowOxygenO2_3,
            setLowOxygen: setLowOxygenO2_3,
            lowCarbonMonoCOppm: lowCarbonMonoxideCOppm_3,
            setLowCarbonMonoCOppm: setLowCarbonMonoxideCOppm_3,
            lowCarbonDioxide: lowCarbonDioxideCO2_3,
            setLowCarbonDioxide: setLowCarbonDioxideCO2_3,
            lowNO: lowNOx_3,
            setLowNO: setLowNOx_3,
            lowExcessA: lowExcessAir_3,
            setLowExcessA: setLowExcessAir_3,
            lowCOCO2Rat: lowCOCO2Ratio_3,
            setLowCOCO2Rat: setLowCOCO2Ratio_3,
            lowGrossEffic: lowGrossEfficiency_3,
            setLowGrossEffic: setLowGrossEfficiency_3,
            lowCOFlueDilution: lowCOFlueDilutionPPM_3,
            setLowCOFlueDilution: setLowCOFlueDilutionPPM_3,
    
            highHeatInputRating: highHeatInputRatingKW3,
            setHighHeatInputRating: setHighHeatInputRatingKW3,
            highGasBurnerPressure: highGasBurnerPressureMbar3,
            setHighGasBurnerPressure: setHighGasBurnerPressureMbar3,
            highGasRate: highGasRateM3hr3,
            setHighGasRateM: setHighGasRateM3hr3,
            highAirGasRatioControlS: highAirGasRatioControlSetting3,
            setHighAirGasRatioControlS: setHighAirGasRatioControlSetting3,
            highAmbientRoomTemp: highAmbientRoomTemperature3,
            setHighAmbientRoomTemp: setHighAmbientRoomTemperature3,
            highOFlueGasTemperatureG: highOFlueGasTemperatureGross3,
            setHighOFlueGasTemperatureG: setHighOFlueGasTemperatureGross3,
            highOFlueGasTemperatureN: highOFlueGasTemperatureNet3,
            setHighOFlueGasTemperatureN: setHighOFlueGasTemperatureNet3,
            highFlueDraughtPressureM: highFlueDraughtPressureMbar3,
            setHighFlueDraughtPressureM: setHighFlueDraughtPressureMbar3,
            highOxygen: highOxygenO2_3,
            setHighOxygen: setHighOxygenO2_3,
            highCarbonMonoCOppm: highCarbonMonoxideCOppm_3,
            setHighCarbonMonoCOppm: setHighCarbonMonoxideCOppm_3,
            highCarbonDioxide: highCarbonDioxideCO2_3,
            setHighCarbonDioxide: setHighCarbonDioxideCO2_3,
            highNO: highNOx_3,
            setHighNO: setHighNOx_3,
            highExcessA: highExcessAir_3,
            setHighExcessA: setHighExcessAir_3,
            highCOCO2Rat: highCOCO2Ratio_3,
            setHighCOCO2Rat: setHighCOCO2Ratio_3,
            highGrossEffic: highGrossEfficiency_3,
            setHighGrossEffic: setHighGrossEfficiency_3,
            highCOFlueDilution: highCOFlueDilutionPPM_3,
            setHighCOFlueDilution: setHighCOFlueDilutionPPM_3,
        },
    ];

    const carouselSafetyChecks = [
        {
            title: 'Slide 1',
            flueFlowTestSatisfactory: flueFlowTestSatisfactory,
            setFlueFlowTestSatisfactory: setFlueFlowTestSatisfactory,
            spillageTestSatisfactory: spillageTestSatisfactory,
            setSpillageTestSatisfactory: setSpillageTestSatisfactory,
            ventilationSatisfactory: ventilationSatisfactory,
            setVentilationSatisfactory: setVentilationSatisfactory,
            airGasPressureSwitchOperatingCorrectly: airGasPressureSwitchOperatingCorrectly,
            setAirGasPressureSwitchOperatingCorrectly: setAirGasPressureSwitchOperatingCorrectly,
            flameProvidingSafetyDevicesOperatingCorrectly: flameProvidingSafetyDevicesOperatingCorrectly,
            setFlameProvidingSafetyDevicesOperatingCorrectly: setFlameProvidingSafetyDevicesOperatingCorrectly,
            burnerLockoutTimeSeconds: burnerLockoutTimeSeconds,
            setBurnerLockoutTimeSeconds: setBurnerLockoutTimeSeconds,
            temperatureAndLimitThermostatsOperatingCorrectly: temperatureAndLimitThermostatsOperatingCorrectly,
            setTemperatureAndLimitThermostatsOperatingCorrectly: setTemperatureAndLimitThermostatsOperatingCorrectly,
            applianceServiced: applianceServiced,
            setApplianceServiced: setApplianceServiced,
            standingPressureGasMbar: standingPressureGasMbar,
            setStandingPressureGasMbar: setStandingPressureGasMbar,
            workingGasPressureAllBoilersRunMbar: workingGasPressureAllBoilersRunMbar,
            setWorkingGasPressureAllBoilersRunMbar: setWorkingGasPressureAllBoilersRunMbar,
            gasLineDiagramInPlace: gasLineDiagramInPlace,
            setGasLineDiagramInPlace: setGasLineDiagramInPlace,
        },
        {
            title: 'Slide 2',
            flueFlowTestSatisfactory: flueFlowTestSatisfactory2,
            setFlueFlowTestSatisfactory: setFlueFlowTestSatisfactory2,
            spillageTestSatisfactory: spillageTestSatisfactory2,
            setSpillageTestSatisfactory: setSpillageTestSatisfactory2,
            ventilationSatisfactory: ventilationSatisfactory2,
            setVentilationSatisfactory: setVentilationSatisfactory2,
            airGasPressureSwitchOperatingCorrectly: airGasPressureSwitch2,
            setAirGasPressureSwitchOperatingCorrectly: setAirGasPressureSwitch2,
            flameProvidingSafetyDevicesOperatingCorrectly: flameProvidingSafetyDevicesOperatingCorrectly2,
            setFlameProvidingSafetyDevicesOperatingCorrectly: setFlameProvidingSafetyDevicesOperatingCorrectly2,
            burnerLockoutTimeSeconds: burnerLockoutTimeSeconds2,
            setBurnerLockoutTimeSeconds: setBurnerLockoutTimeSeconds2,
            temperatureAndLimitThermostatsOperatingCorrectly: temperatureAndLimitThermostatsOperatingCorrectly2,
            setTemperatureAndLimitThermostatsOperatingCorrectly: setTemperatureAndLimitThermostatsOperatingCorrectly2,
            applianceServiced: applianceServiced2,
            setApplianceServiced: setApplianceServiced2,
            standingPressureGasMbar: standingPressureGasMbar2,
            setStandingPressureGasMbar: setStandingPressureGasMbar2,
            workingGasPressureAllBoilersRunMbar: workingGasPressureAllBoilersRunMbar2,
            setWorkingGasPressureAllBoilersRunMbar: setWorkingGasPressureAllBoilersRunMbar2,
            gasLineDiagramInPlace: gasLineDiagramInPlace2,
            setGasLineDiagramInPlace: setGasLineDiagramInPlace2,
        },
        {
            title: 'Slide 3',
            flueFlowTestSatisfactory: flueFlowTestSatisfactory3,
            setFlueFlowTestSatisfactory: setFlueFlowTestSatisfactory3,
            spillageTestSatisfactory: spillageTestSatisfactory3,
            setSpillageTestSatisfactory: setSpillageTestSatisfactory3,
            ventilationSatisfactory: ventilationSatisfactory3,
            setVentilationSatisfactory: setVentilationSatisfactory3,
            airGasPressureSwitchOperatingCorrectly: airGasPressureSwitchOperatingCorrectly3,
            setAirGasPressureSwitchOperatingCorrectly: setAirGasPressureSwitchOperatingCorrectly3,
            flameProvidingSafetyDevicesOperatingCorrectly: flameProvidingSafetyDevicesOperatingCorrectly3,
            setFlameProvidingSafetyDevicesOperatingCorrectly: setFlameProvidingSafetyDevicesOperatingCorrectly3,
            burnerLockoutTimeSeconds: burnerLockoutTimeSeconds3,
            setBurnerLockoutTimeSeconds: setBurnerLockoutTimeSeconds3,
            temperatureAndLimitThermostatsOperatingCorrectly: temperatureAndLimitThermostatsOperatingCorrectly3,
            setTemperatureAndLimitThermostatsOperatingCorrectly: setTemperatureAndLimitThermostatsOperatingCorrectly3,
            applianceServiced: applianceServiced3,
            setApplianceServiced: setApplianceServiced3,
            standingPressureGasMbar: standingPressureGasMbar3,
            setStandingPressureGasMbar: setStandingPressureGasMbar3,
            workingGasPressureAllBoilersRunMbar: workingGasPressureAllBoilersRunMbar3,
            setWorkingGasPressureAllBoilersRunMbar: setWorkingGasPressureAllBoilersRunMbar3,
            gasLineDiagramInPlace: gasLineDiagramInPlace3,
            setGasLineDiagramInPlace: setGasLineDiagramInPlace3,
        },
    ];

    const carouselValve = [
        {
            title: 'Slide 1',
            valveMake: valveDmake1,
            setValveMake: setValveDmake1,
            valveType: valveDtype1,
            setValveType: setValveDtype1,
            valveSize: valveDsize1,
            setValveSize: setValveDsize1,
            valveSetting: valveDsetting1,
            setValveSetting: setValveDsetting1,
            valveDate: valveDdate1,
            setValveDate: setValveDdate1,
        },
        {
            title: 'Slide 2',
            valveMake: valveDmake2,
            setValveMake: setValveDmake2,
            valveType: valveDtype2,
            setValveType: setValveDtype2,
            valveSize: valveDsize2,
            setValveSize: setValveDsize2,
            valveSetting: valveDsetting2,
            setValveSetting: setValveDsetting2,
            valveDate: valveDdate2,
            setValveDate: setValveDdate2,
        },
        {
            title: 'Slide 3',
            valveMake: valveDmake3,
            setValveMake: setValveDmake3,
            valveType: valveDtype3,
            setValveType: setValveDtype3,
            valveSize: valveDsize3,
            setValveSize: setValveDsize3,
            valveSetting: valveDsetting3,
            setValveSetting: setValveDsetting3,
            valveDate: valveDdate3,
            setValveDate: setValveDdate3,
        },
    ];

    const carouselBooster = [
        {
            title: 'Slide 1',
            boosterManufacturer: boosterManufacturer1,
            setBoosterManufacturer: setBoosterManufacturer1,
            boosterModel: boosterModel1,
            setBoosterModel: setBoosterModel1,
            boosterSerial: boosterSerial1,
            setBoosterSerial: setBoosterSerial1,
            boosterDate: boosterDate1,
            setBoosterDate: setBoosterDate1,
            boosterSafe: boosterSafe1,
            setBoosterSafe: setBoosterSafe1,
            boosterInlet: boosterInlet1,
            setBoosterInlet: setBoosterInlet1,
            boosterPressure: boosterPressure1,
            setBoosterPressure: setBoosterPressure1,
            boosterOutlet: boosterOutlet1,
            setBoosterOutlet: setBoosterOutlet1,
            boosterCutOff: boosterCutOff1,
            setBoosterCutOff: setBoosterCutOff1,
            booster10mbar: booster10mbar1,
            setBooster10mbar: setBooster10mbar1,
        },
        {
            title: 'Slide 2',
            boosterManufacturer: boosterManufacturer2,
            setBoosterManufacturer: setBoosterManufacturer2,
            boosterModel: boosterModel2,
            setBoosterModel: setBoosterModel2,
            boosterSerial: boosterSerial2,
            setBoosterSerial: setBoosterSerial2,
            boosterDate: boosterDate2,
            setBoosterDate: setBoosterDate2,
            boosterSafe: boosterSafe2,
            setBoosterSafe: setBoosterSafe2,
            boosterInlet: boosterInlet2,
            setBoosterInlet: setBoosterInlet2,
            boosterPressure: boosterPressure2,
            setBoosterPressure: setBoosterPressure2,
            boosterOutlet: boosterOutlet2,
            setBoosterOutlet: setBoosterOutlet2,
            boosterCutOff: boosterCutOff2,
            setBoosterCutOff: setBoosterCutOff2,
            booster10mbar: booster10mbar2,
            setBooster10mbar: setBooster10mbar2,
        },
        {
            title: 'Slide 3',
            boosterManufacturer: boosterManufacturer3,
            setBoosterManufacturer: setBoosterManufacturer3,
            boosterModel: boosterModel3,
            setBoosterModel: setBoosterModel3,
            boosterSerial: boosterSerial3,
            setBoosterSerial: setBoosterSerial3,
            boosterDate: boosterDate3,
            setBoosterDate: setBoosterDate3,
            boosterSafe: boosterSafe3,
            setBoosterSafe: setBoosterSafe3,
            boosterInlet: boosterInlet3,
            setBoosterInlet: setBoosterInlet3,
            boosterPressure: boosterPressure3,
            setBoosterPressure: setBoosterPressure3,
            boosterOutlet: boosterOutlet3,
            setBoosterOutlet: setBoosterOutlet3,
            boosterCutOff: boosterCutOff3,
            setBoosterCutOff: setBoosterCutOff3,
            booster10mbar: booster10mbar3,
            setBooster10mbar: setBooster10mbar3,
        },
    ];

    
    

    const renderItem = ({ item }) => (
        <KeyboardAvoidingView
    behavior={Platform.OS === 'ios' ? 'padding' : null}
    style={styles.container}
    >
        <View style={{ paddingBottom: 20, flexDirection: 'column', marginBottom: 10,}}>
            <View>
                <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 2 }}>Enter Unit Name:</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder="Unit Name..."
                    value={item.unitName}
                    onChangeText={(text) => item.setUnitName(text)}
                />
            </View>
            <View>
                <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 20 }}>Appliance Location:</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder="Enter Location Of Appliance..."
                    value={item.noLocation}
                    onChangeText={(text) => item.setNoLocation(text)}
                />
            </View>
            <View>
                <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 20 }}>Appliance Type:</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder="Enter Type Of Appliance..."
                    value={item.noBoilerType}
                    onChangeText={(text) => item.setNoBoilerType(text)}
                />
            </View>
            <View>
                <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 20 }}>Appliance Model:</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder="Enter Appliance Model..."
                    value={item.noBoilerModel}
                    onChangeText={(text) => item.setNoBoilerModel(text)}
                />
            </View>
            <View>
                <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 20 }}>Unit Serial Number:</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder="Enter Serial Number"
                    value={item.noBoilerSerialNo}
                    onChangeText={(text) => item.setNoBoilerSerialNo(text)}
                />
            </View>
            <View>
                <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 20 }}>Burner manufacturer Model/Serial:</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder="(if different)"
                    value={item.noBurnerManufacturerModel}
                    onChangeText={(text) => item.setNoBurnerManufacturerModel(text)}
                />
            </View>
            <View>
                <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 20 }}>Flue type::</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder="..."
                    value={item.noFlueType}
                    onChangeText={(text) => item.setNo1FlueType(text)}
                />
            </View>
            <View>
                <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 20 }}>Date of Manufacture: Appliance /Burner:</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder="Enter date..."
                    value={item.date}
                    onChangeText={(text) => item.setDate(text)}
                />
            </View>
            <View>
                <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 20 }}>Date of Manufacture: Appliance /Burner:</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder="Enter date..."
                    value={item.datee}
                    onChangeText={(text) => item.setDatee(text)}
                />
            </View>
            <View>
                <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 20 }}>Maximum Operating Pressure:</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder="(Bar)"
                    value={item.maximumOperatingPressureOfBoilerBarr}
                    onChangeText={(text) => item.setMaximumOperatingPressureOfBoilerBarr(text)}
                />
            </View>
            <View>
                <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 20 }}>Is appliance safe to use?</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder="(Yes/No)"
                    value={item.applianceSTU}
                    onChangeText={(text) => item.setApplianceSTU(text)}
                />
            </View>
        </View>
        </KeyboardAvoidingView>
    );

    const renderItem2 = ({ item }) => (
        
        <View style={{ paddingBottom: 20, flexDirection: 'column', marginBottom: 10,}}>
            <View>
                <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 2 }}>Heat input rating (kW):</Text>
                <View style={styles.combusTextInput}>
                <TextInput
                    style={styles.textInput}
                    placeholder="Low"
                    value={item.lowHeatInputRating}
                    onChangeText={(text) => item.setLowHeatInputRating(text)}
                />
                </View>
                <View style={styles.combusTextInput}>
                <TextInput
                    style={styles.textInput}
                    placeholder="High"
                    value={item.highHeatInputRating}
                    onChangeText={(text) => item.setHighHeatInputRating(text)}
                />
                </View>
            </View>
            <View>
                <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 2 }}>Gas burner pressure (mbar):</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder="Low"
                    value={item.lowGasBurnerPressure}
                    onChangeText={(text) => item.setLowGasBurnerPressure(text)}
                />
                <TextInput
                    style={styles.textInput}
                    placeholder="High"
                    value={item.highGasBurnerPressure}
                    onChangeText={(text) => item.setHighGasBurnerPressure(text)}
                />
            </View>
            <View>
                <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 2 }}>Gas rate (m3/hr):</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder="Low"
                    value={item.lowGasRate}
                    onChangeText={(text) => item.setLowGasRateM(text)}
                />
                <TextInput
                    style={styles.textInput}
                    placeholder="High"
                    value={item.highGasRate}
                    onChangeText={(text) => item.setHighGasRateM(text)}
                />
            </View>
            <View>
                <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 2 }}>Air/gas ratio control setting:</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder="Low"
                    value={item.lowAirGasRatioControlS}
                    onChangeText={(text) => item.setLowAirGasRatioControlS(text)}
                />
                <TextInput
                    style={styles.textInput}
                    placeholder="High"
                    value={item.highAirGasRatioControlS}
                    onChangeText={(text) => item.setHighAirGasRatioControlS(text)}
                />
            </View>
            <View>
                <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 2 }}>Ambient (room) temperature (oC):</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder="Low"
                    value={item.lowAmbientRoomTemp}
                    onChangeText={(text) => item.setLowAmbientRoomTemp(text)}
                />
                <TextInput
                    style={styles.textInput}
                    placeholder="High"
                    value={item.highAmbientRoomTemp}
                    onChangeText={(text) => item.setHighAmbientRoomTemp(text)}
                />
            </View>
            <View>
                <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 2 }}>Flue Gas temperature gross (C):</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder="Low"
                    value={item.lowOFlueGasTemperatureG}
                    onChangeText={(text) => item.setLowOFlueGasTemperatureG(text)}
                />
                <TextInput
                    style={styles.textInput}
                    placeholder="High"
                    value={item.highOFlueGasTemperatureG}
                    onChangeText={(text) => item.setHighOFlueGasTemperatureG(text)}
                />
            </View>
            <View>
                <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 2 }}>Flue Gas temperature net (C):</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder="Low"
                    value={item.lowOFlueGasTemperatureN}
                    onChangeText={(text) => item.setLowOFlueGasTemperatureN(text)}
                />
                <TextInput
                    style={styles.textInput}
                    placeholder="High"
                    value={item.highOFlueGasTemperatureN}
                    onChangeText={(text) => item.setHighOFlueGasTemperatureN(text)}
                />
            </View>
            <View>
                <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 2 }}>Flue draught pressure (mbar):</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder="Low"
                    value={item.lowFlueDraughtPressureM}
                    onChangeText={(text) => item.setLowFlueDraughtPressureM(text)}
                />
                <TextInput
                    style={styles.textInput}
                    placeholder="High"
                    value={item.highFlueDraughtPressureM}
                    onChangeText={(text) => item.setHighFlueDraughtPressureM(text)}
                />
            </View>
            <View>
                <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 2 }}>Oxygen (O2) %:</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder="Low"
                    value={item.lowOxygen}
                    onChangeText={(text) => item.setLowOxygen(text)}
                />
                <TextInput
                    style={styles.textInput}
                    placeholder="High"
                    value={item.highOxygen}
                    onChangeText={(text) => item.setHighOxygen(text)}
                />
            </View>
            <View>
                <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 2 }}>Carbon monoxide (CO) ppm:</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder="Low"
                    value={item.lowCarbonMonoCOppm}
                    onChangeText={(text) => item.setLowCarbonMonoCOppm(text)}
                />
                <TextInput
                    style={styles.textInput}
                    placeholder="High"
                    value={item.highCarbonMonoCOppm}
                    onChangeText={(text) => item.setHighCarbonMonoCOppm(text)}
                />
            </View>
            <View>
                <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 2 }}>Carbon dioxide (CO2) %:</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder="Low"
                    value={item.lowCarbonDioxide}
                    onChangeText={(text) => item.setLowCarbonDioxide(text)}
                />
                <TextInput
                    style={styles.textInput}
                    placeholder="High"
                    value={item.highCarbonDioxide}
                    onChangeText={(text) => item.setHighCarbonDioxide(text)}
                />
            </View>
            <View>
                <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 2 }}>NOx%:</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder="Low"
                    value={item.lowNO}
                    onChangeText={(text) => item.setLowNO(text)}
                />
                <TextInput
                    style={styles.textInput}
                    placeholder="High"
                    value={item.highNO}
                    onChangeText={(text) => item.setHighNO(text)}
                />
            </View>
            <View>
                <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 2 }}>Excess air %:</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder="Low"
                    value={item.lowExcessA}
                    onChangeText={(text) => item.setLowExcessA(text)}
                />
                <TextInput
                    style={styles.textInput}
                    placeholder="High"
                    value={item.highExcessA}
                    onChangeText={(text) => item.setHighExcessA(text)}
                />
            </View>
            <View>
                <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 2 }}>CO/CO2- Ratio:</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder="Low"
                    value={item.lowCOCO2Rat}
                    onChangeText={(text) => item.setLowCOCO2Rat(text)}
                />
                <TextInput
                    style={styles.textInput}
                    placeholder="High"
                    value={item.highCOCO2Rat}
                    onChangeText={(text) => item.setHighCOCO2Rat(text)}
                />
            </View>
            <View>
                <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 2 }}>Gross efficiency %:</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder="Low"
                    value={item.lowGrossEffic}
                    onChangeText={(text) => item.setLowGrossEffic(text)}
                />
                <TextInput
                    style={styles.textInput}
                    placeholder="High"
                    value={item.highGrossEffic}
                    onChangeText={(text) => item.setHighGrossEffic(text)}
                />
            </View>
            <View>
                <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 2 }}>CO flue dilution ppm:</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder="Low"
                    value={item.lowCOFlueDilution}
                    onChangeText={(text) => item.setLowCOFlueDilution(text)}
                />
                <TextInput
                    style={styles.textInput}
                    placeholder="High"
                    value={item.highCOFlueDilution}
                    onChangeText={(text) => item.setHighCOFlueDilution(text)}
                />
            </View>
        </View>
        
    );

    const renderItem3 = ({ item }) => (
        
            <View style={{ paddingBottom: 20, flexDirection: 'column', marginBottom: 10 }}>
                <View>
                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 2 }}>Flue Flow Test Satisfactory:</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder="YES/NO/NA"
                        value={item.flueFlowTestSatisfactory}
                        onChangeText={(text) => item.setFlueFlowTestSatisfactory(text)}
                    />
                </View>
                <View>
                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 20 }}>Spillage Test Satisfactory:</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder="YES/NO/NA"
                        value={item.spillageTestSatisfactory}
                        onChangeText={(text) => item.setSpillageTestSatisfactory(text)}
                    />
                </View>
                <View>
                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 20 }}>Is the gas installation electrically cross bonded?:</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder="YES/NO/NA"
                        value={item.ventilationSatisfactory}
                        onChangeText={(text) => item.setVentilationSatisfactory(text)}
                    />
                </View>
                <View>
                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 20 }}>Air Gas Pressure Switch Operating Correctly:</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder="YES/NO/NA"
                        value={item.airGasPressureSwitchOperatingCorrectly}
                        onChangeText={(text) => item.setAirGasPressureSwitchOperatingCorrectly(text)}
                    />
                </View>
                <View>
                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 20 }}>Flame proving/safety devices operating correctly:</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder="YES/NO/NA"
                        value={item.flameProvidingSafetyDevicesOperatingCorrectly}
                        onChangeText={(text) => item.setFlameProvidingSafetyDevicesOperatingCorrectly(text)}
                    />
                </View>
                <View>
                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 20 }}>Burner Lockout Time (seconds):</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder="YES/NO/NA"
                        value={item.burnerLockoutTimeSeconds}
                        onChangeText={(text) => item.setBurnerLockoutTimeSeconds(text)}
                    />
                </View>
                <View>
                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 20 }}>Temperature and Limit Thermostats Operating Correctly:</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder="YES/NO/NA"
                        value={item.temperatureAndLimitThermostatsOperatingCorrectly}
                        onChangeText={(text) => item.setTemperatureAndLimitThermostatsOperatingCorrectly(text)}
                    />
                </View>
                <View>
                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 20 }}>Appliance Serviced:</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder="YES/NO/NA"
                        value={item.applianceServiced}
                        onChangeText={(text) => item.setApplianceServiced(text)}
                    />
                </View>
                <View>
                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 20 }}>Standing Pressure Gas (mbar):</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder="YES/NO/NA"
                        value={item.standingPressureGasMbar}
                        onChangeText={(text) => item.setStandingPressureGasMbar(text)}
                    />
                </View>
                <View>
                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 20 }}>Working Gas Pressure - All Boilers Run (mbar):</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder="YES/NO/NA"
                        value={item.workingGasPressureAllBoilersRunMbar}
                        onChangeText={(text) => item.setWorkingGasPressureAllBoilersRunMbar(text)}
                    />
                </View>
                <View>
                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 20 }}>Gas Line Diagram in Place:</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder="YES/NO/NA"
                        value={item.gasLineDiagramInPlace}
                        onChangeText={(text) => item.setGasLineDiagramInPlace(text)}
                    />
                </View>
            </View>
    );

    const renderValve = ({ item }) => (
       
            <View style={{ paddingBottom: 20, flexDirection: 'column', marginBottom: 10 }}>
                <View>
                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 2 }}>Valve Make:</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Enter valve make..."
                        value={item.valveMake}
                        onChangeText={(text) => item.setValveMake(text)}
                    />
                </View>
                <View>
                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 20 }}>Valve Type:</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Enter valve type..."
                        value={item.valveType}
                        onChangeText={(text) => item.setValveType(text)}
                    />
                </View>
                <View>
                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 20 }}>Valve Size:</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Enter valve size..."
                        value={item.valveSize}
                        onChangeText={(text) => item.setValveSize(text)}
                    />
                </View>
                <View>
                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 20 }}>Valve Setting:</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Enter valve setting..."
                        value={item.valveSetting}
                        onChangeText={(text) => item.setValveSetting(text)}
                    />
                </View>
                <View>
                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 20 }}>Valve Date:</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Enter valve date..."
                        value={item.valveDate}
                        onChangeText={(text) => item.setValveDate(text)}
                    />
                </View>
            </View>
    );

    const renderBoostr = ({ item }) => (
        
            <View style={{ paddingBottom: 20, flexDirection: 'column', marginBottom: 10 }}>
                <View>
                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 2 }}>Booster Manufacturer:</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Enter booster manufacturer..."
                        value={item.boosterManufacturer}
                        onChangeText={(text) => item.setBoosterManufacturer(text)}
                    />
                </View>
                <View>
                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 20 }}>Booster Model:</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Enter booster model..."
                        value={item.boosterModel}
                        onChangeText={(text) => item.setBoosterModel(text)}
                    />
                </View>
                <View>
                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 20 }}>Booster Serial Number:</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Enter booster serial number..."
                        value={item.boosterSerial}
                        onChangeText={(text) => item.setBoosterSerial(text)}
                    />
                </View>
                <View>
                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 20 }}>Booster Date:</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Enter booster date..."
                        value={item.boosterDate}
                        onChangeText={(text) => item.setBoosterDate(text)}
                    />
                </View>
                <View>
                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 20 }}>Is Booster Safe to Use?</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder="(Yes/No)"
                        value={item.boosterSafe}
                        onChangeText={(text) => item.setBoosterSafe(text)}
                    />
                </View>
                <View>
                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 20 }}>Booster Inlet:</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Enter booster inlet..."
                        value={item.boosterInlet}
                        onChangeText={(text) => item.setBoosterInlet(text)}
                    />
                </View>
                <View>
                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 20 }}>Booster Pressure:</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Enter booster pressure..."
                        value={item.boosterPressure}
                        onChangeText={(text) => item.setBoosterPressure(text)}
                    />
                </View>
                <View>
                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 20 }}>Booster Outlet:</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Enter booster outlet..."
                        value={item.boosterOutlet}
                        onChangeText={(text) => item.setBoosterOutlet(text)}
                    />
                </View>
                <View>
                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 20 }}>Booster Cut Off:</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Enter booster cut off..."
                        value={item.boosterCutOff}
                        onChangeText={(text) => item.setBoosterCutOff(text)}
                    />
                </View>
                <View>
                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 20 }}>Booster 10mbar:</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Enter booster 10mbar..."
                        value={item.booster10mbar}
                        onChangeText={(text) => item.setBooster10mbar(text)}
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
        const backendURL = 'http://51.21.134.104/update_cp15';


        const dataToSend = {
            jobNum,
            name,
            address,
            postCode,
            siteContact,
            contactNo,
            unit1Name,
            no1Location,
            no1BoilerType,
            no1BoilerModel,
            no1BoilerSerialNo,
            no1BurnerManufacturerModel,
            no1FlueType,
            date1,
            date2,
            maximumOperatingPressureOfBoilerBar,
            applianceSTU1,
            unit2Name,
            no2Location,
            no2BoilerType,
            no2BoilerModel,
            no2BoilerSerialNo,
            no2BurnerManufacturerModel,
            no2FlueType,
            date3,
            date4,
            maximumOperatingPressureOfBoilerBar2,
            applianceSTU2,
            unit3Name,
            no3Location,
            no3BoilerType,
            no3BoilerModel,
            no3BoilerSerialNo,
            no3BurnerManufacturerModel,
            no3FlueType,
            date5,
            date6,
            maximumOperatingPressureOfBoilerBar3,
            applianceSTU3,
            lowHeatInputRatingKW,
            lowGasBurnerPressureMbar,
            lowGasRateM3hr,
            lowAirGasRatioControlSetting,
            lowAmbientRoomTemperature,
            lowOFlueGasTemperatureGross,
            lowOFlueGasTemperatureNet,
            lowFlueDraughtPressureMbar,
            lowOxygenO2,
            lowCarbonMonoxideCOppm,
            lowCarbonDioxideCO2,
            lowNOx,
            lowExcessAir,
            lowCOCO2Ratio,
            lowGrossEfficiency,
            lowCOFlueDilutionPPM,
            highHeatInputRatingKW,
            highGasBurnerPressureMbar,
            highGasRateM3hr,
            highAirGasRatioControlSetting,
            highAmbientRoomTemperature,
            highOFlueGasTemperatureGross,
            highOFlueGasTemperatureNet,
            highFlueDraughtPressureMbar,
            highOxygenO2,
            highCarbonMonoxideCOppm,
            highCarbonDioxideCO2,
            highNOx,
            highExcessAir,
            highCOCO2Ratio,
            highGrossEfficiency,
            highCOFlueDilutionPPM,
            lowHeatInputRatingKW2,
            lowGasBurnerPressureMbar2,
            lowGasRateM3hr2,
            lowAirGasRatioControlSetting2,
            lowAmbientRoomTemperature2,
            lowOFlueGasTemperatureGross2,
            lowOFlueGasTemperatureNet2,
            lowFlueDraughtPressureMbar2,
            lowOxygenO2_2,
            lowCarbonMonoxideCOppm_2,
            lowCarbonDioxideCO2_2,
            lowNOx_2,
            lowExcessAir_2,
            lowCOCO2Ratio_2,
            lowGrossEfficiency_2,
            lowCOFlueDilutionPPM_2,
            highHeatInputRatingKW2,
            highGasBurnerPressureMbar2,
            highGasRateM3hr2,
            highAirGasRatioControlSetting2,
            highAmbientRoomTemperature2,
            highOFlueGasTemperatureGross2,
            highOFlueGasTemperatureNet2,
            highFlueDraughtPressureMbar2,
            highOxygenO2_2,
            highCarbonMonoxideCOppm_2,
            highCarbonDioxideCO2_2,
            highNOx_2,
            highExcessAir_2,
            highCOCO2Ratio_2,
            highGrossEfficiency_2,
            highCOFlueDilutionPPM_2,
            lowHeatInputRatingKW3,
            lowGasBurnerPressureMbar3,
            lowGasRateM3hr3,
            lowAirGasRatioControlSetting3,
            lowAmbientRoomTemperature3,
            lowOFlueGasTemperatureGross3,
            lowOFlueGasTemperatureNet3,
            lowFlueDraughtPressureMbar3,
            lowOxygenO2_3,
            lowCarbonMonoxideCOppm_3,
            lowCarbonDioxideCO2_3,
            lowNOx_3,
            lowExcessAir_3,
            lowCOCO2Ratio_3,
            lowGrossEfficiency_3,
            lowCOFlueDilutionPPM_3,
            highHeatInputRatingKW3,
            highGasBurnerPressureMbar3,
            highGasRateM3hr3,
            highAirGasRatioControlSetting3,
            highAmbientRoomTemperature3,
            highOFlueGasTemperatureGross3,
            highOFlueGasTemperatureNet3,
            highFlueDraughtPressureMbar3,
            highOxygenO2_3,
            highCarbonMonoxideCOppm_3,
            highCarbonDioxideCO2_3,
            highNOx_3,
            highExcessAir_3,
            highCOCO2Ratio_3,
            highGrossEfficiency_3,
            highCOFlueDilutionPPM_3,
            flueFlowTestSatisfactory,
            spillageTestSatisfactory,
            ventilationSatisfactory,
            airGasPressureSwitchOperatingCorrectly,
            flameProvidingSafetyDevicesOperatingCorrectly,
            burnerLockoutTimeSeconds,
            temperatureAndLimitThermostatsOperatingCorrectly,
            applianceServiced,
            standingPressureGasMbar,
            workingGasPressureAllBoilersRunMbar,
            gasLineDiagramInPlace,
            flueFlowTestSatisfactory2,
            spillageTestSatisfactory2,
            ventilationSatisfactory2,
            airGasPressureSwitch2,
            flameProvidingSafetyDevicesOperatingCorrectly2,
            burnerLockoutTimeSeconds2,
            temperatureAndLimitThermostatsOperatingCorrectly2,
            applianceServiced2,
            standingPressureGasMbar2,
            workingGasPressureAllBoilersRunMbar2,
            gasLineDiagramInPlace2,
            flueFlowTestSatisfactory3,
            spillageTestSatisfactory3,
            ventilationSatisfactory3,
            remedialDescription,
            airGasPressureSwitchOperatingCorrectly3,
            flameProvidingSafetyDevicesOperatingCorrectly3,
            burnerLockoutTimeSeconds3,
            temperatureAndLimitThermostatsOperatingCorrectly3,
            applianceServiced3,
            standingPressureGasMbar3,
            workingGasPressureAllBoilersRunMbar3,
            gasLineDiagramInPlace3,
            gasBoostersCompressorsOperatingCorrectly,
            gasTightnessTest,
            gasInstallationPipeworkAdequatelySupported,
            gasInstallationPipeworkSleevedLabelledPaintedAsNecessary,
            flueSystemInstalledInAccordanceWithAppropriateStandards,
            flueRouteIncVoidsTerminationSatisfactory,
            fanFlueInterlockOperatingCorrectly,
            ventilationType,
            plantRoomCompartmentVentilationLowLevelFreeArea,
            highLevelFreeArea,
            mechanicalVentilationFlowRateInlet,
            mechanicalVentilationFlowRateExtract,
            mechanicalVentilationInterlockOperatingCorrectly,
            ventilationSati,
            valveDmake1,
            valveDtype1,
            valveDsize1,
            valveDsetting1,
            valveDdate1,
            valveDmake2,
            valveDtype2,
            valveDsize2,
            valveDsetting2,
            valveDdate2,
            valveDmake3,
            valveDtype3,
            valveDsize3,
            valveDsetting3,
            valveDdate3,
            boosterManufacturer1,
            boosterModel1,
            boosterSerial1,
            boosterDate1,
            boosterSafe1,
            boosterInlet1,
            boosterPressure1,
            boosterOutlet1,
            boosterCutOff1,
            booster10mbar1,
            boosterManufacturer2,
            boosterModel2,
            boosterSerial2,
            boosterDate2,
            boosterSafe2,
            boosterInlet2,
            boosterPressure2,
            boosterOutlet2,
            boosterCutOff2,
            booster10mbar2,
            boosterManufacturer3,
            boosterModel3,
            boosterSerial3,
            boosterDate3,
            boosterSafe3,
            boosterInlet3,
            boosterPressure3,
            boosterOutlet3,
            boosterCutOff3,
            booster10mbar3,
            warningAdviceSI,
            warningLabelsAttatched,
            respPersonAdSI,
            warningNoticeID,
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
      const response = await axios.get('http://51.21.134.104:5000/get_cp15_pdf_link');
  
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
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : null}
                style={styles.container}
            >
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
                                        value={name}
                                        onChangeText={(text) => setName(text)}
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
                                        value={address}
                                        onChangeText={(text) => setAddress(text)}
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
                                        value={postCode}
                                        onChangeText={(text) => setPostCode(text)}
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
                                        value={contactNo}
                                        onChangeText={(text) => setContactNo(text)}
                                    />
                                </View>
                            )}
                        </View>
                    </TouchableOpacity>

                    {/* APPLIANCE DETAILS CHECKLIST CONTAINER with Carousel */}
                    <TouchableOpacity onPress={toggleApplianceContainerHeight}>
                        <View style={[cardContainerStyle(applianceContainerHeight), { backgroundColor: 'white', height: applianceContainerHeight }]}>
                            {applianceContainerHeight === 130 && (
                                <View style={[styles.checkListIcon]}>
                                    <MaterialCommunityIcons style={styles.tickIconGlow} name="check" size={28} color="rgba(23, 214, 119, 0.8)" />
                                </View>
                            )}

                            {applianceContainerHeight === 130 && (
                                <View style={{ flex: 1 }}>
                                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 2 }}>
                                        Appliance Details
                                    </Text>
                                </View>
                            )}

                            {applianceContainerHeight === 900 && (
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

                    {/* COMBUSTION DETAILS CHECKLIST CONTAINER with Carousel */}
                    <TouchableOpacity onPress={toggleCumbustionChecksContainerHeight}>
                        <View style={[cardContainerStyle(cumbustionChecksContainerHeight), { backgroundColor: 'white', height: cumbustionChecksContainerHeight }]}>
                            {cumbustionChecksContainerHeight === 130 && (
                                <View style={[styles.checkListIcon]}>
                                    <MaterialCommunityIcons style={styles.tickIconGlow} name="check" size={28} color="rgba(23, 214, 119, 0.8)" />
                                </View>
                            )}

                            {cumbustionChecksContainerHeight === 130 && (
                                <View style={{ flex: 1 }}>
                                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 2 }}>
                                        Combustion Details
                                    </Text>
                                </View>
                            )}

                            {cumbustionChecksContainerHeight === 1550 && (
                                <View style={{ flex: 1 }}>
                                    <Carousel
                                        data={carouselCombustion}
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
                                        containerStyle={{ marginTop: -10, marginLeft: -90}}
                                        dotStyle={{
                                            width: 10,
                                            height: 10,
                                            borderRadius: 5,
                                            backgroundColor: '#7dd3fc', 
                                        }}
                                        inactiveDotStyle={{
                                            
                                        }}
                                        inactiveDotOpacity={0.6}
                                        inactiveDotScale={0.8}
                                    />
                                </View>
                            )}
                        </View>
                    </TouchableOpacity>

                    {/* ADDITIONAL CHECKS DETAILS CHECKLIST CONTAINER with Carousel */}
                    <TouchableOpacity onPress={toggleAdditionalChecksContainerHeight}>
                        <View style={[cardContainerStyle(additionalChecksContainerHeight), { backgroundColor: 'white', height: additionalChecksContainerHeight }]}>
                            {additionalChecksContainerHeight === 130 && (
                                <View style={[styles.checkListIcon]}>
                                    <MaterialCommunityIcons style={styles.tickIconGlow} name="check" size={28} color="rgba(23, 214, 119, 0.8)" />
                                </View>
                            )}

                            {additionalChecksContainerHeight === 130 && (
                                <View style={{ flex: 1 }}>
                                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 2 }}>
                                        Additional Checks
                                    </Text>
                                </View>
                            )}

                            {additionalChecksContainerHeight === 900 && (
                                <View style={{ flex: 1 }}>
                                    <Carousel
                                        data={carouselSafetyChecks}
                                        renderItem={renderItem3}
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


                    {/* GENERAL SAFETY CHECKLIST CONTAINER*/}
                    <TouchableOpacity onPress={toggleGeneralSafteyContainerHeight}>
                        <View style={[cardContainerStyle(generalSafteyContainerHeight), { backgroundColor: 'white', height: generalSafteyContainerHeight }]}>
                            {generalSafteyContainerHeight === 130 && (
                                <View style={[styles.checkListIcon]}>
                                    <MaterialCommunityIcons style={iconGlow} name="check" size={28} color="rgba(23, 214, 119, 0.8)" />
                                </View>
                            )}

                            {generalSafteyContainerHeight === 130 && (
                                <View style={{ flex: 1 }}>
                                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 2 }}>
                                        General Safety Checks
                                    </Text>
                                </View>
                            )}

                            {generalSafteyContainerHeight === 900 && (
                                <View style={styles.textInputContainer}>
                                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 2 }}>
                                    Gas booster(s)/compressors(s) operating correctly?r:
                                    </Text>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="YS/NO/NA"
                                        value={gasBoostersCompressorsOperatingCorrectly}
                                        onChangeText={(text) => setGasBoostersCompressorsOperatingCorrectly(text)}
                                    />
                                </View>
                            )}

                            {generalSafteyContainerHeight === 900 && (
                                <View style={styles.textInputContainer}>
                                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 2 }}>
                                    Gas installation tightness test carried out? 
                                    </Text>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="Local/GP16"
                                        value={gasTightnessTest}
                                        onChangeText={(text) => setGasTightnessTest(text)}
                                    />
                                </View>
                            )}

                            {generalSafteyContainerHeight === 900 && (
                                <View style={styles.textInputContainer}>
                                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 2 }}>
                                    Gas installation pipework adequately supported?
                                    </Text>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="YES/NO/NA"
                                        value={gasInstallationPipeworkAdequatelySupported}
                                        onChangeText={(text) => setGasInstallationPipeworkAdequatelySupported(text)}
                                    />
                                </View>
                            )}

                            {generalSafteyContainerHeight === 900 && (
                                <View style={styles.textInputContainer}>
                                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 2 }}>
                                    Gas installation pipework sleeved/labelled/painted as necessary?
                                    </Text>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="YES/NO/NA"
                                        value={gasInstallationPipeworkSleevedLabelledPaintedAsNecessary}
                                        onChangeText={(text) => setGasInstallationPipeworkSleevedLabelledPaintedAsNecessary(text)}
                                    />
                                </View>
                            )}

                            {generalSafteyContainerHeight === 900 && (
                                <View style={styles.textInputContainer}>
                                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 2 }}>
                                    Flue system installed in accordance with appropriate standards?
                                    </Text>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="YES/NO/NA"
                                        value={flueSystemInstalledInAccordanceWithAppropriateStandards}
                                        onChangeText={(text) => setFlueSystemInstalledInAccordanceWithAppropriateStandards(text)}
                                    />
                                </View>
                            )}
                            {generalSafteyContainerHeight === 900 && (
                                <View style={styles.textInputContainer}>
                                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 2 }}>
                                    Flue route/ inc voids & termination satisfactory?
                                    </Text>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="YES/NO/NA"
                                        value={flueRouteIncVoidsTerminationSatisfactory}
                                        onChangeText={(text) => setFlueRouteIncVoidsTerminationSatisfactory(text)}
                                    />
                                </View>
                            )}
                            {generalSafteyContainerHeight === 900 && (
                                <View style={styles.textInputContainer}>
                                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 2 }}>
                                    Fan-flue interlock operating correctly?
                                    </Text>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="YES/NO/NA"
                                        value={fanFlueInterlockOperatingCorrectly}
                                        onChangeText={(text) => setFanFlueInterlockOperatingCorrectly(text)}
                                    />
                                </View>
                            )}
                        </View>
                    </TouchableOpacity>

                    {/* VENTILATION TYPE CHECKLIST CONTAINER*/}
                    <TouchableOpacity onPress={toggleVentilationContainerHeight}>
                        <View style={[cardContainerStyle(ventilationContainerHeight), { backgroundColor: 'white', height: ventilationContainerHeight }]}>
                            {ventilationContainerHeight === 130 && (
                                <View style={[styles.checkListIcon]}>
                                    <MaterialCommunityIcons style={iconGlow} name="check" size={28} color="rgba(23, 214, 119, 0.8)" />
                                </View>
                            )}

                            {ventilationContainerHeight === 130 && (
                                <View style={{ flex: 1 }}>
                                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 2 }}>
                                        Ventilation Details
                                    </Text>
                                </View>
                            )}

                            {ventilationContainerHeight === 1000 && (
                                <View style={styles.textInputContainer}>
                                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 2 }}>
                                    Ventilation Type:
                                    </Text>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="Enter Ventilation Type"
                                        value={ventilationType}
                                        onChangeText={(text) => setVentilationType(text)}
                                    />
                                </View>
                            )}

                            {ventilationContainerHeight === 1000 && (
                                <View style={styles.textInputContainer}>
                                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 2 }}>
                                    Plant room/compartment ventilation:
                                    </Text>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="Low-level free area (cm2)"
                                        value={plantRoomCompartmentVentilationLowLevelFreeArea}
                                        onChangeText={(text) => setPlantRoomCompartmentVentilationLowLevelFreeArea(text)}
                                    />
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="High-level free area (cm2)"
                                        value={highLevelFreeArea}
                                        onChangeText={(text) => setHighLevelFreeArea(text)}
                                    />
                                </View>
                            )}

                            {ventilationContainerHeight === 1000 && (
                                <View style={styles.textInputContainer}>
                                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 2 }}>
                                    Mechanical ventilation flow rate:
                                    </Text>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="inlet (m3/s)"
                                        value={mechanicalVentilationFlowRateInlet}
                                        onChangeText={(text) => setMechanicalVentilationFlowRateInlet(text)}
                                    />
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="extract (m3/s)"
                                        value={mechanicalVentilationFlowRateExtract}
                                        onChangeText={(text) => setMechanicalVentilationFlowRateExtract(text)}
                                    />
                                </View>
                            )}

                            {ventilationContainerHeight === 1000 && (
                                <View style={styles.textInputContainer}>
                                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 2 }}>
                                    Mechanical ventilation interlock operating correctly?
                                    </Text>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="YES/NO/NA"
                                        value={mechanicalVentilationInterlockOperatingCorrectly}
                                        onChangeText={(text) => setMechanicalVentilationInterlockOperatingCorrectly(text)}
                                    />
                                </View>
                            )}

                            {ventilationContainerHeight === 1000 && (
                                <View style={styles.textInputContainer}>
                                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 2 }}>
                                    Is ventilation satisfactory?
                                    </Text>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="YES/NO/NA"
                                        value={ventilationSati}
                                        onChangeText={(text) => setVentilationSati(text)}
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

                    {/* VALVE CHECKS DETAILS CHECKLIST CONTAINER with Carousel */}
                    <TouchableOpacity onPress={toggleSafetyValvesDetailsContainerHeight}>
                        <View style={[cardContainerStyle(safetyValvesDetailsContainerHeight), { backgroundColor: 'white', height: safetyValvesDetailsContainerHeight }]}>
                            {safetyValvesDetailsContainerHeight === 130 && (
                                <View style={[styles.checkListIcon]}>
                                    <MaterialCommunityIcons style={styles.tickIconGlow} name="check" size={28} color="rgba(23, 214, 119, 0.8)" />
                                </View>
                            )}

                            {safetyValvesDetailsContainerHeight === 130 && (
                                <View style={{ flex: 1 }}>
                                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 2 }}>
                                        Safety Valve Details
                                    </Text>
                                </View>
                            )}

                            {safetyValvesDetailsContainerHeight === 1400 && (
                                <View style={{ flex: 1 }}>
                                    <Carousel
                                        data={carouselValve}
                                        renderItem={renderValve}
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

                    {/* BOOSTER CHECKS DETAILS CHECKLIST CONTAINER with Carousel */}
                    <TouchableOpacity onPress={toggleGasBoostersContainerHeight}>
                        <View style={[cardContainerStyle(gasBoostersContainerHeight), { backgroundColor: 'white', height: gasBoostersContainerHeight }]}>
                            {gasBoostersContainerHeight === 130 && (
                                <View style={[styles.checkListIcon]}>
                                    <MaterialCommunityIcons style={styles.tickIconGlow} name="check" size={28} color="rgba(23, 214, 119, 0.8)" />
                                </View>
                            )}

                            {gasBoostersContainerHeight === 130 && (
                                <View style={{ flex: 1 }}>
                                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 2 }}>
                                        Gas Booster Details
                                    </Text>
                                </View>
                            )}

                            {gasBoostersContainerHeight === 800 && (
                                <View style={{ flex: 1 }}>
                                    <Carousel
                                        data={carouselBooster}
                                        renderItem={renderBoostr}
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

                    {/* FINAL CHECKLIST CONTAINER*/}
                    <TouchableOpacity onPress={toggleFinalDetailsContainerHeight}>
                        <View style={[cardContainerStyle(finalDetailsContainerHeight), { backgroundColor: 'white', height: finalDetailsContainerHeight }]}>
                            {finalDetailsContainerHeight === 130 && (
                                <View style={[styles.checkListIcon]}>
                                    <MaterialCommunityIcons style={iconGlow} name="check" size={28} color="rgba(23, 214, 119, 0.8)" />
                                </View>
                            )}

                            {finalDetailsContainerHeight === 130 && (
                                <View style={{ flex: 1 }}>
                                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 2 }}>
                                        Final Checks
                                    </Text>
                                </View>
                            )}

                            {finalDetailsContainerHeight === 400 && (
                                <View style={styles.textInputContainer}>
                                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 2 }}>
                                    Has a warning/advice notice been raised?
                                    </Text>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="YES/NO/NA"
                                        value={warningAdviceSI}
                                        onChangeText={(text) => setWarningAdviceSI(text)}
                                    />
                                </View>
                            )}

                            {finalDetailsContainerHeight === 400 && (
                                <View style={styles.textInputContainer}>
                                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 2 }}>
                                    Has a warning label(s) been attached?
                                    </Text>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="YES/NO/NA"
                                        value={warningLabelsAttatched}
                                        onChangeText={(text) => setWarningLabelsAttatched(text)}
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
                                        placeholder="YES/NO/NA"
                                        value={respPersonAdSI}
                                        onChangeText={(text) => setRespPersonAdSI(text)}
                                    />
                                </View>
                            )}

                            {finalDetailsContainerHeight === 400 && (
                                <View style={styles.textInputContainer}>
                                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 2 }}>
                                    Warning notice ID Number(if applicable) 
                                    </Text>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="YES/NO/NA"
                                        value={warningNoticeID}
                                        onChangeText={(text) => setWarningNoticeID(text)}
                                    />
                                </View>
                            )}

                            {finalDetailsContainerHeight === 400 && (
                                <View style={styles.textInputContainer}>
                                    <Text style={{ fontSize: wp(3), fontWeight: '600', color: 'black', marginTop: 2 }}>
                                        Site Contact:
                                    </Text>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="YES/NO/NA"
                                        value={siteContact}
                                        onChangeText={(text) => setSiteContact(text)}
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
                </KeyboardAvoidingView>
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
    combusTextInput: {

        marginTop: 10,
        padding: 8,

        
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