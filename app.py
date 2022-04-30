#from distutils.log import debug
from crypt import methods
import os
from urllib import response

from flask_sqlalchemy import SQLAlchemy
import flask_praetorian
from flask import Flask, jsonify, request, render_template
from flask_cors import CORS, cross_origin
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, JWTManager
#import config.app_config

#from crypt import methods
#from urllib import response

#from handlers.TimesheetHandler import TimesheetHandler
#from datetime import datetime

# import handlers
from backend.controllers.TimesheetHandler import BaseTimesheet
from backend.controllers.EmployeeHandler import BaseEmployee
from backend.controllers.SickDaysHandler import BaseSickRequest
app = Flask(__name__)
db = SQLAlchemy(app)                       #initialize SQLAlchemy
guard = flask_praetorian.Praetorian()      #initialize flask praetorian
cors = CORS(app)                #initialize CORS
app.debug = True                           #Change for deployment

app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL')          #set databaase connection string
app.config['JWT_SECRET_KEY'] = os.environ.get('SECRET_KEY')                     #Set encryption secret key

# for debugin purposes only
# import local_env_vars as env
# app.config['SQLALCHEMY_DATABASE_URI'] = env.DB_URL
# app.config['JWT_SECRET_KEY'] = env.SECRET_KEY

app.config['JWT_ACCESS_LIFESPAN'] = {'hours': 24}                                       #JWT Lifespan
app.config['JWT_REFRESH_LIFESPAN'] = {'days' : 30}

jwt = JWTManager(app)

#from daos.UserModel import uaccount                                                     #Import the user model

# guard.init_app(app,uaccount)                                                            #Provide user model to praetorian
db.init_app(app)                                                                        #initiate db connection
cors.init_app(app)

# with app.app_context():                                                                 #Creates an admin account if it doesn't exist right now. Parameters can be modified for different instances. Remove for production
#    if db.session.query(uaccount).filter_by(email='parks').count() < 1:
#        db.session.add(uaccount(
#            first_name='Joe',
#            last_name='Biden',
#            phone_number='7873432343',
#            email = 'joeb@yahoo.com',
#            username='jbiden',
#            password = guard.hash_password('12345'),
#            salary = 90,
#            vacation_days = 40,
#            sick_days = 20,
#            role = 'admin'
#        ))
#        db.session.commit()

# from Blueprints.auth import auth as auth_blueprint           #Imports all the blueprints. Routes are stored in the blueprints to prevent large route file
# from Blueprints.timesheets import timesheets as timesheet_blueprint

# app.register_blueprint(auth_blueprint)
# app.register_blueprint(timesheet_blueprint, url_prefix='/timesheet')


# Routes:
@app.route('/')
def index():
    return 'Welcome to the Timeflocker App!'

@app.route('/login', methods=['POST'])
def login_auth():
    email = request.json.get("user_email", None)
    password = request.json.get("user_password", None)
    user_exists = {
        "user_data": BaseEmployee().userExists(email, password),
        "access_token": create_access_token(identity=email) }
    if  user_exists["user_data"] == "0":
        return jsonify("User Not Found!"), 404
    elif user_exists["user_data"] == "1":
        return jsonify("Incorrect password!"), 401
    else:
        return jsonify(user_exists), 200

@app.route('/employee', methods = ['GET', 'POST', 'PUT'])
def handleEmployee():
    if request.method == "GET":
        return None
    if request.method == "POST":
        return BaseEmployee().addNewUser(request.json)
    if request.method == "PUT":
        return jsonify("This is a PUT")

@app.route('/timesheet/<int:employee_id>', methods = ['GET', 'PUT', 'POST'])
def handleTimesheet(employee_id):
    if request.method == "GET":
        return BaseTimesheet().getTimesheet(employee_id)
    if request.method == "POST":
        return BaseTimesheet().createTimesheet(request.json)
    if request.method == "PUT":
        return jsonify("This is a PUT"), 200

@app.route('/sickRequest/<int:employee_id>', methods = ['GET', 'PUT', 'POST'])
def handleSickRequest(employee_id):
    if request.method == "GET":
        return None
    if request.method == "POST":
        return BaseSickRequest().createSickRequest(request.json)
    if request.method == "PUT":
        return None

# start app with main method
if __name__ == "__main__":
    app.run(debug=True)
