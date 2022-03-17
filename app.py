#from distutils.log import debug
import os
from flask_sqlalchemy import SQLAlchemy
import flask_praetorian
from flask import Flask, jsonify, request, render_template
from flask_cors import CORS, cross_origin
#import config.app_config

#from crypt import methods
#from urllib import response

#from handlers.TimesheetHandler import TimesheetHandler
#from datetime import datetime

# import handlers
from backend.controllers.TimesheetHandler import BaseTimesheet

app = Flask(__name__)
db = SQLAlchemy(app)                       #initialize SQLAlchemy
guard = flask_praetorian.Praetorian()      #initialize flask praetorian
cors = CORS(app)                #initialize CORS
app.debug = True                           #Change for deployment

app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL')          #set databaase connection string
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY')                     #Set encryption secret key
app.config['JWT_ACCESS_LIFESPAN'] = {'hours': 24}                                       #JWT Lifespan
app.config['JWT_REFRESH_LIFESPAN'] = {'days' : 30}

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

@app.route('/timesheet/<int:employee_id>', methods = ['GET', 'PUT', 'POST'])
def handleTimesheet(employee_id):
    if request.method == "GET":
        return BaseTimesheet().getTimesheet(employee_id)
    if request.method == "POST":
        return jsonify("This is a POST"), 200
    if request.method == "PUT":
        return jsonify("This is a PUT"), 200


# start app with main method
if __name__ == "__main__":
    app.run(debug=True)