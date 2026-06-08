import { runIngestion } from '../src/lib/ingest';

async function main() {
  console.log("Manuel Ingestion Başlatılıyor...");
  try {
    await runIngestion();
    console.log("Manuel Ingestion Tamamlandı!");
  } catch (err) {
    console.error("Hata:", err);
  }
}

main();
