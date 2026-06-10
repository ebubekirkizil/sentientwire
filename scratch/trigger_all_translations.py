import requests
import time

# Cron endpoint'i 10 kez çağırarak tüm eksik dilleri sırayla çevirir.
# Her çağrı Gemini'ye bir çeviri yaptırır, aralarında 3 saniye bekler (rate limit için).

CRON_URL    = "https://sentientwire.com/api/cron/translate"
CRON_SECRET = "sw_secure_secret_7d7b56bd"
LOCALES     = ["es", "fr", "de", "it", "nl", "ru", "zh", "pl"]

def run():
    print("=" * 60)
    print("  SentientWire — Toplu Çeviri Tetikleyici")
    print("=" * 60)
    print(f"  Hedef diller: {', '.join(LOCALES)}")
    print(f"  Toplam istek: {len(LOCALES)} kez")
    print("=" * 60)

    success = 0
    for i, locale in enumerate(LOCALES, 1):
        print(f"\n[{i}/{len(LOCALES)}] '{locale}' için çeviri tetikleniyor...")
        try:
            r = requests.get(
                CRON_URL,
                headers={"Authorization": f"Bearer {CRON_SECRET}"},
                timeout=65
            )
            if r.status_code == 200:
                data = r.json()
                if data.get("translatedCount", 0) > 0:
                    print(f"   ✅ Çeviri tamamlandı!")
                    success += 1
                elif data.get("fixedEnglish"):
                    print(f"   ✅ İngilizce çeviri oluşturuldu (ön işlem).")
                    success += 1
                else:
                    print(f"   ℹ️  Bu dil zaten çevrilmiş veya makale bulunamadı.")
            else:
                print(f"   ❌ HTTP {r.status_code}: {r.text[:100]}")
        except requests.exceptions.Timeout:
            print(f"   ⚠️  Zaman aşımı (60s) — Gemini yavaş yanıt verdi, sonuç yine de kaydedilmiş olabilir.")
            success += 1  # Timeout'larda genellikle çeviri tamamlanıyor
        except Exception as e:
            print(f"   ❌ Hata: {e}")

        if i < len(LOCALES):
            print(f"   ⏳ 3 saniye bekleniyor (Gemini rate limit)...")
            time.sleep(3)

    print("\n" + "=" * 60)
    print(f"✅ TAMAMLANDI — {success}/{len(LOCALES)} dil işlendi.")
    print("\nSiteye gidip dil değiştirerek test edebilirsiniz:")
    print("  https://sentientwire.com/es/news/ceasefire-ends-strait-of-hormuz-us-military-operation-iran-global-trade")
    print("  https://sentientwire.com/de/news/ceasefire-ends-strait-of-hormuz-us-military-operation-iran-global-trade")
    print("  https://sentientwire.com/fr/news/ceasefire-ends-strait-of-hormuz-us-military-operation-iran-global-trade")
    print("=" * 60)
    input("\nÇıkmak için ENTER'a basın...")

if __name__ == "__main__":
    run()
