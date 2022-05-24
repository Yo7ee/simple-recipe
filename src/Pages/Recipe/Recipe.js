import React, { useContext, useEffect, useState } from "react";
import "../Home/homePage.css";
import "./Recipe.css";
import Header from "../Home/Header";
import Footer from "../Home/Footer";
import RecipeService from "../../database";
import {Timestamp, onSnapshot, doc} from "firebase/firestore";
import auth, {db} from "../../firebase";
import { useNavigate } from "react-router-dom";
import member from "../../icon/member.svg";
import UserContext from "../../Context/User";

function Recipe(){
    const id = window.location.href.split('/').pop();
    const [recipe, setRecipe] = useState([{author:{}}]);
    const [ingre, setIngre] = useState([]);
    const [step, setStep] = useState([]);
    const [displayName, setDisplayName] = useState('');
    const [time, setTime] = useState('');
    const {user, uid, setUid} = useContext(UserContext);
    
    const showRecipe = () => {
        onSnapshot((doc(db, 'recipe', id)), (doc)=>{
            const data =doc.data()
            console.log(data)
            setRecipe(data);
            setIngre(data.ingredients)
            setStep(data.direction)
            setDisplayName(data.author.displayName)
            setTime((new Date(data.createdAt.toDate())).toLocaleDateString())
            console.log((new Date(data.createdAt.toDate())).toLocaleDateString())
        })
    }

    const handleToggle = async (isActive, colName) => {
        await RecipeService.update(isActive, colName, id, uid);
    }

    const [commentList, setCommentList] = useState([]);
    const showComment = async () => {
        const data = await RecipeService.getCommentDoc(id);
        setCommentList(data);
    }

    useEffect(()=>{
        showRecipe();
        showComment();
    }, [])

    const handleClickNoneUser = () => {
        if (!user){
            navigate("/signin");
        }
    }

    const [comment, setComment] = useState('');
    const handleKeyUpComment = (e) => {
        setComment(e.target.value)
    }

    const navigate = useNavigate();
    const [errorComment, setErrorComment] = useState('');
    const handleOnSubmit = async (e) => {
        e.preventDefault();
        console.log(auth.currentUser)
        if (user){
            if(comment){
                try {
                    const item = {
                        displayPic:auth.currentUser.photoURL,
                        comment,
                        displayName:auth.currentUser.displayName,
                        createdAt:Timestamp.now()
                    }
                    await RecipeService.setCommentDoc(id, item);
                    console.log("leave comment")
                    showComment();
                } catch(e){
                    console.log("Error adding Item " + e)
                }
            }else{
                setErrorComment("留言不可空白");
            }
            setComment('');
        } else{
            navigate("/signin")
        };
    }
    
    const isCollected = recipe.collectedBy?.includes(uid);
    const isLiked = recipe.likedBy?.includes(uid);

    return(
        <>
            <Header/>
            <section className="section-recipe">
                <div className="section-recipe-info">
                    <div className="section-recipe-title">
                        <span className="section-recipe-dishName">{recipe.dishName}</span>
                        <span className="section-recipe-user">上傳者：{displayName}</span>
                        <span className="section-recipe-uploadTime">上傳時間：{time}</span>
                        {user ? (
                        <>
                        <svg viewBox="0 0 32 32" className={isCollected ? "section-recipe-bookmark collected" : "section-recipe-bookmark"} onClick={()=>handleToggle(isCollected, "collectedBy")}><path d="M23.8,2H8.2C6.5,2,5.1,3.4,5.1,5.1v24.6c0,0.2,0.2,0.3,0.4,0.3l10.4-4.5c0.1,0,0.2,0,0.2,0  L26.6,30c0.2,0.1,0.4-0.1,0.4-0.3V5.1C26.9,3.4,25.5,2,23.8,2z"/></svg>
                        <svg viewBox="0 0 24 24" className={isLiked ? "section-recipe-heart liked" : "section-recipe-heart"} onClick={()=>handleToggle(isLiked, "likedBy")}><path d="M22.2,4.1c2.7,2.7,2.4,6.9-0.4,9.5l-8.4,7.9c-0.8,0.7-2.1,0.7-2.9,0l-8.4-7.9c-2.7-2.6-3-6.8-0.4-9.5   C4.6,1.4,9.2,1.3,12,4C14.8,1.3,19.4,1.4,22.2,4.1z"/></svg>
                        </>
                        )   :   (
                        <>
                        <svg viewBox="0 0 32 32" className="section-recipe-bookmark" onClick={handleClickNoneUser}><path d="M23.8,2H8.2C6.5,2,5.1,3.4,5.1,5.1v24.6c0,0.2,0.2,0.3,0.4,0.3l10.4-4.5c0.1,0,0.2,0,0.2,0  L26.6,30c0.2,0.1,0.4-0.1,0.4-0.3V5.1C26.9,3.4,25.5,2,23.8,2z"/></svg>
                        <svg viewBox="0 0 24 24" className="section-recipe-heart" onClick={handleClickNoneUser}><path d="M22.2,4.1c2.7,2.7,2.4,6.9-0.4,9.5l-8.4,7.9c-0.8,0.7-2.1,0.7-2.9,0l-8.4-7.9c-2.7-2.6-3-6.8-0.4-9.5   C4.6,1.4,9.2,1.3,12,4C14.8,1.3,19.4,1.4,22.2,4.1z"/></svg>
                        </>
                        )}
                        
                    </div>
                    <div className="section-recipe-figure-time">
                        <figure className="section-recipe-figure">
                            {/* <img className="section-recipe-img" src={recipe.imageUrl}/> */}
                        </figure>
                        <div className="section-recipe-time">
                            <div className="section-recipe-time-cont">
                                <p>準備時間: {recipe.preTime} 分鐘</p>
                                <p>烹煮時間: {recipe.cookTime} 分鐘</p>
                                <p>總時間: {parseInt(recipe.preTime)+parseInt(recipe.cookTime)} 分鐘</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <article className="article-recipe">
                <div className="article-recipe-ingredient">
                    <div className="ingredient">食材</div>
                    <div className="ingredient-item">
                        {
                            ingre.map((item, index)=>
                                (
                                <div key={index} className="item">
                                    <input type="checkbox" className="item-input-check" id={"ingre"+index}/>
                                    <label className="recipe-label" htmlFor={"ingre"+index}>
                                    <svg  className="item-input-icon" viewBox="0 0 128 128"><title/><path d="M64,0a64,64,0,1,0,64,64A64.07,64.07,0,0,0,64,0Zm0,122a58,58,0,1,1,58-58A58.07,58.07,0,0,1,64,122Z"/><path d="M87.9,42.36,50.42,79.22,40.17,68.43a3,3,0,0,0-4.35,4.13l12.35,13a3,3,0,0,0,2.12.93h.05a3,3,0,0,0,2.1-.86l39.65-39a3,3,0,1,0-4.21-4.28Z"/></svg>
                                    <div>{item.ingre}</div>
                                    </label>
                                </div>
                                )
                            )
                        }
                    </div>
                </div>
                <div className="article-recipe-direction">
                    <div className="direction">烹煮方法</div>
                    <div className="direction-step">
                        {
                            step.map((item, index)=>
                                (
                                <div key={index} className="step">
                                    <input type="checkbox" className="step-input-check" id={"step"+index}/>
                                    <label className="recipe-label" htmlFor={"step"+index}>
                                    <svg className="step-input-icon" viewBox="0 0 30 30"><path d="M24,4H6C4.895,4,4,4.895,4,6v18c0,1.105,0.895,2,2,2h18c1.105,0,2-0.895,2-2V6C26,4.895,25.104,4,24,4z M21.707,11.707  l-7.56,7.56c-0.188,0.188-0.442,0.293-0.707,0.293s-0.52-0.105-0.707-0.293l-3.453-3.453c-0.391-0.391-0.391-1.023,0-1.414  s1.023-0.391,1.414,0l2.746,2.746l6.853-6.853c0.391-0.391,1.023-0.391,1.414,0S22.098,11.316,21.707,11.707z"/></svg>
                                    <div>步驟 {index+1}</div>
                                    <p className="direction-step-content">{item.stepContent}</p>
                                    </label>
                                    
                                </div>
                                )
                            )
                        }
                    </div>
                </div>
                <div className="article-recipe-comment">
                    <div className="comment">實作心得</div>
                        {
                            commentList.map((item, index)=>
                                    (
                                    <div key={index} className="comment-user-cont">
                                        <div className="comment-user">
                                            <div className="user">
                                                <img className="user-fig" src={item.displayPic ? item.displayPic : member}/>
                                                <span className="user-name">{item.displayName}</span>
                                                <span className="date">{(new Date(item.createdAt.toDate())).toLocaleDateString()}</span>
                                            </div>
                                            <div className="content">{item.comment}</div>
                                        </div>
                                    </div>
                                )
                            )
                        }
                        <form className="comment-blank-content" onSubmit={(e)=>{handleOnSubmit(e)}}>
                            <input type="text" className="input-comment" value={comment} onClick={handleClickNoneUser} onChange={handleKeyUpComment} placeholder=" 寫下你的心得"/>
                            <button className="btn-comment">
                                {comment ? <svg className="color" viewBox="0 0 30.2 30.1"><path d="M2.1,14.6C8.9,12,28.5,4,28.5,4l-3.9,22.6c-0.2,1.1-1.5,1.5-2.3,0.8l-6.1-5.1l-4.3,4l0.7-6.7l13-12.3l-16,10  l1,5.7l-3.3-5.3l-5-1.6C1.5,15.8,1.4,14.8,2.1,14.6z"/></svg>
                                : <svg className="color-none" viewBox="0 0 30.2 30.1"><path d="M2.1,14.6C8.9,12,28.5,4,28.5,4l-3.9,22.6c-0.2,1.1-1.5,1.5-2.3,0.8l-6.1-5.1l-4.3,4l0.7-6.7l13-12.3l-16,10  l1,5.7l-3.3-5.3l-5-1.6C1.5,15.8,1.4,14.8,2.1,14.6z"/></svg>
                                }
                            </button>
                        </form>
                        <div className="errorComment">{errorComment}</div>
                </div>
            </article>
            <Footer/>
        </>
    )
}

export default Recipe;