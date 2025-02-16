import selenium
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from time import sleep
import os
import datetime
import pandas as pd

# Get current date in ISO format
current_date = datetime.datetime.now().strftime("%Y-%m-%d")

# Incorporate the date into the file path
csv_file_name = f"./{current_date}_Amazon.csv"
file_exists = os.path.isfile(csv_file_name)

# Set the PATH for the webdriver
options = Options()
#options.add_argument('headless')
options.add_argument('--incognito')
driver = webdriver.Chrome(options=options)
wait = WebDriverWait(driver, 10)  # 10 seconds of explicit wait

LIST = ["refrigerator", "ac", "mattress", "cooktop", "dehumidifier", "freezer", "washing machine"]

try:
    driver.get("https://www.amazon.in/")
    
    for subject in LIST:
        sleep(7)
        search_box = wait.until(EC.presence_of_element_located((By.ID, "twotabsearchtextbox")))
        search_box.clear()
        search_box.send_keys(subject)
        search_box.send_keys(Keys.ENTER)
        sleep(4)

        titles, prices, ratings, product_urls, review_counts, merchants = [], [], [], [], [], []
        Range = 2  # Number of pages

        for p in range(1, Range+1):
            products = wait.until(EC.presence_of_all_elements_located((By.XPATH, "//div[@data-component-type='s-search-result']")))
            
            for product in products:
                try:
                    title = product.find_element(By.CSS_SELECTOR, "h2 a.a-link-normal.a-text-normal").text
                except Exception as e:
                    title = ""
                titles.append(title)

                try:
                    price = product.find_element(By.CSS_SELECTOR, "span.a-price-symbol").text + product.find_element(By.CSS_SELECTOR, "span.a-price-whole").text
                except Exception as e:
                    price = ""
                prices.append(price)

                try:
                    product_url = product.find_element(By.CSS_SELECTOR, "span[data-component-type='s-product-image'] a.a-link-normal").get_attribute('href')
                except Exception as e:
                    product_url = ""
                product_urls.append(product_url)

                try:
                    review_count = product.find_element(By.CSS_SELECTOR, "a.a-link-normal .a-size-base").text
                except Exception as e:
                    review_count = ""
                review_counts.append(review_count)

            if p < Range:  # If this isn't the last page, navigate to the next one
                next_page_url = f"https://www.amazon.in/s?k={subject}&page={p+1}"
                driver.get(next_page_url)
                sleep(2)
        for url in product_urls:
            driver.execute_script(f"window.open('{url}', '_blank');")
            driver.switch_to.window(driver.window_handles[1])
            try:
                rating = driver.find_element(By.CSS_SELECTOR, "#acrPopover .a-declarative a .a-size-base").text
            except Exception as e:
                rating = ""
            ratings.append(rating)
        
            try:
                merchant = driver.find_element(By.CSS_SELECTOR, 'a.a-link-normal > span').text
            except Exception as e:
                merchant = ""
            merchants.append(merchant)
            driver.close()
            driver.switch_to.window(driver.window_handles[0])
            sleep(2)

        n = len(titles)

        # Create a DataFrame to store the data
        df = pd.DataFrame({
            "Subject": [subject]*n,
            "Title": titles,
            "Price": prices,
            "Rating": ratings,
            "ReviewCount": review_counts,
            "URL": product_urls,
            "Sold By" : merchants
        })

        # Remove rows with missing values
        df.dropna(inplace=True)

        # Save the DataFrame to CSV
        if file_exists:
            df.to_csv(csv_file_name, mode='a', header=False, index=False)
        else:
            df.to_csv(csv_file_name, mode='w', header=True, index=False)
            file_exists = True

        print(f"Done for {subject} :", len(df))

finally:
    print("done scraping")
    driver.quit()
