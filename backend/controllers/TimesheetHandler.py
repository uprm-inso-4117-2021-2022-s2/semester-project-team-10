from flask import jsonify
from backend.DAOs.TimesheetDAO import TimesheetDAO

class BaseTimesheet:
    def build_row_dict(self, row):
        result= {
            "timesheet_id" : row[0],
            "start_time": row[1],
            "end_time": row[2],
            "work_desc": row[3],
            "employee_id": row[4]
        }
        return result

    def build_attr_dict(self, timesheet_id, start_time, end_time, work_desc, employee_id):
        result = {}
        result['timesheet_id'] = timesheet_id
        result['start_time'] = start_time
        result['end_time'] = end_time
        result['work_desc'] = work_desc
        result['employee_id'] = employee_id
        return result

    def getTimesheet(self, employee_id):
        dao=TimesheetDAO()
        tuples=dao.getTimesheet(employee_id=employee_id)
        if not tuples:
            return jsonify("Not Found")
        result = []
        for t in tuples:
            result.append(self.build_row_dict(row=t))
        return jsonify(result)

    def createTimesheet(self, json):
        employee_id = json['employee_id']
        start_time = json['start_time']
        end_time = json['end_time']
        work_desc = json['work_desc']
        dao = TimesheetDAO()
        timesheet_id = dao.createTimesheet(work_desc, start_time, end_time, employee_id)
        if timesheet_id == False:
            return jsonify('Authorization ERROR! Check this later, says the dev team to the dev team!'), 401
        result = self.build_attr_dict(timesheet_id, start_time, end_time, work_desc, employee_id)
        return jsonify(result), 201
