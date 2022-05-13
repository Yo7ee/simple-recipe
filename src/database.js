import {db, storage} from "./firebase";
import {collection, addDoc, doc} from "firebase/firestore";
import {ref, uploadBytes, getDownloadURL} from "firebase/storage";


const recipeColRef = collection(db, 'recipe');

class RecipeService {
    addDoc = (item) => {
        return addDoc(recipeColRef, item);
    };
    deleteDoc = (id) => {
        const itemDoc = doc(db, 'recipe', id);
        return deleteDoc(itemDoc);
    };
    getImgUrl = async (file) => {
        const recipeImgRef = ref(storage, 'Recipe-Img/' + doc(recipeColRef).id);
        const metadata = {
            contentType:file.type,
        }
        console.log(file)
        await uploadBytes(recipeImgRef, file, metadata)
        const url = await getDownloadURL(recipeImgRef)
        return url;
    }
};


export default new RecipeService();

// uploadBytes(recipeImgRef, file, metadata).then(() => {
//     getDownloadURL(recipeImgRef).then((url)=>{
//         console.log(url)
//         return url;
//     })
// })