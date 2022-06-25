import React, { useEffect, useState, useContext } from "react";
import UserContext from "../../Context/User";
import Card from "./Card";
import { Link, useNavigate } from "react-router-dom";
import { Loading } from "../Loading/Loading";
import { db } from "../../utils/firebase";
import {
	onSnapshot,
	query,
	orderBy,
	collection,
	limit,
	where,
} from "@firebase/firestore";
import RecipeService from "../../utils/database";

function Article() {
	const [hotCountDish, setHotCountDish] = useState([]);
	const [heartDish, setHeartDish] = useState([]);
	const [choiceDish, setChoiceDish] = useState([]);
	const [pageLoading, setPageLoading] = useState(true);
	const { uid } = useContext(UserContext);

	const showDish = async () => {
		const choice = query(
			collection(db, "recipe"),
			where("toolName", "==", "烤箱"),
			orderBy("createdAt", "asc"),
			limit(5)
		);
		onSnapshot(choice, (querySnapshot) => {
			const data = querySnapshot.docs.map((doc) => ({
				...doc.data(),
				id: doc.id,
			}));
			setChoiceDish(data);
		});
		const q = query(
			collection(db, "recipe"),
			orderBy("hotCount", "desc"),
			limit(4)
		);
		onSnapshot(q, (querySnapshot) => {
			const data = querySnapshot.docs.map((doc) => ({
				...doc.data(),
				id: doc.id,
			}));
			setHotCountDish(data);
		});
		const q1 = query(
			collection(db, "recipe"),
			orderBy("likeValue", "desc"),
			limit(4)
		);
		onSnapshot(q1, (querySnapshot) => {
			const data = querySnapshot.docs.map((doc) => ({
				...doc.data(),
				id: doc.id,
			}));
			setHeartDish(data);
			setPageLoading(false);
		});
	};

	const handleHotClink = async (colName, id, count) => {
		let currentCount = count;
		currentCount++;
		await RecipeService.updateHot(colName, currentCount, id);
	};

	useEffect(() => {
		showDish();
	}, []);

	return pageLoading ? (
		<Loading />
	) : (
		<article className='article-article'>
			<div className='article-cont'>
				<div className='article-title'>
					<i className='fa-brands fa-gripfire'></i>
					精選食譜特輯：烤箱
				</div>
				<div className='choice-dishCard'>
					{choiceDish.map((item) => {
						let difficulty = "";
						switch (item.difficulty) {
							case "0":
								difficulty = "簡單";
								break;
							case "1":
								difficulty = "中等";
								break;
							case "2":
								difficulty = "特級廚師";
								break;
						}
						return (
							<Link
								to={`/recipe/${item.id}`}
								key={item.id}
								className='choice-link'
								onClick={() =>
									handleHotClink("hotCount", item.id, item.hotCount)
								}>
								<figure className='choice-figure'>
									<img className='choice-img' src={item.imageUrl} />
								</figure>
								<div className='choice-dishName'>{item.dishName}</div>
								<div className='choice-item'>
									<p>{difficulty}</p>
									<p>{parseInt(item.preTime) + parseInt(item.cookTime)}分鐘</p>
								</div>
							</Link>
						);
					})}
				</div>
			</div>
			<Card
				title='最熱門點擊'
				className='fa-brands fa-gripfire'
				data={hotCountDish}
				uid={uid}
			/>
			<Card
				title='最喜愛排名'
				className='fa-solid fa-heart'
				data={heartDish}
				uid={uid}
			/>
		</article>
	);
}

export default Article;
