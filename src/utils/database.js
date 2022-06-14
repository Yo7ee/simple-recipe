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

const recipeColRef = collection(db, "recipe");

class RecipeService {
	setDoc = (item, docRef) => {
		return setDoc(docRef, item);
	};
	addDoc = (item) => {
		return addDoc(recipeColRef, item);
	};
	setCommentDoc = async (id, item) => {
		const docRef = doc(db, "recipe", id);
		const commentRef = collection(docRef, "comment");
		const commentDocRef = doc(commentRef);
		return setDoc(commentDocRef, item);
	};
	getCommentDoc = async (id) => {
		const docRef = doc(db, "recipe", id);
		const commentRef = collection(docRef, "comment");
		const q = query(commentRef, orderBy("createdAt", "asc"));
		const querySnapshot = await getDocs(q);
		const dataArr = querySnapshot.docs.map((doc) => ({
			...doc.data(),
			id: doc.id,
		}));
		return dataArr;
	};
	getDoc = async () => {
		const q = query(recipeColRef, orderBy("createdAt", "asc"));
		const querySnapshot = await getDocs(q);
		const dataArr = querySnapshot.docs.map((doc) => ({
			...doc.data(),
			id: doc.id,
		}));
		return dataArr;
	};
	getFilterDoc = async (name, filter) => {
		const q = query(recipeColRef, where(name, "==", filter));
		const querySnapshot = await getDocs(q);
		const dataArr = querySnapshot.docs.map((doc) => ({
			...doc.data(),
			id: doc.id,
		}));
		return dataArr;
	};
	getFilterArray = async (name, filter) => {
		const q = query(recipeColRef, where(name, "array-contains", filter));
		const querySnapshot = await getDocs(q);
		const dataArr = querySnapshot.docs.map((doc) => ({
			...doc.data(),
			id: doc.id,
		}));
		return dataArr;
	};

	deleteDoc = (id) => {
		const itemDoc = doc(db, "recipe", id);
		deleteDoc(itemDoc);
		const imgDoc = ref(storage, "Recipe-Img/" + id);
		deleteObject(imgDoc)
			.then(() => {})
			.catch((error) => {
				return error;
			});
	};
	getImgInfo = async (file) => {
		const docRef = doc(recipeColRef);
		const recipeImgRef = ref(storage, "Recipe-Img/" + docRef.id);
		const metadata = {
			contentType: file.type,
		};
		await uploadBytes(recipeImgRef, file, metadata);
		const url = await getDownloadURL(recipeImgRef);
		return [url, docRef];
	};
	update = async (isActice, colName, id, uid, count) => {
		const itemDoc = doc(db, "recipe", id);
		if (isActice) {
			if (colName === "likedBy") {
				console.log("remove", count);
				count--;
				const docSnap = await updateDoc(itemDoc, {
					[colName]: arrayRemove(uid),
					likeValue: count,
				});
			}
			const docSnap = await updateDoc(itemDoc, { [colName]: arrayRemove(uid) });
		} else {
			if (colName === "likedBy") {
				console.log("add", count);
				count++;
				const docSnap = await updateDoc(itemDoc, {
					[colName]: arrayUnion(uid),
					likeValue: count,
				});
			}
			const docSnap = await updateDoc(itemDoc, { [colName]: arrayUnion(uid) });
		}
	};
	updateHot = async (colName, count, id) => {
		const itemDoc = doc(db, "recipe", id);
		const docSnap = await updateDoc(itemDoc, { [colName]: count });
	};
}

export default new RecipeService();
