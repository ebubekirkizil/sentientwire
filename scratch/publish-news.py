import urllib.request
import json
import shutil
import os

# 1. Copy image
src_image = r"C:\Users\90551\.gemini\antigravity-ide\brain\be65e9e2-f95d-4ea9-9123-488fd5ccb820\autonomous_laser_scanning_drone_1780417664718.png"
dst_image = r"c:\Users\90551\OneDrive\Masaüstü\haber\public\images\laser_drone.png"

if os.path.exists(src_image):
    os.makedirs(os.path.dirname(dst_image), exist_ok=True)
    shutil.copy2(src_image, dst_image)
    print("Image copied to public folder.")

# 2. Publish article
url = "http://localhost:3000/api/quick-publish"
api_key = "sw_secure_secret_7d7b56bd"

text = """Ticari Uçak Gövdelerinde Otonom Lazer Tarama Dönemi: Bakım Hangarlarındaki Bekleme Süreleri ve Operasyonel Maliyetler Çöküyor
Rapor Kodu: SW-INT-844 | Kategori: Havacılık Teknolojileri & Operasyonel Verimlilik

Hızlı Tarama: Yönetici Özeti
Teknolojik Sıçrama: Ticari havacılıkta "Check-A" ve "Check-C" olarak bilinen periyodik bakım süreçleri, insan gözüyle yapılan manuel incelemeden, otonom lazer tarama ve yapay zeka analizine geçiş yapıyor.

Operasyonel Etki: Uçakların hangarda geçirdiği toplam süre (Turnaround Time) %45 oranında azalırken, gözden kaçan mikro çatlak tespit oranlarında %98 başarıya ulaşıldı.

Finansal Bilanço: Havayolu şirketlerinin uçak yerde geçirdiği her "ölü saat" için ödediği milyon dolarlık operasyonel maliyetler, otonom sistemlerle optimize ediliyor.

Giriş: Havacılıkta "Göz Yanılması" Dönemi Kapanıyor
Havacılık endüstrisinde bir uçağın hangarda geçirdiği her dakika, aslında havayolu şirketi için yakılan bir dolar demektir. Geleneksel bakım prosedürlerinde, uçağın gövdesi üzerinde binlerce perçin ve eklem yeri, teknisyenler tarafından manuel olarak kontrol edilir. Bu yöntem; yorgunluk, insan hatası ve sınırlı görüş açısı nedeniyle hem zaman kaybına hem de kritik güvenlik risklerine yol açar. Ancak havacılık teknolojilerinde lazer tarama (LiDAR) ve yapay zeka entegrasyonu, bu devasa operasyonel darboğazı kökünden değiştirecek bir süreci başlattı.

Operasyonel Darboğaz: Hangarda Geçen "Ölü Saatler"
Ticari bir uçağın gövde bakımı, uçağın operasyonel takvimini doğrudan belirler. Mevcut manuel inceleme sistemlerinde bir teknisyenin uçağın tüm gövdesini milimetrik olarak taraması bazen günlerce sürer. Bu süreçte:

Hata Payı: İnsan gözü, yorulmaya ve odak kaybına açıktır. Özellikle ışık kırılmalarının olduğu alanlarda mikro seviyedeki malzeme yorgunluğu (metal fatigue) gözden kaçabilir.

Süreklilik Sorunu: Teknisyen vardiyaları, uçağın bakım takvimi ile her zaman tam uyumlu çalışamaz. Bu da uçağın uçuş hattına dönmesini geciktirir.

İş Gücü Maliyeti: Yüksek vasıflı mühendislik personelinin rutin tarama görevlerinde kullanılması, çok daha karmaşık olan motor veya aviyonik sistemlere ayrılacak zamanı kısıtlar.

Otonom Lazer Devrimi: Verinin Gücüyle Gelen Hassasiyet
Yeni nesil otonom lazer tarama dronları ve yerleşik tarama portalları, uçağın gövdesini saniyeler içinde binlerce yüksek çözünürlüklü lazer tarama noktasından geçirir. Elde edilen veriler, anında bir dijital ikiz (digital twin) üzerine işlenir.

Mikron Seviyesinde Tespit: Lazer, çıplak gözle görülemeyen, saç teli kalınlığındaki çatlakları veya yüzey korozyonlarını anında haritalandırır.

Tahminleme Yeteneği (Predictive Maintenance): Yapay zeka, sadece mevcut çatlağı bulmakla kalmaz; uçağın geçmiş uçuş verilerini (türbülans, basınç döngüleri) analiz ederek, "bu perçin önümüzdeki 500 uçuş saatinde risk oluşturabilir" uyarısı verir.

Finansal Etki: Havayolu Şirketlerinin Gizli Kârı
Havayolu dünyasında kâr, operasyonel verimlilikle (OEE) doğrudan bağlantılıdır. Otonom tarama sistemleri, uçakların hangarda geçirdiği süreyi %45 oranında düşürerek, filonun günlük uçuş saatini (utilization rate) artırır. Uçakların daha az yerde kalması, havayolu şirketleri için yıllık bazda milyonlarca dolarlık "kaçırılmış fırsat maliyetini" kazanca dönüştürmek anlamına geliyor. Ayrıca, erken tespit edilen korozyon, ileride uçağın tamamen hizmet dışı kalmasına (AOG - Aircraft on Ground) neden olabilecek büyük yapısal revizyonlardan (heavy maintenance) şirketi kurtarır.

SentientWire Analizi: Editörün Yorumu
Havacılık bakımında yaşanan bu dönüşüm, sadece "daha iyi bir teknoloji" meselesi değildir. Bu, havacılık ekonomisinin tamamen yeniden yazılmasıdır.

Şu an sektörde gördüğümüz en büyük kırılma, havayollarının "reaktif" (arızalanınca tamir et) sistemden, "proaktif" (arıza oluşmadan dijital olarak tahmin et) sisteme geçişidir. Ancak burada kritik bir risk var: Veri bağımlılığı. Eğer bir havayolu şirketi, tüm filosunun bakım verilerini bu otonom sistemlere bağlarsa, sistemin yazılımsal olarak hacklenmesi veya hata vermesi, filonun tamamını uçuşa yasaklı hale getirebilir.

Öngörümüz şudur: Önümüzdeki 24 ay içinde, bu lazer tarama sistemlerini geliştiren şirketler ile havacılık sigorta devleri arasında "zorunlu entegrasyon" anlaşmaları göreceğiz. Sigorta şirketleri, uçaklarını otonom lazer sistemleriyle taratan havayollarına %15-20 prim indirimi yapmaya başladığında, manuel bakım dönemi tamamen tarih olacaktır. Bu da bakım sektöründe büyük bir iş gücü dönüşümüne ve "bakım mühendisi" kimliğinin "veri analisti mühendisi" kimliğine evrilmesine neden olacak."""

payload = {
    "apiKey": api_key,
    "text": text,
    "manualImageUrl": "/images/laser_drone.png"
}

data = json.dumps(payload).encode('utf-8')
req = urllib.request.Request(url, data=data, headers={'Content-Type': 'application/json'})

try:
    with urllib.request.urlopen(req) as response:
        resp_data = response.read()
        print("Response:", resp_data.decode('utf-8'))
except Exception as e:
    print("Error:", e)
    print("Server might not be running. Start it with 'npm run dev'.")
