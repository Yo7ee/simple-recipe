import {db, storage} from "./firebase";
import {collection, setDoc, addDoc, doc, query, orderBy, getDocs, getDoc, onSnapshot} from "firebase/firestore";
import {ref, uploadBytes, getDownloadURL} from "firebase/storage";


const recipeColRef = collection(db, 'recipe');


class RecipeService {
    setDoc = (item, docRef) => {
        return setDoc(docRef, item)
    };
    addDoc = (item) => {
        return addDoc(recipeColRef, item);
    };
    setCommentDoc = async (id, item) => {
        const docRef = doc(db, 'recipe', id);
        const commentRef =  collection(docRef, 'comment');
        const commentDocRef = doc(commentRef);
        return setDoc(commentDocRef, item);
    }
    getCommentDoc = async (id) => {
        const docRef = doc(db, 'recipe', id);
        const commentRef =  collection(docRef, 'comment');
        const q  = query(commentRef, orderBy("createdAt", "asc"));
        const querySnapshot = await getDocs(q);
        const dataArr = querySnapshot.docs.map((doc)=>({...doc.data(), id:doc.id}));
        return dataArr;
    };
    getDoc = async () => {
        const q  = query(recipeColRef, orderBy("createdAt", "asc"));
        const querySnapshot = await getDocs(q);
        const dataArr = querySnapshot.docs.map((doc)=>({...doc.data(), id:doc.id}));
        console.log(dataArr)
        return dataArr;
    };
    getOneDoc = async (id) => {
        const itemDoc = doc(db, 'recipe', id);
        const docSnap = await getDoc(itemDoc);
        console.log(docSnap.data())
        return docSnap.data();
    }
    deleteDoc = (id) => {
        const itemDoc = doc(db, 'recipe', id);
        return deleteDoc(itemDoc);
    };
    getImgInfo = async (file) => {
        const docRef = doc(recipeColRef);
        const recipeImgRef = ref(storage, 'Recipe-Img/' + docRef.id);
        const metadata = {
            contentType:file.type,
        }
        console.log(file)
        await uploadBytes(recipeImgRef, file, metadata)
        const url = await getDownloadURL(recipeImgRef)
        return [url, docRef];
    }
};


export default new RecipeService();

// querySnapshot.forEach((doc) => {
//     console.log(doc.id, " => ", doc.data())
//     console.log(typeof(doc.data()))
//     return doc.data();
// });