const { onDocumentWritten } = require("firebase-functions/v2/firestore");
const { defineSecret, defineString } = require("firebase-functions/params");
const { logger } = require("firebase-functions");
const { algoliasearch } = require("algoliasearch");
const { toAlgoliaRecord } = require("./serialize");

const ALGOLIA_APP_ID = defineString("ALGOLIA_APP_ID", { default: "5YJHICKYMP" });
const ALGOLIA_INDEX_NAME = defineString("ALGOLIA_INDEX_NAME", { default: "simpleRecipe" });
// Admin (write) key — set with `firebase functions:secrets:set ALGOLIA_API_KEY`
const ALGOLIA_API_KEY = defineSecret("ALGOLIA_API_KEY");

// Keep Firestore `recipe` collection in sync with the Algolia index.
exports.syncRecipeToAlgolia = onDocumentWritten(
	{
		document: "recipe/{recipeId}",
		region: "asia-east2", // must match the Firestore database location
		secrets: [ALGOLIA_API_KEY],
		retry: true,
	},
	async (event) => {
		const client = algoliasearch(ALGOLIA_APP_ID.value(), ALGOLIA_API_KEY.value());
		const indexName = ALGOLIA_INDEX_NAME.value();
		const { recipeId } = event.params;
		const after = event.data.after;

		if (!after.exists) {
			await client.deleteObject({ indexName, objectID: recipeId });
			logger.info(`Deleted ${recipeId} from ${indexName}`);
			return;
		}

		await client.saveObject({ indexName, body: toAlgoliaRecord(after) });
		logger.info(`Saved ${recipeId} to ${indexName}`);
	}
);
