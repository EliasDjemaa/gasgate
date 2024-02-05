from flask import Flask, request, jsonify, send_file, session
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from fillpdf import fillpdfs
import os
import io
import secrets

app = Flask(__name__)
app.config['SECRET_KEY'] = secrets.token_hex(16)
CORS(app, resources={r"/*": {"origins": "*"}})
bcrypt = Bcrypt(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:<admin>@localhost/gas_gate_db'
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

    


    # Create a data dictionary for fillpdfs.write_fillable_pdf
    data_dict = {
    'Job number': job_number,
    'ID Card Serial No': gas_safe_license_no,
    'Print name': fullname,
    'Gas operative': position_held,
    'Dateofvisit': '1',
    'Name MrMrsMissMs': '',
    'Address 1': jobAddress,
    'Postcode_2': 'test',
    'Tel No_2': telNo,
    'Name MrMrsMissMs_2': landlordName,
    'Address 1_2': ' ',
    'Address 3_2': '',
    'Postcode': ' ',
    'Tel No': ' ',
    'Number of appliances tested': ' ',
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
    'Print Name': 'ENAME1', 
    'Received by Signed': 'RNAME2'
}


    # Update the PDF
    pdf_path = r'C:\Users\Elias\Documents\GitHub\gasgate\gasgate\flask-server\CP12(DomesticServicing)Master.pdf'
    output_pdf_path = 'updated.pdf'

    fillpdfs.write_fillable_pdf(pdf_path, output_pdf_path, data_dict)
    fillpdfs.flatten_pdf(output_pdf_path, output_pdf_path)
    
    # Update the PDF
    pdf_path = r'C:\Users\Elias\Documents\GitHub\gasgate\gasgate\flask-server\CP12(DomesticServicing)Master.pdf'
    output_pdf_path = 'updated.pdf'

    fillpdfs.write_fillable_pdf(pdf_path, output_pdf_path, data_dict)
    fillpdfs.flatten_pdf(output_pdf_path, output_pdf_path)

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
    jobNum = data.get('jobNum')
    siteName =  data.get('siteName')
    siteAddress = data.get('siteAddress')
    sitePostCode  = data.get('sitePostCode')
    siteContact  = data.get('siteContact')
    siteNum  = data.get('siteNum')

    testMethod  = data.get('testMethod')
    installation  = data.get('installation')
    testMedium  = data.get('testMedium')
    stabilisationPeriod  = data.get('stabilisationPeriod')
    strengthTestDur  = data.get('strengthTestDur')
    permPressure  = data.get('permPressure')
    calmPressure  = data.get('calmPressure')
    findings  = data.get('findings')
    pressureDrop  = data.get('pressureDrop')
    strengthPF  = data.get('strengthPF')

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

    


    # Create a data dictionary for fillpdfs.write_fillable_pdf
    data_dict = {
    'Job number': job_number,
    'ID Card Serial No': gas_safe_license_no,
    'Print name': fullname,
    'Gas operative': position_held,
    'Dateofvisit': '1',
    'Name MrMrsMissMs': '',
    'Address 1': jobAddress,
    'Postcode_2': 'test',
    'Tel No_2': telNo,
    'Name MrMrsMissMs_2': landlordName,
    'Address 1_2': ' ',
    'Address 3_2': '',
    'Postcode': ' ',
    'Tel No': ' ',
    'Number of appliances tested': ' ',
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
    'Print Name': 'ENAME1', 
    'Received by Signed': 'RNAME2'
}


    # Update the PDF
    pdf_path = r'C:\Users\Elias\Documents\GitHub\gasgate\gasgate\flask-server\CP12(DomesticServicing)Master.pdf'
    output_pdf_path = 'updated.pdf'

    fillpdfs.write_fillable_pdf(pdf_path, output_pdf_path, data_dict)
    fillpdfs.flatten_pdf(output_pdf_path, output_pdf_path)
    
    # Update the PDF
    pdf_path = r'C:\Users\Elias\Documents\GitHub\gasgate\gasgate\flask-server\CP12(DomesticServicing)Master.pdf'
    output_pdf_path = 'updated.pdf'

    fillpdfs.write_fillable_pdf(pdf_path, output_pdf_path, data_dict)
    fillpdfs.flatten_pdf(output_pdf_path, output_pdf_path)

    # Return the file content
    with open(output_pdf_path, 'rb') as file:
        file_content = file.read()

    return send_file(
        io.BytesIO(file_content),
        download_name='updated.pdf',
        as_attachment=True,
        mimetype='application/pdf'
    )


@app.route('/get-pdf-url', methods=['GET'])
def get_pdf_url():
    host = request.host_url  # Get the host URL of the current request
    pdf_url = host + 'download-pdf'  # Combine the host URL with the endpoint
    return jsonify({'pdf_url': pdf_url})

@app.route('/download-pdf', methods=['GET'])
def download_pdf():
    return send_file(r'C:\Users\Elias\Documents\GitHub\gasgate\gasgate\flask-server\updated.pdf', as_attachment=True, mimetype='application/pdf')

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


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')