import { MongoClient } from "mongodb";
import { exec } from "child_process";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { execSync } = require("child_process");
    const fs = require("fs");
    const path = require("path");

    try {
      // Run the Selenium script (assumed to be Python for simplicity)
      const result = execSync("python3 ./scripts/scrape_twitter.py");
      const data = JSON.parse(result.toString());

      // Connect to MongoDB
      const uri = url;
      const client = new MongoClient(uri);
      await client.connect();
      const database = client.db("twitter_scraper");
      const collection = database.collection("trends");

      // Insert the data
      await collection.insertOne(data);

      res.status(200).json({ message: "Data successfully fetched and saved.", data });
    } catch (error) {
      console.error("Error running script:", error);
      res.status(500).json({ error: "Failed to fetch trends" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
