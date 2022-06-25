import { db, storage } from "./firebase";
import {
	collection,
	setDoc,
	addDoc,
	doc,
	query,
	orderBy,
	getDocs,
	getDoc,
	onSnapshot,
	deleteDoc,
	limit,
	where,
	updateDoc,
	arrayUnion,
	arrayRemove,
} from "firebase/firestore";
import {
	ref,
	uploadBytes,
	getDownloadURL,
	deleteObject,
} from "firebase/storage";
import { useEffect, useState } from "react";

const recipeColRef = collection(db, "recipe");

export function getFeatureDish() {
	const [choiceDish, setChoiceDish] = useState([]);
	useEffect(() => {
		try {
			const choice = query(
				collection(db, "recipe"),
				where("toolName", "==", "烤箱"),
				orderBy("createdAt", "asc"),
				limit(5)
			);
			const unsubscibe = onSnapshot(choice, (querySnapshot) => {
				const data = querySnapshot.docs.map((doc) => ({
					...doc.data(),
					id: doc.id,
				}));
				setChoiceDish(data);
			});
		} catch (error) {
			console.log("Failed to get FeatureDish" + error);
		}
	}, []);
	return choiceDish;
}
export function getHotCountDish() {
	const [hotCountDish, setHotCountDish] = useState([]);
	useEffect(() => {
		try {
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
		} catch (error) {
			console.log("Failed to get HotCountDish" + error);
		}
	}, []);
	return hotCountDish;
}

export function getHeartDish() {
	const [heartDish, setHeartDish] = useState([]);
	const [pageLoading, setPageLoading] = useState(true);
	useEffect(() => {
		try {
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
		} catch (error) {
			console.log("Failed to get HeartDish" + error);
		}
	}, []);
	return [heartDish, pageLoading];
}
// export async function getComment(id) {
// 	const [commentList, setCommentList] = useState([]);
// 	try {
// 		const docRef = doc(db, "recipe", id);
// 		const commentRef = collection(docRef, "comment");
// 		const q = query(commentRef, orderBy("createdAt", "asc"));
// 		const querySnapshot = await getDocs(q);
// 		const dataArr = querySnapshot.docs.map((doc) => ({
// 			...doc.data(),
// 			id: doc.id,
// 		}));
// 		setCommentList(dataArr);
// 		console.log(dataArr);
// 		console.log(commentList);
// 	} catch (error) {
// 		console.log("Failed to get CommentList" + error);
// 	}
// 	return commentList;
// }

export function getMyRecipes(displayName) {
	const [myRecipe, setMyRecipe] = useState([]);
	const [pageLoading, setPageLoading] = useState(true);
	const q = query(recipeColRef, where("author.displayName", "==", displayName));
	useEffect(() => {
		try {
			const unsubscribe = onSnapshot(q, (querySnapshot) => {
				const data = querySnapshot.docs.map((doc) => ({
					...doc.data(),
					id: doc.id,
				}));
				setMyRecipe(data);
				setPageLoading(false);
			});
		} catch (error) {
			console.log("Failed to get MyRecipes" + error);
		}
	}, []);
	console.log(myRecipe);
	return [myRecipe, pageLoading];
}

export function getMyBookMarks(uid) {
	const [myBookmarks, setMyBookMarks] = useState([]);
	const [pageLoading, setPageLoading] = useState(true);
	const q = query(recipeColRef, where("collectedBy", "array-contains", uid));
	useEffect(() => {
		try {
			const unsubscribe = onSnapshot(q, (querySnapshot) => {
				const data = querySnapshot.docs.map((doc) => ({
					...doc.data(),
					id: doc.id,
				}));
				setMyBookMarks(data);
				setPageLoading(false);
			});
		} catch (error) {
			console.log("Failed to get MyBookMarks" + error);
		}
	}, []);
	return [myBookmarks, pageLoading];
}
