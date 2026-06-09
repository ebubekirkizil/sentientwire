import { db } from '../src/lib/db';

// Fix: update FCAS article image to a reliable Unsplash URL instead of a local path
// Local paths like /images/xxx.png require a full Vercel redeploy to appear
async function main() {
  // Use a high-quality military aviation/jet Unsplash image
  const fcasId = '758ba81f-168c-49b5-8902-13bae922a892';
  const coverUrl = 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1200&h=628';
  const midUrl = 'https://images.unsplash.com/photo-1559291001-693fb9166cdf?auto=format&fit=crop&q=80&w=1200&h=600';

  // Update the article cover image
  await db.execute({
    sql: `UPDATE Article SET imageUrl = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ?`,
    args: [coverUrl, fcasId]
  });
  console.log('✅ FCAS cover image updated to Unsplash URL');

  // Update the inline mid-image in the content (replace /images/fcas_cancelled_split.png)
  const article = await db.execute({
    sql: `SELECT content FROM Article WHERE id = ?`,
    args: [fcasId]
  });
  
  if (article.rows.length > 0) {
    let content = String(article.rows[0].content);
    // Replace local image path with Unsplash URL
    content = content.replace(
      /\/images\/fcas_cancelled_split\.png/g,
      midUrl
    );
    await db.execute({
      sql: `UPDATE Article SET content = ? WHERE id = ?`,
      args: [content, fcasId]
    });
    console.log('✅ FCAS inline content image also updated');
  }

  // Also update TR translation content
  const trTrans = await db.execute({
    sql: `SELECT content FROM ArticleTranslation WHERE articleId = ? AND locale = 'tr'`,
    args: [fcasId]
  });
  if (trTrans.rows.length > 0) {
    let trContent = String(trTrans.rows[0].content);
    trContent = trContent.replace(
      /\/images\/fcas_cancelled_split\.png/g,
      midUrl
    );
    await db.execute({
      sql: `UPDATE ArticleTranslation SET content = ? WHERE articleId = ? AND locale = 'tr'`,
      args: [trContent, fcasId]
    });
    console.log('✅ FCAS Turkish translation inline image updated');
  }

  // Fix all articles that have other local paths like /f35_engine_cover.png etc.
  const oldImages: [string, string][] = [
    ['/f35_engine_cover.png',      'https://images.unsplash.com/photo-1519781542704-957ff19eff00?auto=format&fit=crop&q=80&w=1200&h=628'],
    ['/turkey_defense_cover.png',  'https://images.unsplash.com/photo-1569163139394-de4e5f43e5ca?auto=format&fit=crop&q=80&w=1200&h=628'],
    ['/nsa_ai_cover.png',          'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=1200&h=628'],
    ['/missile_cover.png',         'https://images.unsplash.com/photo-1454789476662-53eb23ba5907?auto=format&fit=crop&q=80&w=1200&h=628'],
    ['/ship_cover.png',            'https://images.unsplash.com/photo-1501862700950-18382cd41497?auto=format&fit=crop&q=80&w=1200&h=628'],
    ['/ai_cover.png',              'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?auto=format&fit=crop&q=80&w=1200&h=628'],
    ['/ai_blackout.png',           'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=1200&h=628'],
    ['/stinger_cover.png',         'https://images.unsplash.com/photo-1453733190371-0a9bedd82893?auto=format&fit=crop&q=80&w=1200&h=628'],
    ['/space_cover.png',           'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?auto=format&fit=crop&q=80&w=1200&h=628'],
    ['/space_inside.png',          'https://images.unsplash.com/photo-1457364887197-9150188c107b?auto=format&fit=crop&q=80&w=1200&h=628'],
  ];

  for (const [localPath, unsplashUrl] of oldImages) {
    const res = await db.execute({
      sql: `UPDATE Article SET imageUrl = ?, updatedAt = CURRENT_TIMESTAMP WHERE imageUrl = ?`,
      args: [unsplashUrl, localPath]
    });
    if (Number(res.rowsAffected) > 0) {
      console.log(`✅ Fixed: ${localPath} → Unsplash`);
    }
  }

  console.log('\n🎉 All image URLs fixed! No redeploy needed.');
}

main().catch(console.error);
