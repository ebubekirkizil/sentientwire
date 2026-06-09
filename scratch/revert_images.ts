import { db } from '../src/lib/db';

// Revert all image URLs back to original local paths
async function main() {
  // Revert FCAS article back to local image
  const fcasId = '758ba81f-168c-49b5-8902-13bae922a892';
  const fcasCover = '/images/fcas_cancelled_cover.png';
  const fcasMid = '/images/fcas_cancelled_split.png';

  await db.execute({
    sql: `UPDATE Article SET imageUrl = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ?`,
    args: [fcasCover, fcasId]
  });
  console.log('✅ FCAS cover reverted to /images/fcas_cancelled_cover.png');

  // Fix inline image in FCAS content
  const article = await db.execute({
    sql: `SELECT content FROM Article WHERE id = ?`,
    args: [fcasId]
  });
  if (article.rows.length > 0) {
    let content = String(article.rows[0].content);
    content = content.replace(
      /https:\/\/images\.unsplash\.com\/photo-1559291001-693fb9166cdf[^"']*/g,
      fcasMid
    );
    await db.execute({
      sql: `UPDATE Article SET content = ? WHERE id = ?`,
      args: [content, fcasId]
    });
    console.log('✅ FCAS content inline image reverted');
  }

  // Fix TR translation inline image
  const trTrans = await db.execute({
    sql: `SELECT content FROM ArticleTranslation WHERE articleId = ? AND locale = 'tr'`,
    args: [fcasId]
  });
  if (trTrans.rows.length > 0) {
    let trContent = String(trTrans.rows[0].content);
    trContent = trContent.replace(
      /https:\/\/images\.unsplash\.com\/photo-1559291001-693fb9166cdf[^"']*/g,
      fcasMid
    );
    await db.execute({
      sql: `UPDATE ArticleTranslation SET content = ? WHERE articleId = ? AND locale = 'tr'`,
      args: [trContent, fcasId]
    });
    console.log('✅ FCAS TR translation inline image reverted');
  }

  // Revert all other articles back to their original local paths
  const revertMap: [string, string][] = [
    ['https://images.unsplash.com/photo-1519781542704-957ff19eff00?auto=format&fit=crop&q=80&w=1200&h=628', '/f35_engine_cover.png'],
    ['https://images.unsplash.com/photo-1569163139394-de4e5f43e5ca?auto=format&fit=crop&q=80&w=1200&h=628', '/turkey_defense_cover.png'],
    ['https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=1200&h=628', '/nsa_ai_cover.png'],
    ['https://images.unsplash.com/photo-1454789476662-53eb23ba5907?auto=format&fit=crop&q=80&w=1200&h=628', '/missile_cover.png'],
    ['https://images.unsplash.com/photo-1501862700950-18382cd41497?auto=format&fit=crop&q=80&w=1200&h=628', '/ship_cover.png'],
    ['https://images.unsplash.com/photo-1677442135703-1787eea5ce01?auto=format&fit=crop&q=80&w=1200&h=628', '/ai_cover.png'],
    ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=1200&h=628', '/ai_blackout.png'],
    ['https://images.unsplash.com/photo-1453733190371-0a9bedd82893?auto=format&fit=crop&q=80&w=1200&h=628', '/stinger_cover.png'],
    ['https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?auto=format&fit=crop&q=80&w=1200&h=628', '/space_cover.png'],
  ];

  for (const [unsplashUrl, localPath] of revertMap) {
    const res = await db.execute({
      sql: `UPDATE Article SET imageUrl = ?, updatedAt = CURRENT_TIMESTAMP WHERE imageUrl = ?`,
      args: [localPath, unsplashUrl]
    });
    if (Number(res.rowsAffected) > 0) {
      console.log(`✅ Reverted: ${localPath}`);
    }
  }

  console.log('\n✅ All images restored to original paths.');
}

main().catch(console.error);
