const { Timestamp, GeoPoint, DocumentReference } = require("firebase-admin/firestore");

// Convert Firestore types into plain JSON Algolia can index.
const toAlgoliaValue = (value) => {
	if (value instanceof Timestamp) return value.toMillis();
	if (value instanceof GeoPoint) return { lat: value.latitude, lng: value.longitude };
	if (value instanceof DocumentReference) return value.path;
	if (Array.isArray(value)) return value.map(toAlgoliaValue);
	if (value && typeof value === "object") {
		return Object.fromEntries(
			Object.entries(value).map(([key, val]) => [key, toAlgoliaValue(val)])
		);
	}
	return value;
};

const toAlgoliaRecord = (snapshot) => ({
	...toAlgoliaValue(snapshot.data()),
	objectID: snapshot.id,
	path: snapshot.ref.path,
	lastmodified: Date.now(),
});

module.exports = { toAlgoliaRecord };
