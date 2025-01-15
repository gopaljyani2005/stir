from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from datetime import datetime
import time
import json
from proxymesh import ProxyMesh

# ProxyMesh setup (ensure credentials and usage)
proxies = ["proxy1", "proxy2", "proxy3"]

# Initialize WebDriver
options = webdriver.ChromeOptions()
proxy = proxies[0]  # Example: rotate these on subsequent runs
options.add_argument(f"--proxy-server={proxy}")
driver = webdriver.Chrome(options=options)

# Twitter login credentials
USERNAME = "your-twitter-username"
PASSWORD = "your-twitter-password"

try:
    # Navigate to Twitter
    driver.get("https://twitter.com/login")
    time.sleep(3)
    # Login
    driver.find_element(By.NAME, "session[username_or_email]").send_keys(USERNAME)
    driver.find_element(By.NAME, "session[password]").send_keys(PASSWORD + Keys.RETURN)
    time.sleep(5)

    # Scrape "What’s Happening" trends
    trends = driver.find_elements(By.CSS_SELECTOR, "div.css-1dbjc4n span")
    top_trends = [trend.text for trend in trends[:5]]

    # Capture data
    data = {
        "_id": str(datetime.now().timestamp()),
        "trends": top_trends,
        "date": str(datetime.now()),
        "ip": proxy,
    }

    # Save data locally for debugging
    with open("output.json", "w") as f:
        json.dump(data, f)

    print(json.dumps(data))  # Output for Node.js
finally:
    driver.quit()
