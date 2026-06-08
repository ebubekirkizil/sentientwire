const fs = require('fs');
const env = fs.readFileSync('.env', 'utf8');
env.split('\n').forEach(line => {
  const [k, v] = line.split('=');
  if (k && v) {
    process.env[k.trim()] = v.replace(/"/g, '').trim();
  }
});
require('tsx/cjs').require('./src/lib/ingest').runIngestion()
  .then(() => console.log('Done'))
  .catch(console.error);
