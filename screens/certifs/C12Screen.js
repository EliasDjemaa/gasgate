import { useState, useEffect, useRef, Linking  } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, PanResponder, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import SignatureStrip from './SignatureStrip';

const C12Screen = () => {
  const [jobNumber, setJobNumber] = useState('');
  const [gasSafeLicense, setGasSafeLicense] = useState('');
  const [printName, setPrintName] = useState('');
  const [positionHeld, setPositionHeld] = useState('');

  const [jobAddress, setJobAddress] = useState('');
  const [postcode, setPostcode] = useState('');
  const [telNo, setTelNo] = useState('');

  const [landlordName, setLandlordName] = useState('');
  const [landlordAddress, setLandlordAddress] = useState('');
  const [landlordPostcode, setLandlordPostcode] = useState('');
  const [landlordTelNo, setLandlordTelNo] = useState('');
  const [appliancesTested, setAppliancesTested] = useState('');

  const [applianceDetails, setApplianceDetails] = useState([
    { location: '', applianceType: '', make: '', model: '', isLandlordAppliance: '', isLandlordInspected: '', flueType: '' },
    { location: '', applianceType: '', make: '', model: '', isLandlordAppliance: '', isLandlordInspected: '', flueType: '' },
    { location: '', applianceType: '', make: '', model: '', isLandlordAppliance: '', isLandlordInspected: '', flueType: '' },
    { location: '', applianceType: '', make: '', model: '', isLandlordAppliance: '', isLandlordInspected: '', flueType: '' }, 
  ]);

// New state variable for the Inspection Details table
const [inspectionDetailsTable, setInspectionDetailsTable] = useState(Array.from({ length: 4 }, () => Array(12).fill('')));

  const [inspectionDetails, setInspectionDetails] = useState('');
  const [warningSerialNo, setWarningSerialNo] = useState('');

  const [remedialAction, setRemedialAction] = useState('');

  const [gasInstallationChecked, setGasInstallationChecked] = useState(false);
  const [ecvAccessibleChecked, setEcvAccessibleChecked] = useState(false);
  const [protectiveEquipmentChecked, setProtectiveEquipmentChecked] = useState(false);

  // State variables for signature data
  const [signature, setSignature] = useState([]);
  const [isSigning, setIsSigning] = useState(false);

  const [pdfFileURL, setPdfFileURL] = useState(null);

  // Function to handle signature clear
  const clearSignature = () => {
    setSignature([]);
  };

  // Function to handle back end sending of data
  const sendDataToBackend = async () => {
    try {
      const backendURL = 'http://192.168.0.40:5000/update_pdf';
  

            // Extract individual appliance details
      const applianceDetailsData = applianceDetails.map((appliance, index) => ({
        location: appliance.location,
        applianceType: appliance.applianceType,
        make: appliance.make,
        model: appliance.model,
        isLandlordAppliance: appliance.isLandlordAppliance,
        isLandlordInspected: appliance.isLandlordInspected,
        flueType: appliance.flueType,
      }));

      // Extract individual inspection details
      const inspectionDetailsData = inspectionDetailsTable.map(row => row.map(cell => cell));

      const dataToSend = {
        jobNumber,
        gasSafeLicense,
        printName,
        positionHeld,
        jobAddress,
        postcode,
        telNo,
        landlordName,
        landlordAddress,
        landlordPostcode,
        landlordTelNo,
        appliancesTested,
        applianceDetails: applianceDetailsData,
        inspectionDetailsTable: inspectionDetailsData,
        inspectionDetails,
        warningSerialNo,
        remedialAction,
        gasInstallationChecked,
        ecvAccessibleChecked,
        protectiveEquipmentChecked,
  
        // Convert signature array to a string or any other suitable format
        signature: JSON.stringify(signature),
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


  return (
    <ScrollView style={styles.container}>
      {/* Card 1 */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Job Details</Text>
        <TextInput
          style={styles.input}
          placeholder="Job Number"
          value={jobNumber}
          onChangeText={setJobNumber}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Gas Safe License No"
          value={gasSafeLicense}
          onChangeText={setGasSafeLicense}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Print Name"
          value={printName}
          onChangeText={setPrintName}
        />
        <TextInput
          style={styles.input}
          placeholder="Position Held"
          value={positionHeld}
          onChangeText={setPositionHeld}
        />
      </View>

      {/* Card 2 */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Job Address</Text>
        <TextInput
          style={styles.input}
          placeholder="Job Address"
          value={jobAddress}
          onChangeText={setJobAddress}
        />
        <TextInput
          style={styles.input}
          placeholder="Postcode"
          value={postcode}
          onChangeText={setPostcode}
        />
        <TextInput
          style={styles.input}
          placeholder="Tel No"
          value={telNo}
          onChangeText={setTelNo}
          keyboardType="phone-pad"
        />
      </View>

      {/* Card 3 */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Landlord Details</Text>
        <TextInput
          style={styles.input}
          placeholder="Landlord Name"
          value={landlordName}
          onChangeText={setLandlordName}
        />
        <TextInput
          style={styles.input}
          placeholder="Landlord Address"
          value={landlordAddress}
          onChangeText={setLandlordAddress}
        />
        <TextInput
          style={styles.input}
          placeholder="Landlord Postcode"
          value={landlordPostcode}
          onChangeText={setLandlordPostcode}
        />
        <TextInput
          style={styles.input}
          placeholder="Landlord Tel No"
          value={landlordTelNo}
          onChangeText={setLandlordTelNo}
          keyboardType="phone-pad"
        />
        <TextInput
          style={styles.input}
          placeholder="Number of Appliances Tested"
          value={appliancesTested}
          onChangeText={setAppliancesTested}
          keyboardType="numeric"
        />
      </View>

      {/* Card 4 (Table) */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Appliance Details</Text>
        {/* Table Header */}
        <View style={styles.tableRow}>
          <Text style={styles.tableHeader}>Location</Text>
          <Text style={styles.tableHeader}>Appliance Type</Text>
          <Text style={styles.tableHeader}>Make</Text>
          <Text style={styles.tableHeader}>Model</Text>
          <Text style={styles.tableHeader}>Landlord's Appliance</Text>
          <Text style={styles.tableHeader}>Landlord's Inspected</Text>
          <Text style={styles.tableHeader}>Flue Type</Text>
        </View>

        {/* Table Rows */}
        {applianceDetails.map((row, index) => (
          <View key={index} style={styles.tableRow}>
            <TextInput
              style={styles.tableInput}
              value={row.location}
              placeholder="Location"
              onChangeText={(text) => setApplianceDetails((prev) => updateRow(prev, index, { location: text }))}
            />
            <TextInput
              style={styles.tableInput}
              value={row.applianceType}
              placeholder="Appliance Type"
              onChangeText={(text) => setApplianceDetails((prev) => updateRow(prev, index, { applianceType: text }))}
            />
            <TextInput
              style={styles.tableInput}
              value={row.make}
              placeholder="Make"
              onChangeText={(text) => setApplianceDetails((prev) => updateRow(prev, index, { make: text }))}
            />
            <TextInput
              style={styles.tableInput}
              value={row.model}
              placeholder="Model"
              onChangeText={(text) => setApplianceDetails((prev) => updateRow(prev, index, { model: text }))}
            />
            <TextInput
              style={styles.tableInput}
              value={row.isLandlordAppliance}
              placeholder="Yes/No/N/A"
              onChangeText={(text) => setApplianceDetails((prev) => updateRow(prev, index, { isLandlordAppliance: text }))}
            />
            <TextInput
              style={styles.tableInput}
              value={row.isLandlordInspected}
              placeholder="Yes/No"
              onChangeText={(text) => setApplianceDetails((prev) => updateRow(prev, index, { isLandlordInspected: text }))}
            />
            <TextInput
              style={styles.tableInput}
              value={row.flueType}
              placeholder="OF/RS/FL"
              onChangeText={(text) => setApplianceDetails((prev) => updateRow(prev, index, { flueType: text }))}
            />
          </View>
        ))}

      </View>
      
      {/* Inspection Details Table */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Inspection Details</Text>
        <ScrollView horizontal={true}></ScrollView>
        {/* Table Header */}
        <View style={styles.tableRow}>
          <Text style={styles.tableHeader}>Operating pressure in mbar or heat input in kW</Text>
          <Text style={styles.tableHeader}>Initial combustion analyser reading (if applicable)</Text>
          <Text style={styles.tableHeader}>Final combustion analyser reading</Text>
          <Text style={styles.tableHeader}>Safety device(s) correct operation</Text>
          <Text style={styles.tableHeader}>Ventilation provision satisfactory</Text>
          <Text style={styles.tableHeader}>Visual condition of chimney/termination</Text>
          <Text style={styles.tableHeader}>Flue performance checks</Text>
          <Text style={styles.tableHeader}>Appliance serviced</Text>
          <Text style={styles.tableHeader}>Appliance safe to use</Text>
          <Text style={styles.tableHeader}>Approved CO alarm fitted</Text>
          <Text style={styles.tableHeader}>Is CO alarm in date</Text>
          <Text style={styles.tableHeader}>Testing of CO alarm satisfactory</Text>
        </View>

        {/* Table Rows */}
        {inspectionDetailsTable.map((row, index) => (
          <View key={index} style={styles.tableRow}>
            {row.map((cell, cellIndex) => (
              <TextInput
                key={cellIndex}
                style={styles.tableInput}
                value={cell}
                onChangeText={(text) => {
                  const updatedData = [...inspectionDetailsTable];
                  updatedData[index][cellIndex] = text;
                  setInspectionDetailsTable(updatedData);
                }}
              />
            ))}
          </View>
        ))}
      </View>



      {/* Card 5 */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Inspection Details</Text>
        <TextInput
          style={styles.mediumInput}
          placeholder="Description"
          multiline
          numberOfLines={4}
          value={inspectionDetails}
          onChangeText={setInspectionDetails}
        />
        <Text style={styles.subHeader}>If Warning/Advise Notice issued insert serial No.*:</Text>
        <TextInput
          style={styles.smallInput}
          placeholder="Serial No."
          value={warningSerialNo}
          onChangeText={setWarningSerialNo}
        />
      </View>

      {/* Card 6 */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Remedial Action Required</Text>
        <TextInput
          style={styles.mediumInput}
          placeholder="Description"
          multiline
          numberOfLines={4}
          value={remedialAction}
          onChangeText={setRemedialAction}
        />
      </View>

      {/* Card 7 */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Checklist</Text>
        <Text>Gas installation pipework satisfactory visual inspection</Text>
        <Picker
          selectedValue={gasInstallationChecked}
          style={styles.tableInput}
          itemStyle={{height:50}}
          onValueChange={(itemValue) => setGasInstallationChecked(itemValue)}
        >
          <Picker.Item label="Yes" value={true} style={styles.tableInput} />
          <Picker.Item label="No" value={false} style={styles.tableInput} />
        </Picker>

        <Text>Emergency Control Valve (ECV) accessible</Text>
        <Picker
          selectedValue={ecvAccessibleChecked}
          style={styles.tableInput}
          itemStyle={{height:50}}
          onValueChange={(itemValue) => setEcvAccessibleChecked(itemValue)}
        >
          <Picker.Item label="Yes" value={true} style={styles.tableInput} />
          <Picker.Item label="No" value={false} style={styles.tableInput} />
        </Picker>

        <Text>Protective equipment bonding satisfactory</Text>
        <Picker
          selectedValue={protectiveEquipmentChecked}
          style={styles.tableInput}
          itemStyle={{height:50}}
          onValueChange={(itemValue) => setProtectiveEquipmentChecked(itemValue)}
        >
          <Picker.Item label="Yes" value={true} style={styles.tableInput} />
          <Picker.Item label="No" value={false} style={styles.tableInput} />
        </Picker>
      </View>

      {/* Card 8 */}
      {/* Card 8 - Signature Strip */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Signature</Text>

        {/* Signature Strip Component */}
        <SignatureStrip
          signature={signature}
          isSigning={isSigning}
          onDragStart={() => setIsSigning(true)}
          onDragEnd={() => setIsSigning(false)}
          onSignatureChange={(updatedSignature) => setSignature(updatedSignature)}
        />

        {/* Clear Signature Button */}
        <TouchableOpacity style={styles.addRowButton} onPress={clearSignature}>
          <Text style={styles.addRowButtonText}>Clear Signature</Text>
        </TouchableOpacity>
      </View>

      {/* Render the PDF file URL if available */}
      {pdfFileURL && (
        <TouchableOpacity
          onPress={() => Linking.openURL(pdfFileURL)}
          style={styles.pdfLink}
        >
          <Text style={styles.pdfLinkText}>View Updated PDF</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity style={styles.addRowButton} onPress={sendDataToBackend}>
        <Text style={styles.addRowButtonText}>Submit</Text>
      </TouchableOpacity>

    </ScrollView>
  );
};

const updateRow = (prev, index, updatedData) => {
  const newArray = [...prev];
  newArray[index] = { ...newArray[index], ...updatedData };
  return newArray;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  tableHeader: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 8, // Updated font size for the table header
  },
  tableInput: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    textAlign: 'center',
    marginBottom: 10,
    paddingHorizontal: 5,
    fontSize: 8, // Updated font size for the table input
  },
  addRowButton: {
    backgroundColor: 'green',
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  addRowButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },

  mediumInput: {
    height: 80,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  smallInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default C12Screen;
