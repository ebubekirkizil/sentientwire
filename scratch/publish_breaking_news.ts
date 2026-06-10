import { processArticle } from "../src/app/actions/article";

const rawText = `Hürmüz Boğazı'nda "Ateşkes" Bitti: ABD'nin İran'a Başlattığı Askeri Operasyon Küresel Ticareti Nasıl Vuracak?
Rapor Kodu: SW-BREAKING-001 | Durum: Sıcak Çatışma
Odak: Orta Doğu Jeopolitiği & Küresel Piyasa Volatilitesi
Okuma Süresi: 8 Dakika

YÖNETİCİ ÖZETİ (TL;DR)
Gelişme: ABD, dün Hürmüz Boğazı'nda düşürülen Apache helikopterine karşılık İran askeri hedeflerine yönelik geniş kapsamlı hava saldırıları başlattığını duyurdu.

Stratejik Kırılma: Orta Doğu, on yıllardır görülmemiş bir "tam kapsamlı çatışma" riskine girdi. Hürmüz Boğazı'nın güvenliği askıya alındı.

Piyasa Şoku: S&P 500 ve NASDAQ gibi teknoloji ve finans endeksleri saatler içinde %4'ü aşan değer kayıpları yaşarken, yatırımcılar "panik satışı" moduna geçti.

Giriş: Bir Helikopterden Küresel Kaosa
Hürmüz Boğazı, dünya petrolünün "kalbinin attığı" tek damardır. Dün akşam saatlerinde bir Amerikan Apache helikopterinin düşürülmesi, sadece teknik bir olay değil, modern Orta Doğu jeopolitiğinin dengelerini bozan bir "kırılma noktası" oldu. ABD Merkez Kuvvetler Komutanlığı (CENTCOM), bu saldırıyı "kabul edilemez bir savaş ilanı" olarak tanımlayarak, meşru müdafaa hakkını kullanarak İran askeri tesislerini vurmaya başladıklarını açıkladı. Bugün saat 02:47 itibarıyla, bölgedeki radar hareketliliği rekor seviyeye çıkmış durumda.

Operasyonel Darboğaz: Enerji ve Lojistik Kilitleniyor
Bu çatışma sadece bir "askeri operasyon" değil, aynı zamanda küresel ekonominin can damarına yapılan bir müdahale:

Hürmüz Boğazı Ablukası: Dünyanın günlük petrol ihtiyacının yaklaşık %20'si bu dar boğazdan geçiyor. Çatışmanın tırmanması, petrol tankerlerinin sigorta primlerini imkansız seviyelere çekerek enerji fiyatlarını saatler içinde manipüle edebilir.

Ticaret Rotası İptalleri: Bölgedeki sivil havacılık ve deniz ticareti rotaları güvenlik nedeniyle "yasaklı bölge" ilan edildi. Bu durum, Asya-Avrupa hattındaki lojistik zincirinde en az 10-15 günlük gecikmelere yol açacak.

Siber Savaşın Yükselişi: Askeri operasyonların yanı sıra, İran yanlısı grupların siber saldırılarla bölgedeki lojistik ve finans altyapılarını hedef alması bekleniyor.

Piyasa Analizi: "Korku" Endeksi Neden Zirvede?
Piyasalar belirsizliği sevmez; ancak "savaş" belirsizliğin en yıkıcı halidir. VIX (Korku Endeksi) 23 seviyesini aşarak, yatırımcıların tüm "riskli varlıklardan" kaçıp nakde veya güvenli limanlara koştuğunu gösteriyor. Özellikle teknoloji hisselerindeki sert düşüş, büyük yatırımcıların "nakit koruma" moduna geçtiğinin en net kanıtı.

EDİTÖRÜN YORUMU: Bir Dönemin Sonu, Belirsizliğin Başlangıcı
Şu an yaşananlar, sadece bir karşılıklı füze alışverişi değil. Bu, uzun süredir uyuyan bir volkanın patlamasıdır.

Öngörüm şudur:
Çatışmanın genişlemesi, sadece Orta Doğu'yu değil; küresel tedarik zincirini de "ikinci bir pandemi" benzeri bir şokla karşı karşıya bırakacak. Lojistik maliyetleri artacak, hammadde fiyatları dalgalanacak ve en önemlisi; savunma sanayii odaklı teknoloji projeleri için "üretim güvenliği" bir numaralı gündem maddesi olacak.

Tavsiyem:
Eğer bu süreci takip ediyorsanız; şu an "bekle ve gör" zamanı değil, "riskini hedge etme" (koruma altına alma) zamanıdır. Hürmüz Boğazı'ndaki her bir milimetrelik çatışma, yarın sabah sizin tedarik ettiğiniz parçanın fiyatında veya lojistik süresinde bir sapma olarak dönecektir. Tarih, bu tip "sıcak" anlarda, hazırlıksız olanların nasıl yok olduğunu defalarca kanıtladı.

SentientWire İstihbarat Notu: Bölgedeki askeri hareketliliği anbean takip ediyoruz. Eğer bu çatışmanın senin işin veya yatırımların üzerindeki olası etkilerini spesifik bir sektör (Örn: Lojistik, İHA parçaları, Yazılım) bazında analiz etmemi istersen, hemen derinlemesine bir operasyonel risk raporu oluşturabilirim.`;

async function main() {
  console.log("Publishing breaking news via AI processing...");
  try {
    const result = await processArticle(rawText);
    console.log("Result:", JSON.stringify(result, null, 2));
    if (result.success) {
      console.log("Successfully published the breaking news!");
    } else {
      console.error("Failed to publish:", result.error);
    }
  } catch (error) {
    console.error("Critical error:", error);
  }
}

main();
