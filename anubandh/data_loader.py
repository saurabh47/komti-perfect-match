import os
import requests
import mysql.connector
from dotenv import load_dotenv

load_dotenv()

# Login payload
login_payload = {
    "loginID": os.getenv('ANUBANDH_USER_ID'),
    "password": os.getenv('ANUBANDH_USER_PASSWORD')
}

# Login API endpoint
login_url = "https://www.anubandh.com/rest/LoginService/login"

# Make login request
login_response = requests.post(login_url, json=login_payload)

# Check if login request was successful
if login_response.status_code == 200:
    # Extract token from login response
    token = login_response.json()["token"]

    # Header with token
    headers = {
        "Token-Str": token
    }

    # Define the API endpoint for user data
    user_data_url = "https://www.anubandh.com/rest/UserDataService/getUserData"

    # Connect to MySQL database
    db = mysql.connector.connect(
        host=os.getenv('DB_HOST'),
        user=os.getenv('DB_USER'),
        password=os.getenv('DB_PASSWORD'),
        database=os.getenv('DB_NAME')
    )

    cursor = db.cursor()

    # Loop through user IDs
    for user_id in range(int(os.getenv('START_ID')), int(os.getenv('END_ID')), int(os.getenv('INCREMENT_STEP'))):
        # Payload for user data request
        payload = str(user_id)

        # Make the API request to get user data
        response = requests.post(user_data_url, data=payload, headers=headers)

        # Check if user data request was successful
        if response.status_code == 200:
            # Parse the JSON response
            data = response.json()
            headers = response.headers

            if data:
                # Generate placeholders for SQL query
                columns = ', '.join(data.keys())
                placeholders = ', '.join(['%s'] * len(data))

                # Define the SQL query
                sql = f"""INSERT INTO users ({columns})
                        VALUES ({placeholders})
                        ON DUPLICATE KEY UPDATE
                        {', '.join([f"{key}=VALUES({key})" for key in data.keys()])}"""

                # Execute the SQL query
                cursor.execute(sql, list(data.values()))
                # Commit changes to the database
                db.commit()
                print(f"Data for user ID {user_id} upserted successfully!")
        else:
            print(f"Failed to retrieve user data for user ID {user_id}")



    # Close the database connection
    db.close()

    print("All data upserted successfully!")
else:
    print("Login failed.")
