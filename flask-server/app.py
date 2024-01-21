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
    job_number = data.get('jobNumber')
    gas_safe_license = data.get('gasSafeLicense')
    print_name = data.get('printName')
    positionHeld =  data.get('positionHeld')
    jobAddress =  data.get('jobAddress')
    postcode = data.get('postcode')
    telNo = data.get('telNo')
    landlordName  = data.get('landlordName')
    landlordAddress  = data.get('landlordAddress')
    landlordPostcode  = data.get('landlordPostcode')
    landlordTelNo = data.get('landlordTelNo')
    appliancesTested = data.get('appliancesTested')
    appliance_details_data = data.get('applianceDetails')
    inspection_details_data = data.get('inspectionDetailsTable')
    inspectionDetails = data.get('inspectionDetails')
    warningSerialNo = data.get('warningSerialNo')
    remedialAction = data.get('remedialAction')
    gasInstallationChecked = data.get('gasInstallationChecked')
    ecvAccessibleChecked = data.get('ecvAccessibleChecked')
    protectiveEquipmentChecked = data.get('protectiveEquipmentChecked')
    # ... (extract other data)

    
    inspection_details = []
    for row in inspection_details_data:
        # Assuming each row is a list
        inspection_details.append({
            'Operating pressure in mbar or heat input inkW': row[0],
            'Initial combustion analyser reading if applicable': row[1],
            'Final combustion analyser reading if applicable': row[2],
            'Safety devices correct operation YesNoNA': row[3],
            'Ventilation provision satisfactory YesNo': row[4],
            'Visual condition of chimneytermination Satisfactory PassFailNA': row[5],
            'Flue performance checks PassFailNA': row[6],
            'Appliance serviced YesNo': row[7],
            'Appliance safe to use YesNo': row[8],
            'Approved CO alarm fitted YesNoNARow': row[9],
            'Is CO alarm in date YesNoNARow': row[10],
            'Testing of CO alarm satisfactory YesNoNARow': row[11],
        })

    # Create a data dictionary for fillpdfs.write_fillable_pdf
    data_dict = {
    'Job number': job_number,
    'ID Card Serial No': gas_safe_license_no,
    'Print name': fullname,
    'Gas operative': position_held,
    'Dateofvisit': '1',
    'Name MrMrsMissMs': print_name,
    'Address 1': jobAddress,
    'Postcode_2': postcode,
    'Tel No_2': telNo,
    'Name MrMrsMissMs_2': landlordName,
    'Address 1_2': landlordAddress,
    'Address 3_2': '',
    'Postcode': landlordPostcode,
    'Tel No': landlordTelNo,
    'Number of appliances tested': appliancesTested,
    'Location1': 'L1',
    'Appliance type1': 'AT1',
    'Make1': 'M1',
    'Model1': 'MO1',
    'Landlords appliance YesNoNA1': 'LA1',
    'Landlords inspected YesNo1': 'LI1',
    'Flue Type OFRSFL1': 'FT1',
    'Location2': 'L2',
    'Appliance type2': 'AT2',
    'Make2': 'M2',
    'Model2': 'MO2',
    'Landlords appliance YesNoNA2': 'LA2',
    'Landlords inspected YesNo2': 'LI2',
    'Flue Type OFRSFL2': 'FT2',
    'Location3': 'L3',
    'Appliance type3': 'AT3',
    'Make3': 'M3',
    'Model3': 'MO3',
    'Landlords appliance YesNoNA3': 'LA3',
    'Landlords inspected YesNo3': 'LI3',
    'Flue Type OFRSFL3': 'FT3',
    'Location4': 'L4',
    'Appliance type4': 'AT4',
    'Make4': 'M4',
    'Model4': 'MO4',
    'Landlords appliance YesNoNA4': 'LA4',
    'Landlords inspected YesNo4': 'LI4',
    'Flue Type OFRSFL4': 'FT4',
    'Operating pressure in mbar or heat input inkW1': 'OP1',
    'Initial combustion analyser reading if applicable1': 'ICA1',
    'Final combustion analyser reading if applicable1': 'FCA1',
    'Safety devices correct operation YesNoNA1': 'SDC1',
    'Ventilation provision satisfactory YesNo1': 'VPS1',
    'Visual condition of chimneytermination Satisfactory PassFailNA1': 'VCO1',
    'Flue performance checks PassFailNA1': 'FPC1',
    'Appliance serviced YesNo1': 'ASYN1',
    'Appliance safe to use YesNo1': 'ASTU1',
    'Approved CO alarm fitted YesNoNARow1': 'ACAF1',
    'Is CO alarm in date YesNoNARow1': 'ICAID1',
    'Testing of CO alarm satisfactory YesNoNARow1': 'TOCAS1',
    'Operating pressure in mbar or heat input inkW2': 'OP2',
    'Initial combustion analyser reading if applicable2': 'ICA2',
    'Final combustion analyser reading if applicable2': 'FCA2',
    'Safety devices correct operation YesNoNA2': 'SDC2',
    'Ventilation provision satisfactory YesNo2': 'VPS2',
    'Visual condition of chimneytermination Satisfactory PassFailNA2': 'VCO2',
    'Flue performance checks PassFailNA2': 'FPC2',
    'Appliance serviced YesNo2': 'ASYN2',
    'Appliance safe to use YesNo2': 'ASTU2',
    'Approved CO alarm fitted YesNoNARow2': 'ACAF2',
    'Is CO alarm in date YesNoNARow2': 'ICAID2',
    'Testing of CO alarm satisfactory YesNoNARow2': 'TOCAS2',
    'Operating pressure in mbar or heat input inkW3': 'OP3',
    'Initial combustion analyser reading if applicable3': 'ICA3',
    'Final combustion analyser reading if applicable3': 'FCA3',
    'Safety devices correct operation YesNoNA3': 'SDC3',
    'Ventilation provision satisfactory YesNo3': 'VPS3',
    'Visual condition of chimneytermination Satisfactory PassFailNA3': 'VCO3',
    'Flue performance checks PassFailNA3': 'FPC3',
    'Appliance serviced YesNo3': 'ASYN3',
    'Appliance safe to use YesNo3': 'ASTU3',
    'Approved CO alarm fitted YesNoNARow3': 'ACAF3',
    'Is CO alarm in date YesNoNARow3': 'ICAID3',
    'Testing of CO alarm satisfactory YesNoNARow3': 'TOCAS3',
    'Operating pressure in mbar or heat input inkW4': 'OP4',
    'Initial combustion analyser reading if applicable4': 'ICA4',
    'Final combustion analyser reading if applicable4': 'FCA4',
    'Safety devices correct operation YesNoNA4': 'SDC4',
    'Ventilation provision satisfactory YesNo4': 'VPS4',
    'Visual condition of chimneytermination Satisfactory PassFailNA4': 'VCO4',
    'Flue performance checks PassFailNA4': 'FPC4',
    'Appliance serviced YesNo4': 'ASYN4',
    'Appliance safe to use YesNo4': 'ASTU4',
    'Approved CO alarm fitted YesNoNARow4': 'ACAF4',
    'Is CO alarm in date YesNoNARow4': 'ICAID4',
    'Testing of CO alarm satisfactory YesNoNARow4': 'TOCAS4',
    'Inspection1': inspectionDetails, 'WN1': warningSerialNo, 
    'Details of remedials': remedialAction,
    'Gas installation pipework satisfactory visual inspection YesNo': gasInstallationChecked,
    'undefined': ecvAccessibleChecked, 
    'undefined_2': 'SGT', 
    'undefined_3': protectiveEquipmentChecked, 
    'Print Name': 'ENAME1', 
    'Received by Signed': 'RNAME2'
}
    
    # Iterate over individual appliance details
    for index, appliance in enumerate(appliance_details_data):
        data_dict.update({
            f'Location{index + 1}': appliance.get('location'),
            f'Appliance type{index + 1}': appliance.get('applianceType'),
            f'Make{index + 1}': appliance.get('make'),
            f'Model{index + 1}': appliance.get('model'),
            f'Landlords appliance YesNoNA{index + 1}': appliance.get('isLandlordAppliance'),
            f'Landlords inspected YesNo{index + 1}': appliance.get('isLandlordInspected'),
            f'Flue Type OFRSFL{index + 1}': appliance.get('flueType'),
        })
        
    # Iterate over individual inspection details
    for index, inspection_detail in enumerate(inspection_details):
        for key, value in inspection_detail.items():
            data_dict[f'{key}{index + 1}'] = value

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


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')