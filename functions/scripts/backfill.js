// One-off full re-index of `recipe` into Algolia (replaces the extension's DO_FULL_INDEXING).
// Usage: ALGOLIA_API_KEY=<admin key> npm run backfill
// Requires Application Default Credentials: `gcloud auth application-default login`.
const { initializeApp } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const { algoliasearch } = require("algoliasearch");
const { toAlgoliaRecord } = require("../serialize");

const appId = process.env.ALGOLIA_APP_ID || "5YJHICKYMP";
const indexName = process.env.ALGOLIA_INDEX_NAME || "simpleRecipe";
const apiKey = process.env.ALGOLIA_API_KEY;

if (!apiKey) {
	console.error("ALGOLIA_API_KEY is required");
	process.exit(1);
}

const main = async () => {
	initializeApp({ projectId: process.env.GOOGLE_CLOUD_PROJECT || "simple-recipe-for-you" });
	const snapshot = await getFirestore().collection("recipe").get();
	const records = snapshot.docs.map(toAlgoliaRecord);
	await algoliasearch(appId, apiKey).saveObjects({ indexName, objects: records });
	console.log(`Indexed ${records.length} recipes into ${indexName}`);
};

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
