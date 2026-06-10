import { db } from "../src/lib/db";
import { triggerTweetManual } from "../src/app/actions/bot";

async function main() {
  const articleId = "758ba81f-168c-49b5-8902-13bae922a892";
  console.log("Triggering manual tweet for article ID:", articleId);
  const result = await triggerTweetManual(articleId);
  console.log("Result:", JSON.stringify(result, null, 2));
}

main().catch(console.error);
