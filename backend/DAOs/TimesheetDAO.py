import psycopg2
import backend.config.dbconfig


class TimesheetDAO:

    def __init__(self):
        connection_url = "dbname=%s user=%s host=%s password=%s port = %s"  % (
            backend.config.dbconfig.pg_config['dbname'],
            backend.config.dbconfig.pg_config['user'],
            backend.config.dbconfig.pg_config['host'],
            backend.config.dbconfig.pg_config['password'],
            backend.config.dbconfig.pg_config['dbport'])
        self.conn = psycopg2.connect(connection_url)

    # returns all work times of an employee
    def getTimesheet(self, employee_id):
        cursor = self.conn.cursor()
        query = 'select timesheet_id, start_time, end_time, work_desc, employee_id from "Timesheet" where employee_id = %s;'
        cursor.execute(query, (employee_id,))
        result = []
        for row in cursor:
            result.append(row)
        cursor.close()
        return result

    # creates a work hour or shift
    def createTimesheet(self, work_desc, start_time, end_time, employee_id):
        cursor = self.conn.cursor()
        query = 'insert into "Timesheet" (work_desc, start_time, end_time, employee_id) values(%s, %s, %s, %s) returning timesheet_id;'
        cursor.execute(query, (work_desc, start_time, end_time, employee_id))
        timesheet_id = cursor.fetchone()               # might need to add conditional to not reject null values
        self.conn.commit()
        cursor.close()
        return timesheet_id

    # to update any discrepancies
    def updateTimesheet(self, start_time, end_time, work_desc, employee_id):
        cursor = self.conn.cursor()
        query = 'update "Timesheet" set start_time = %s, end_time = %s, work_desc = %s WHERE employee_id = %s ' \
                ' returning timesheet_id, work_desc, start_time, end_time;'
        cursor.execute(query, (start_time, end_time, work_desc, employee_id))
        result = cursor.fetchone()
        self.conn.commit()
        cursor.close()
        return result
