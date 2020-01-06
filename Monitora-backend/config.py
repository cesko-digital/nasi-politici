

# MSSQL

mssql_db_username = ''
mssql_db_password = ''
mssql_db_name = ''
mssql_db_hostname = ''


DEBUG = True
PORT = 5006
HOST = "0.0.0.0"
SQLALCHEMY_ECHO = True
SQLALCHEMY_TRACK_MODIFICATIONS = True
SECRET_KEY = "SOME SECRET"



SQLALCHEMY_DATABASE_URI = "mssql+pyodbc://{DB_USER}:{DB_PASS}@{DB_ADDR}:1433/{DB_NAME}?driver=ODBC+Driver+17+for+SQL+Server".format(DB_USER=mssql_db_username,
                                                                                        DB_PASS=mssql_db_password,
                                                                                        DB_ADDR=mssql_db_hostname,
                                                                                        DB_NAME=mssql_db_name)
