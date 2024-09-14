from urllib.request import Request, urlopen
from bs4 import BeautifulSoup
import csv
import os

def fetch_webpage(url):
    """Fetches the webpage content and returns a BeautifulSoup object."""
    req = Request(url, headers={'User-Agent': 'XYZ/3.0'})
    webpage = urlopen(req, timeout=10).read()
    return BeautifulSoup(webpage, 'html.parser')

def extract_table_data(soup, table_index):
    """Extracts data from a specific table identified by its index."""
    tables = soup.find_all('table')
    if table_index < len(tables):
        table = tables[table_index]
        data = {}
        rows = table.find_all('tr')
        
        # Check the number of cells in the first row to determine the table format
        first_row_cells = rows[0].find_all('td')
        
        if len(first_row_cells) == 2:  # Key-value pair table
            for row in rows:
                cells = row.find_all('td')
                if len(cells) == 2:  # Ensure there are key-value pairs
                    key = cells[0].text.strip()
                    value = cells[1].text.strip()
                    data[key] = value
        
        elif len(first_row_cells) > 2:  # Multi-column header and value table
            headers = [cell.text.strip() for cell in first_row_cells]
            values = [cell.text.strip() for cell in rows[1].find_all('td')]
            for header, value in zip(headers, values):
                data[header] = value

        return data
    return {}

def extract_water_parameters(soup):
    """Extracts water parameters from the second table."""
    return extract_table_data(soup, 1)

def extract_tank_setup(soup):
    """Extracts tank setup information from the relevant table."""
    return extract_table_data(soup, 3)

def extract_note_section(soup):
    """Extracts the note section that is not in a table."""
    note = soup.find('p', text=lambda t: t and 'Note' in t)
    return note.text.strip() if note else ""

def extract_comp_data(soup, heading_text):
    """Extracts list data following a specific heading."""
    heading = soup.find('h3', text=heading_text)
    data = {}
    if heading:
        ul = heading.find_next('ul')
        if ul:
            for li in ul.find_all('li'):
                # Find the key using the strong tag
                strong_tag = li.find('strong')
                if strong_tag:
                    key = strong_tag.text.strip().rstrip(':')
                    # Extract the value by removing the key from the li text and stripping any extra characters
                    value = li.get_text(strip=True).replace(strong_tag.get_text(strip=True), '').strip().lstrip(':–').strip()
                    data[key] = value
                else:
                    # If no strong tag is found, handle it gracefully
                    key_value = li.text.split(':', 1)
                    if len(key_value) == 2:
                        key = key_value[0].strip()
                        value = key_value[1].strip()
                        data[key] = value
                    else:
                        # Handle cases where there might not be a colon (if needed)
                        key = key_value[0].strip()
                        data[key] = ""
    return data

def extract_diet_data(soup):
    """Extracts diet information which is presented in paragraphs with line breaks."""
    diet_data = {}

    # Use find_all with an inline lambda function to match the specific <p> tag
    p_tags = soup.find_all(
        lambda tag: tag.name == 'p' and 
                    len(tag.find_all('strong')) == 2 and
                    'Diet Type:' in tag.find_all('strong')[0].text and
                    'Food Preferences:' in tag.find_all('strong')[1].text
    )

    # Extract the data from the matching <p> tag
    for p in p_tags:
        strong_tags = p.find_all('strong')
        diet_data['Diet Type'] = strong_tags[0].next_sibling.strip()
        diet_data['Food Preferences'] = strong_tags[1].next_sibling.strip()

    return diet_data

def save_to_csv(data, filename="fish_data.csv"):
    """Saves the extracted data to a CSV file. Appends if the file exists."""
    file_exists = os.path.isfile(filename)

    with open(filename, 'a', newline='', encoding='utf-8') as csvfile:
        fieldnames = list(data.keys())
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)

        if not file_exists:
            writer.writeheader()  # Write header only if the file didn't exist before

        writer.writerow(data)

def extract_and_save_data(soup):
    """Extracts all relevant data from the soup and saves it to a CSV file."""

    # Extract data from the first table (Common Name, Scientific Name, etc.)
    basic_info = extract_table_data(soup, 0)

    # Extract water parameters
    water_params = extract_water_parameters(soup)

    # Extract compatibility information
    compatibility = extract_comp_data(soup, "Compatibility")

    # Extract diet information
    diet = extract_diet_data(soup)

    # Extract tank setup information
    tank_setup = extract_tank_setup(soup)

    # Combine all data
    data = {
        **basic_info, 
        **water_params, 
        **compatibility, 
        **diet, 
        **tank_setup
    }

    # Save the extracted data to CSV
    save_to_csv(data)

def get_species_links_from_page(page_url):
    """Extracts all species links from a given page."""
    soup = fetch_webpage(page_url)
    species_links = []

    # Find all h2 elements with the class "post_title entry-title"
    h2_tags = soup.find_all('h2', class_='post_title entry-title')
    
    # Extract the href attribute from each <a> tag within the <h2> tag
    for h2 in h2_tags:
        a_tag = h2.find('a', href=True)
        if a_tag:
            species_links.append(a_tag['href'])

    return species_links

def main():
    base_url = 'https://aquariumapi.com/wp/category/freshwater/page/'
    count = 1

    # Loop through all pages from 1 to 60
    for page_num in range(1, 61):
        page_url = f"{base_url}{page_num}/"
        
        # Get all species links from the current page
        species_links = get_species_links_from_page(page_url)

        # Process each species link
        for species_url in species_links:
            print(f"{count} Processing species: {species_url}")
            count = count + 1
            soup = fetch_webpage(species_url)
            extract_and_save_data(soup)

if __name__ == "__main__":
    main()
