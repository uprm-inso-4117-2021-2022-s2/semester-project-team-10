from flask import jsonify
from backend.DAOs.EmployeeDAO import EmployeeDAO
from werkzeug.security import generate_password_hash, check_password_hash

class BaseEmployee:
    #For GET requests
    def build_row_dict(self, row):
       # query = "select employee_id, username, user_email, role, wage, first_name, last_name from 'Employee'"
        result = {
            "employee_id": row[0],
            "username": row[1],
            "user_email": row[2],
            "role": row[3],
            "wage": row[4],
            "first_name": row[5],
            "last_name": row[6]
            #"password": row[4],
        }
        return result
    #For POST and PUT requests
    def build_attr_dict(self, employee_id, username, user_email, role, wage, first_name, last_name):
        result = {}
        result['employee_id'] = employee_id
        result['username'] = username
        result['user_email'] = user_email
        result['role'] = role
        result['wage'] = wage
        result['first_name'] = first_name
        result['last_name'] = last_name
        #result['password'] = password
        return result

    def addNewUser(self, json):
        username = json['username']
        user_email = json['user_email']
        user_password= json['user_password']
        role = json['role']
        wage = json['wage']
        first_name = json['first_name']
        last_name = json['last_name']
        user_password = generate_password_hash(user_password)
        dao = EmployeeDAO()
        employee_id = dao.insertEmployee(username, user_email, user_password, role, wage, first_name, last_name)
        if employee_id == 'Email taken':
            return jsonify("Email or Username is taken. Please use a different one!"), 400
        result = self.build_attr_dict(employee_id, username, user_email, role, wage, first_name, last_name)
        return jsonify(result), 201

    def userExists(self, email, password):
        dao = EmployeeDAO()
        authenticated = dao.userExists(email, password)
        if authenticated == False:
            return "0"
        elif authenticated == "Psw error":
            return "1"
        else:
            result = []
            for t in authenticated:
                result.append(self.build_row_dict(t))
            return result
