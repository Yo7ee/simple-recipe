import algoliasearch from "algoliasearch";

const client = algoliasearch("S2BKECZ1D0", "e4820a93dffeee4d3f0bd35eb5a0bd51");

const algolia = client.initIndex("simpleRecipe");

export { algolia, client };
