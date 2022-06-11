import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../Context/User";
import RecipeService from "../../utils/database";
import { onSnapshot, query, collection, where } from "@firebase/firestore";
import { db } from "../../utils/firebase";
import { ContentLoading } from "../Loading/Loading";

function MyBookmarks() {
	const [myCollect, setMyCollect] = useState([]);
	const [myCollectNumber, setMyCollectNumber] = useState(0);
	const { uid } = useContext(UserContext);
	const [pageLoading, setPageLoading] = useState(true);

	const showMyCollect = () => {
		const q = query(
			collection(db, "recipe"),
			where("collectedBy", "array-contains", uid)
		);
		onSnapshot(q, (querySnapshot) => {
			const data = querySnapshot.docs.map((doc) => ({
				...doc.data(),
				id: doc.id,
			}));
			setMyCollect(data);
			setMyCollectNumber(data.length);
			setPageLoading(false);
		});
	};

	const handleToggle = async (isActive, colName, id) => {
		await RecipeService.update(isActive, colName, id, uid);
		console.log("test");
	};

	useEffect(() => {
		showMyCollect();
	}, []);

	return pageLoading ? (
		<ContentLoading />
	) : (
		<>
			<div className='myRecipe-number'>{myCollectNumber} 篇收藏</div>
			{myCollectNumber == 0 && (
				<div className='myBookmark-none'>目前沒有收藏的食譜</div>
			)}
			{myCollect.map((item) => {
				const ingreArray = [];
				const isCollected = item.collectedBy?.includes(uid);
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
								<svg
									viewBox='0 0 32 32'
									className={
										isCollected ? "myBookmark collected" : "myBookmark"
									}
									onClick={() =>
										handleToggle(isCollected, "collectedBy", item.id)
									}>
									<path d='M23.8,2H8.2C6.5,2,5.1,3.4,5.1,5.1v24.6c0,0.2,0.2,0.3,0.4,0.3l10.4-4.5c0.1,0,0.2,0,0.2,0  L26.6,30c0.2,0.1,0.4-0.1,0.4-0.3V5.1C26.9,3.4,25.5,2,23.8,2z' />
								</svg>
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

export default MyBookmarks;
