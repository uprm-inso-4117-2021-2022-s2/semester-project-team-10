from werkzeug.security import check_password_hash, generate_password_hash
from backend.config.dbconfig import pg_config
import psycopg2

class SickDaysDAO:
    def __init__(self):
        connection_url = "dbname=%s user=%s password=%s port=%s host=%s" % (pg_config['dbname'], pg_config['user'],
                                                                            pg_config['password'], pg_config['dbport'],
                                                                            pg_config['host'])
        print("conection url:  ", connection_url)
        self.conn = psycopg2.connect(connection_url)

    def createSickRequest(self, start_date, end_date, employee_id):
        cursor = self.conn.cursor()
        query = 'insert into "SickRequest" (start_time, end_time, employee_id) values(%s, %s, %s) returning sd_id;'
        cursor.execute(query, (start_date, end_date, employee_id))
        sd_id = cursor.fetchone()               # might need to add conditional to not reject null values
        self.conn.commit()
        cursor.close()
        return sd_id