from flask import jsonify
from backend.DAOs.SickDaysDAO import SickDaysDAO

class BaseSickRequest:
    #For GET requests
    def build_row_dict(self, row):
       # query = "select sd_id, start_date, end_date, approved, employee_id from 'Employee'"
        result = {
            "sd_id": row[0],
            "start_date": row[1],
            "end_date": row[2],
            #"approved": row[3],
            "employee_id": row[3],
        }
        return result
    #For POST and PUT requests
    def build_attr_dict(self, sd_id, start_date, end_date, employee_id):
        result = {}
        result['sd_id'] = sd_id
        result['start_date'] = start_date
        result['end_date'] = end_date
        #result['approved'] = approved
        result['employee_id'] = employee_id
        return result

    def createSickRequest(self, json):
        start_time = json['start_date']
        end_time = json['end_date']
        employee_id = json['employee_id']
        dao = SickDaysDAO()
        sd_id = dao.createSickRequest(start_time, end_time, employee_id)
        if sd_id == False:
            return jsonify('Authorization ERROR! Check this later, says the dev team to the dev team!'), 401
        result = self.build_attr_dict(sd_id, start_time, end_time, employee_id)
        return jsonify(result), 201