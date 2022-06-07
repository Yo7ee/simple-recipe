import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../Context/User";
import RecipeService from "../../utils/database";
import Header from "../Home/Header";
import Footer from "../Home/Footer";
import { algolia, client } from "../../utils/algolia";
import KeywordContext from "../../Context/Keyword";
import ResultContext from "../../Context/Result";
import "../Recipes/Recipes.css";
import FilterPopup from "./Popup";
import firebase, { db } from "../../utils/firebase";
import {
	onSnapshot,
	doc,
	query,
	orderBy,
	collection,
	limit,
	where,
	getFirestore,
	documentId,
} from "@firebase/firestore";

function Recipes() {
	const { uid } = useContext(UserContext);
	const { keyword, setKeyword } = useContext(KeywordContext);
	const [results, setResults] = useState([]);
	const [check, setCheck] = useState(false);
	const [isCollected, setIsCollected] = useState("");
	const handleSearch = () => {
		algolia.search(keyword).then((result) => {
			setResults(result.hits);
			console.log("search", result.hits);
			setCheck(false);
			const data = result.hits.map((hit) => ({
				id: hit.objectID,
			}));
			const idTest = data[0].id;
			const idTest1 = data[1].id;
			console.log(data[0].id);
			const q = query(
				collection(db, "recipe"),
				where(documentId(), "==", idTest1)
			);
			console.log(q);
		});
	};

	useEffect(() => {
		handleSearch();
	}, [keyword]);

	const handleToggle = async (isActive, colName, e, id) => {
		e.preventDefault();
		await RecipeService.update(isActive, colName, id, uid);
		console.log("test");
		if (isCollected) {
			setIsCollected(false);
		} else {
			setIsCollected(true);
		}
	};

	const handleHotClink = async (colName, id, count) => {
		let currentCount = count;
		currentCount++;
		await RecipeService.updateHot(colName, currentCount, id);
	};

	return (
		<>
			<Header />
			<ResultContext.Provider value={{ results, setResults }}>
				<FilterPopup />
			</ResultContext.Provider>
			<article className='recipes-article'>
				<div className='article-cont'>
					<div className='filter-title'>篩選結果有 {results.length} 個食譜</div>
					<div className='recipes-wrap-dishCard'>
						{results.map((item) => {
							const isCollected = item.collectedBy?.includes(uid);
							const isLiked = item.likedBy?.includes(uid);
							return (
								<Link
									to={`/recipe/${item.objectID}`}
									key={item.objectID}
									className='recipes-dishCard'
									onClick={() =>
										handleHotClink("hotCount", item.objectID, item.hotCount)
									}>
									<figure className='recipes-figure'>
										<img className='dishCard-img' src={item.imageUrl} />
										<svg
											viewBox='0 0 32 32'
											className={
												isCollected
													? "dishCard-bookmark collected"
													: "dishCard-bookmark"
											}
											onClick={(e) =>
												handleToggle(
													isCollected,
													"collectedBy",
													e,
													item.objectID
												)
											}>
											<path d='M23.8,2H8.2C6.5,2,5.1,3.4,5.1,5.1v24.6c0,0.2,0.2,0.3,0.4,0.3l10.4-4.5c0.1,0,0.2,0,0.2,0  L26.6,30c0.2,0.1,0.4-0.1,0.4-0.3V5.1C26.9,3.4,25.5,2,23.8,2z' />
										</svg>
									</figure>
									<figcaption>
										<div>{item.dishName}</div>
										<svg
											viewBox='0 0 24 24'
											className={
												isLiked ? "dishCard-heart liked" : "dishCard-heart"
											}
											onClick={(e) =>
												handleToggle(isLiked, "likedBy", e, item.objectID)
											}>
											<path d='M22.2,4.1c2.7,2.7,2.4,6.9-0.4,9.5l-8.4,7.9c-0.8,0.7-2.1,0.7-2.9,0l-8.4-7.9c-2.7-2.6-3-6.8-0.4-9.5   C4.6,1.4,9.2,1.3,12,4C14.8,1.3,19.4,1.4,22.2,4.1z' />
										</svg>
									</figcaption>
									<div className='dishCard-tool'>
										<i className='fa-solid fa-kitchen-set'></i>
										{item.toolName}
									</div>
									<div className='dishCard-time'>
										<p>總烹煮時間</p>
										<p>
											{parseInt(item.preTime) + parseInt(item.cookTime)}分鐘
										</p>
									</div>
									<div className='dishCard-heartUser'>
										<div className='icon'>
											<p className='heartNum'>
												<i className='fa-solid fa-heart'></i>
												{item.likedBy?.length - 1}
											</p>
											<p className='hotNum'>
												<i className='fa-brands fa-gripfire'></i>
												{item.hotCount}
											</p>
										</div>
										<p className='user'>{item.author.displayName}</p>
									</div>
								</Link>
							);
						})}
					</div>
				</div>
			</article>
			<Footer />
		</>
	);
}

export default Recipes;
