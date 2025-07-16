import algoliasearch from "algoliasearch";

const client = algoliasearch("5YJHICKYMP", "52c0eb4752f4037925f1d52e09c0b587");

const algolia = client.initIndex("simpleRecipe");

export { algolia, client };
