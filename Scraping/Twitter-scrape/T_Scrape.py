# Import Dependencies
import selenium
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from selenium.webdriver import ActionChains
from time import sleep
from dotenv import load_dotenv
import os
import datetime
# from pydrive.auth import GoogleAuth
# from pydrive.drive import GoogleDrive


# Load environment variables
load_dotenv()

# Get current date in ISO format
current_date = datetime.datetime.now().strftime("%Y-%m-%d")

# Incorporate the date into the file path
csv_file_name = f"./{current_date}_Twitter.csv"
file_exists = os.path.isfile(csv_file_name)


PATH = os.getenv("CHROMEDRIVER_PATH")
driver = webdriver.Chrome()
driver.get("https://twitter.com/login")


# searching (#WarehouseManagement) gives tweets with hashtag


# Setup the log in
sleep(3)
username = driver.find_element(By.XPATH, "//input[@name='text']")
TWITTER_USERNAME = os.getenv("TWITTER_USERNAME")
username.send_keys(TWITTER_USERNAME)  # enter Username
next_button = driver.find_element(By.XPATH, "//span[contains(text(),'Next')]")
next_button.click()

sleep(4)
password = driver.find_element(By.XPATH, "//input[@name='password']")
TWITTER_PASSWORD = os.getenv("TWITTER_PASSWORD")
password.send_keys(TWITTER_PASSWORD)  # enter Passwork
log_in = driver.find_element(By.XPATH, "//span[contains(text(),'Log in')]")
log_in.click()

# Search item and fetch it
LIST = [
    '"third party logistics" lang:en',
    'shopify WMS lang:en',
    '"FBA Prep" lang:en',
    '"e-commerce fulfillment" lang:en',
    '"Shipstation" lang:en',
    '"Logiwa" lang:en',
    '"3PL WMS" lang:en',
    '"Order Fulfillment" lang:en',
    '"Warehouse management System" lang:en',
]

for subject in LIST:
    sleep(5)
    search_box = driver.find_element(By.XPATH, "//input[@data-testid='SearchBox_Search_Input']")
    search_box.clear()
    driver.execute_script("arguments[0].value = '';", search_box)
    sleep(1)
    search_box.send_keys(subject)
    search_box.send_keys(Keys.ENTER)

    sleep(4)
    top = driver.find_element(By.XPATH, "//span[contains(text(),'Latest')]")
    top.click()
    sleep(4)

    Flags = []
    UserTags = []
    TimeStamps = []
    Tweets = []
    Replys = []
    reTweets = []
    Likes = []
    Urls = []
    tweet_links = []
    Subjects = []
    Limit = 20  # no of scrolls.
    y = 1000

    for t in range(0, Limit, 1):
        articles = driver.find_elements(By.XPATH, "//article[@data-testid='tweet']")

        for article in articles:
            TimeStamp = driver.find_element(By.XPATH, ".//time").get_attribute(
                "datetime"
            )

            if TimeStamp not in Flags:
                UserTag = driver.find_element(
                    By.XPATH, ".//div[@data-testid='User-Name']"
                ).text
                UserTags.append(UserTag)

                TimeStamp = driver.find_element(By.XPATH, ".//time").get_attribute(
                    "datetime"
                )
                TimeStamps.append(TimeStamp)
                Flags.append(TimeStamp)

                Tweet = driver.find_element(
                    By.XPATH, ".//div[@data-testid='tweetText']"
                ).text
                Tweets.append(Tweet)

                Reply = driver.find_element(
                    By.XPATH, ".//div[@data-testid='reply']"
                ).text
                Replys.append(Reply)

                reTweet = driver.find_element(
                    By.XPATH, ".//div[@data-testid='retweet']"
                ).text
                reTweets.append(reTweet)

                Like = driver.find_element(By.XPATH, ".//div[@data-testid='like']").text
                Likes.append(Like)

                link = article.find_element(
                    By.CSS_SELECTOR, "[role=link]"
                ).get_attribute("href")
                tweet_links.append(link)

                Subjects.append(subject)

        driver.execute_script("window.scrollTo(0, " + str(y) + ")")
        y += 1000
        sleep(2)

    for link in tweet_links:
        driver.execute_script(f"window.open('{link}', '_blank');")
        driver.switch_to.window(driver.window_handles[1])
        Urls.append(driver.current_url)
        driver.close()
        driver.switch_to.window(driver.window_handles[0])
        sleep(2)
    
    #Storing no. of tweets
    n = len(Tweets)

    import pandas as pd

    df = pd.DataFrame(
        zip(Subjects, UserTags, TimeStamps, Tweets, Urls, Replys, reTweets, Likes),
        columns=[
            "Subject",
            "UserTags",
            "TimeStamps",
            "Tweets",
            "Urls",
            "Replys",
            "reTweets",
            "Likes",
        ],
    )
    df.head()


    # Save the DataFrame to CSV
    if file_exists:  # if file already exists, append without header
        df.to_csv(csv_file_name, mode='a', header=False, index=False)
    else:  # if file doesn't exist, write with header
        df.to_csv(csv_file_name, mode='w', header=True, index=False)
        file_exists = True  # set the flag to True for subsequent appends

    print(f"Done for {subject} :",n)
    element = driver.find_element(By.XPATH, "//*[@d='M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z']")
    actions = ActionChains(driver)
    actions.click(element).perform()


# # Step 1: Authenticate
# gauth = GoogleAuth()
# gauth.LocalWebserverAuth()  # This will prompt you to authenticate using a browser

# drive = GoogleDrive(gauth)

# # Step 2: Upload the CSV to Google Drive
# GOOGLE_DRIVE_FOLDER_ID = os.getenv("GOOGLE_DRIVE_FOLDER_ID")
# folder_id =  GOOGLE_DRIVE_FOLDER_ID 

# file_drive = drive.CreateFile({
#     'title': os.path.basename(csv_file_name),
#     'parents': [{'id': folder_id}]
# })

# file_drive.SetContentFile(csv_file_name)
# file_drive.Upload()

# print(f"Uploaded {csv_file_name} to Google Drive folder with ID {folder_id}")
