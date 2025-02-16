#!/usr/local/bin/env/python3
import praw
import pandas as pd
import datetime
from dotenv import load_dotenv
import os
from time import sleep

load_dotenv()

reddit = praw.Reddit(
    client_id=os.getenv("client_id"),
    client_secret=os.getenv("client_secret"),
    redirect_uri="http://localhost:8080/callback",
    user_agent=os.getenv("user_agent"),)

LIST = [
    "shopify",
    "shopifyappstore",
    "FulfillmentByAmazon",
    "AmazonSeller",
    "AmazonFBAOnlineRetail",
    "FBAadvanced",
    "ecommerce",
    "AmazonTools",
    "LogisticsHub",
    "dropshipping",
    "shipstation",
    "Flipping",
    "supplychain",
    "smallbusiness",
    ]

current_date = datetime.datetime.now().strftime("%Y-%m-%d")
csv_file_name = f"./{current_date}_Reddit.csv"
file_exists = os.path.isfile(csv_file_name)
    
for subject in LIST:
    posts = []
    subreddit = reddit.subreddit(subject)
    for post in subreddit.hot(limit=10):
        posts.append(
            [
                subject,
                post.title,
                str(datetime.date.fromtimestamp(post.created_utc)),
                post.url,
                post.num_comments,
                post.selftext,
            ]
        )

    posts = pd.DataFrame(
        posts,
        columns=[
            "subject",
            "title",
            "datetime",
            "url",
            "num_comments",
            "body",
            ],
        )

    # Save the DataFrame to CSV
    if file_exists:  # if file already exists, append without header
        posts.to_csv(csv_file_name, mode='a', header=False, index=False)
    else:  # if file doesn't exist, write with header
        posts.to_csv(csv_file_name, mode='w', header=True, index=False)
        file_exists = True  # set the flag to True for subsequent appends

    print(f"Done for {subject}")
    sleep(60)