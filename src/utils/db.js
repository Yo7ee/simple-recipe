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
import MyRecipes from "../Pages/Member/MyRecipes";

const recipeColRef = collection(db, "recipe");

export function getMyRecipes(displayName) {
	const [myRecipe, setMyRecipe] = useState([]);
	const [pageLoading, setPageLoading] = useState(true);
	const q = query(recipeColRef, where("author.displayName", "==", displayName));
	useEffect(() => {
		const unsubscribe = onSnapshot(q, (querySnapshot) => {
			const data = querySnapshot.docs.map((doc) => ({
				...doc.data(),
				id: doc.id,
			}));
			setMyRecipe(data);
			setPageLoading(false);
		});
	}, []);
	return [myRecipe, pageLoading];
}

export function getMyBookMarks(uid) {
	const [myBookmarks, setMyBookMarks] = useState([]);
	const [pageLoading, setPageLoading] = useState(true);
	const q = query(recipeColRef, where("collectedBy", "array-contains", uid));
	useEffect(() => {
		const unsubscribe = onSnapshot(q, (querySnapshot) => {
			const data = querySnapshot.docs.map((doc) => ({
				...doc.data(),
				id: doc.id,
			}));
			setMyBookMarks(data);
			setPageLoading(false);
		});
	}, []);
	return [myBookmarks, pageLoading];
}
