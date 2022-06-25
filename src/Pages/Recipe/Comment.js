import React, { useState, useEffect, useContext } from "react";
import UserContext from "../../Context/User";
import { useNavigate } from "react-router";
import RecipeService from "../../utils/database";
import auth from "../../utils/firebase";
import { Timestamp } from "firebase/firestore";
import Popup from "../Signin/Popup";

function CommentList() {
	const id = window.location.href.split("/").pop();
	const { user } = useContext(UserContext);
	const [commentList, setCommentList] = useState([]);
	const [popup, setPopup] = useState(false);
	const showComment = async () => {
		const data = await RecipeService.getCommentDoc(id);
		setCommentList(data);
	};
	const handleClickNoneUser = () => {
		if (!user) {
			navigate("/signin");
		}
	};
	const [comment, setComment] = useState("");
	const handleKeyUpComment = (e) => {
		setComment(e.target.value);
	};

	const navigate = useNavigate();
	const handleOnSubmit = async (e) => {
		e.preventDefault();
		if (user) {
			if (!!comment) {
				try {
					const item = {
						displayPic: auth.currentUser.photoURL,
						comment,
						displayName: auth.currentUser.displayName,
						createdAt: Timestamp.now(),
					};
					await RecipeService.setCommentDoc(id, item);
					showComment();
				} catch (e) {
					console.log("Error adding Item " + e);
				}
			} else {
				setPopup(true);
			}
			setComment("");
		} else {
			navigate("/signin");
		}
	};
	const handleErrorSubmit = () => {
		setPopup(false);
	};
	useEffect(() => {
		showComment();
	}, []);
	return (
		<div className='article-recipe-comment'>
			<i className='fa-solid fa-comment'></i>
			<h2 className='comment'>實作心得</h2>
			{commentList.map((item, index) => (
				<div key={index} className='comment-user-cont'>
					<div className='comment-user'>
						<div className='user'>
							{item.displayPic ? (
								<img className='user-fig' src={item.displayPic} />
							) : (
								<div className='userName'>{item.displayName[0]}</div>
							)}
							<span className='user-name'>{item.displayName}</span>
							<span className='date'>
								{new Date(item.createdAt.toDate()).toLocaleDateString()}
							</span>
						</div>
						<div className='content'>{item.comment}</div>
					</div>
				</div>
			))}
			<form
				className='comment-blank-content'
				onSubmit={(e) => {
					handleOnSubmit(e);
				}}>
				<input
					type='text'
					className='input-comment'
					value={comment}
					onClick={handleClickNoneUser}
					onChange={handleKeyUpComment}
					placeholder='寫下你的心得'
				/>
				<button className='btn-comment'>
					{comment ? (
						<svg className='color' viewBox='0 0 30.2 30.1'>
							<path d='M2.1,14.6C8.9,12,28.5,4,28.5,4l-3.9,22.6c-0.2,1.1-1.5,1.5-2.3,0.8l-6.1-5.1l-4.3,4l0.7-6.7l13-12.3l-16,10  l1,5.7l-3.3-5.3l-5-1.6C1.5,15.8,1.4,14.8,2.1,14.6z' />
						</svg>
					) : (
						<svg className='color-none' viewBox='0 0 30.2 30.1'>
							<path d='M2.1,14.6C8.9,12,28.5,4,28.5,4l-3.9,22.6c-0.2,1.1-1.5,1.5-2.3,0.8l-6.1-5.1l-4.3,4l0.7-6.7l13-12.3l-16,10  l1,5.7l-3.3-5.3l-5-1.6C1.5,15.8,1.4,14.8,2.1,14.6z' />
						</svg>
					)}
				</button>
			</form>
			{popup ? (
				<Popup
					title='留言不可空白'
					label='確認'
					handleClick={handleErrorSubmit}
				/>
			) : null}
		</div>
	);
}

export default CommentList;
