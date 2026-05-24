const fs = require('fs');

const languages = {
  en: {
    Index: {
      category: "Global Technology & AI Intelligence",
      title1: "The Future of Technology",
      title2: "Is Written While You Sleep.",
      subtitle: "Beyond the mainstream media. Discover the next-generation AI tools, corporate breakthroughs, and digital innovations shaping tomorrow's ecosystem.",
      cta: "Explore Insights"
    },
    Header: {
      breaking: "BREAKING",
      ticker: [
        "NEW ERA IN AI REGULATIONS BEGINS",
        "UNEXPECTED BREAKTHROUGH IN QUANTUM CHIP PRODUCTION",
        "JOINT STATEMENT FROM GLOBAL TECH GIANTS",
        "NEXT-GEN AUTONOMOUS VEHICLES HIT CITY STREETS",
        "SENTIENT WIRE EXCLUSIVE: ARCHITECTS OF THE FUTURE"
      ],
      nav: {
        home: "HOME",
        cybersecurity: "CYBERSECURITY",
        ai: "AI",
        hardware: "HARDWARE"
      },
      login: "Account Login"
    }
  },
  tr: {
    Index: {
      category: "Küresel Teknoloji & Yapay Zeka Gündemi",
      title1: "Teknolojinin Geleceği",
      title2: "Siz Uyurken Yazılıyor.",
      subtitle: "Ana akım medyanın ötesine geçin. Geleceğin ekosistemini şekillendiren yeni nesil yapay zeka araçlarını, kurumsal atılımları ve dijital inovasyonları keşfedin.",
      cta: "Özel Haberleri İncele"
    },
    Header: {
      breaking: "SON DAKİKA",
      ticker: [
        "YAPAY ZEKA DÜZENLEMELERİNDE YENİ DÖNEM BAŞLIYOR",
        "KUANTUM ÇİP ÜRETİMİNDE BEKLENMEYEN ATILIM",
        "GLOBAL TEKNOLOJİ DEVLERİNDEN ORTAK BİLDİRİ",
        "YENİ NESİL OTONOM ARAÇLAR ŞEHİR TESTİNE ÇIKTI",
        "SENTIENT WIRE ÖZEL RÖPORTAJ: GELECEĞİN MİMARLARI"
      ],
      nav: {
        home: "ANA SAYFA",
        cybersecurity: "SİBER GÜVENLİK",
        ai: "YAPAY ZEKA",
        hardware: "DONANIM"
      },
      login: "Hesap Girişi"
    }
  },
  de: {
    Index: {
      category: "Globale Technologie & KI Intelligenz",
      title1: "Die Zukunft der Technologie",
      title2: "Wird geschrieben, während Sie schlafen.",
      subtitle: "Jenseits der Mainstream-Medien. Entdecken Sie KI-Tools, Durchbrüche von Unternehmen und digitale Innovationen.",
      cta: "Einblicke erkunden"
    },
    Header: {
      breaking: "EILMELDUNG",
      ticker: [
        "NEUE ÄRA DER KI-REGULIERUNGEN BEGINNT",
        "UNERWARTETER DURCHBRUCH BEI QUANTENCHIPS",
        "GEMEINSAME ERKLÄRUNG VON TECH-GIGANTEN",
        "AUTONOME FAHRZEUGE DER NÄCHSTEN GENERATION",
        "SENTIENT WIRE EXKLUSIV: ARCHITECTEN DER ZUKUNFT"
      ],
      nav: { home: "STARTSEITE", cybersecurity: "CYBERSICHERHEIT", ai: "KI", hardware: "HARDWARE" },
      login: "Konto-Login"
    }
  },
  es: {
    Index: {
      category: "Tecnología Global e Inteligencia de IA",
      title1: "El Futuro de la Tecnología",
      title2: "Se escribe mientras duermes.",
      subtitle: "Más allá de los principales medios. Descubre las herramientas de IA, avances corporativos e innovaciones.",
      cta: "Explorar artículos"
    },
    Header: {
      breaking: "ÚLTIMA HORA",
      ticker: [
        "COMIENZA UNA NUEVA ERA EN REGULACIONES DE IA",
        "AVANCE INESPERADO EN CHIPS CUÁNTICOS",
        "DECLARACIÓN CONJUNTA DE LOS GIGANTES TECNOLÓGICOS",
        "VEHÍCULOS AUTÓNOMOS DE PRUEBA EN LAS CALLES",
        "EXCLUSIVA DE SENTIENT WIRE: ARQUITECTOS DEL FUTURO"
      ],
      nav: { home: "INICIO", cybersecurity: "CIBERSEGURIDAD", ai: "IA", hardware: "HARDWARE" },
      login: "Iniciar sesión"
    }
  },
  fr: {
    Index: {
      category: "Technologie Mondiale & Intelligence IA",
      title1: "L'Avenir de la Technologie",
      title2: "S'écrit pendant que vous dormez.",
      subtitle: "Au-delà des médias traditionnels. Découvrez les outils d'IA et les innovations qui façonnent demain.",
      cta: "Explorer les Insights"
    },
    Header: {
      breaking: "DERNIÈRE HEURE",
      ticker: [
        "NOUVELLE ÈRE DE RÉGLEMENTATION DE L'IA",
        "PERCÉE INATTENDUE DANS LES PUCES QUANTIQUES",
        "DÉCLARATION CONJOINTE DES GÉANTS DE LA TECH",
        "VÉHICULES AUTONOMES EN TEST DANS LES RUES",
        "EXCLUSIVITÉ SENTIENT WIRE : ARCHITECTES DU FUTUR"
      ],
      nav: { home: "ACCUEIL", cybersecurity: "CYBERSÉCURITÉ", ai: "IA", hardware: "MATÉRIEL" },
      login: "Connexion"
    }
  },
  it: {
    Index: {
      category: "Tecnologia Globale & Intelligenza IA",
      title1: "Il Futuro della Tecnologia",
      title2: "Viene scritto mentre dormi.",
      subtitle: "Oltre i media mainstream. Scopri gli strumenti di IA e le innovazioni digitali.",
      cta: "Esplora gli Approfondimenti"
    },
    Header: {
      breaking: "ULTIM'ORA",
      ticker: [
        "INIZIA UNA NUOVA ERA NELLE REGOLE SULL'IA",
        "SVOLTA INASPETTATA NEI CHIP QUANTISTICI",
        "DICHIARAZIONE CONGIUNTA DEI GIGANTI DELLA TECH",
        "VEICOLI AUTONOMI TESTATI IN CITTÀ",
        "ESCLUSIVA SENTIENT WIRE: ARCHITETTI DEL FUTURO"
      ],
      nav: { home: "HOME", cybersecurity: "CYBERSECURITY", ai: "IA", hardware: "HARDWARE" },
      login: "Accedi"
    }
  },
  nl: {
    Index: {
      category: "Wereldwijde Technologie & AI",
      title1: "De Toekomst van Technologie",
      title2: "Wordt geschreven terwijl u slaapt.",
      subtitle: "Voorbij de reguliere media. Ontdek de AI-tools en innovaties van de toekomst.",
      cta: "Ontdek Inzichten"
    },
    Header: {
      breaking: "LAATSTE NIEUWS",
      ticker: [
        "NIEUW TIJDPERK IN AI-REGELGEVING BEGINT",
        "ONVERWACHTE DOORBRAAK IN QUANTUM CHIPS",
        "GEZAMENLIJKE VERKLARING VAN TECHREUZEN",
        "AUTONOME VOERTUIGEN OP STRAAT GETEST",
        "SENTIENT WIRE EXCLUSIEF: ARCHITECTEN VAN DE TOEKOMST"
      ],
      nav: { home: "HOME", cybersecurity: "CYBERSECURITY", ai: "AI", hardware: "HARDWARE" },
      login: "Inloggen"
    }
  },
  pl: {
    Index: {
      category: "Globalna Technologia i Sztuczna Inteligencja",
      title1: "Przyszłość Technologii",
      title2: "Pisze się, gdy śpisz.",
      subtitle: "Poza głównym nurtem. Odkryj narzędzia AI i cyfrowe innowacje kształtujące jutro.",
      cta: "Odkryj więcej"
    },
    Header: {
      breaking: "Z OSTATNIEJ CHWILI",
      ticker: [
        "POCZĄTEK NOWEJ ERY REGULACJI AI",
        "NIESPODZIEWANY PRZEŁOM W CHIPACH KWANTOWYCH",
        "WSPÓLNE OŚWIADCZENIE GIGANTÓW TECHNOLOGICZNYCH",
        "TESTY AUTONOMICZNYCH POJAZDÓW W MIASTACH",
        "TYLKO U NAS: ARCHITEKCI PRZYSZŁOŚCI"
      ],
      nav: { home: "GŁÓWNA", cybersecurity: "CYBERBEZPIECZEŃSTWO", ai: "AI", hardware: "SPRZĘT" },
      login: "Zaloguj"
    }
  }
};

// Aliases for EN variants
languages['en-US'] = languages.en;
languages['en-GB'] = languages.en;
languages['en-CA'] = languages.en;

for (const [lang, data] of Object.entries(languages)) {
  fs.writeFileSync('./messages/' + lang + '.json', JSON.stringify(data, null, 2));
}
console.log('Translations generated!');
