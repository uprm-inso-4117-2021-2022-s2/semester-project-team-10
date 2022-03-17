import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import flask_cors
import flask_praetorian
#import config.app_config

app = Flask(__name__)
db = SQLAlchemy(app)                       #initialize SQLAlchemy
guard = flask_praetorian.Praetorian()   #initialize flask praetorian
cors = flask_cors.CORS(app)                #initialize CORS

app.config["JWT_SECRET_KEY"] = os.environ.get('SECRET_KEY')
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL')  

######################################################################################
if __name__ == '__main__':
    app.run(debug=True)


# def create_app():
#     app = flask.Flask(__name__)
#     app.debug = True                    #Change for deployment

#     app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL')          #set databaase connection string
#     app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY')                     #Set encryption secret key
#     app.config['JWT_ACCESS_LIFESPAN'] = {'hours': 24}                                       #JWT Lifespan
#     app.config['JWT_REFRESH_LIFESPAN'] = {'days' : 30}

#     from daos.UserModel import uaccount                                                     #Import the user model

#     guard.init_app(app,uaccount)                                                            #Provide user model to praetorian
#     db.init_app(app)                                                                        #initiate db connection
#     cors.init_app(app)

#     # with app.app_context():                                                                 #Creates an admin account if it doesn't exist right now. Parameters can be modified for different instances. Remove for production
#     #    if db.session.query(uaccount).filter_by(email='parks').count() < 1:
#     #        db.session.add(uaccount(
#     #            first_name='Joe',
#     #            last_name='Biden',
#     #            phone_number='7873432343',
#     #            email = 'joeb@yahoo.com',
#     #            username='jbiden',
#     #            password = guard.hash_password('12345'),
#     #            salary = 90,
#     #            vacation_days = 40,
#     #            sick_days = 20,
#     #            role = 'admin'
#     #        ))
#     #        db.session.commit()


#     from Blueprints.auth import auth as auth_blueprint           #Imports all the blueprints. Routes are stored in the blueprints to prevent large route file
#     from Blueprints.timesheets import timesheets as timesheet_blueprint

#     app.register_blueprint(auth_blueprint)
#     app.register_blueprint(timesheet_blueprint, url_prefix='/timesheet')

#     return app
