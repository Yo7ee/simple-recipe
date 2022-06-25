import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../Context/User";
import RecipeService from "../../utils/database";
import Header from "../Home/Header";
import Footer from "../Home/Footer";
import { algolia } from "../../utils/algolia";
import KeywordContext from "../../Context/Keyword";
import ResultContext from "../../Context/Result";
import "../Recipes/Recipes.css";
import FilterPopup from "./Popup";
import { Loading } from "../Loading/Loading";

function Recipes() {
	const { uid } = useContext(UserContext);
	const { keyword, setKeyword } = useContext(KeywordContext);
	const [results, setResults] = useState([]);
	const [pageLoading, setPageLoading] = useState(true);
	const handleSearch = async () => {
		const filterData = await algolia.search(keyword).then((result) => {
			setResults(result.hits);
			setPageLoading(false);
		});
	};

	useEffect(() => {
		handleSearch();
	}, [keyword]);

	const handleHotClink = async (colName, id, count) => {
		let currentCount = count;
		currentCount++;
		await RecipeService.updateHot(colName, currentCount, id);
	};

	return pageLoading ? (
		<Loading />
	) : (
		<>
			<Header isHome='false' />
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
									</figure>
									<figcaption>
										<div>{item.dishName}</div>
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
