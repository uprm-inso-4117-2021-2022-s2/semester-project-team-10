from werkzeug.security import check_password_hash, generate_password_hash
from backend.config.dbconfig import pg_config
import psycopg2

class EmployeeDAO:
    def __init__(self):
        connection_url = "dbname=%s user=%s password=%s port=%s host=%s" % (pg_config['dbname'], pg_config['user'],
                                                                            pg_config['password'], pg_config['dbport'],
                                                                            pg_config['host'])
        print("conection url:  ", connection_url)
        self.conn = psycopg2.connect(connection_url)

    def insertEmployee(self, username, user_email, user_password, role, wage, first_name, last_name):
        cursor = self.conn.cursor()
        query = 'insert into "Employee" (username, user_email, user_password, role, wage, first_name, last_name) ' \
                'select %s as username, %s as user_email, ' \
                '%s as user_password, %s as role, %s as wage, %s as first_name, %s as last_name from "Employee" ' \
                'where not exists( ' \
                'select employee_id from "Employee" where user_email = %s ' \
                'or username = %s ' \
                ') ' \
                'limit 1 returning employee_id;'
        cursor.execute(query, (username, user_email, user_password, role, wage, first_name, last_name,
                       user_email, username,))
        q_return = cursor.fetchone()               # is empty if it wasn't created successfully
        if q_return == None:
            cursor.close()
            return "Email taken"
        else:
            employee_id = q_return[0]
            self.conn.commit()
            cursor.close()
        return employee_id

    def userExists(self, user_email, user_password):
        cursor = self.conn.cursor()
        query = 'select user_password from "Employee" where user_email=%s limit 1'
        uQuery = 'select employee_id, username, user_email, role, wage, first_name, last_name from "Employee" where user_email = %s limit 1'
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
