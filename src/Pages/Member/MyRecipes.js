import React, { useContext, useEffect, useState } from "react";
import "./member.css";
import { getAuth } from "firebase/auth";
import RecipeService from "../../utils/database";
import { Link } from "react-router-dom";
import UserContext from "../../Context/User";
import { ContentLoading } from "../Loading/Loading";
import { getMyRecipes } from "../../utils/db";

function MyRecipes() {
	const [myRecipeNumber, setMyRecipeNumber] = useState(0);
	const [pageLoading, setPageLoading] = useState(true);

	const auth = getAuth();
	const userName = auth.currentUser.displayName;
	const { user } = useContext(UserContext);
	const myRecipe = getMyRecipes(userName);
	// const showMyRecipe = () => {
	// 	const q = query(
	// 		collection(db, "recipe"),
	// 		where("author.displayName", "==", user.displayName)
	// 	);
	// 	onSnapshot(q, (querySnapshot) => {
	// 		const data = querySnapshot.docs.map((doc) => ({
	// 			...doc.data(),
	// 			id: doc.id,
	// 		}));
	// 		setMyRecipe(data);
	// 		setMyRecipeNumber(data.length);
	// 		console.log(data);
	// 		setPageLoading(false);
	// 	});
	// };

	const handleDelRecipe = (id, e) => {
		e.preventDefault();
		RecipeService.deleteDoc(id);
	};

	useEffect(() => {
		setMyRecipeNumber(myRecipe[0].length);
		setPageLoading(myRecipe[1]);
	}, [myRecipe[0]]);

	return pageLoading ? (
		<ContentLoading />
	) : (
		<>
			<div className='myRecipe-number'>{myRecipeNumber} 篇食譜</div>
			{myRecipeNumber == 0 && (
				<div className='myRecipe-none'>目前沒有新增的食譜</div>
			)}
			{myRecipe[0].map((item) => {
				const ingreArray = [];
				item.ingredients.forEach((element) => {
					ingreArray.push(element.ingre);
				});
				const ingreItem = ingreArray.join(", ");
				return (
					<Link
						to={`/recipe/${item.id}`}
						className='myRecipe-cont'
						key={item.id}>
						<div className='myRecipe-info'>
							<div className='myRecipe-title'>
								<div className='myRecipe-name'>{item.dishName}</div>
								<button
									className='myRecipe-btn-del'
									onClick={(e) => handleDelRecipe(item.id, e)}>
									<i className='fa-regular fa-trash-can fa-2x'></i>
								</button>
							</div>
							<div className='myRecipe-tool'>
								<i className='fa-solid fa-kitchen-set'></i>
								{item.toolName}
							</div>
							<div className='myRecipe-time-cont'>
								<i className='fa-regular fa-clock'></i>
								{parseInt(item.preTime) + parseInt(item.cookTime)}分鐘
							</div>
							<div className='myRecipe-ingre'>
								<i className='fa-solid fa-cubes-stacked'></i>
								<div className='myRecipe-ingre-item'>{ingreItem}</div>
							</div>
						</div>
						<figure className='myRecipe-fig'>
							<img className='myRecipe-img' src={item.imageUrl} />
						</figure>
					</Link>
				);
			})}
		</>
	);
}

export default MyRecipes;
