import { createClient } from '@libsql/client';

const db = createClient({ 
  url: process.env.DATABASE_URL || '', 
  authToken: process.env.DATABASE_AUTH_TOKEN 
});

async function run() { 
  await db.execute("UPDATE Article SET category = 'HARDWARE' WHERE category = 'QUANTUM'"); 
  await db.execute("UPDATE Article SET category = 'DEFENSE' WHERE category = 'SPACE'"); 
  console.log('Updated categories'); 
} 
run();
