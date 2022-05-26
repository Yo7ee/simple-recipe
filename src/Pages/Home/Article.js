import React, {useEffect, useState, useContext} from "react";
import UserContext from "../../Context/User";
import {Link} from "react-router-dom";
import Loading from "../../Loading";
import {db} from "../../utils/firebase";
import { onSnapshot, query, orderBy, collection } from "@firebase/firestore";
import RecipeService from "../../utils/database";
import hotIcon from "../../icon/hotIcon.svg";

function Article(){
    const [dish, setDish] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const {uid} = useContext(UserContext);

    const showDish = async () =>{
        setIsLoading(true);
        const q  = query((collection(db, 'recipe')), orderBy("createdAt", "asc"));
        onSnapshot(q, (querySnapshot)=>{
            const data =querySnapshot.docs.map((doc)=>({...doc.data(), id:doc.id}));
                setDish(data);
                console.log(data)
                setIsLoading(false)
            });
    }

    const handleToggle = async (isActive, colName, e, id) => {
        e.preventDefault();
        await RecipeService.update(isActive, colName, id, uid);
        console.log("test")
    }

    const handleHotClink = async (colName, id, count) => {
        let currentCount = count; 
        currentCount ++;
        await RecipeService.updateHot(colName, currentCount, id)
    }

    useEffect(()=>{
        showDish();
    }, [])

    return (
        isLoading ? (<Loading/> 
        )   :   ( 
                <article className="article-article">
                    <div className="article-cont">
                        {
                            dish.map((item) => {
                                const isCollected = item.collectedBy?.includes(uid);
                                const isLiked = item.likedBy?.includes(uid);
                                return (
                                    <Link to={`/recipe/${item.id}`} key={item.id} className="dishCard" onClick={()=>handleHotClink("hotCount", item.id, item.hotCount)}>
                                        <figure>
                                            {/* <img className="dishCard-img" src={item.imageUrl}/> */}
                                            <svg viewBox="0 0 32 32" className={isCollected ? "dishCard-bookmark collected" : "dishCard-bookmark"} onClick={(e)=>handleToggle(isCollected, "collectedBy", e, item.id)}><path d="M23.8,2H8.2C6.5,2,5.1,3.4,5.1,5.1v24.6c0,0.2,0.2,0.3,0.4,0.3l10.4-4.5c0.1,0,0.2,0,0.2,0  L26.6,30c0.2,0.1,0.4-0.1,0.4-0.3V5.1C26.9,3.4,25.5,2,23.8,2z"/></svg>
                                        </figure>
                                        <figcaption>
                                            <div>{item.dishName}</div>
                                            <svg viewBox="0 0 24 24" className={isLiked ? "dishCard-heart liked" : "dishCard-heart"} onClick={(e)=>handleToggle(isLiked, "likedBy", e, item.id)}><path d="M22.2,4.1c2.7,2.7,2.4,6.9-0.4,9.5l-8.4,7.9c-0.8,0.7-2.1,0.7-2.9,0l-8.4-7.9c-2.7-2.6-3-6.8-0.4-9.5   C4.6,1.4,9.2,1.3,12,4C14.8,1.3,19.4,1.4,22.2,4.1z"/></svg>
                                        </figcaption>
                                        <div className="dishCard-time">
                                            <p>總烹煮時間</p>
                                            <p>{parseInt(item.preTime)+parseInt(item.cookTime)}分鐘</p>
                                        </div>
                                        <div className="dishCard-heartUser">
                                            <svg viewBox="0 0 24 24" className="dishCard-heart-Icon" ><path d="M22.2,4.1c2.7,2.7,2.4,6.9-0.4,9.5l-8.4,7.9c-0.8,0.7-2.1,0.7-2.9,0l-8.4-7.9c-2.7-2.6-3-6.8-0.4-9.5   C4.6,1.4,9.2,1.3,12,4C14.8,1.3,19.4,1.4,22.2,4.1z"/></svg>
                                            <div className="dishCard-heartNum">{item.likedBy?.length || 0}</div>
                                            <img className="dishCard-hot-Icon" src={hotIcon}/>
                                            <div className="dishCard-hotNum">{item.hotCount}</div>
                                            <div className="dishCard-user">{item.author.displayName}</div>
                                        </div>
                                    </Link>
                                )
                            })
                        }
                    </div>
                </article>
                )
    )
}

export default Article;