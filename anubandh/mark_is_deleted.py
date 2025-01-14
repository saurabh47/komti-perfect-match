import os
import requests
import mysql.connector
from dotenv import load_dotenv
from multiprocessing import Pool

load_dotenv()

def process_batch(user_ids):
    # Connect to MySQL database
    db = mysql.connector.connect(
        host=os.getenv('DB_HOST'),
        user=os.getenv('DB_USER'),
        password=os.getenv('DB_PASSWORD'),
        database=os.getenv('DB_NAME')
    )

    cursor = db.cursor()

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

        # Define the API endpoint for basic search
        basic_search_url = "https://www.anubandh.com/rest/SearchService/basicSearch"

        # Make the API request for each user ID in the batch
        for user_id in user_ids:
            try:
                # Payload for basic search request
                payload = {
                    "gender": "",
                    "idParam": "=",
                    "lastName": "",
                    "userID": str(user_id)
                }

                # Make the API request to perform basic search
                response = requests.post(basic_search_url, json=payload, headers=headers)

                # Check if basic search request was successful
                if response.status_code == 200:
                    # Parse the JSON response
                    data = response.json()
                    headers = response.headers
                    # Check if response is empty array
                    if not data:
                        # Mark user as deleted in the database
                        cursor.execute("UPDATE users SET is_deleted = 1 WHERE user_id = %s", (user_id,))
                        db.commit()
                        print(f"User ID {user_id} marked as deleted.")
                else:
                    print(f"Failed to perform basic search for user ID {user_id}")
            except Exception as e:
                print(f"An error occurred for user ID {user_id}: {str(e)}")

        # Close the database connection
        db.close()
    else:
        print("Login failed.")

def main():
    # Get list of user IDs who are not deleted
    cursor.execute("SELECT user_id FROM users WHERE is_deleted = 0 ORDER BY user_id ASC")
    user_ids = [row[0] for row in cursor.fetchall()]

    # Split user IDs into batches
    batch_size = len(user_ids) // 10
    user_id_batches = [user_ids[i:i+batch_size] for i in range(0, len(user_ids), batch_size)]

    # Process batches in parallel using multiprocessing
    with Pool(processes=10) as pool:
        pool.map(process_batch, user_id_batches)

    print("Deletion process completed.")

if __name__ == "__main__":
    # Connect to MySQL database
    db = mysql.connector.connect(
        host=os.getenv('DB_HOST'),
        user=os.getenv('DB_USER'),
        password=os.getenv('DB_PASSWORD'),
        database=os.getenv('DB_NAME')
    )
    
    cursor = db.cursor()

    main()

    # Close the database connection
    db.close()
