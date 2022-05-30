import React, {useEffect, useState, useContext} from "react";
import UserContext from "../../Context/User";
import {Link, useNavigate} from "react-router-dom";
import Loading from "../../Loading";
import {db} from "../../utils/firebase";
import { onSnapshot, query, orderBy, collection, limit } from "@firebase/firestore";
import RecipeService from "../../utils/database";
import hotIcon from "../../icon/hotIcon.svg";

function Article(){
    const [hotCountDish, setHotCountDish] = useState([]);
    const [heartDish, setHeartDish] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const {uid, user} = useContext(UserContext);
    const navigate = useNavigate();

    const showDish = async () =>{
        setIsLoading(true);
        const q  = query((collection(db, 'recipe')), orderBy("hotCount", "desc"), limit(4));
        onSnapshot(q, (querySnapshot)=>{
            const data =querySnapshot.docs.map((doc)=>({...doc.data(), id:doc.id}));
                setHotCountDish(data);
                console.log(data)
            });
        const q1 = query((collection(db, 'recipe')), orderBy("likedBy", "desc"), limit(4));
        onSnapshot(q1, (querySnapshot)=>{
            const data =querySnapshot.docs.map((doc)=>({...doc.data(), id:doc.id}));
                setHeartDish(data);
                console.log(data)
                setIsLoading(false)
        })
    }

    const handleToggle = async (isActive, colName, e, id) => {
        e.preventDefault(); //For 冒泡效應
        if (user){
            await RecipeService.update(isActive, colName, id, uid);
        console.log("toggle")
        }else{
            navigate("/signin");
        }
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
                        <div className="article-title">最熱門點擊</div>
                        <div className="wrap-dishCard">
                        {
                            hotCountDish.map((item) => {
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
                                        <div className="dishCard-tool">{item.toolName}</div>
                                        <div className="dishCard-time">
                                            <p>總烹煮時間</p>
                                            <p>{parseInt(item.preTime)+parseInt(item.cookTime)}分鐘</p>
                                        </div>
                                        <div className="dishCard-heartUser">
                                            <div className="icon">
                                                <p className="heartNum">
                                                    <i class="fa-solid fa-heart"></i>
                                                    {item.likedBy?.length-1}
                                                </p>
                                                <p className="hotNum">
                                                    <i className="fa-brands fa-gripfire"></i>
                                                    {item.hotCount}
                                                </p>
                                            </div>
                                            <p className="user">{item.author.displayName}</p>
                                        </div>
                                    </Link>
                                )
                            })
                        }
                        </div>
                    </div>
                    <div className="article-cont">
                        <div className="article-title">最喜愛排名</div>
                        <div className="wrap-dishCard">
                        {
                            heartDish.map((item) => {
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
                                        <div className="dishCard-tool">{item.toolName}</div>
                                        <div className="dishCard-time">
                                            <p>總烹煮時間</p>
                                            <p>{parseInt(item.preTime)+parseInt(item.cookTime)}分鐘</p>
                                        </div>
                                        <div className="dishCard-heartUser">
                                            <div className="icon">
                                                <p className="heartNum">
                                                    <i class="fa-solid fa-heart"></i>
                                                    {item.likedBy?.length-1}
                                                </p>
                                                <p className="hotNum">
                                                    <i className="fa-brands fa-gripfire"></i>
                                                    {item.hotCount}
                                                </p>
                                            </div>
                                            <p className="user">{item.author.displayName}</p>
                                        </div>
                                    </Link>
                                )
                            })
                        }
                    </div>
                    </div>
                </article>
                )
    )
}

export default Article;