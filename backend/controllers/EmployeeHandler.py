from flask import jsonify
from DAOs.EmployeeDAO import EmployeeDAO
from werkzeug.security import generate_password_hash, check_password_hash

class BaseEmployee:
    #For GET requests
    def build_row_dict(self, row):
       # query = "select employee_id, username, user_email, role, wage, password from User"
        result = {
            "employee_id": row[0],
            "username": row[1],
            "user_email": row[2],
            "role": row[3],
            "wage": row[4]
            #"password": row[4],
        }
        return result
    #For POST and PUT requests
    def build_attr_dict(self, employee_id, username, user_email, role, wage):
        result = {}
        result['employee_id'] = employee_id
        result['username'] = username
        result['user_email'] = user_email
        result['role'] = role
        result['wage'] = wage
        #result['password'] = password
        return result

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