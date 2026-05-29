import { getArticlesByLocale } from "./src/app/actions/article";

async function main() {
  console.log("Testing getArticlesByLocale('tr')...");
  try {
    const articles = await getArticlesByLocale("tr");
    console.log("Articles retrieved successfully!");
    console.log("Count:", articles.length);
    if (articles.length > 0) {
      console.log("First article:", articles[0]);
    }
  } catch (error) {
    console.error("Error retrieving articles:", error);
  }
}

main();
