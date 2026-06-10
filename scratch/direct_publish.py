import requests
import json
import uuid
import datetime

TURSO_URL = "https://sentientwire-ebubekirkizil.aws-eu-west-1.turso.io/v2/pipeline"
TURSO_TOKEN = "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJleHAiOjE5MDY0Njg2MjAsImlhdCI6MTc3OTYzMzQyMCwiaWQiOiIwMTllNWE2OS1jMDAxLTdmMjEtOWJhMC1jZGIyYzk2ODkxZWMiLCJyaWQiOiJmOWE1OGFlMC01ODc5LTRlNTAtOWE2YS0wMWJiNjAwYzFlNWQifQ.qzJOAteUxyuHiOvHMH6aOjgVkahY_KSnAoIOy5dzAG0ZAUteOQJeoIJHBojX3oiyOqGrrr-I5EM7upRCXrNtDg"

def get_insert_statements():
    article_id = str(uuid.uuid4())
    slug = f"hurmuz-bogazinda-ateskes-bitti-{int(datetime.datetime.now().timestamp())}"
    
    title = "Hürmüz Boğazı'nda \"Ateşkes\" Bitti: ABD'nin İran'a Başlattığı Askeri Operasyon Küresel Ticareti Nasıl Vuracak?"
    summary = "ABD, dün Hürmüz Boğazı'nda düşürülen Apache helikopterine karşılık İran askeri hedeflerine yönelik geniş kapsamlı hava saldırıları başlattığını duyurdu. Piyasalar şokta."
    
    content = """<div class="tldr-box">
  <ul>
    <li>ABD, düşürülen Apache helikopterine karşılık İran askeri hedeflerini vurmaya başladı.</li>
    <li>S&P 500 ve NASDAQ gibi teknoloji ve finans endeksleri saatler içinde %4'ü aşan değer kayıpları yaşadı.</li>
    <li>Hürmüz Boğazı'ndaki güvenlik krizi küresel petrol ticaretini tehdit ediyor.</li>
  </ul>
</div>
<h2>Giriş: Bir Helikopterden Küresel Kaosa</h2>
<p>Hürmüz Boğazı, dünya petrolünün \"kalbinin attığı\" tek damardır. Dün akşam saatlerinde bir Amerikan Apache helikopterinin düşürülmesi, sadece teknik bir olay değil, modern Orta Doğu jeopolitiğinin dengelerini bozan bir \"kırılma noktası\" oldu. ABD Merkez Kuvvetler Komutanlığı (CENTCOM), bu saldırıyı \"kabul edilemez bir savaş ilanı\" olarak tanımlayarak, meşru müdafaa hakkını kullanarak İran askeri tesislerini vurmaya başladıklarını açıkladı.</p>
<div class="my-12 rounded-xl overflow-hidden border border-[var(--border-subtle)] shadow-lg">
  <img src="https://images.unsplash.com/photo-1574587843815-7798782a6111?auto=format&fit=crop&q=80&w=1200&h=628" alt="Military Helicopter" class="w-full h-auto object-cover" />
  <div class="bg-[var(--bg-secondary)] p-3 text-center font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-widest">
    FIELD INTEL: VISUAL ASSET DEPLOYED
  </div>
</div>
<h2>Operasyonel Darboğaz: Enerji ve Lojistik Kilitleniyor</h2>
<p>Bu çatışma sadece bir \"askeri operasyon\" değil, aynı zamanda küresel ekonominin can damarına yapılan bir müdahale. Dünyanın günlük petrol ihtiyacının yaklaşık %20'si bu dar boğazdan geçiyor. Çatışmanın tırmanması, petrol tankerlerinin sigorta primlerini imkansız seviyelere çekerek enerji fiyatlarını manipüle edebilir.</p>
<p>Bölgedeki sivil havacılık ve deniz ticareti rotaları güvenlik nedeniyle \"yasaklı bölge\" ilan edildi. Bu durum, Asya-Avrupa hattındaki lojistik zincirinde en az 10-15 günlük gecikmelere yol açacak.</p>
<h2>EDİTÖRÜN YORUMU: Belirsizliğin Başlangıcı</h2>
<p>Şu an yaşananlar, sadece bir karşılıklı füze alışverişi değil. Bu, uzun süredir uyuyan bir volkanın patlamasıdır. Çatışmanın genişlemesi, küresel tedarik zincirini de \"ikinci bir pandemi\" benzeri bir şokla karşı karşıya bırakacak.</p>
"""
    
    image_url = "https://images.unsplash.com/photo-1544971587-ec1c5040d71a?auto=format&fit=crop&q=80&w=1200&h=628"
    
    return [
        {
            "type": "execute",
            "stmt": {
                "sql": "INSERT INTO Article (id, title, slug, summary, content, category, categoryColor, imageUrl, locale, isPublished) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'tr', 1)",
                "args": [
                    {"type": "text", "value": article_id},
                    {"type": "text", "value": title},
                    {"type": "text", "value": slug},
                    {"type": "text", "value": summary},
                    {"type": "text", "value": content},
                    {"type": "text", "value": "DEFENSE"},
                    {"type": "text", "value": "#ef4444"},
                    {"type": "text", "value": image_url}
                ]
            }
        }
    ]

def publish():
    print("Veritabanına (Turso) doğrudan bağlanılıyor...")
    headers = {
        "Authorization": f"Bearer {TURSO_TOKEN}",
        "Content-Type": "application/json"
    }
    
    payload = {
        "requests": get_insert_statements()
    }
    
    try:
        response = requests.post(TURSO_URL, headers=headers, json=payload)
        if response.status_code == 200:
            print("\n✅ BAŞARILI! Haber doğrudan canlı veritabanına eklendi.")
            print("Lütfen https://sentientwire.com adresine gidip yenileyin.")
            input("\nÇıkmak için ENTER'a basın...")
        else:
            print(f"\n❌ HATA OLUŞTU: {response.status_code}")
            print(response.text)
            input("\nÇıkmak için ENTER'a basın...")
    except Exception as e:
        print("\n❌ BAĞLANTI HATASI:", str(e))
        input("\nÇıkmak için ENTER'a basın...")

if __name__ == "__main__":
    publish()
