from werkzeug.security import check_password_hash, generate_password_hash
from config.dbconfig import pg_config
import psycopg2

class EmployeeDAO:
    def __init__(self):
        connection_url = "dbname=%s user=%s password=%s port=%s host=%s" % (pg_config['dbname'], pg_config['user'],
                                                                            pg_config['password'], pg_config['dbport'],
                                                                            pg_config['host'])
        print("conection url:  ", connection_url)
        self.conn = psycopg2.connect(connection_url)
    
    def userExists(self, user_email, user_password):
        cursor = self.conn.cursor()
        query = 'select user_password from "Employee" where user_email=%s limit 1'
        uQuery = 'select employee_id, username, user_email, role, wage from "Employee" where user_email = %s limit 1'
        cursor.execute(query, (user_email,))
        q_password =  cursor.fetchone()
        if cursor.rowcount == 0:
            cursor.close()
            return False        #user not found
        else:
            if check_password_hash(q_password[0], user_password):
                cursor.execute(uQuery, (user_email,))
                result = []
                for row in cursor:
                    result.append(row)
                cursor.close()
                return result       #user found
            else:
                cursor.close()
                return "Psw error"