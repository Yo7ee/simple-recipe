import React, { useContext, useEffect, useState } from "react";
import "./member.css";
import { getAuth } from "firebase/auth";
import RecipeService from "../../utils/database";
import { Link } from "react-router-dom";
import { onSnapshot, query, collection, where } from "@firebase/firestore";
import { db } from "../../utils/firebase";
import UserContext from "../../Context/User";

function MyRecipes() {
	const [myRecipe, setMyRecipe] = useState([]);
	const [myRecipeNumber, setMyRecipeNumber] = useState(0);

	const auth = getAuth();
	const userName = auth.currentUser.displayName;
	const { user } = useContext(UserContext);
	// const showMyRecipe = async () => {
	//     const data = await RecipeService.getFilterDoc("author.displayName", userName);
	//     setMyRecipe(data)
	//     setMyRecipeNumber(data.length);
	// }
	const showMyRecipe = () => {
		const q = query(
			collection(db, "recipe"),
			where("author.displayName", "==", user.displayName)
		);
		onSnapshot(q, (querySnapshot) => {
			const data = querySnapshot.docs.map((doc) => ({
				...doc.data(),
				id: doc.id,
			}));
			setMyRecipe(data);
			setMyRecipeNumber(data.length);
			console.log(data);
		});
	};
	const ingredientsList = (list) => {};

	const handleDelRecipe = async (id, e) => {
		e.preventDefault();
		await RecipeService.deleteDoc(id);
		showMyRecipe;
	};

	useEffect(() => {
		showMyRecipe();
	}, []);

	return (
		<>
			<div className='myRecipe-number'>{myRecipeNumber} 篇食譜</div>
			{myRecipeNumber == 0 && (
				<div className='myRecipe-none'>目前沒有新增的食譜</div>
			)}
			{myRecipe.map((item) => {
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
							<div className='myRecipe-ingre'>食材</div>
							<div className='myRecipe-time-cont'>
								<i className='fa-regular fa-clock'></i>
								{parseInt(item.preTime) + parseInt(item.cookTime)}分鐘
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
