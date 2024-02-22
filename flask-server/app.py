from flask import Flask, request, jsonify, send_file, session, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from fillpdf import fillpdfs
import os
import io
import secrets
from datetime import date
from datetime import datetime
import shutil

app = Flask(__name__)
app.config['SECRET_KEY'] = secrets.token_hex(16)
CORS(app, resources={r"/*": {"origins": "*"}})
bcrypt = Bcrypt(app)


app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:gH7t3aRbNu@gasgate.c96giiaa644g.eu-north-1.rds.amazonaws.com:5432/gasgate'

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class Users(db.Model):
    userid = db.Column(db.Integer, primary_key=True)
    fullname = db.Column(db.String(255))
    contactdetails = db.Column(db.String(255))
    usertype = db.Column(db.String(20))
    username = db.Column(db.String(50), unique=True, nullable=False)
    gas_safe_license_no = db.Column(db.String(255))
    position_held = db.Column(db.String(255))
    password = db.Column(db.String(255), nullable=False)

    def __init__(self, username, password, fullname, position_held, gas_safe_license_no):
        self.username = username
        self.password = bcrypt.generate_password_hash(password).decode('utf-8')
        self.fullname = fullname
        self.position_held = position_held
        self.gas_safe_license_no = gas_safe_license_no


class Permissions(db.Model):
    PermissionID = db.Column(db.Integer, primary_key=True)
    Role = db.Column(db.String(20))
    Functionality = db.Column(db.String(255))

class Jobs(db.Model):
    JobID = db.Column(db.Integer, primary_key=True)
    Type = db.Column(db.String(255))
    Address = db.Column(db.String(255))
    Description = db.Column(db.Text)
    Status = db.Column(db.String(20))

class JobAssignments(db.Model):
    AssignmentID = db.Column(db.Integer, primary_key=True)
    JobID = db.Column(db.Integer, db.ForeignKey('jobs.JobID'))
    UserID = db.Column(db.Integer, db.ForeignKey('users.UserID'))
    AssignedAt = db.Column(db.DateTime)

class Communications(db.Model):
    CommunicationID = db.Column(db.Integer, primary_key=True)
    SenderID = db.Column(db.Integer, db.ForeignKey('users.UserID'))
    ReceiverID = db.Column(db.Integer, db.ForeignKey('users.UserID'))
    Message = db.Column(db.Text)
    Timestamp = db.Column(db.DateTime)

class GasCertificates(db.Model):
    CertificateID = db.Column(db.Integer, primary_key=True)
    JobID = db.Column(db.Integer, db.ForeignKey('jobs.JobID'))
    CertificateType = db.Column(db.String(20))
    CompletionStatus = db.Column(db.String(20))
    CompletionTimestamp = db.Column(db.DateTime)
    InspectorID = db.Column(db.Integer, db.ForeignKey('users.UserID'))

class CP12Certificates(db.Model):
    CertificateID = db.Column(db.Integer, db.ForeignKey('gas_certificates.CertificateID'), primary_key=True)
    GasSafeLicenseNo = db.Column(db.String(50))
    Name = db.Column(db.String(255))
    PositionHeld = db.Column(db.String(255))
    JobAddress = db.Column(db.JSON)
    LandlordName = db.Column(db.String(255))
    LandlordAddress = db.Column(db.JSON)
    NumberOfAppliancesTested = db.Column(db.Integer)
    ApplianceDetails = db.Column(db.JSON)
    InspectionDetails = db.Column(db.JSON)
    InspectionTextDescription = db.Column(db.Text)
    SerialNumber = db.Column(db.String(50))
    RemedialActionRequired = db.Column(db.Text)
    GasInstallationPipeworkSatisfactory = db.Column(db.Boolean)
    ECVAccessible = db.Column(db.Boolean)
    GasTightnessTest = db.Column(db.String(3))
    ProtectiveEquipmentBondingSatisfactory = db.Column(db.Boolean)

# Create tables in the correct order
with app.app_context():
    db.create_all()

@app.route('/signup', methods=['POST'])
def signup():
    data = request.json

    # Check if data is present
    if not data:
        return jsonify({'error': 'No data provided'}), 400

    # Check if the username already exists
    if Users.query.filter_by(username=data.get('username')).first():
        return jsonify({'error': 'Username already exists'}), 400

    # Hash the password and create a new user
    new_user = Users(
        username=data.get('username'),
        password=data.get('password'),
        fullname=data.get('fullName'),  # Assuming you have a field for full name in the frontend
        position_held=data.get('positionHeld'),
        gas_safe_license_no=data.get('gasSafeLicenseNo'),
    )
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'Signup successful'}), 201

@app.route('/signin', methods=['POST'])
def signin():
    data = request.json

    # Check if data is present
    if not data:
        return jsonify({'error': 'No data provided'}), 400

    # Query user by username
    user = Users.query.filter_by(username=data.get('username')).first()

    # Check if the user exists and the password is correct
    if user and bcrypt.check_password_hash(user.password, data.get('password')):
        # Save user information in the session upon successful login
        session['user_id'] = user.userid
        print(session['user_id'])
        return jsonify({'message': 'Signin successful'}), 200
    else:
        return jsonify({'error': 'Invalid username or password'}), 401


@app.route('/update_pdf', methods=['POST'])
def update_pdf():
    # Check if the user is logged in
    if 'user_id' not in session:
        return jsonify({'error': 'User not logged in'}), 401

    # Fetch the current user's information
    user_id = session['user_id']
    current_user = Users.query.get(user_id)

        # Check if the user exists
    if not current_user:
        return jsonify({'error': 'User not found'}), 404

    # Access user details (fullname, gas_safe_license_no, position_held)
    fullname = current_user.username
    gas_safe_license_no = current_user.gas_safe_license_no
    position_held = current_user.position_held

    data = request.get_json()
    
    print("Received data:", data)

    # Extract data from the request
    job_number = data.get('jobNum')
    jobAddress =  data.get('jobAddress')
    jobPostCode = data.get('jobPostCode')
    landlordName = data.get('landlordName')
    landLordAddress = data.get('landLordAddress')
    landLordPostcode = data.get('landLordPostcode')
    landLordNum = data.get('landLordNum')
    landLordNAT = data.get('landLordNAT')

    telNo = data.get('jobTele')
    landlordName  = data.get('landlordName')
    appliLocation1  = data.get('appliLocation1')
    appliType1  = data.get('appliType1')
    appliMake1  = data.get('appliMake1')
    appliModel1  = data.get('appliModel1')
    landlordsAppi1  = data.get('landlordsAppi1')
    landlordsInsp1  = data.get('landlordsInsp1')
    flueType1  = data.get('flueType1')
    appliLocation2  = data.get('appliLocation2')
    appliType2  = data.get('appliType2')
    appliMake2  = data.get('appliMake2')
    appliModel2  = data.get('appliModel2')
    landlordsAppi2  = data.get('landlordsAppi2')
    landlordsInsp2  = data.get('landlordsInsp2')
    flueType2  = data.get('flueType2')
    appliLocation3  = data.get('appliLocation3')
    appliType3  = data.get('appliType3')
    appliMake3  = data.get('appliMake3')
    appliModel3  = data.get('appliModel3')
    landlordsAppi3  = data.get('landlordsAppi3')
    landlordsInsp3  = data.get('landlordsInsp3')
    flueType3  = data.get('flueType3')
    appliLocation4  = data.get('appliLocation4')
    appliType4  = data.get('appliType4')
    appliMake4  = data.get('appliMake4')
    appliModel4  = data.get('appliModel4')
    landlordsAppi4  = data.get('landlordsAppi4')
    landlordsInsp4  = data.get('landlordsInsp4')
    flueType4  = data.get('flueType4')



    pressure1  = data.get('pressure1')
    initCombustion1  = data.get('initCombustion1')
    finalCombustion1  = data.get('finalCombustion1')
    safetyDevice1  = data.get('safetyDevice1')
    ventilationProv1  = data.get('ventilationProv1')
    chimneyCond1  = data.get('chimneyCond1')
    flueCheck1  = data.get('flueCheck1')
    applianceServiced1  = data.get('applianceServiced1')
    applianceSafe1  = data.get('applianceSafe1')
    pressure2  = data.get('pressure2')
    initCombustion2  = data.get('initCombustion2')
    finalCombustion2  = data.get('finalCombustion2')
    safetyDevice2  = data.get('safetyDevice2')
    ventilationProv2  = data.get('ventilationProv2')
    chimneyCond2  = data.get('chimneyCond2')
    flueCheck2  = data.get('flueCheck2')
    applianceServiced2  = data.get('applianceServiced2')
    applianceSafe2  = data.get('applianceSafe2')
    pressure3  = data.get('pressure3')
    initCombustion3  = data.get('initCombustion3')
    finalCombustion3  = data.get('finalCombustion3')
    safetyDevice3  = data.get('safetyDevice3')
    ventilationProv3  = data.get('ventilationProv3')
    chimneyCond3  = data.get('chimneyCond3')
    flueCheck3  = data.get('flueCheck3')
    applianceServiced3  = data.get('applianceServiced3')
    applianceSafe3  = data.get('applianceSafe3')
    pressure4  = data.get('pressure4')
    initCombustion4  = data.get('initCombustion4')
    finalCombustion4  = data.get('finalCombustion4')
    safetyDevice4  = data.get('safetyDevice4')
    ventilationProv4  = data.get('ventilationProv4')
    chimneyCond4  = data.get('chimneyCond4')
    flueCheck4  = data.get('flueCheck4')
    applianceServiced4  = data.get('applianceServiced4')
    applianceSafe4  = data.get('applianceSafe4')
    approvedAlarm1  = data.get('approvedAlarm1')
    alarmInDate1  = data.get('alarmInDate1')
    alarmTest1  = data.get('alarmTest1')
    approvedAlarm2  = data.get('approvedAlarm2')
    alarmInDate2  = data.get('alarmInDate2')
    alarmTest2  = data.get('alarmTest2')
    approvedAlarm3  = data.get('approvedAlarm3')
    alarmInDate3  = data.get('alarmInDate3')
    alarmTest3  = data.get('alarmTest3')
    approvedAlarm4  = data.get('approvedAlarm4')
    alarmInDate4  = data.get('alarmInDate4')
    alarmTest4  = data.get('alarmTest4')
    inspectionDescription  = data.get('inspectionDescription')
    warningSerial  = data.get('warningSerial')
    remedialDescription  = data.get('remedialDescription')
    visualInspection  = data.get('visualInspection')
    emergencyControl  = data.get('emergencyControl')
    gasTightness  = data.get('gasTightness')
    protectiveEquipment  = data.get('protectiveEquipment')
    # ... (extract other data)

    today = date.today()
    dateOfVisit = today.strftime('%d_%m_%Y')


    # Create a data dictionary for fillpdfs.write_fillable_pdf
    data_dict = {
    'Job number': job_number,
    'ID Card Serial No': gas_safe_license_no,
    'Print name': fullname,
    'Gas operative': position_held,
    'Dateofvisit': dateOfVisit,
    'Name MrMrsMissMs': '',
    'Address 1': jobAddress,
    'Postcode_2': jobPostCode,
    'Tel No_2': telNo,
    'Name MrMrsMissMs_2': landlordName,
    'Address 1_2': landLordAddress,
    'Address 3_2': '',
    'Postcode': landLordPostcode,
    'Tel No': landLordNum,
    'Number of appliances tested': landLordNAT,
    'Location1': appliLocation1,
    'Appliance type1': appliType1,
    'Make1': appliMake1,
    'Model1': appliModel1,
    'Landlords appliance YesNoNA1': landlordsAppi1,
    'Landlords inspected YesNo1': landlordsInsp1,
    'Flue Type OFRSFL1': flueType1,
    'Location2': appliLocation2,
    'Appliance type2': appliType2,
    'Make2': appliMake2,
    'Model2': appliModel2,
    'Landlords appliance YesNoNA2': landlordsAppi2,
    'Landlords inspected YesNo2': landlordsInsp2,
    'Flue Type OFRSFL2': flueType2,
    'Location3': appliLocation3,
    'Appliance type3': appliType3,
    'Make3': appliMake3,
    'Model3': appliModel3,
    'Landlords appliance YesNoNA3': landlordsAppi3,
    'Landlords inspected YesNo3': landlordsInsp3,
    'Flue Type OFRSFL3': flueType3,
    'Location4': appliLocation4,
    'Appliance type4': appliType4,
    'Make4': appliMake4,
    'Model4': appliModel4,
    'Landlords appliance YesNoNA4': landlordsAppi4,
    'Landlords inspected YesNo4': landlordsInsp4,
    'Flue Type OFRSFL4': flueType4,
    'Operating pressure in mbar or heat input inkW1': pressure1,
    'Initial combustion analyser reading if applicable1': initCombustion1,
    'Final combustion analyser reading if applicable1': finalCombustion1,
    'Safety devices correct operation YesNoNA1': safetyDevice1,
    'Ventilation provision satisfactory YesNo1': ventilationProv1,
    'Visual condition of chimneytermination Satisfactory PassFailNA1': chimneyCond1,
    'Flue performance checks PassFailNA1': flueCheck1,
    'Appliance serviced YesNo1': applianceServiced1,
    'Appliance safe to use YesNo1': applianceSafe1,
    'Approved CO alarm fitted YesNoNARow1': approvedAlarm1,
    'Is CO alarm in date YesNoNARow1': alarmInDate1,
    'Testing of CO alarm satisfactory YesNoNARow1': alarmTest1,
    'Operating pressure in mbar or heat input inkW2': pressure2,
    'Initial combustion analyser reading if applicable2': initCombustion2,
    'Final combustion analyser reading if applicable2': finalCombustion2,
    'Safety devices correct operation YesNoNA2': safetyDevice2,
    'Ventilation provision satisfactory YesNo2': ventilationProv2,
    'Visual condition of chimneytermination Satisfactory PassFailNA2': chimneyCond2,
    'Flue performance checks PassFailNA2': flueCheck2,
    'Appliance serviced YesNo2': applianceServiced2,
    'Appliance safe to use YesNo2': applianceSafe2,
    'Approved CO alarm fitted YesNoNARow2': approvedAlarm2,
    'Is CO alarm in date YesNoNARow2': alarmInDate2,
    'Testing of CO alarm satisfactory YesNoNARow2': alarmTest2,
    'Operating pressure in mbar or heat input inkW3': pressure3,
    'Initial combustion analyser reading if applicable3': initCombustion3,
    'Final combustion analyser reading if applicable3': finalCombustion3,
    'Safety devices correct operation YesNoNA3': safetyDevice3,
    'Ventilation provision satisfactory YesNo3': ventilationProv3,
    'Visual condition of chimneytermination Satisfactory PassFailNA3': chimneyCond3,
    'Flue performance checks PassFailNA3': flueCheck3,
    'Appliance serviced YesNo3': applianceServiced3,
    'Appliance safe to use YesNo3': applianceSafe3,
    'Approved CO alarm fitted YesNoNARow3': approvedAlarm3,
    'Is CO alarm in date YesNoNARow3': alarmInDate3,
    'Testing of CO alarm satisfactory YesNoNARow3': alarmTest3,
    'Operating pressure in mbar or heat input inkW4': pressure4,
    'Initial combustion analyser reading if applicable4': initCombustion4,
    'Final combustion analyser reading if applicable4': finalCombustion4,
    'Safety devices correct operation YesNoNA4': safetyDevice4,
    'Ventilation provision satisfactory YesNo4': ventilationProv4,
    'Visual condition of chimneytermination Satisfactory PassFailNA4': chimneyCond4,
    'Flue performance checks PassFailNA4': flueCheck4,
    'Appliance serviced YesNo4': applianceServiced4,
    'Appliance safe to use YesNo4': applianceSafe4,
    'Approved CO alarm fitted YesNoNARow4': approvedAlarm4,
    'Is CO alarm in date YesNoNARow4': alarmInDate4,
    'Testing of CO alarm satisfactory YesNoNARow4': alarmTest4,
    'Inspection1': inspectionDescription, 'WN1': warningSerial, 
    'Details of remedials': remedialDescription,
    'Gas installation pipework satisfactory visual inspection YesNo': visualInspection,
    'undefined': emergencyControl, 
    'undefined_2': gasTightness, 
    'undefined_3': protectiveEquipment, 
    'Print Name': fullname, 
    'Received by Signed': ''
}

    # Update the PDF
    pdf_path = '/home/ubuntu/bknd/pdfs/CP12/master/CP12_Master.pdf'
    output_pdf_filename = f'CP12_{dateOfVisit}.pdf'
    output_pdf_path = '/home/ubuntu/bknd/pdfs/CP12/updated/updated.pdf'

    fillpdfs.write_fillable_pdf(pdf_path, output_pdf_path, data_dict)
    """fillpdfs.flatten_pdf(output_pdf_path, output_pdf_path)"""
    
    # Create a copy with the current date in the filenam
    output_copy_path = os.path.join('/home/ubuntu/bknd/pdfs/CP12/updated', f'CP12_{dateOfVisit}.pdf')

    shutil.copy(output_pdf_path, output_copy_path)

    
    # Return the file content
    with open(output_pdf_path, 'rb') as file:
        file_content = file.read()

    return send_file(
        io.BytesIO(file_content),
        download_name='updated.pdf',
        as_attachment=True,
        mimetype='application/pdf'
    )

# Existing PDF path for testing
existing_pdf_path = '/home/ubuntu/bknd/pdfs/CP12/updated/updated.pdf'

@app.route('/update_cp15', methods=['POST'])
def update_cp15():
    # Check if the user is logged in
    if 'user_id' not in session:
        return jsonify({'error': 'User not logged in'}), 401

    # Fetch the current user's information
    user_id = session['user_id']
    current_user = Users.query.get(user_id)

        # Check if the user exists
    if not current_user:
        return jsonify({'error': 'User not found'}), 404

    # Access user details (fullname, gas_safe_license_no, position_held)
    fullname = current_user.username
    gas_safe_license_no = current_user.gas_safe_license_no
    position_held = current_user.position_held

    data = request.get_json()
    
    print("Received data:", data)

    # Extract data from the request
    job_num = data.get('jobNum')
    name = data.get('name')
    address = data.get('address')
    post_code = data.get('postCode')
    site_contact = data.get('siteContact')
    contact_no = data.get('contactNo')
    unit1_name = data.get('unit1Name')
    no1_location = data.get('no1Location')
    no1_boiler_type = data.get('no1BoilerType')
    no1_boiler_model = data.get('no1BoilerModel')
    no1_boiler_serial_no = data.get('no1BoilerSerialNo')
    no1_burner_manufacturer_model = data.get('no1BurnerManufacturerModel')
    no1_flue_type = data.get('no1FlueType')
    date1 = data.get('date1')
    date2 = data.get('date2')
    maximum_operating_pressure_of_boiler_bar = data.get('maximumOperatingPressureOfBoilerBar')
    appliance_stu1 = data.get('applianceSTU1')
    unit2_name = data.get('unit2Name')
    no2_location = data.get('no2Location')
    no2_boiler_type = data.get('no2BoilerType')
    no2_boiler_model = data.get('no2BoilerModel')
    no2_boiler_serial_no = data.get('no2BoilerSerialNo')
    no2_burner_manufacturer_model = data.get('no2BurnerManufacturerModel')
    no2_flue_type = data.get('no2FlueType')
    date3 = data.get('date3')
    date4 = data.get('date4')
    maximum_operating_pressure_of_boiler_bar2 = data.get('maximumOperatingPressureOfBoilerBar2')
    appliance_stu2 = data.get('applianceSTU2')
    unit3_name = data.get('unit3Name')
    no3_location = data.get('no3Location')
    no3_boiler_type = data.get('no3BoilerType')
    no3_boiler_model = data.get('no3BoilerModel')
    no3_boiler_serial_no = data.get('no3BoilerSerialNo')
    no3_burner_manufacturer_model = data.get('no3BurnerManufacturerModel')
    no3_flue_type = data.get('no3FlueType')
    date5 = data.get('date5')
    date6 = data.get('date6')
    maximum_operating_pressure_of_boiler_bar3 = data.get('maximumOperatingPressureOfBoilerBar3')
    appliance_stu3 = data.get('applianceSTU3')
    low_heat_input_rating_kw = data.get('lowHeatInputRatingKW')
    low_gas_burner_pressure_mbar = data.get('lowGasBurnerPressureMbar')
    low_gas_rate_m3hr = data.get('lowGasRateM3hr')
    low_air_gas_ratio_control_setting = data.get('lowAirGasRatioControlSetting')
    low_ambient_room_temperature = data.get('lowAmbientRoomTemperature')
    low_o_flue_gas_temperature_gross = data.get('lowOFlueGasTemperatureGross')
    low_o_flue_gas_temperature_net = data.get('lowOFlueGasTemperatureNet')
    low_flue_draught_pressure_mbar = data.get('lowFlueDraughtPressureMbar')
    low_oxygen_o2 = data.get('lowOxygenO2')
    low_carbon_monoxide_coppm = data.get('lowCarbonMonoxideCOppm')
    low_carbon_dioxide_co2 = data.get('lowCarbonDioxideCO2')
    low_nox = data.get('lowNOx')
    low_excess_air = data.get('lowExcessAir')
    low_coco2_ratio = data.get('lowCOCO2Ratio')
    low_gross_efficiency = data.get('lowGrossEfficiency')
    low_co_flue_dilution_ppm = data.get('lowCOFlueDilutionPPM')
    high_heat_input_rating_kw = data.get('highHeatInputRatingKW')
    high_gas_burner_pressure_mbar = data.get('highGasBurnerPressureMbar')
    high_gas_rate_m3hr = data.get('highGasRateM3hr')
    high_air_gas_ratio_control_setting = data.get('highAirGasRatioControlSetting')
    high_ambient_room_temperature = data.get('highAmbientRoomTemperature')
    high_o_flue_gas_temperature_gross = data.get('highOFlueGasTemperatureGross')
    high_o_flue_gas_temperature_net = data.get('highOFlueGasTemperatureNet')
    high_flue_draught_pressure_mbar = data.get('highFlueDraughtPressureMbar')
    high_oxygen_o2 = data.get('highOxygenO2')
    high_carbon_monoxide_coppm = data.get('highCarbonMonoxideCOppm')
    high_carbon_dioxide_co2 = data.get('highCarbonDioxideCO2')
    high_nox = data.get('highNOx')
    high_excess_air = data.get('highExcessAir')
    high_coco2_ratio = data.get('highCOCO2Ratio')
    high_gross_efficiency = data.get('highGrossEfficiency')
    high_co_flue_dilution_ppm = data.get('highCOFlueDilutionPPM')
    low_heat_input_rating_kw2 = data.get('lowHeatInputRatingKW2')
    low_gas_burner_pressure_mbar2 = data.get('lowGasBurnerPressureMbar2')
    low_gas_rate_m3hr2 = data.get('lowGasRateM3hr2')
    low_air_gas_ratio_control_setting2 = data.get('lowAirGasRatioControlSetting2')
    low_ambient_room_temperature2 = data.get('lowAmbientRoomTemperature2')
    low_o_flue_gas_temperature_gross2 = data.get('lowOFlueGasTemperatureGross2')
    low_o_flue_gas_temperature_net2 = data.get('lowOFlueGasTemperatureNet2')
    low_flue_draught_pressure_mbar2 = data.get('lowFlueDraughtPressureMbar2')
    low_oxygen_o2_2 = data.get('lowOxygenO2_2')
    low_carbon_monoxide_coppm_2 = data.get('lowCarbonMonoxideCOppm_2')
    low_carbon_dioxide_co2_2 = data.get('lowCarbonDioxideCO2_2')
    low_nox_2 = data.get('lowNOx_2')
    low_excess_air_2 = data.get('lowExcessAir_2')
    low_coco2_ratio_2 = data.get('lowCOCO2Ratio_2')
    low_gross_efficiency_2 = data.get('lowGrossEfficiency_2')
    low_co_flue_dilution_ppm_2 = data.get('lowCOFlueDilutionPPM_2')
    high_heat_input_rating_kw2 = data.get('highHeatInputRatingKW2')
    high_gas_burner_pressure_mbar2 = data.get('highGasBurnerPressureMbar2')
    high_gas_rate_m3hr2 = data.get('highGasRateM3hr2')
    high_air_gas_ratio_control_setting2 = data.get('highAirGasRatioControlSetting2')
    high_ambient_room_temperature2 = data.get('highAmbientRoomTemperature2')
    high_o_flue_gas_temperature_gross2 = data.get('highOFlueGasTemperatureGross2')
    high_o_flue_gas_temperature_net2 = data.get('highOFlueGasTemperatureNet2')
    high_flue_draught_pressure_mbar2 = data.get('highFlueDraughtPressureMbar2')
    high_oxygen_o2_2 = data.get('highOxygenO2_2')
    high_carbon_monoxide_coppm_2 = data.get('highCarbonMonoxideCOppm_2')
    high_carbon_dioxide_co2_2 = data.get('highCarbonDioxideCO2_2')
    high_nox_2 = data.get('highNOx_2')
    high_excess_air_2 = data.get('highExcessAir_2')
    high_coco2_ratio_2 = data.get('highCOCO2Ratio_2')
    high_gross_efficiency_2 = data.get('highGrossEfficiency_2')
    high_co_flue_dilution_ppm_2 = data.get('highCOFlueDilutionPPM_2')
    low_heat_input_rating_kw3 = data.get('lowHeatInputRatingKW3')
    low_gas_burner_pressure_mbar3 = data.get('lowGasBurnerPressureMbar3')
    low_gas_rate_m3hr3 = data.get('lowGasRateM3hr3')
    low_air_gas_ratio_control_setting3 = data.get('lowAirGasRatioControlSetting3')
    low_ambient_room_temperature3 = data.get('lowAmbientRoomTemperature3')
    low_o_flue_gas_temperature_gross3 = data.get('lowOFlueGasTemperatureGross3')
    low_o_flue_gas_temperature_net3 = data.get('lowOFlueGasTemperatureNet3')
    low_flue_draught_pressure_mbar3 = data.get('lowFlueDraughtPressureMbar3')
    low_oxygen_o2_3 = data.get('lowOxygenO2_3')
    low_carbon_monoxide_coppm_3 = data.get('lowCarbonMonoxideCOppm_3')
    low_carbon_dioxide_co2_3 = data.get('lowCarbonDioxideCO2_3')
    low_nox_3 = data.get('lowNOx_3')
    low_excess_air_3 = data.get('lowExcessAir_3')
    low_coco2_ratio_3 = data.get('lowCOCO2Ratio_3')
    low_gross_efficiency_3 = data.get('lowGrossEfficiency_3')
    low_co_flue_dilution_ppm_3 = data.get('lowCOFlueDilutionPPM_3')
    high_heat_input_rating_kw3 = data.get('highHeatInputRatingKW3')
    high_gas_burner_pressure_mbar3 = data.get('highGasBurnerPressureMbar3')
    high_gas_rate_m3hr3 = data.get('highGasRateM3hr3')
    high_air_gas_ratio_control_setting3 = data.get('highAirGasRatioControlSetting3')
    high_ambient_room_temperature3 = data.get('highAmbientRoomTemperature3')
    high_o_flue_gas_temperature_gross3 = data.get('highOFlueGasTemperatureGross3')
    high_o_flue_gas_temperature_net3 = data.get('highOFlueGasTemperatureNet3')
    high_flue_draught_pressure_mbar3 = data.get('highFlueDraughtPressureMbar3')
    high_oxygen_o2_3 = data.get('highOxygenO2_3')
    high_carbon_monoxide_coppm_3 = data.get('highCarbonMonoxideCOppm_3')
    high_carbon_dioxide_co2_3 = data.get('highCarbonDioxideCO2_3')
    high_nox_3 = data.get('highNOx_3')
    high_excess_air_3 = data.get('highExcessAir_3')
    high_coco2_ratio_3 = data.get('highCOCO2Ratio_3')
    high_gross_efficiency_3 = data.get('highGrossEfficiency_3')
    high_co_flue_dilution_ppm_3 = data.get('highCOFlueDilutionPPM_3')
    flue_flow_test_satisfactory = data.get('flueFlowTestSatisfactory')
    spillage_test_satisfactory = data.get('spillageTestSatisfactory')
    ventilation_satisfactory = data.get('ventilationSatisfactory')
    air_gas_pressure_switch_operating_correctly = data.get('airGasPressureSwitchOperatingCorrectly')
    flame_providing_safety_devices_operating_correctly = data.get('flameProvidingSafetyDevicesOperatingCorrectly')
    burner_lockout_time_seconds = data.get('burnerLockoutTimeSeconds')
    temperature_and_limit_thermostats_operating_correctly = data.get('temperatureAndLimitThermostatsOperatingCorrectly')
    appliance_serviced = data.get('applianceServiced')
    standing_pressure_gas_mbar = data.get('standingPressureGasMbar')
    working_gas_pressure_all_boilers_run_mbar = data.get('workingGasPressureAllBoilersRunMbar')
    gas_line_diagram_in_place = data.get('gasLineDiagramInPlace')
    flue_flow_test_satisfactory2 = data.get('flueFlowTestSatisfactory2')
    spillage_test_satisfactory2 = data.get('spillageTestSatisfactory2')
    ventilation_satisfactory2 = data.get('ventilationSatisfactory2')
    air_gas_pressure_switch2 = data.get('airGasPressureSwitch2')
    flame_providing_safety_devices_operating_correctly2 = data.get('flameProvidingSafetyDevicesOperatingCorrectly2')
    burner_lockout_time_seconds2 = data.get('burnerLockoutTimeSeconds2')
    temperature_and_limit_thermostats_operating_correctly2 = data.get('temperatureAndLimitThermostatsOperatingCorrectly2')
    appliance_serviced2 = data.get('applianceServiced2')
    standing_pressure_gas_mbar2 = data.get('standingPressureGasMbar2')
    working_gas_pressure_all_boilers_run_mbar2 = data.get('workingGasPressureAllBoilersRunMbar2')
    gas_line_diagram_in_place2 = data.get('gasLineDiagramInPlace2')
    flue_flow_test_satisfactory3 = data.get('flueFlowTestSatisfactory3')
    spillage_test_satisfactory3 = data.get('spillageTestSatisfactory3')
    ventilation_satisfactory3 = data.get('ventilationSatisfactory3')
    air_gas_pressure_switch_operating_correctly3 = data.get('airGasPressureSwitchOperatingCorrectly3')
    flame_providing_safety_devices_operating_correctly3 = data.get('flameProvidingSafetyDevicesOperatingCorrectly3')
    burner_lockout_time_seconds3 = data.get('burnerLockoutTimeSeconds3')
    temperature_and_limit_thermostats_operating_correctly3 = data.get('temperatureAndLimitThermostatsOperatingCorrectly3')
    appliance_serviced3 = data.get('applianceServiced3')
    standing_pressure_gas_mbar3 = data.get('standingPressureGasMbar3')
    working_gas_pressure_all_boilers_run_mbar3 = data.get('workingGasPressureAllBoilersRunMbar3')
    gas_line_diagram_in_place3 = data.get('gasLineDiagramInPlace3')
    gas_boosters_compressors_operating_correctly = data.get('gasBoostersCompressorsOperatingCorrectly')
    gas_tightness_test = data.get('gasTightnessTest')
    gas_installation_pipework_adequately_supported = data.get('gasInstallationPipeworkAdequatelySupported')
    gas_installation_pipework_sleeved_labelled_painted_as_necessary = data.get('gasInstallationPipeworkSleevedLabelledPaintedAsNecessary')
    flue_system_installed_in_accordance_with_appropriate_standards = data.get('flueSystemInstalledInAccordanceWithAppropriateStandards')
    flue_route_inc_voids_termination_satisfactory = data.get('flueRouteIncVoidsTerminationSatisfactory')
    fan_flue_interlock_operating_correctly = data.get('fanFlueInterlockOperatingCorrectly')
    ventilation_type = data.get('ventilationType')
    plant_room_compartment_ventilation_low_level_free_area = data.get('plantRoomCompartmentVentilationLowLevelFreeArea')
    high_level_free_area = data.get('highLevelFreeArea')
    mechanical_ventilation_flow_rate_inlet = data.get('mechanicalVentilationFlowRateInlet')
    mechanical_ventilation_flow_rate_extract = data.get('mechanicalVentilationFlowRateExtract')
    mechanical_ventilation_interlock_operating_correctly = data.get('mechanicalVentilationInterlockOperatingCorrectly')
    ventilation_sati = data.get('ventilationSati')
    remedial_description = data.get('remedialDescription')
    valve_dmake1 = data.get('valveDmake1')
    valve_dtype1 = data.get('valveDtype1')
    valve_dsize1 = data.get('valveDsize1')
    valve_dsetting1 = data.get('valveDsetting1')
    valve_ddate1 = data.get('valveDdate1')
    valve_dmake2 = data.get('valveDmake2')
    valve_dtype2 = data.get('valveDtype2')
    valve_dsize2 = data.get('valveDsize2')
    valve_dsetting2 = data.get('valveDsetting2')
    valve_ddate2 = data.get('valveDdate2')
    valve_dmake3 = data.get('valveDmake3')
    valve_dtype3 = data.get('valveDtype3')
    valve_dsize3 = data.get('valveDsize3')
    valve_dsetting3 = data.get('valveDsetting3')
    valve_ddate3 = data.get('valveDdate3')
    booster_manufacturer1 = data.get('boosterManufacturer1')
    booster_model1 = data.get('boosterModel1')
    booster_serial1 = data.get('boosterSerial1')
    booster_date1 = data.get('boosterDate1')
    booster_safe1 = data.get('boosterSafe1')
    booster_inlet1 = data.get('boosterInlet1')
    booster_pressure1 = data.get('boosterPressure1')
    booster_outlet1 = data.get('boosterOutlet1')
    booster_cutoff1 = data.get('boosterCutOff1')
    booster_10mbar1 = data.get('booster10mbar1')
    booster_manufacturer2 = data.get('boosterManufacturer2')
    booster_model2 = data.get('boosterModel2')
    booster_serial2 = data.get('boosterSerial2')
    booster_date2 = data.get('boosterDate2')
    booster_safe2 = data.get('boosterSafe2')
    booster_inlet2 = data.get('boosterInlet2')
    booster_pressure2 = data.get('boosterPressure2')
    booster_outlet2 = data.get('boosterOutlet2')
    booster_cutoff2 = data.get('boosterCutOff2')
    booster_10mbar2 = data.get('booster10mbar2')
    booster_manufacturer3 = data.get('boosterManufacturer3')
    booster_model3 = data.get('boosterModel3')
    booster_serial3 = data.get('boosterSerial3')
    booster_date3 = data.get('boosterDate3')
    booster_safe3 = data.get('boosterSafe3')
    booster_inlet3 = data.get('boosterInlet3')
    booster_pressure3 = data.get('boosterPressure3')
    booster_outlet3 = data.get('boosterOutlet3')
    booster_cutoff3 = data.get('boosterCutOff3')
    booster_10mbar3 = data.get('booster10mbar3')
    warning_advice_si = data.get('warningAdviceSI')
    warning_labels_attatched = data.get('warningLabelsAttatched')
    resp_person_ad_si = data.get('respPersonAdSI')
    warning_notice_id = data.get('warningNoticeID')



    today = date.today()
    dateOfVisit = today.strftime('%d_%m_%Y')
    # Create a data dictionary for fillpdfs.write_fillable_pdf

    data_dict = {
    'Job': job_num, 
    'Name': name, 
    'Address': address, 
    'Post Code': post_code, 
    'Site Contact': site_contact, 
    'Contact No': contact_no, 
    '520592Gas Safe Card Serial No': gas_safe_license_no, 
    '520592Engineer Name': fullname, 
    '520592Position Held': position_held, 
    'Dateofwork_af_date': dateOfVisit, 
    'Unit 1 name': unit1_name, 
    'No1Location': no1_location, 
    'No1Boiler Type': no1_boiler_type, 
    'No1Boiler Model': no1_boiler_model, 
    'No1Boiler Serial No': no1_boiler_serial_no, 
    'No1Burner manufacturer ModelSerialif different': no1_burner_manufacturer_model, 
    'No1Flue type': no1_flue_type, 
    'Date1': date1, 
    'Date2': date2, 
    'Maximum Operating Pressure of Boiler Bar': maximum_operating_pressure_of_boiler_bar, 
    'Unit 2 name': unit2_name, 
    'Appliance STU 1': appliance_stu1, 
    'No2Location': no2_location, 
    'No2Boiler Type': no2_boiler_type, 
    'No2Boiler Model': no2_boiler_model, 
    'No2Boiler Serial No': no2_boiler_serial_no, 
    'No2Burner manufacturer ModelSerialif different': no2_burner_manufacturer_model, 
    'No2Flue type': no2_flue_type, 
    '2Date1': date3, 
    '2Date2': date4, 
    'Maximum Operating Pressure of Boiler Bar2': maximum_operating_pressure_of_boiler_bar2, 
    'Appliance STU 2': appliance_stu2, 
    'Unit 3 name': unit3_name, 
    'No3Location': no3_location, 
    'No3Boiler Type': no3_boiler_type, 
    'No3Boiler Model': no3_boiler_model, 
    'No3Boiler Serial No': no3_boiler_serial_no, 
    'No3Burner manufacturer ModelSerialif different': no3_burner_manufacturer_model, 
    'No3Flue type': no3_flue_type, 
    '3Date1': date5, 
    '3Date2': date6, 
    'Maximum Operating Pressure of Boiler Bar3': maximum_operating_pressure_of_boiler_bar3, 
    'Appliance STU 3': appliance_stu3, 
    'LowHeat input rating kW': low_heat_input_rating_kw, 
    'LowGas burner pressure mbar': low_gas_burner_pressure_mbar, 
    'LowGas rate m3hr': low_gas_rate_m3hr, 
    'LowAirgas ratio control setting': low_air_gas_ratio_control_setting, 
    'LowAmbient room temperature o C': low_ambient_room_temperature, 
    'Lowo Flue Gas temperature gross  C': low_o_flue_gas_temperature_gross, 
    'Lowo Flue Gas temperature net  C': low_o_flue_gas_temperature_net, 
    'LowFlue draught pressure mbar': low_flue_draught_pressure_mbar, 
    'LowOxygen O2': low_oxygen_o2, 
    'LowCarbon monoxide CO ppm': low_carbon_monoxide_coppm, 
    'LowCarbon dioxide CO2': low_carbon_dioxide_co2, 
    'LowNOx': low_nox, 
    'LowExcess air': low_excess_air, 
    'LowCOCO2 Ratio': low_coco2_ratio, 
    'LowGross efficiency': low_gross_efficiency, 
    'LowCO flue dilution ppm': low_co_flue_dilution_ppm, 
    'HighHeat input rating kW': high_heat_input_rating_kw, 
    'HighGas burner pressure mbar': high_gas_burner_pressure_mbar, 
    'HighGas rate m3hr': high_gas_rate_m3hr, 
    'HighAirgas ratio control setting': high_air_gas_ratio_control_setting, 
    'HighAmbient room temperature o C': high_ambient_room_temperature, 
    'Higho Flue Gas temperature gross  C': high_o_flue_gas_temperature_gross, 
    'Higho Flue Gas temperature net  C': high_o_flue_gas_temperature_net, 
    'HighFlue draught pressure mbar': high_flue_draught_pressure_mbar, 
    'HighOxygen O2': high_oxygen_o2, 
    'HighCarbon monoxide CO ppm': high_carbon_monoxide_coppm, 
    'HighCarbon dioxide CO2': high_carbon_dioxide_co2, 
    'HighNOx': high_nox, 
    'HighExcess air': high_excess_air, 
    'HighCOCO2 Ratio': high_coco2_ratio, 
    'HighGross efficiency': high_gross_efficiency, 
    'HighCO flue dilution ppm': high_co_flue_dilution_ppm, 
    'LowHeat input rating kW_2': low_heat_input_rating_kw2, 
    'LowGas burner pressure mbar_2': low_gas_burner_pressure_mbar2, 
    'LowGas rate m3hr_2': low_gas_rate_m3hr2, 
    'LowAirgas ratio control setting_2': low_air_gas_ratio_control_setting2, 
    'LowAmbient room temperature o C_2': low_ambient_room_temperature2, 
    'Lowo Flue Gas temperature gross  C_2': low_o_flue_gas_temperature_gross2, 
    'Lowo Flue Gas temperature net  C_2': low_o_flue_gas_temperature_net2, 
    'LowFlue draught pressure mbar_2': low_flue_draught_pressure_mbar2, 
    'LowOxygen O2_2': low_oxygen_o2_2, 
    'LowCarbon monoxide CO ppm_2': low_carbon_monoxide_coppm_2, 
    'LowCarbon dioxide CO2_2': low_carbon_dioxide_co2_2, 
    'LowNOx_2': low_nox_2, 
    'LowExcess air_2': low_excess_air_2, 
    'LowCOCO2 Ratio_2': low_coco2_ratio_2, 
    'LowGross efficiency_2': low_gross_efficiency_2, 
    'LowCO flue dilution ppm_2': low_co_flue_dilution_ppm_2, 
    'HighHeat input rating kW_2': high_heat_input_rating_kw2, 
    'HighGas burner pressure mbar_2': high_gas_burner_pressure_mbar2, 
    'HighGas rate m3hr_2': high_gas_rate_m3hr2, 
    'HighAirgas ratio control setting_2': high_air_gas_ratio_control_setting2, 
    'HighAmbient room temperature o C_2': high_ambient_room_temperature2, 
    'Higho Flue Gas temperature gross  C_2': high_o_flue_gas_temperature_gross2, 
    'Higho Flue Gas temperature net  C_2': high_o_flue_gas_temperature_net2, 
    'HighFlue draught pressure mbar_2': high_flue_draught_pressure_mbar2, 
    'HighOxygen O2_2': high_oxygen_o2_2, 
    'HighCarbon monoxide CO ppm_2': high_carbon_monoxide_coppm_2, 
    'HighCarbon dioxide CO2_2': high_carbon_dioxide_co2_2, 
    'HighNOx_2': high_nox_2, 
    'HighExcess air_2': high_excess_air_2, 
    'HighCOCO2 Ratio_2': high_coco2_ratio_2, 
    'HighGross efficiency_2': high_gross_efficiency_2, 
    'HighCO flue dilution ppm_2': high_co_flue_dilution_ppm_2, 
    'LowHeat input rating kW_3': low_heat_input_rating_kw3, 
    'LowGas burner pressure mbar_3': low_gas_burner_pressure_mbar3, 
    'LowGas rate m3hr_3': low_gas_rate_m3hr3, 
    'LowAirgas ratio control setting_3': low_air_gas_ratio_control_setting3, 
    'LowAmbient room temperature o C_3': low_ambient_room_temperature3, 
    'Lowo Flue Gas temperature gross  C_3': low_o_flue_gas_temperature_gross3, 
    'Lowo Flue Gas temperature net  C_3': low_o_flue_gas_temperature_net3, 
    'LowFlue draught pressure mbar_3': low_flue_draught_pressure_mbar3, 
    'LowOxygen O2_3': low_oxygen_o2_3, 
    'LowCarbon monoxide CO ppm_3': low_carbon_monoxide_coppm_3, 
    'LowCarbon dioxide CO2_3': low_carbon_dioxide_co2_3, 
    'LowNOx_3': low_nox_3, 
    'LowExcess air_3': low_excess_air_3, 
    'LowCOCO2 Ratio_3': low_coco2_ratio_3, 
    'LowGross efficiency_3': low_gross_efficiency_3, 
    'LowCO flue dilution ppm_3': low_co_flue_dilution_ppm_3, 
    'HighHeat input rating kW_3': high_heat_input_rating_kw3, 
    'HighGas burner pressure mbar_3': high_gas_burner_pressure_mbar3, 
    'HighGas rate m3hr_3': high_gas_rate_m3hr3, 
    'HighAirgas ratio control setting_3': high_air_gas_ratio_control_setting3, 
    'HighAmbient room temperature o C_3': high_ambient_room_temperature3, 
    'Higho Flue Gas temperature gross  C_3': high_o_flue_gas_temperature_gross3, 
    'Higho Flue Gas temperature net  C_3': high_o_flue_gas_temperature_net3, 
    'HighFlue draught pressure mbar_3': high_flue_draught_pressure_mbar3, 
    'HighOxygen O2_3': high_oxygen_o2_3, 
    'HighCarbon monoxide CO ppm_3': high_carbon_monoxide_coppm_3, 
    'HighCarbon dioxide CO2_3': high_carbon_dioxide_co2_3, 
    'HighNOx_3': high_nox_3, 
    'HighExcess air_3': high_excess_air_3, 
    'HighCOCO2 Ratio_3': high_coco2_ratio_3, 
    'HighGross efficiency_3': high_gross_efficiency_3, 
    'HighCO flue dilution ppm_3': high_co_flue_dilution_ppm_3, 
    'Flue flow test satisfactory': flue_flow_test_satisfactory, 
    'Spillage test satisfactory': spillage_test_satisfactory, 
    'Ventilation satisfactory see also General safety checks': ventilation_satisfactory, 
    'Airgas pressure switch operating correctly': air_gas_pressure_switch_operating_correctly, 
    'Flame providingsafety devices operating correctly': flame_providing_safety_devices_operating_correctly, 
    'Burner lockout time seconds': burner_lockout_time_seconds, 
    'Temperature and limit thermostats operating correctly': temperature_and_limit_thermostats_operating_correctly, 
    'Appliance serviced': appliance_serviced, 
    'Standing pressure Gas Mbar': standing_pressure_gas_mbar, 
    'Working gas pressure all boilers run Mbar': working_gas_pressure_all_boilers_run_mbar, 
    'Gas line diagram in place': gas_line_diagram_in_place, 
    'Flue flow test satisfactory2': flue_flow_test_satisfactory2, 
    'Spillage test satisfactory2': spillage_test_satisfactory2, 
    'Ventilation satisfactory see also General safety checks2': ventilation_satisfactory2, 
    'Airgaspressureswtich2': air_gas_pressure_switch2, 
    'Flame providingsafety devices operating correctly2': flame_providing_safety_devices_operating_correctly2, 
    'Burner lockout time seconds2': burner_lockout_time_seconds2, 
    'Temperature and limit thermostats operating correctly2': temperature_and_limit_thermostats_operating_correctly2, 
    'Appliance serviced2': appliance_serviced2, 
    'Standing pressure Gas Mbar2': standing_pressure_gas_mbar2, 
    'Working gas pressure all boilers run Mbar2': working_gas_pressure_all_boilers_run_mbar2, 
    'Gas line diagram in place2': gas_line_diagram_in_place2, 
    'Flue flow test satisfactory3': flue_flow_test_satisfactory3, 
    'Spillage test satisfactory3': spillage_test_satisfactory3, 
    'Ventilation satisfactory see also General safety checks3': ventilation_satisfactory3, 
    'Airgas pressure switch operating correctly3': air_gas_pressure_switch_operating_correctly3, 
    'Flame providingsafety devices operating correctly3': flame_providing_safety_devices_operating_correctly3, 
    'Burner lockout time seconds3': burner_lockout_time_seconds3, 
    'Temperature and limit thermostats operating correctly3': temperature_and_limit_thermostats_operating_correctly3, 
    'Appliance serviced3': appliance_serviced3, 
    'Standing pressure Gas Mbar3': standing_pressure_gas_mbar3, 
    'Working gas pressure all boilers run Mbar3': working_gas_pressure_all_boilers_run_mbar3, 
    'Gas line diagram in place3': gas_line_diagram_in_place3, 
    'Gas boosterscompressorss operating correctly': gas_boosters_compressors_operating_correctly, 
    'Gas tightness test': gas_tightness_test, 
    'Gas installation pipework adequately supported': gas_installation_pipework_adequately_supported, 
    'Gas installation pipework sleevedlabelledpainted as necessary': gas_installation_pipework_sleeved_labelled_painted_as_necessary, 
    'Flue system installed in accordance with appropriate standards': flue_system_installed_in_accordance_with_appropriate_standards, 
    'Flue route inc voids  termination satisfactory': flue_route_inc_voids_termination_satisfactory, 
    'Fanflue interlock operating correctly': fan_flue_interlock_operating_correctly, 
    'Ventilation Type': ventilation_type, 
    '1 Plant roomcompartment ventilation lowlevel free area cm2': plant_room_compartment_ventilation_low_level_free_area, 
    'Highlevel free area cm 2': high_level_free_area, 
    '2 Mechanical ventilation flow rate inlet m3s': mechanical_ventilation_flow_rate_inlet, 
    'extract m3s': mechanical_ventilation_flow_rate_extract, 
    'Mechanical ventilation interlock operating correctly': mechanical_ventilation_interlock_operating_correctly, 
    'Is ventilation satisfactory YesNo if no see Details of remedial work required': ventilation_sati, 
    'Details of work carried out  Remedial WorkRow1': remedial_description, 
    'MakeNo1': valve_dmake1, 
    'FigUseNo1': valve_dtype1, 
    'DNNo1': valve_dsize1, 
    'BarNo1': valve_dsetting1, 
    'PRVDate1': valve_ddate1, 
    'MakeNo2': valve_dmake2, 
    'FigUseNo2': valve_dtype2, 
    'DNNo2': valve_dsize2, 
    'BarNo2': valve_dsetting2, 
    'PRVDate2': valve_ddate2, 
    'MakeNo3': valve_dmake3, 
    'FigUseNo3': valve_dtype3, 
    'DNNo3': valve_dsize3, 
    'BarNo3': valve_dsetting3, 
    'PRVDate3': valve_ddate3, 
    'Manufacturer': booster_manufacturer1, 
    'Model': booster_model1, 
    'Serial No': booster_serial1, 
    'BoosterDate1': booster_date1, 
    'No1Maximum Inlet Pressure mbar': booster_inlet1, 
    'No1Maximum Pressure Lift mbar': booster_pressure1, 
    'No1Maximum Outlet Pressure mbar': booster_outlet1, 
    'No1Low pressure cutoff devices operating': booster_cutoff1, 
    'No1Minimum setting of 10mbar': booster_10mbar1, 
    'Booster Safe 1': booster_safe1, 
    'Manufacturer2': booster_manufacturer2, 
    'Model2': booster_model2, 
    'Serial No2': booster_serial2, 
    'BoosterDate2': booster_date2, 
    'No2Maximum Inlet Pressure mbar': booster_inlet2, 
    'No2Maximum Pressure Lift mbar': booster_pressure2, 
    'No2Maximum Outlet Pressure mbar': booster_outlet2, 
    'No2Low pressure cutoff devices operating': booster_cutoff2, 
    'No2Minimum setting of 10mbar': booster_10mbar2, 
    'Booster Safe 2': booster_safe2, 
    'Manufacturer3': booster_manufacturer3, 
    'Model3': booster_model3, 
    'Serial No3': booster_serial3, 
    'BoosterDate3': booster_date3, 
    'No3Maximum Inlet Pressure mbar': booster_inlet3, 
    'No3Maximum Pressure Lift mbar': booster_pressure3, 
    'No3Maximum Outlet Pressure mbar': booster_outlet3, 
    'No3Low pressure cutoff devices operating': booster_cutoff3, 
    'No3Minimum setting of 10mbar': booster_10mbar3, 
    'Booster Safe 3': booster_safe3, 
    'Has a warningadvice notice been raised': warning_advice_si, 
    'Has a warning labels been attached': warning_labels_attatched, 
    'Has responsible person been advised': resp_person_ad_si, 
    'Warning notice ID Numberif applicable GP14': warning_notice_id
    }

    # Update the PDF
    pdf_path = '/home/ubuntu/bknd/pdfs/CP15/master/CP15(CommericalServicing)Master.pdf'
    output_pdf_filename = f'CP15_{dateOfVisit}.pdf'
    output_pdf_path = '/home/ubuntu/bknd/pdfs/CP15/updated/cp15updated.pdf'

    fillpdfs.write_fillable_pdf(pdf_path, output_pdf_path, data_dict)
    """fillpdfs.flatten_pdf(output_pdf_path, output_pdf_path)"""
    
    # Create a copy with the current date in the filenam
    output_copy_path = os.path.join('/home/ubuntu/bknd/pdfs/CP15/updated', f'CP15_{dateOfVisit}.pdf')

    shutil.copy(output_pdf_path, output_copy_path)

    
    # Return the file content
    with open(output_pdf_path, 'rb') as file:
        file_content = file.read()

    return send_file(
        io.BytesIO(file_content),
        download_name='updated.pdf',
        as_attachment=True,
        mimetype='application/pdf'
    )


@app.route('/update_cp16', methods=['POST'])
def update_cp16():
    # Check if the user is logged in
    if 'user_id' not in session:
        return jsonify({'error': 'User not logged in'}), 401

    # Fetch the current user's information
    user_id = session['user_id']
    current_user = Users.query.get(user_id)

        # Check if the user exists
    if not current_user:
        return jsonify({'error': 'User not found'}), 404

    # Access user details (fullname, gas_safe_license_no, position_held)
    fullname = current_user.username
    gas_safe_license_no = current_user.gas_safe_license_no
    position_held = current_user.position_held

    data = request.get_json()
    
    print("Received data:", data)

    # Extract data from the request
    jobNum = data.get('jobNum')
    siteName =  data.get('siteName')
    siteAddress = data.get('siteAddress')
    sitePostCode  = data.get('sitePostCode')
    siteContact  = data.get('siteContact')
    siteNum  = data.get('siteNum')

    testMethod  = data.get('testMethod')
    installation  = data.get('installation')
    isolatedComp  = data.get('isolatedComp')
    calcStrength  = data.get('calcStrength')
    testMedium  = data.get('testMedium')
    stabilisationPeriod  = data.get('stabilisationPeriod')
    strengthTestDur  = data.get('strengthTestDur')
    permPressure  = data.get('permPressure')
    calmPressure  = data.get('calmPressure')
    findings  = data.get('findings')
    pressureDrop  = data.get('pressureDrop')
    strengthPF  = data.get('strengthPF')

    gasType  = data.get('gasType')
    tightnessTestMethod  = data.get('tightnessTestMethod')
    weatherChange  = data.get('weatherChange')
    meterType  = data.get('meterType')
    meterDesignation  = data.get('meterDesignation')
    meterBypass  = data.get('meterBypass')
    installationVolume  = data.get('installationVolume')
    installationPipework  = data.get('installationPipework')
    totalIV  = data.get('totalIV')
    testMediumFGA  = data.get('testMediumFGA')
    tightnessTestPressure  = data.get('tightnessTestPressure')
    pressureGuageType  = data.get('pressureGuageType')
    maxLeak  = data.get('maxLeak')
    testPeriod  = data.get('testPeriod')
    stablePeriod  = data.get('stablePeriod')
    tightnessTestDuration  = data.get('tightnessTestDuration')
    ventilatedAreas  = data.get('ventilatedAreas')
    barometricPressure  = data.get('barometricPressure')
    tightnessFindings  = data.get('tightnessFindings')
    pressureDropActual  = data.get('pressureDropActual')
    leakRateActual  = data.get('leakRateActual')
    ventilatedAreasChecked  = data.get('ventilatedAreasChecked')
    tightnessPass  = data.get('tightnessPass')

    riskAssessment  = data.get('riskAssessment')
    purgeWriteUp  = data.get('purgeWriteUp')
    noSmoking  = data.get('noSmoking')
    purgeAdvice  = data.get('purgeAdvice')
    valveLabeling  = data.get('valveLabeling')
    nitrogenCheck  = data.get('nitrogenCheck')
    extinguisherCheck  = data.get('extinguisherCheck')
    radioCheck  = data.get('radioCheck')
    elecBondCheck  = data.get('elecBondCheck')
    calcPurgeVolume  = data.get('calcPurgeVolume')
    pipeworkFittingCheck  = data.get('pipeworkFittingCheck')
    totalPurgeVolume  = data.get('totalPurgeVolume')
    gasDeviceCheck  = data.get('gasDeviceCheck')

    purgeNoting  = data.get('purgeNoting')
    purgePass  = data.get('purgePass')

    remedialDescription  = data.get('remedialDescription')
    strengthTest  = data.get('strengthTest')
    purgeTest  = data.get('purgeTest')
    tightnessTest  = data.get('tightnessTest')
    emailedTo  = data.get('emailedTo')
    copyDeclined  = data.get('copyDeclined')


    today = date.today()
    dateOfVisit = today.strftime('%d_%m_%Y')
    # Create a data dictionary for fillpdfs.write_fillable_pdf

    data_dict = {
    'Text8': jobNum,
    'Text2': siteName, 
    'Text3': siteAddress, 
    'Text4': sitePostCode, 
    'Text5': siteContact, 
    'Text6': siteNum, 
    'Text7': gas_safe_license_no, 
    'Text9': fullname, 
    'Text10': position_held, 
    'Date11_af_date': dateOfVisit, 
    'STRENGTH TEST DETAILSRow1': testMethod, 
    'STRENGTH TEST DETAILSRow2': installation, 
    'STRENGTH TEST DETAILSRow3': isolatedComp, 
    'STRENGTH TEST DETAILSRow4': calcStrength, 
    'STRENGTH TEST DETAILSRow5': testMedium, 
    'STRENGTH TEST DETAILSRow6': stabilisationPeriod, 
    'STRENGTH TEST DETAILSRow7': strengthTestDur, 
    'STRENGTH TEST DETAILSRow8': permPressure, 
    'STRENGTH TEST DETAILSRow9': calmPressure, 
    'STRENGTH TEST DETAILSRow10': findings, 
    'STRENGTH TEST DETAILSRow11': pressureDrop, 
    'STRENGTH TEST DETAILSRow12': strengthPF, 
    'TIGHTNESS TEST DETAILSRow1': gasType, 
    'TIGHTNESS TEST DETAILSRow2': tightnessTestMethod, 
    'TIGHTNESS TEST DETAILSRow3': weatherChange, 
    'TIGHTNESS TEST DETAILSRow4': meterType, 
    'TIGHTNESS TEST DETAILSRow5': meterDesignation, 
    'TIGHTNESS TEST DETAILSRow6': meterBypass, 
    'TIGHTNESS TEST DETAILSRow7': installationVolume, 
    'TIGHTNESS TEST DETAILSRow8': installationPipework, 
    'TIGHTNESS TEST DETAILSRow9': totalIV, 
    'TIGHTNESS TEST DETAILSRow10': testMediumFGA, 
    'TIGHTNESS TEST DETAILSRow11': tightnessTestPressure, 
    'TIGHTNESS TEST DETAILSRow12': pressureGuageType, 
    'TIGHTNESS TEST DETAILSRow13': maxLeak, 
    'TIGHTNESS TEST DETAILSRow14': testPeriod, 
    'TIGHTNESS TEST DETAILSRow15': stablePeriod, 
    'TIGHTNESS TEST DETAILSRow16': tightnessTestDuration, 
    'TIGHTNESS TEST DETAILSRow17': ventilatedAreas, 
    'TIGHTNESS TEST DETAILSRow18': barometricPressure, 
    'TIGHTNESS TEST DETAILSRow19': tightnessFindings, 
    'TIGHTNESS TEST DETAILSRow20': pressureDropActual, 
    'TIGHTNESS TEST DETAILSRow21': leakRateActual, 
    'TIGHTNESS TEST DETAILSRow22': ventilatedAreasChecked, 
    'TIGHTNESS TEST DETAILSRow23': tightnessPass, 
    'PURGING PROCEDURE DETAILSRow1': riskAssessment, 
    'PURGING PROCEDURE DETAILSRow2': purgeWriteUp, 
    'PURGING PROCEDURE DETAILSRow3': noSmoking, 
    'PURGING PROCEDURE DETAILSRow4': purgeAdvice, 
    'PURGING PROCEDURE DETAILSRow5': valveLabeling, 
    'PURGING PROCEDURE DETAILSRow6': nitrogenCheck, 
    'PURGING PROCEDURE DETAILSRow7': extinguisherCheck, 
    'PURGING PROCEDURE DETAILSRow8': radioCheck, 
    'PURGING PROCEDURE DETAILSRow9': elecBondCheck, 
    'PURGING PROCEDURE DETAILSRow10': calcPurgeVolume, 
    'PURGING PROCEDURE DETAILSRow11': pipeworkFittingCheck, 
    'PURGING PROCEDURE DETAILSRow12':  totalPurgeVolume,
    'PURGING PROCEDURE DETAILSRow13': gasDeviceCheck, 
    'FindingsRow1': purgeNoting, 
    'FindingsRow2': purgePass, 
    'Text1': remedialDescription, 
    'ste test': strengthTest, 
    'purge': purgeTest, 
    'tightness test': tightnessTest, 
    'Form given to': emailedTo, 
    'Check Box21': '', 
    'Check Box22': '', 
    'Signature16': '', 
    'Signature17': '', 
    'Signature18': '', 
    'Signature19': ''
}

    # Update the PDF
    pdf_path = '/home/ubuntu/bknd/pdfs/CP16/master/CP16(GasTightnessPurgingStrength)Master.pdf'
    output_pdf_filename = f'CP16_{dateOfVisit}.pdf'
    output_pdf_path = '/home/ubuntu/bknd/pdfs/CP16/updated/test.pdf'

    fillpdfs.write_fillable_pdf(pdf_path, output_pdf_path, data_dict)
    """fillpdfs.flatten_pdf(output_pdf_path, output_pdf_path)"""
    
    # Create a copy with the current date in the filenam
    output_copy_path = os.path.join('/home/ubuntu/bknd/pdfs/CP16/updated', f'CP16_{dateOfVisit}.pdf')

    shutil.copy(output_pdf_path, output_copy_path)

    
    # Return the file content
    with open(output_pdf_path, 'rb') as file:
        file_content = file.read()

    return send_file(
        io.BytesIO(file_content),
        download_name='updated.pdf',
        as_attachment=True,
        mimetype='application/pdf'
    )


@app.route('/update_cp17', methods=['POST'])
def update_cp17():
    # Check if the user is logged in
    if 'user_id' not in session:
        return jsonify({'error': 'User not logged in'}), 401

    # Fetch the current user's information
    user_id = session['user_id']
    current_user = Users.query.get(user_id)

        # Check if the user exists
    if not current_user:
        return jsonify({'error': 'User not found'}), 404

    # Access user details (fullname, gas_safe_license_no, position_held)
    fullname = current_user.username
    gas_safe_license_no = current_user.gas_safe_license_no
    position_held = current_user.position_held

    data = request.get_json()
    
    print("Received data:", data)

    # Extract data from the request
    jobNum = data.get('jobNum')
    siteName = data.get('siteName')
    siteAddress = data.get('siteAddress')
    sitePostCode = data.get('sitePostCode')
    siteContact = data.get('siteContact')
    siteNum = data.get('siteNum')

    appliLocation1 = data.get('appliLocation1')
    appliType1 = data.get('appliType1')
    appliMake1 = data.get('appliMake1')
    appliModel1 = data.get('appliModel1')
    safetyDeviceCorrect1 = data.get('safetyDeviceCorrect1')
    operatingPressure1 = data.get('operatingPressure1')
    ventilationProvision1 = data.get('ventilationProvision1')
    flueType1 = data.get('flueType1')
    flueCondition1 = data.get('flueCondition1')
    flueFlow1 = data.get('flueFlow1')
    spillageTest1 = data.get('spillageTest1')
    appliSafe1 = data.get('appliSafe1')

    appliLocation2 = data.get('appliLocation2')
    appliType2 = data.get('appliType2')
    appliMake2 = data.get('appliMake2')
    appliModel2 = data.get('appliModel2')
    safetyDeviceCorrect2 = data.get('safetyDeviceCorrect2')
    operatingPressure2 = data.get('operatingPressure2')
    ventilationProvision2 = data.get('ventilationProvision2')
    flueType2 = data.get('flueType2')
    flueCondition2 = data.get('flueCondition2')
    flueFlow2 = data.get('flueFlow2')
    spillageTest2 = data.get('spillageTest2')
    appliSafe2 = data.get('appliSafe2')

    appliLocation3 = data.get('appliLocation3')
    appliType3 = data.get('appliType3')
    appliMake3 = data.get('appliMake3')
    appliModel3 = data.get('appliModel3')
    safetyDeviceCorrect3 = data.get('safetyDeviceCorrect3')
    operatingPressure3 = data.get('operatingPressure3')
    ventilationProvision3 = data.get('ventilationProvision3')
    flueType3 = data.get('flueType3')
    flueCondition3 = data.get('flueCondition3')
    flueFlow3 = data.get('flueFlow3')
    spillageTest3 = data.get('spillageTest3')
    appliSafe3 = data.get('appliSafe3')

    appliLocation4 = data.get('appliLocation4')
    appliType4 = data.get('appliType4')
    appliMake4 = data.get('appliMake4')
    appliModel4 = data.get('appliModel4')
    safetyDeviceCorrect4 = data.get('safetyDeviceCorrect4')
    operatingPressure4 = data.get('operatingPressure4')
    ventilationProvision4 = data.get('ventilationProvision4')
    flueType4 = data.get('flueType4')
    flueCondition4 = data.get('flueCondition4')
    flueFlow4 = data.get('flueFlow4')
    spillageTest4 = data.get('spillageTest4')
    appliSafe4 = data.get('appliSafe4')

    appliLocation5 = data.get('appliLocation5')
    appliType5 = data.get('appliType5')
    appliMake5 = data.get('appliMake5')
    appliModel5 = data.get('appliModel5')
    safetyDeviceCorrect5 = data.get('safetyDeviceCorrect5')
    operatingPressure5 = data.get('operatingPressure5')
    ventilationProvision5 = data.get('ventilationProvision5')
    flueType5 = data.get('flueType5')
    flueCondition5 = data.get('flueCondition5')
    flueFlow5 = data.get('flueFlow5')
    spillageTest5 = data.get('spillageTest5')
    appliSafe5 = data.get('appliSafe5')

    appliLocation6 = data.get('appliLocation6')
    appliType6 = data.get('appliType6')
    appliMake6 = data.get('appliMake6')
    appliModel6 = data.get('appliModel6')
    safetyDeviceCorrect6 = data.get('safetyDeviceCorrect6')
    operatingPressure6 = data.get('operatingPressure6')
    ventilationProvision6 = data.get('ventilationProvision6')
    flueType6 = data.get('flueType6')
    flueCondition6 = data.get('flueCondition6')
    flueFlow6 = data.get('flueFlow6')
    spillageTest6 = data.get('spillageTest6')
    appliSafe6 = data.get('appliSafe6')

    installAccessable = data.get('installAccessable')
    meterRoomVent = data.get('meterRoomVent')
    meterRoomSecure = data.get('meterRoomSecure')
    meterRoomClear = data.get('meterRoomClear')
    meterRoomLocked = data.get('meterRoomLocked')
    diagramFixed = data.get('diagramFixed')
    diagramCurrent = data.get('diagramCurrent')
    emergencyValve = data.get('emergencyValve')
    emergencyValveHandles = data.get('emergencyValveHandles')
    colorCoded = data.get('colorCoded')
    crossBonded = data.get('crossBonded')
    isSleeved = data.get('isSleeved')
    testsCarriedOut = data.get('testsCarriedOut')

    detailsOfWork = data.get('detailsOfWork')
    detailsOfRemedials = data.get('detailsOfRemedials')
    warningAdvice = data.get('warningAdvice')
    warningLabels = data.get('warningLabels')
    respPerson = data.get('respPerson')
    warningID = data.get('warningID')



    today = date.today()
    dateOfVisit = today.strftime('%d_%m_%Y')
    # Create a data dictionary for fillpdfs.write_fillable_pdf

    data_dict = {'Job Number': jobNum, 
    'Name': siteName, 
    'Address': siteAddress, 
    'Post Code': sitePostCode, 
    'Site Contact': siteContact, 
    'Contact No': siteNum, 
    '520592Gas Safe Card Serial No': gas_safe_license_no, 
    '520592Engineer Name': fullname, 
    '520592Position Held': position_held, 
    'Date2_af_date': dateOfVisit, 
    'Unit 1 Name': '', 
    'Unit 1Application Type': appliType1, 
    'Unit 1Location': appliLocation1, 
    'Unit 1Unit Make': appliMake1, 
    'Unit 1Unit Model': appliModel1, 
    'Unit 1Safety Devises correct': safetyDeviceCorrect1, 
    'Unit 1Operating pressure or heat input kWh': operatingPressure1, 
    'Unit 1Ventilation provision': ventilationProvision1, 
    'Unit 1Flue Type': flueType1, 
    'Unit 1Visual condition of flue and termination': flueCondition1, 
    'Unit 1Flue flow': flueFlow1, 
    'Unit 1Spillage Test': spillageTest1, 
    'Unit 1Is application safe for use': appliSafe1, 
    'Unit 2 Name': '', 
    'Unit 2Application Type': appliLocation2, 
    'Unit 2Location': appliLocation2, 
    'Unit 2Unit Make': appliMake2, 
    'Unit 2Unit Model': appliModel2, 
    'Unit 2Safety Devises correct': safetyDeviceCorrect2, 
    'Unit 2Operating pressure or heat input kWh': operatingPressure2, 
    'Unit 2Ventilation provision': ventilationProvision2, 
    'Unit 2Flue Type': flueType2, 
    'Unit 2Visual condition of flue and termination': flueCondition2, 
    'Unit 2Flue flow': flueFlow2, 
    'Unit 2Spillage Test': spillageTest2, 
    'Unit 2Is application safe for use': appliSafe2, 
    'Unit 3 Name': '', 
    'Unit 3Application Type': appliType3, 
    'Unit 3Location': appliLocation3, 
    'Unit 3Unit Make': appliMake3, 
    'Unit 3Unit Model': appliModel3, 
    'Unit 3Safety Devises correct': safetyDeviceCorrect3, 
    'Unit 3Operating pressure or heat input kWh': operatingPressure3, 
    'Unit 3Ventilation provision': ventilationProvision3, 
    'Unit 3Flue Type': flueType3, 
    'Unit 3Visual condition of flue and termination': flueCondition3, 
    'Unit 3Flue flow': flueFlow3, 
    'Unit 3Spillage Test': spillageTest3, 
    'Unit 3Is application safe for use': appliSafe3, 
    'Unit 4 Name': '', 
    'Unit 4Application Type': appliType4, 
    'Unit 4Location': appliLocation4, 
    'Unit 4Unit Make': appliMake4, 
    'Unit 4Unit Model': appliModel4, 
    'Unit 4Safety Devises correct': safetyDeviceCorrect4, 
    'Unit 4Operating pressure or heat input kWh': operatingPressure4, 
    'Unit 4Ventilation provision': ventilationProvision4, 
    'Unit 4Flue Type': flueType4, 
    'Unit 4Visual condition of flue and termination': flueCondition4, 
    'Unit 4Flue flow': flueFlow4, 
    'Unit 4Spillage Test': spillageTest4, 
    'Unit 4Is application safe for use': appliSafe4, 
    'Unit 5 Name': '', 
    'Unit 5Application Type': appliType5, 
    'Unit 5Location': appliLocation5, 
    'Unit 5Unit Make': appliMake5, 
    'Unit 5Unit Model': appliModel5, 
    'Unit 5Safety Devises correct': safetyDeviceCorrect5, 
    'Unit 5Operating pressure or heat input kWh': operatingPressure5, 
    'Unit 5Ventilation provision': ventilationProvision5, 
    'Unit 5Flue Type': flueType5, 
    'Unit 5Visual condition of flue and termination': flueCondition5, 
    'Unit 5Flue flow': flueFlow5, 
    'Unit 5Spillage Test': spillageTest5, 
    'Unit 5Is application safe for use': appliSafe5, 
    'Unit 6 Name': '', 
    'Unit 6Application Type': appliLocation6, 
    'Unit 6Location': appliType6, 
    'Unit 6Unit Make': appliMake6, 
    'Unit 6Unit Model': appliModel6, 
    'Unit 6Safety Devises correct': safetyDeviceCorrect6, 
    'Unit 6Operating pressure or heat input kWh': operatingPressure6, 
    'Unit 6Ventilation provision': ventilationProvision6, 
    'Unit 6Flue Type': flueType6, 
    'Unit 6Visual condition of flue and termination': flueCondition6, 
    'Unit 6Flue flow': flueFlow6, 
    'Unit 6Spillage Test': spillageTest6, 
    'Unit 6Is application safe for use': appliSafe6, 
    'Is the installation accessible': installAccessable, 
    'Is the meter roomcompartment adequately ventilated': meterRoomVent, 
    'Is the meter roomcompartment secure': meterRoomSecure, 
    'Is the meter roomcompartment clear of combustibles etc': meterRoomClear, 
    'Is the meter roomcompartment lock key clearly labelled': meterRoomLocked, 
    'Is a gas installation line diagram fixed near the primary meter': diagramFixed, 
    'Is the gas installation diagram current': diagramCurrent, 
    'Are adequate emergencyisolation valves fitted': emergencyValve, 
    'Are emergencyisolation valve handles in place and suitably labelled': emergencyValveHandles, 
    'Is pipework colour codedidentified': colorCoded, 
    'Is the gas installation electrically cross bonded': crossBonded, 
    'Is pipework suitably sleeved and sealed as appropriate': isSleeved, 
    'Has a gas strengthtightness test been carried out If yes see separate gas testing and purging certificate NonDomestic': testsCarriedOut, 
    'Details of work Carried OutRow1': detailsOfWork, 
    'Details of Remedials RequiredRow1': detailsOfRemedials, 
    'Has a warningadvice notice been raised': warningAdvice, 
    'Has a warning labels been attached': warningLabels, 
    'Has responsible person been advised': respPerson, 
    'Warning notice ID Numberif applicable GP14': warningID,
    }

    # Update the PDF
    pdf_path = '/home/ubuntu/bknd/pdfs/CP17/master/CP17(Breakdown)Master.pdf'
    output_pdf_filename = f'CP16_{dateOfVisit}.pdf'
    output_pdf_path = '/home/ubuntu/bknd/pdfs/CP17/updated/updated.pdf'

    fillpdfs.write_fillable_pdf(pdf_path, output_pdf_path, data_dict)
    """fillpdfs.flatten_pdf(output_pdf_path, output_pdf_path)"""
    
    # Create a copy with the current date in the filenam
    output_copy_path = os.path.join('/home/ubuntu/bknd/pdfs/CP17/updated', f'CP17_{dateOfVisit}.pdf')

    shutil.copy(output_pdf_path, output_copy_path)

    
    # Return the file content
    with open(output_pdf_path, 'rb') as file:
        file_content = file.read()

    return send_file(
        io.BytesIO(file_content),
        download_name='updated.pdf',
        as_attachment=True,
        mimetype='application/pdf'
    )







@app.route('/update_pdf_link', methods=['POST'])
def update_pdf_link():
    # For simplicity in testing, no actual update is performed
    # Return the public URL for the existing PDF
    file_url = f'http://{request.host}/files/updated.pdf'
    return jsonify({'file_url': file_url})

# Route for fetching the CP15 PDF link
@app.route('/get_cp15_pdf_link', methods=['GET'])
def get_cp15_pdf_link():
    # Assuming the PDF is in the 'updated' directory with the same filename format
    pdf_filename = 'CP15_{}.pdf'.format(date.today().strftime('%d_%m_%Y'))
    file_url = f'http://{request.host}/files/cp15/{pdf_filename}'
    return jsonify({'file_url': file_url})

# Route for fetching the CP16 PDF link
@app.route('/get_cp16_pdf_link', methods=['GET'])
def get_cp16_pdf_link():
    # Assuming the PDF is in the 'updated' directory with the same filename format
    pdf_filename = 'CP16_{}.pdf'.format(date.today().strftime('%d_%m_%Y'))
    file_url = f'http://{request.host}/files/updated/{pdf_filename}'
    return jsonify({'file_url': file_url})

# Route for fetching the CP16 PDF link
@app.route('/get_cp17_pdf_link', methods=['GET'])
def get_cp17_pdf_link():
    # Assuming the PDF is in the 'updated' directory with the same filename format
    pdf_filename = 'CP17_{}.pdf'.format(date.today().strftime('%d_%m_%Y'))
    file_url = f'http://{request.host}/files/cp17/{pdf_filename}'
    return jsonify({'file_url': file_url})


# Configure static file serving for the 'updated' directory
@app.route('/files/updated/<path:filename>')
def serve_updated_file(filename):
    return send_from_directory('/home/ubuntu/bknd/pdfs/CP16/updated', filename)

pdf_directory_cp17 = '/home/ubuntu/bknd/pdfs/CP17/updated/'

pdf_directory_cp15 = '/home/ubuntu/bknd/pdfs/CP15/updated/'

# Route for serving the CP17 PDF file
@app.route('/files/cp15/<path:filename>')
def serve_cp15_file(filename):
    return send_from_directory(pdf_directory_cp15, filename)


# Route for serving the CP17 PDF file
@app.route('/files/cp17/<path:filename>')
def serve_cp17_file(filename):
    return send_from_directory(pdf_directory_cp17, filename)


@app.route('/files/<filename>')
def serve_file(filename):
    # Serve the existing PDF directly
    return send_file(existing_pdf_path, as_attachment=True, mimetype='application/pdf')


@app.route('/download-pdf', methods=['GET'])
def download_pdf():
    return send_file(r'/home/ubuntu/bknd/pdfs/CP12/updated/updated.pdf', as_attachment=True, mimetype='application/pdf')

@app.route('/get_current_username', methods=['GET'])
def get_current_username():
    # Check if the user is logged in
    if 'user_id' not in session:
        return jsonify({'error': 'User not logged in'}), 401

    # Fetch the current user's information
    user_id = session['user_id']
    current_user = Users.query.get(user_id)

    # Check if the user exists
    if not current_user:
        return jsonify({'error': 'User not found'}), 404

    # Access user details (username or fullname, depending on your model)
    username = current_user.username  # Replace with the actual field in your model

    return jsonify({'username': username}), 200

@app.route('/cp12_pdfs', methods=['GET'])
def get_cp12_pdfs():
    pdfs_directory = '/home/ubuntu/bknd/pdfs/CP12/updated'
    pdf_files = [f for f in os.listdir(pdfs_directory) if f.endswith(".pdf")]

    pdf_urls = [f'http://51.21.134.104:5000/files/{pdf}' for pdf in pdf_files]

    return jsonify({'pdf_urls': pdf_urls})

@app.route('/request_recents', methods=['POST'])
def request_recents():
    try:
        data = request.get_json()
        pdf_url = data.get('pdfUrl')

        # Implement your access control logic here
        # For simplicity, this example grants access if the PDF URL is not empty
        granted = bool(pdf_url)

        return jsonify({'granted': granted})
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/get_pdf_info', methods=['GET'])
def get_pdf_info():
    pdf_info = []

    pdf_dirs = ['/home/ubuntu/bknd/pdfs/CP16/updated', '/home/ubuntu/bknd/pdfs/CP12/updated', '/home/ubuntu/bknd/pdfs/CP17/updated']

    for pdf_dir in pdf_dirs:
        for filename in os.listdir(pdf_dir):
            if filename.endswith(".pdf"):
                filepath = os.path.join(pdf_dir, filename)
                if pdf_dir.endswith("CP16/updated"):
                    file_url = f'http://51.21.134.104:5000/files/updated/{filename}'
                elif pdf_dir.endswith("CP17/updated"):
                    file_url = f'http://51.21.134.104:5000/files/cp17/{filename}'
                elif pdf_dir.endswith("CP15/updated"):
                    file_url = f'http://51.21.134.104:5000/files/cp15/{filename}'
                elif pdf_dir.endswith("CP12/updated"):
                    # Assuming filename is in the format CP12_02_02_2024.pdf
                    cp12_date = filename.split('_')[1:-1]
                    formatted_date = "_".join(cp12_date)
                    file_url = f'http://51.21.134.104:5000/files/CP12_{formatted_date}.pdf'
                else:
                    continue

                date_created = datetime.fromtimestamp(os.path.getctime(filepath)).strftime('%Y-%m-%d %H:%M:%S')
                pdf_info.append({'filename': filename, 'date_created': date_created, 'file_url': file_url})

    return jsonify(pdf_info)


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
