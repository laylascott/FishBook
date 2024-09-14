import json
import mysql.connector

# Load JSON data
with open('fish_data_updated.json', 'r') as file:
    fish_data = json.load(file)

# Connect to the MySQL database
db = mysql.connector.connect(
    host="",
    user="",  # Your MySQL username
    password="",  # Your MySQL password
    database=""  # Your MySQL database name
)

cursor = db.cursor()

# Queries for updating and inserting
update_query = """
    UPDATE freshwater_fish 
    SET `Image` = %s 
    WHERE `Scientific Name` = %s AND (`Image` IS NULL OR `Image` = '');
"""

insert_query = """
    INSERT INTO freshwater_fish (`Scientific Name`, `Image`)
    VALUES (%s, %s);
"""

# Iterate through the JSON data
for fish in fish_data:
    scientific_name = fish.get('Scientific Name')
    image_url = fish.get('Image')
    
    # Check if the row exists and update if necessary
    cursor.execute("SELECT * FROM freshwater_fish WHERE `Scientific Name` = %s", (scientific_name,))
    result = cursor.fetchall()  # Fetch all results to avoid unread result error

    if result:
        # Row exists, update if the image URL is missing or empty
        print(f"Updating: {scientific_name}")
        cursor.execute(update_query, (image_url, scientific_name))
    else:
        # Row does not exist, insert a new record
        print(f"Inserting new record: {scientific_name}")
        cursor.execute(insert_query, (scientific_name, image_url))

# Commit the transaction to the database
db.commit()

# Close the cursor and the database connection
cursor.close()
db.close()

print("Data imported and updated successfully.")