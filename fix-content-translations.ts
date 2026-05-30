import { createClient } from '@libsql/client';
import translate from 'google-translate-api-x';

const db = createClient({ 
  url: process.env.DATABASE_URL || '', 
  authToken: process.env.DATABASE_AUTH_TOKEN 
});

// Detect if text is English by checking common English words
function isEnglish(text: string): boolean {
  if (!text || text.length < 20) return false;
  const lower = text.toLowerCase();
  const englishMarkers = ['the ', ' and ', ' of ', ' to ', ' in ', ' is ', ' has ', ' are ', ' was ', ' have ', ' for ', ' this ', ' that '];
  let matches = 0;
  for (const marker of englishMarkers) {
    if (lower.includes(marker)) matches++;
  }
  return matches >= 4; // If 4+ common English words found, it's English
}

// Translate text in chunks to avoid API limits
async function translateChunked(text: string, targetLang: string): Promise<string> {
  if (!text || text.length === 0) return text;
  
  // For short texts, translate directly
  if (text.length < 3000) {
    const result = await translate(text, { to: targetLang, forceBatch: false });
    return result.text;
  }
  
  // Split HTML content at paragraph boundaries
  const parts = text.split(/(<\/p>|<\/h[1-6]>|<\/li>)/);
  let chunks: string[] = [];
  let currentChunk = '';
  
  for (const part of parts) {
    if ((currentChunk + part).length > 2000 && currentChunk.length > 0) {
      chunks.push(currentChunk);
      currentChunk = part;
    } else {
      currentChunk += part;
    }
  }
  if (currentChunk) chunks.push(currentChunk);
  
  const translatedChunks: string[] = [];
  for (const chunk of chunks) {
    if (!chunk.trim()) {
      translatedChunks.push(chunk);
      continue;
    }
    try {
      const result = await translate(chunk, { to: targetLang, forceBatch: false });
      translatedChunks.push(result.text);
    } catch (e) {
      console.error(`  Chunk translation failed:`, (e as any).message?.substring(0, 100));
      translatedChunks.push(chunk); // Keep original if chunk fails
    }
    await new Promise(r => setTimeout(r, 300));
  }
  
  return translatedChunks.join('');
}

async function run() {
  console.log('🔍 Scanning for untranslated content fields...\n');
  
  // Get all translations
  const allTrans = await db.execute('SELECT articleId, locale, content FROM ArticleTranslation');
  
  let fixed = 0;
  let skipped = 0;
  
  for (const row of allTrans.rows) {
    const content = String(row.content || '');
    const locale = String(row.locale);
    const articleId = String(row.articleId);
    
    if (isEnglish(content)) {
      console.log(`❌ ${articleId} [${locale}]: Content is English, re-translating...`);
      
      // Get the original article content
      const origResult = await db.execute({
        sql: 'SELECT content FROM Article WHERE id = ?',
        args: [articleId]
      });
      
      if (origResult.rows.length === 0) {
        console.log(`  Skipping - article not found`);
        skipped++;
        continue;
      }
      
      const origContent = String(origResult.rows[0].content || '');
      
      try {
        const targetLang = locale === 'zh' ? 'zh-CN' : locale;
        const translated = await translateChunked(origContent, targetLang);
        
        await db.execute({
          sql: 'UPDATE ArticleTranslation SET content = ? WHERE articleId = ? AND locale = ?',
          args: [translated, articleId, locale]
        });
        
        console.log(`  ✅ Fixed! (${translated.length} chars)`);
        fixed++;
      } catch (e) {
        console.error(`  ❌ Failed:`, (e as any).message?.substring(0, 150));
        skipped++;
      }
      
      await new Promise(r => setTimeout(r, 500));
    }
  }
  
  console.log(`\n✨ Done! Fixed: ${fixed}, Skipped: ${skipped}`);
}

run();
