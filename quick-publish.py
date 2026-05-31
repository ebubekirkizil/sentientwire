import requests
import json
import sys
import os

# CONFIGURATION
API_URL = "http://localhost:3000/api/quick-publish" # Change to production URL when live
API_KEY = "your-secret-here" # Matches CRON_SECRET in .env

def clear_screen():
    os.system('cls' if os.name == 'nt' else 'clear')

def main():
    clear_screen()
    print("======================================================")
    print("   SENTIENT WIRE - AI QUICK PUBLISH TERMINAL v1.0")
    print("======================================================")
    print("\n[INSTRUCTIONS]")
    print("Paste your news text or topic below.")
    print("When finished, press ENTER then CTRL+Z (on Windows) or CTRL+D (on Linux/Mac) to submit.")
    print("------------------------------------------------------")
    
    try:
      print("INPUT NEWS TEXT:")
      input_data = sys.stdin.read().strip()
    except EOFError:
      input_data = ""

    if not input_data:
        print("\n[ERROR] No content provided. Exiting...")
        return

    print("\n------------------------------------------------------")
    print("[STATUS] Uplinking to AI Core...")
    
    payload = {
        "text": input_data,
        "apiKey": API_KEY
    }

    try:
        response = requests.post(API_URL, json=payload, timeout=120)
        
        if response.status_code == 200:
            result = response.json()
            print("\n[SUCCESS] Article published successfully!")
            print(f"MESSAGE: {result.get('message')}")
            print(f"ARTICLE ID: {result.get('articleId')}")
            print("\nURL: http://localhost:3000/tr/admin")
        else:
            print(f"\n[ERROR] Failed to publish.")
            print(f"STATUS CODE: {response.status_code}")
            print(f"REASON: {response.text}")

    except Exception as e:
        print(f"\n[CRITICAL ERROR] Could not connect to the server: {str(e)}")
        print("Make sure your local server is running (npm run dev).")

    print("\n======================================================")
    input("Press Enter to close...")

if __name__ == "__main__":
    main()
