import fs from "fs";
import path from "path";

async function main() {
  const dir = path.join(process.cwd(), "messages");
  const files = fs.readdirSync(dir).filter(f => f.endsWith(".json"));

  for (const file of files) {
    const filePath = path.join(dir, file);
    const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    
    if (data.Admin) {
      data.Admin.retweet = "YENİDEN TWEETLE";
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
      console.log(`Updated ${file} with retweet key.`);
    } else {
      console.warn(`Admin section missing in ${file}`);
    }
  }
}

main().catch(console.error);
