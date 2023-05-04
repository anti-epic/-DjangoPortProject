import psycopg2

# Connect to the PostgreSQL server
conn = psycopg2.connect(
    host="localhost",
    database="postgres",
    user="antiepic",
    password="testinDev"
)

# # Create a new database
# cur = conn.cursor()
# cur.execute("CREATE DATABASE mydatabase")
# conn.commit()

# # Close the connection
# cur.close()
# conn.close()
