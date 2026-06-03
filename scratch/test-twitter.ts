import { postToX } from '../src/lib/botService';

async function test() {
  console.log("Testing X API...");
  const success = await postToX(
    "🚨 TEST TWEET: SentientWire defense systems initializing. Protocol X99 active.",
    "test-slug",
    "PiQkFRHQeTEWrOVVvzP8Q121s",
    "9SgsM7Opi0k5msNwCKFbmbnrvzNPT8eovBB8cUgl8m07cDoCpX",
    "2061086548024578054-SC9jQCZ0JeSr9n6bNtHlb3PGqZ2M3g",
    "cTEg8M9mngpZEK3uuHfQSbb9AfIDC5Tyvt3RtciboWbm6"
  );
  console.log("Success?", success);
}

test().catch(console.error);
