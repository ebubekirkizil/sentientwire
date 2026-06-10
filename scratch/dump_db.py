import requests
import json
import os

TURSO_URL = "https://sentientwire-ebubekirkizil.aws-eu-west-1.turso.io/v2/pipeline"
TURSO_TOKEN = "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJleHAiOjE5MDY0Njg2MjAsImlhdCI6MTc3OTYzMzQyMCwiaWQiOiIwMTllNWE2OS1jMDAxLTdmMjEtOWJhMC1jZGIyYzk2ODkxZWMiLCJyaWQiOiJmOWE1OGFlMC01ODc5LTRlNTAtOWE2YS0wMWJiNjAwYzFlNWQifQ.qzJOAteUxyuHiOvHMH6aOjgVkahY_KSnAoIOy5dzAG0ZAUteOQJeoIJHBojX3oiyOqGrrr-I5EM7upRCXrNtDg"

def headers():
    return {
        "Authorization": f"Bearer {TURSO_TOKEN}",
        "Content-Type": "application/json"
    }

def run():
    payload = {
        "requests": [
            {
                "type": "execute",
                "stmt": {
                    "sql": "SELECT id, title, slug, locale FROM Article ORDER BY createdAt DESC LIMIT 2"
                }
            },
            {
                "type": "execute",
                "stmt": {
                    "sql": "SELECT articleId, locale FROM ArticleTranslation"
                }
            }
        ]
    }
    r = requests.post(TURSO_URL, headers=headers(), json=payload)
    with open("scratch/db_state.json", "w", encoding="utf-8") as f:
        json.dump(r.json(), f, indent=2)

if __name__ == "__main__":
    run()
