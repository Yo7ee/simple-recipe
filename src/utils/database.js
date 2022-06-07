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
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

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
	// getDoc = async () => {
	//     const q  = query(recipeColRef, orderBy("createdAt", "asc"));
	//     const unsubscribe = onSnapshot(q, (querySnapshot)=>{
	//         const dish =[];
	//         querySnapshot.forEach((doc)=>{
	//             dish.push(doc.data())
	//         })
	//     });
	//     return dish
	// };
	getDoc = async () => {
		const q = query(recipeColRef, orderBy("createdAt", "asc"));
		const querySnapshot = await getDocs(q);
		const dataArr = querySnapshot.docs.map((doc) => ({
			...doc.data(),
			id: doc.id,
		}));
		console.log(dataArr);
		return dataArr;
	};
	getFilterDoc = async (name, filter) => {
		console.log(name, filter);
		const q = query(recipeColRef, where(name, "==", filter));
		const querySnapshot = await getDocs(q);
		console.log(querySnapshot);
		const dataArr = querySnapshot.docs.map((doc) => ({
			...doc.data(),
			id: doc.id,
		}));
		console.log(dataArr);
		return dataArr;
	};
	getFilterArray = async (name, filter) => {
		console.log(name, filter);
		const q = query(recipeColRef, where(name, "array-contains", filter));
		const querySnapshot = await getDocs(q);
		console.log(querySnapshot);
		const dataArr = querySnapshot.docs.map((doc) => ({
			...doc.data(),
			id: doc.id,
		}));
		console.log(dataArr);
		return dataArr;
	};
	// getOneDoc = async (id) => {
	//     const itemDoc = doc(db, 'recipe', id);
	//     return onSnapshot((itemDoc), (snap)=>{
	//         snap.data()
	//     })
	// }
	deleteDoc = (id) => {
		const itemDoc = doc(db, "recipe", id);
		return deleteDoc(itemDoc);
	};
	getImgInfo = async (file) => {
		const docRef = doc(recipeColRef);
		const recipeImgRef = ref(storage, "Recipe-Img/" + docRef.id);
		const metadata = {
			contentType: file.type,
		};
		console.log(docRef);
		await uploadBytes(recipeImgRef, file, metadata);
		const url = await getDownloadURL(recipeImgRef);
		return [url, docRef];
	};
	update = async (isActice, colName, id, uid) => {
		const itemDoc = doc(db, "recipe", id);
		if (isActice) {
			console.log("remove");
			const docSnap = await updateDoc(itemDoc, { [colName]: arrayRemove(uid) });
		} else {
			console.log("add");
			const docSnap = await updateDoc(itemDoc, { [colName]: arrayUnion(uid) });
		}
	};
	updateHot = async (colName, count, id) => {
		const itemDoc = doc(db, "recipe", id);
		console.log(count);
		const docSnap = await updateDoc(itemDoc, { [colName]: count });
	};
}

export default new RecipeService();

// querySnapshot.forEach((doc) => {
//     console.log(doc.id, " => ", doc.data())
//     console.log(typeof(doc.data()))
//     return doc.data();
// });
