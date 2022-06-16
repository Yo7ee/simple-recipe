import React, { useContext, useEffect, useState } from "react";
import "../Home/homePage.css";
import "./Recipe.css";
import Header from "../Home/Header";
import Footer from "../Home/Footer";
import RecipeService from "../../utils/database";
import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../../utils/firebase";
import UserContext from "../../Context/User";
import { Loading } from "../Loading/Loading";
import CommentList from "./Comment";

function Recipe() {
	const id = window.location.href.split("/").pop();
	const [recipe, setRecipe] = useState([{ author: {} }]);
	const [ingre, setIngre] = useState([]);
	const [step, setStep] = useState([]);
	const [displayName, setDisplayName] = useState("");
	const [time, setTime] = useState("");
	const { user, uid } = useContext(UserContext);
	const [pageLoading, setPageLoading] = useState(true);

	const showRecipe = () => {
		onSnapshot(doc(db, "recipe", id), (doc) => {
			const data = doc.data();
			setRecipe(data);
			setIngre(data.ingredients);
			setStep(data.direction);
			setDisplayName(data.author.displayName);
			setTime(new Date(data.createdAt.toDate()).toLocaleDateString());
			setPageLoading(false);
		});
	};
	const handleToggle = async (isActive, colName) => {
		let currentCount = recipe.likedBy.length - 1;
		if (user) {
			await RecipeService.update(isActive, colName, id, uid, currentCount);
		} else {
			navigate("/signin");
		}
	};

	useEffect(() => {
		showRecipe();
	}, []);

	const isCollected = recipe.collectedBy?.includes(uid);
	const isLiked = recipe.likedBy?.includes(uid);
	return pageLoading ? (
		<Loading />
	) : (
		<>
			<Header />
			<section className='section-recipe'>
				<div className='section-recipe-cont'>
					<div className='section-recipe-title-info'>
						<div className='section-recipe-title'>
							<h1 className='section-recipe-dishName'>{recipe.dishName}</h1>
						</div>
						<div className='section-recipe-info'>
							<span className='section-recipe-user'>上傳者：{displayName}</span>
							<span className='section-recipe-uploadTime'>
								上傳時間：{time}
							</span>
							<svg
								viewBox='0 0 32 32'
								className={
									isCollected
										? "section-recipe-bookmark collected"
										: "section-recipe-bookmark"
								}
								onClick={() => handleToggle(isCollected, "collectedBy")}>
								<path d='M23.8,2H8.2C6.5,2,5.1,3.4,5.1,5.1v24.6c0,0.2,0.2,0.3,0.4,0.3l10.4-4.5c0.1,0,0.2,0,0.2,0  L26.6,30c0.2,0.1,0.4-0.1,0.4-0.3V5.1C26.9,3.4,25.5,2,23.8,2z' />
							</svg>
							<svg
								viewBox='0 0 24 24'
								className={
									isLiked
										? "section-recipe-heart liked"
										: "section-recipe-heart"
								}
								onClick={() => handleToggle(isLiked, "likedBy")}>
								<path d='M22.2,4.1c2.7,2.7,2.4,6.9-0.4,9.5l-8.4,7.9c-0.8,0.7-2.1,0.7-2.9,0l-8.4-7.9c-2.7-2.6-3-6.8-0.4-9.5   C4.6,1.4,9.2,1.3,12,4C14.8,1.3,19.4,1.4,22.2,4.1z' />
							</svg>
						</div>
					</div>
					<div className='section-recipe-figure-cont'>
						<figure className='section-recipe-figure'>
							<img className='section-recipe-img' src={recipe.imageUrl} />
						</figure>
					</div>
				</div>
			</section>
			<article className='article-recipe'>
				<div className='article-recipe-preprare'>
					<i className='fa-solid fa-clock'></i>
					<h2 className='prepare'>行前須知</h2>
					<div className='prepare-item'>
						<p>烹煮工具: {recipe.toolName}</p>
						<p>
							總時間: {parseInt(recipe.preTime) + parseInt(recipe.cookTime)}{" "}
							分鐘
						</p>
						<p>準備時間: {recipe.preTime} 分鐘</p>
						<p>烹煮時間: {recipe.cookTime} 分鐘</p>
					</div>
				</div>
				<div className='article-recipe-ingredient'>
					<i className='fa-solid fa-cubes-stacked'></i>
					<h2 className='ingredient'>食材</h2>
					<div className='ingredient-item'>
						{ingre.map((item, index) => (
							<div key={index} className='item'>
								<input
									type='checkbox'
									className='item-input-check'
									id={"ingre" + index}
								/>
								<label className='recipe-label' htmlFor={"ingre" + index}>
									<i className='fa-solid fa-check'></i>
									<div>{item.ingre}</div>
								</label>
							</div>
						))}
					</div>
				</div>
				<div className='article-recipe-direction'>
					<i className='fa-solid fa-utensils'></i>
					<h2 className='direction'>烹煮方法</h2>
					<div className='direction-step'>
						{step.map((item, index) => (
							<div key={index} className='step'>
								<input
									type='checkbox'
									className='step-input-check'
									id={"step" + index}
								/>
								<label className='recipe-label' htmlFor={"step" + index}>
									<div className='step-cont'>
										<i className='fa-solid fa-circle-check'></i>
										<div>步驟 {index + 1}</div>
									</div>
									<p className='direction-step-content'>{item.stepContent}</p>
								</label>
							</div>
						))}
					</div>
				</div>
				<CommentList />
			</article>
			<Footer />
		</>
	);
}

export default Recipe;
