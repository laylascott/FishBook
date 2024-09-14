import time
import json
from selenium import webdriver
from selenium.webdriver.edge.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# Path to the Edge WebDriver (update the path as needed)
edgePath = r'C:\Users\rayan\Downloads\edgedriver_win64\msedgedriver.exe'
service = Service(executable_path=edgePath)

# Load JSON data
with open('fishimages.json', 'r') as file:
    fish_data = json.load(file)

def setup_driver():
    """Set up and return the WebDriver."""
    return webdriver.Edge(service=service)

def find_image_url(driver, fish_name):
    """Performs a Google Images search for the given fish name and extracts the first image URL."""
    search_URL = f"https://www.google.com/search?q={fish_name}&source=lnms&tbm=isch"
    driver.get(search_URL)

    # Allow time for the page to load
    time.sleep(5)

    try:
        # Step 1: Find the first search result, which is the <h3 class="ob5Hkd"> containing the <a> tag
        first_result = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.XPATH, "//h3[@class='ob5Hkd']/a"))
        )

        # Step 2: Click the first search result (to automatically go to the link)
        first_result.click()
        print(f"Clicked on the first image link for {fish_name}")

        # Allow time for the page to load after the click
        time.sleep(5)

        # Step 3: Find the final image link inside the <a> tag with an aria-label containing 'Visit'
        image_link_element = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.XPATH, "//a[contains(@aria-label, 'Visit')]"))
        )
        
        # Step 4: Extract the actual image URL from the <img> tag inside the <a> tag
        image_element = image_link_element.find_element(By.TAG_NAME, "img")
        img_src = image_element.get_attribute("src")
        print(f"Image source URL found: {img_src}")
        return img_src

    except Exception as e:
        print(f"Error during image extraction for {fish_name}: {e}")
        return None

# Initialize the WebDriver once and reuse it
driver = setup_driver()

# Iterate through the fish data and find missing image URLs
for fish in fish_data:
    if not fish['Image']:  # If Image URL is missing
        print(f"Finding image for {fish['Scientific Name']}")
        fish['Image'] = find_image_url(driver, fish['Scientific Name'])

        # Restart the WebDriver if it crashes
        if fish['Image'] is None:
            print("Restarting WebDriver...")
            driver.quit()  # Close the current driver
            time.sleep(2)  # Pause briefly before restarting
            driver = setup_driver()  # Restart the driver

# Save the updated data back to the JSON file
with open('fish_data_updated.json', 'w') as file:
    json.dump(fish_data, file, indent=4)

# Close the WebDriver at the end
driver.quit()

print("Updated fish data saved to fish_data_updated.json")
