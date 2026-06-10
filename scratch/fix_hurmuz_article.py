import requests
import json

TURSO_URL = "https://sentientwire-ebubekirkizil.aws-eu-west-1.turso.io/v2/pipeline"
TURSO_TOKEN = "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJleHAiOjE5MDY0Njg2MjAsImlhdCI6MTc3OTYzMzQyMCwiaWQiOiIwMTllNWE2OS1jMDAxLTdmMjEtOWJhMC1jZGIyYzk2ODkxZWMiLCJyaWQiOiJmOWE1OGFlMC01ODc5LTRlNTAtOWE2YS0wMWJiNjAwYzFlNWQifQ.qzJOAteUxyuHiOvHMH6aOjgVkahY_KSnAoIOy5dzAG0ZAUteOQJeoIJHBojX3oiyOqGrrr-I5EM7upRCXrNtDg"

ENGLISH_TITLE   = "Ceasefire Ends in the Strait of Hormuz: How the US Military Operation Against Iran Will Impact Global Trade"
ENGLISH_SUMMARY = "The United States announced the launch of a wide-ranging airstrike campaign against Iranian military targets in retaliation for the downing of an Apache helicopter in the Strait of Hormuz. Markets are in shock as global oil trade faces a severe disruption."
NEW_SLUG        = "ceasefire-ends-strait-of-hormuz-us-military-operation-iran-global-trade"

ENGLISH_CONTENT = """<div class="tldr-box">
  <ul>
    <li>The US announced airstrikes against Iranian military targets following the downing of an Apache helicopter.</li>
    <li>S&amp;P 500 and NASDAQ indices posted losses exceeding 4% within hours as panic selling gripped markets.</li>
    <li>The security crisis in the Strait of Hormuz is threatening global oil trade routes.</li>
  </ul>
</div>
<h2>Introduction: From a Helicopter to Global Chaos</h2>
<p>The Strait of Hormuz is the world's most critical artery for oil — the sole chokepoint through which the global energy supply flows. Late last night, the downing of a US Apache helicopter was not merely a tactical incident; it marked a pivotal "breaking point" that is reshaping the balance of power across the Middle East. US Central Command (CENTCOM) labeled the attack "an unacceptable act of war" and announced the launch of strikes on Iranian military facilities under the right of self-defense.</p>
<div class="my-12 rounded-xl overflow-hidden border border-[var(--border-subtle)] shadow-lg">
  <img src="/missile_inside.png" alt="Military Operation in the Strait of Hormuz" class="w-full h-auto object-cover" />
  <div class="bg-[var(--bg-secondary)] p-3 text-center font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-widest">
    FIELD INTEL: VISUAL ASSET DEPLOYED
  </div>
</div>
<h2>Operational Bottleneck: Energy and Logistics Locked Down</h2>
<p>This conflict is not merely a "military operation" — it is a direct intervention in the lifeline of the global economy. Approximately 20% of the world's daily oil consumption passes through this narrow strait. An escalation of the conflict could push tanker insurance premiums to impossible levels, effectively manipulating energy prices on a global scale.</p>
<p>Civil aviation and maritime trade routes in the region have been declared "no-fly and no-sail zones" for security reasons. This will trigger delays of at least 10–15 days across the Asia–Europe logistics chain.</p>
<h2>EDITOR'S ANALYSIS: The Beginning of Uncertainty</h2>
<p>What is unfolding now is not merely an exchange of missiles. This is the eruption of a long-dormant volcano. If the conflict expands, it could expose the global supply chain to a shock reminiscent of a "second pandemic" — one driven not by a virus, but by geopolitical breakdown.</p>"""

def headers():
    return {
        "Authorization": f"Bearer {TURSO_TOKEN}",
        "Content-Type": "application/json"
    }

def run():
    print("=" * 60)
    print("  SentientWire — Hürmüz Haberi Acil Düzeltme Aracı")
    print("=" * 60)

    # Step 1: Find the article ID
    print("\n[1/3] Makale ID'si aranıyor...")
    find_payload = {
        "requests": [{
            "type": "execute",
            "stmt": {
                "sql": "SELECT id, slug, locale FROM Article WHERE slug LIKE 'hurmuz-bogazinda%' ORDER BY createdAt DESC LIMIT 1"
            }
        }]
    }
    r = requests.post(TURSO_URL, headers=headers(), json=find_payload)
    data = r.json()

    try:
        rows = data["results"][0]["response"]["result"]["rows"]
    except Exception:
        print("❌ Makale bulunamadı veya API hatası.")
        print(r.text)
        input("\nÇıkmak için ENTER'a basın...")
        return

    if not rows:
        print("❌ 'hurmuz-bogazinda...' ile başlayan makale bulunamadı.")
        input("\nÇıkmak için ENTER'a basın...")
        return

    article_id  = rows[0][0]["value"]
    old_slug    = rows[0][1]["value"]
    locale_val  = rows[0][2]["value"]
    print(f"   Bulundu! ID: {article_id}")
    print(f"   Mevcut Slug: {old_slug}")
    print(f"   Dil: {locale_val}")

    # Step 2: Update slug in Article table
    print(f"\n[2/3] Slug İngilizceye güncelleniyor -> {NEW_SLUG}")
    update_payload = {
        "requests": [{
            "type": "execute",
            "stmt": {
                "sql": "UPDATE Article SET slug = ? WHERE id = ?",
                "args": [
                    {"type": "text", "value": NEW_SLUG},
                    {"type": "text", "value": article_id}
                ]
            }
        }]
    }
    r2 = requests.post(TURSO_URL, headers=headers(), json=update_payload)
    if r2.status_code == 200:
        print("   ✅ Slug güncellendi.")
    else:
        print(f"   ❌ Slug güncellenemedi: {r2.text}")

    # Step 3: Insert English translation
    print("\n[3/3] İngilizce çeviri ekleniyor...")
    trans_payload = {
        "requests": [{
            "type": "execute",
            "stmt": {
                "sql": "INSERT OR REPLACE INTO ArticleTranslation (articleId, locale, title, summary, content) VALUES (?, 'en', ?, ?, ?)",
                "args": [
                    {"type": "text", "value": article_id},
                    {"type": "text", "value": ENGLISH_TITLE},
                    {"type": "text", "value": ENGLISH_SUMMARY},
                    {"type": "text", "value": ENGLISH_CONTENT}
                ]
            }
        }]
    }
    r3 = requests.post(TURSO_URL, headers=headers(), json=trans_payload)
    if r3.status_code == 200:
        print("   ✅ İngilizce çeviri eklendi.")
    else:
        print(f"   ❌ Çeviri eklenemedi: {r3.text}")

    print("\n" + "=" * 60)
    print("✅ TAMAMLANDI!")
    print("Yeni URL:")
    print(f"  https://sentientwire.com/en-US/news/{NEW_SLUG}")
    print("Sitenize gidip sayfayı yenileyin.")
    print("=" * 60)
    input("\nÇıkmak için ENTER'a basın...")

if __name__ == "__main__":
    run()
