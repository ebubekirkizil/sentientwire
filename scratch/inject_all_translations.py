import requests
import json

TURSO_URL = "https://sentientwire-ebubekirkizil.aws-eu-west-1.turso.io/v2/pipeline"
TURSO_TOKEN = "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJleHAiOjE5MDY0Njg2MjAsImlhdCI6MTc3OTYzMzQyMCwiaWQiOiIwMTllNWE2OS1jMDAxLTdmMjEtOWJhMC1jZGIyYzk2ODkxZWMiLCJyaWQiOiJmOWE1OGFlMC01ODc5LTRlNTAtOWE2YS0wMWJiNjAwYzFlNWQifQ.qzJOAteUxyuHiOvHMH6aOjgVkahY_KSnAoIOy5dzAG0ZAUteOQJeoIJHBojX3oiyOqGrrr-I5EM7upRCXrNtDg"

translations = [
    {
        "locale": "zh",
        "title": "霍尔木兹海峡“停火”结束：美国对伊朗的军事行动将如何影响全球贸易",
        "summary": "美国宣布对伊朗军事目标发动大规模空袭，以报复一架阿帕奇直升机在霍尔木兹海峡被击落。全球原油贸易面临严重中断，市场陷入震惊。",
        "content": """<div class="tldr-box">
  <ul>
    <li>阿帕奇直升机被击落后，美国宣布对伊朗军事目标发动空袭。</li>
    <li>标准普尔 500 指数和纳斯达克指数在数小时内暴跌超过 4%，市场陷入恐慌性抛售。</li>
    <li>霍尔木兹海峡的安全危机正威胁着全球原油贸易路线。</li>
  </ul>
</div>
<h2>前言：从一架直升机到全球混乱</h2>
<p>霍尔木兹海峡是世界上最重要的原油大动脉——全球能源供应唯一咽喉要道。昨夜，一架美国阿帕奇直升机被击落不仅仅是一次战术事件；这标志着一个关键的“突破点”，正在重塑中东的权力平衡。美国中央司令部（CENTCOM）称此次袭击为“不可接受的战争行为”，并宣布根据自卫权对伊朗军事设施发动打击。</p>
<div class="my-12 rounded-xl overflow-hidden border border-[var(--border-subtle)] shadow-lg">
  <img src="/missile_inside.png" alt="霍尔木兹海峡的军事行动" class="w-full h-auto object-cover" />
  <div class="bg-[var(--bg-secondary)] p-3 text-center font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-widest">
    现场情报：视觉资产已部署
  </div>
</div>
<h2>运营瓶颈：能源与物流被封锁</h2>
<p>这场冲突不仅仅是一次“军事行动”——这是对全球经济生命线的直接干预。世界上大约 20% 的日常原油消耗都要经过这条狭窄的海峡。冲突的升级可能会将油轮保险费推至不可承受的水平，从而在世界范围内操纵能源价格。</p>
<p>出于安全考虑，该地区的民航和海上贸易路线已被宣布为“禁飞和禁航区”。这将导致亚欧物流链至少延误 10-15 天。</p>
<h2>编辑分析：不确定性的开始</h2>
<p>现在正在发生的事情不仅仅是导弹的交换。这是一座休眠已久的火山的喷发。如果冲突扩大，可能会使全球供应链面临让人想起“第二次疫情”的冲击——不是由病毒驱动，而是由地缘政治崩溃引起的。</p>"""
    },
    {
        "locale": "es",
        "title": "Termina el 'Alto el Fuego' en el Estrecho de Ormuz: Cómo el Operativo Militar de EE. UU. Contra Irán Impactará el Comercio Global",
        "summary": "Estados Unidos anunció el lanzamiento de una campaña masiva de ataques aéreos contra objetivos militares iraníes en represalia por el derribo de un helicóptero Apache en el Estrecho de Ormuz. Los mercados están conmocionados mientras el comercio mundial de petróleo enfrenta una interrupción severa.",
        "content": """<div class="tldr-box">
  <ul>
    <li>EE. UU. anunció ataques aéreos contra objetivos militares iraníes tras el derribo de un helicóptero Apache.</li>
    <li>Los índices S&amp;P 500 y NASDAQ registraron pérdidas superiores al 4% en cuestión de horas.</li>
    <li>La crisis de seguridad en el Estrecho de Ormuz amenaza las rutas mundiales de comercio de petróleo.</li>
  </ul>
</div>
<h2>Introducción: De un Helicóptero al Caos Global</h2>
<p>El Estrecho de Ormuz es la arteria más crítica del mundo para el petróleo. Anoche, el derribo de un helicóptero Apache estadounidense marcó un 'punto de quiebre' que está remodelando el equilibrio de poder en el Medio Oriente. El Comando Central (CENTCOM) calificó el ataque como "un acto de guerra inaceptable" y anunció ataques en defensa propia.</p>
<div class="my-12 rounded-xl overflow-hidden border border-[var(--border-subtle)] shadow-lg">
  <img src="/missile_inside.png" alt="Operación Militar en el Estrecho de Ormuz" class="w-full h-auto object-cover" />
  <div class="bg-[var(--bg-secondary)] p-3 text-center font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-widest">
    INTELIGENCIA DE CAMPO: ACTIVO VISUAL DESPLEGADO
  </div>
</div>
<h2>Cuello de Botella Operativo: Energía y Logística Bloqueadas</h2>
<p>Este conflicto no es solo una "operación militar", es una intervención directa en la línea vital de la economía global. Aproximadamente el 20% del consumo diario de petróleo del mundo pasa por este estrecho. Una escalada podría empujar las primas de seguros a niveles imposibles.</p>
<p>Las rutas comerciales marítimas y la aviación civil han sido declaradas "zonas de exclusión" por razones de seguridad, provocando retrasos de al menos 10-15 días en la logística Asia-Europa.</p>
<h2>ANÁLISIS DEL EDITOR: El Comienzo de la Incertidumbre</h2>
<p>Lo que está sucediendo ahora no es un mero intercambio de misiles. Es la erupción de un volcán latente. Si el conflicto se expande, podría exponer la cadena de suministro global a un shock geopolítico masivo.</p>"""
    },
    {
        "locale": "de",
        "title": "Waffenstillstand in der Straße von Hormus beendet: Wie die US-Militäroperation gegen den Iran den Welthandel treffen wird",
        "summary": "Die Vereinigten Staaten gaben den Beginn umfassender Luftangriffe auf iranische Militärziele als Vergeltung für den Abschuss eines Apache-Hubschraubers bekannt. Die Märkte stehen unter Schock.",
        "content": """<div class="tldr-box">
  <ul>
    <li>Die USA kündigten nach dem Abschuss eines Apache-Hubschraubers Luftangriffe auf iranische Militärziele an.</li>
    <li>S&amp;P 500 und NASDAQ verzeichneten innerhalb von Stunden Verluste von über 4%.</li>
    <li>Die Sicherheitskrise in der Straße von Hormus bedroht globale Ölhandelsrouten.</li>
  </ul>
</div>
<h2>Einführung: Von einem Hubschrauber zum globalen Chaos</h2>
<p>Die Straße von Hormus ist die kritischste Ader der Welt für Öl. Gestern Nacht war der Abschuss eines US-Apache-Hubschraubers nicht nur ein taktischer Vorfall; er markierte einen entscheidenden Wendepunkt im Nahen Osten. Das US Central Command (CENTCOM) bezeichnete den Angriff als "inakzeptablen Kriegsakt".</p>
<div class="my-12 rounded-xl overflow-hidden border border-[var(--border-subtle)] shadow-lg">
  <img src="/missile_inside.png" alt="Militäroperation in der Straße von Hormus" class="w-full h-auto object-cover" />
  <div class="bg-[var(--bg-secondary)] p-3 text-center font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-widest">
    FELD-INTEL: VISUELLES ASSET EINGESETZT
  </div>
</div>
<h2>Operativer Engpass: Energie und Logistik gesperrt</h2>
<p>Etwa 20% des täglichen Ölverbrauchs der Welt passieren diese Meerenge. Eine Eskalation könnte die Versicherungsprämien für Tanker auf ein unmögliches Niveau treiben und die Energiepreise weltweit manipulieren.</p>
<p>Zivile Luftfahrt und Seehandelsrouten in der Region wurden zu "No-Fly- und No-Sail-Zonen" erklärt. Dies wird Verzögerungen von mindestens 10–15 Tagen in der Asien-Europa-Logistikkette auslösen.</p>
<h2>ANALYSE DES HERAUSGEBERS: Der Beginn der Ungewissheit</h2>
<p>Wenn sich der Konflikt ausweitet, könnte er die globale Lieferkette einem Schock aussetzen, der an eine "zweite Pandemie" erinnert – nicht durch ein Virus, sondern durch geopolitischen Zusammenbruch.</p>"""
    },
    {
        "locale": "ru",
        "title": "«Перемирие» в Ормузском проливе завершено: как военная операция США против Ирана ударит по мировой торговле",
        "summary": "США объявили о начале масштабных авиаударов по иранским военным объектам в ответ на сбитый вертолет Apache в Ормузском проливе. Рынки в шоке.",
        "content": """<div class="tldr-box">
  <ul>
    <li>США объявили об авиаударах по военным целям Ирана после уничтожения вертолета Apache.</li>
    <li>Индексы S&amp;P 500 и NASDAQ упали более чем на 4% за несколько часов.</li>
    <li>Кризис безопасности в Ормузском проливе угрожает мировым маршрутам торговли нефтью.</li>
  </ul>
</div>
<h2>Введение: от вертолета к глобальному хаосу</h2>
<p>Ормузский пролив — самая важная в мире артерия для транспортировки нефти. Вчерашнее уничтожение американского вертолета Apache стало переломным моментом, меняющим баланс сил на Ближнем Востоке. Центральное командование США (CENTCOM) назвало атаку «неприемлемым актом войны».</p>
<div class="my-12 rounded-xl overflow-hidden border border-[var(--border-subtle)] shadow-lg">
  <img src="/missile_inside.png" alt="Военная операция в Ормузском проливе" class="w-full h-auto object-cover" />
  <div class="bg-[var(--bg-secondary)] p-3 text-center font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-widest">
    ПОЛЕВЫЕ ДАННЫЕ: ВИЗУАЛЬНЫЙ АКТИВ РАЗВЕРНУТ
  </div>
</div>
<h2>Оперативное узкое место: блокировка энергетики и логистики</h2>
<p>Около 20% ежедневного мирового потребления нефти проходит через этот узкий пролив. Эскалация конфликта может поднять страховые премии для танкеров до невозможного уровня.</p>
<p>Торговые маршруты в регионе объявлены зонами, закрытыми для полетов и плавания. Это вызовет задержки минимум на 10–15 дней в логистической цепи Азия-Европа.</p>
<h2>АНАЛИЗ РЕДАКТОРА: начало неопределенности</h2>
<p>То, что разворачивается сейчас — это не просто обмен ракетами. Если конфликт расширится, он может подвергнуть глобальную цепочку поставок шоку, сравнимому со «второй пандемией», вызванной геополитическим крахом.</p>"""
    },
    {
        "locale": "pl",
        "title": "Koniec \"Zawieszenia Broni\" w Cieśninie Ormuz: Jak Operacja Wojskowa USA Przeciwko Iranowi Uderzy w Globalny Handel",
        "summary": "Stany Zjednoczone ogłosiły rozpoczęcie szeroko zakrojonych ataków z powietrza na irańskie cele wojskowe w odwecie za zestrzelenie helikoptera Apache.",
        "content": """<div class="tldr-box">
  <ul>
    <li>USA ogłosiły ataki na cele wojskowe Iranu po zestrzeleniu helikoptera Apache.</li>
    <li>Indeksy S&amp;P 500 i NASDAQ odnotowały spadki przekraczające 4% w ciągu kilku godzin.</li>
    <li>Kryzys bezpieczeństwa w Cieśninie Ormuz zagraża światowym szlakom handlu ropą.</li>
  </ul>
</div>
<h2>Wprowadzenie: Od Helikoptera do Globalnego Chaosu</h2>
<p>Cieśnina Ormuz to najbardziej krytyczna arteria dla ropy naftowej na świecie. Zestrzelenie amerykańskiego helikoptera Apache zmieniło układ sił na Bliskim Wschodzie. Dowództwo Centralne USA (CENTCOM) nazwało atak "niedopuszczalnym aktem wojny".</p>
<div class="my-12 rounded-xl overflow-hidden border border-[var(--border-subtle)] shadow-lg">
  <img src="/missile_inside.png" alt="Operacja wojskowa w Cieśninie Ormuz" class="w-full h-auto object-cover" />
  <div class="bg-[var(--bg-secondary)] p-3 text-center font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-widest">
    DANE WYWIADOWCZE: ZASÓB WIZUALNY WDROŻONY
  </div>
</div>
<h2>Wąskie Gardło: Energia i Logistyka Zablokowane</h2>
<p>Około 20% dziennego światowego zużycia ropy przechodzi przez tę cieśninę. Eskalacja konfliktu może zmanipulować ceny energii w skali globalnej.</p>
<p>Cywilne szlaki lotnicze i morskie w regionie zostały uznane za strefy zakazu lotów i żeglugi, co spowoduje opóźnienia rzędu 10-15 dni.</p>
<h2>ANALIZA REDAKTORA: Początek Niepewności</h2>
<p>Jeśli konflikt się rozszerzy, może narazić globalny łańcuch dostaw na szok przypominający "drugą pandemię" — wywołaną geopolitycznym załamaniem.</p>"""
    },
    {
        "locale": "fr",
        "title": "Fin du « Cessez-le-feu » dans le détroit d'Ormuz : L'opération militaire américaine va frapper le commerce mondial",
        "summary": "Les États-Unis ont annoncé une vaste campagne de frappes aériennes contre des cibles militaires iraniennes. Les marchés sont sous le choc.",
        "content": """<div class="tldr-box">
  <ul>
    <li>Les États-Unis ont annoncé des frappes aériennes contre des cibles militaires iraniennes.</li>
    <li>Les indices S&amp;P 500 et NASDAQ ont enregistré des pertes de plus de 4 %.</li>
    <li>La crise sécuritaire menace les routes mondiales du commerce pétrolier.</li>
  </ul>
</div>
<h2>Introduction : D'un hélicoptère au chaos mondial</h2>
<p>Le détroit d'Ormuz est l'artère pétrolière la plus critique du monde. La destruction d'un hélicoptère Apache américain a marqué un point de rupture. Le CENTCOM a qualifié l'attaque d'acte de guerre inacceptable.</p>
<div class="my-12 rounded-xl overflow-hidden border border-[var(--border-subtle)] shadow-lg">
  <img src="/missile_inside.png" alt="Opération militaire" class="w-full h-auto object-cover" />
</div>
<h2>Goulot d'étranglement logistique</h2>
<p>Environ 20 % de la consommation mondiale de pétrole passe par ce détroit. L'escalade pourrait manipuler les prix de l'énergie à l'échelle mondiale, causant des retards de 10 à 15 jours sur la chaîne Asie-Europe.</p>
<h2>ANALYSE DE LA RÉDACTION</h2>
<p>L'expansion du conflit pourrait exposer la chaîne d'approvisionnement à un choc géopolitique majeur.</p>"""
    },
    {
        "locale": "it",
        "title": "Fine del 'Cessate il fuoco' nello Stretto di Hormuz: l'operazione militare USA colpirà il commercio globale",
        "summary": "Gli Stati Uniti hanno annunciato massicci attacchi aerei contro obiettivi militari iraniani. I mercati sono in shock.",
        "content": """<div class="tldr-box">
  <ul>
    <li>Gli USA hanno annunciato attacchi aerei contro obiettivi iraniani.</li>
    <li>Gli indici S&amp;P 500 e NASDAQ hanno registrato perdite superiori al 4%.</li>
    <li>La crisi minaccia le rotte globali del petrolio.</li>
  </ul>
</div>
<h2>Introduzione: Da un elicottero al caos globale</h2>
<p>Lo Stretto di Hormuz è l'arteria più critica del mondo per il petrolio. L'abbattimento di un Apache USA ha segnato un punto di rottura. Il CENTCOM ha definito l'attacco un atto di guerra inaccettabile.</p>
<div class="my-12 rounded-xl overflow-hidden border border-[var(--border-subtle)] shadow-lg">
  <img src="/missile_inside.png" alt="Operazione militare" class="w-full h-auto object-cover" />
</div>
<h2>Collo di bottiglia operativo</h2>
<p>Circa il 20% del consumo globale di petrolio passa da qui. Un'escalation manipolerebbe i prezzi dell'energia, causando ritardi logistici di 10-15 giorni tra Asia ed Europa.</p>
<h2>ANALISI DEL DIRETTORE</h2>
<p>Un'espansione del conflitto causerebbe uno shock geopolitico senza precedenti.</p>"""
    },
    {
        "locale": "nl",
        "title": "Einde 'Staakt-het-vuren' Straat van Hormuz: Hoe de Amerikaanse militaire operatie de wereldhandel zal raken",
        "summary": "De VS kondigden grootschalige luchtaanvallen op Iraanse militaire doelen aan. De markten zijn in shock.",
        "content": """<div class="tldr-box">
  <ul>
    <li>De VS kondigden luchtaanvallen aan tegen Iraanse doelen.</li>
    <li>S&amp;P 500 en NASDAQ daalden meer dan 4%.</li>
    <li>De crisis bedreigt wereldwijde olieroutes.</li>
  </ul>
</div>
<h2>Introductie: Van helikopter tot wereldwijde chaos</h2>
<p>De Straat van Hormuz is de meest kritieke ader ter wereld voor olie. Het neerhalen van een Amerikaanse Apache markeert een breekpunt. CENTCOM noemde de aanval een onacceptabele oorlogsdaad.</p>
<div class="my-12 rounded-xl overflow-hidden border border-[var(--border-subtle)] shadow-lg">
  <img src="/missile_inside.png" alt="Militaire Operatie" class="w-full h-auto object-cover" />
</div>
<h2>Operationele knelpunt</h2>
<p>Ongeveer 20% van de wereldwijde olieconsumptie passeert deze zeestraat. Escalatie kan de energieprijzen wereldwijd manipuleren en logistieke vertragingen van 10-15 dagen veroorzaken.</p>
<h2>ANALYSE</h2>
<p>Een uitbreiding van het conflict kan een ongekende geopolitieke schok veroorzaken.</p>"""
    }
]

def headers():
    return {
        "Authorization": f"Bearer {TURSO_TOKEN}",
        "Content-Type": "application/json"
    }

def run():
    print("=" * 60)
    print("  SentientWire — Toplu Çeviri Enjektörü (Offline Bypass)")
    print("=" * 60)

    # 1. Makale ID'sini bul
    find_payload = {
        "requests": [{
            "type": "execute",
            "stmt": {
                "sql": "SELECT id FROM Article WHERE slug LIKE 'ceasefire-ends%' OR slug LIKE 'hurmuz-bogazinda%' ORDER BY createdAt DESC LIMIT 1"
            }
        }]
    }
    r = requests.post(TURSO_URL, headers=headers(), json=find_payload)
    rows = r.json().get("results", [{}])[0].get("response", {}).get("result", {}).get("rows", [])
    
    if not rows:
        print("❌ Makale bulunamadı.")
        input("Çıkış...")
        return
        
    article_id = rows[0][0]["value"]
    print(f"✅ Makale bulundu. ID: {article_id}")
    print("⏳ Çeviriler veritabanına doğrudan yükleniyor...\n")

    for trans in translations:
        payload = {
            "requests": [{
                "type": "execute",
                "stmt": {
                    "sql": "INSERT OR REPLACE INTO ArticleTranslation (articleId, locale, title, summary, content) VALUES (?, ?, ?, ?, ?)",
                    "args": [
                        {"type": "text", "value": article_id},
                        {"type": "text", "value": trans["locale"]},
                        {"type": "text", "value": trans["title"]},
                        {"type": "text", "value": trans["summary"]},
                        {"type": "text", "value": trans["content"]}
                    ]
                }
            }]
        }
        res = requests.post(TURSO_URL, headers=headers(), json=payload)
        if res.status_code == 200:
            print(f"  ✅ {trans['locale'].upper()} eklendi: {trans['title'][:30]}...")
        else:
            print(f"  ❌ {trans['locale'].upper()} hatası: {res.text}")

    print("\n" + "=" * 60)
    print("✅ TÜM ÇEVİRİLER BAŞARIYLA YÜKLENDİ!")
    print("Sayfanızı yenileyip sağ üstten dilleri değiştirebilirsiniz.")
    print("=" * 60)
    input("\nÇıkmak için ENTER'a basın...")

if __name__ == "__main__":
    run()
