import React from "react";
import { Link, useNavigate } from "react-router-dom";
import RecipeService from "../../utils/database";

function Card({ title, className, data, uid }) {
	const navigate = useNavigate();
	const handleToggle = async (isActive, colName, e, id, count) => {
		e.preventDefault(); //For Link 頁面跳轉
		e.stopPropagation(); //For 冒泡效應
		let currentCount = count - 1;
		if (user) {
			await RecipeService.update(isActive, colName, id, uid, currentCount);
		} else {
			navigate("/signin");
		}
	};

	const handleHotClink = async (colName, id, count) => {
		let currentCount = count;
		currentCount++;
		await RecipeService.updateHot(colName, currentCount, id);
	};
	return (
		<div className='article-cont'>
			<div className='article-title'>
				<i className={className}></i>
				{title}
			</div>
			<div className='wrap-dishCard'>
				{data.map((item) => {
					const isCollected = item.collectedBy?.includes(uid);
					const isLiked = item.likedBy?.includes(uid);
					return (
						<Link
							to={`/recipe/${item.id}`}
							key={item.id}
							className='dishCard'
							onClick={() =>
								handleHotClink("hotCount", item.id, item.hotCount)
							}>
							<figure className='article-figure'>
								<img className='dishCard-img' src={item.imageUrl} />
								<svg
									viewBox='0 0 32 32'
									className={
										isCollected
											? "dishCard-bookmark collected"
											: "dishCard-bookmark"
									}
									onClick={(e) =>
										handleToggle(isCollected, "collectedBy", e, item.id)
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
										handleToggle(
											isLiked,
											"likedBy",
											e,
											item.id,
											item.likedBy.length
										)
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
								<p>{parseInt(item.preTime) + parseInt(item.cookTime)}分鐘</p>
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
	);
}
export default Card;
