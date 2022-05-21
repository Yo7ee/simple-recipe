import React, { useEffect, useState } from "react";
import "../Home/homePage.css";
import "./Recipe.css";
import Header from "../Home/Header";
import Footer from "../Home/Footer";
import RecipeService from "../database";
import {Timestamp} from "firebase/firestore";
import auth from "../firebase";
import { useNavigate } from "react-router-dom";

function Recipe(){
    const id = window.location.href.split('/').pop();
    const [recipe, setRecipe] = useState([{author:{}}]);
    const [ingre, setIngre] = useState([]);
    const [step, setStep] = useState([]);
    const [displayName, setDisplayName] = useState('');
    const [time, setTime] = useState('');
    const showRecipe = async () => {
        const data = await RecipeService.getOneDoc(id);
        setRecipe(data);
        setIngre(data.ingredients)
        setStep(data.direction)
        setDisplayName(data.author.displayName)
        setTime((new Date(data.createdAt.toDate())).toLocaleDateString())
        console.log((new Date(data.createdAt.toDate())).toLocaleDateString())
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
    console.log(commentList)

    const handleClickComment = () => {
        if (!auth.currentUser){
            navigate("/signin")
        }
    }

    const [comment, setComment] = useState('');
    const [btnColor, setBtnColor] = useState('color-none');
    const handleKeyUpComment = (e) => {
        setComment(e.target.value)
        // if(comment){
        //     console.log(comment, 'true')
        //     setBtnColor('color')
        // }else{
        //     console.log(comment, 'false')
        //     setBtnColor('color-none')
        // }
    }

    const navigate = useNavigate();
    const [errorComment, setErrorComment] = useState('');
    const handleOnSubmit = async (e) => {
        e.preventDefault();
        console.log((auth.currentUser))
        if (auth.currentUser){
            if(comment){
                try {
                    const item = {
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
    

    return(
        <>
            <Header/>
            <section className="section-recipe">
                <div className="section-recipe-info">
                    <div className="section-recipe-title">
                        <span className="section-recipe-dishName">{recipe.dishName}</span>
                        <span className="section-recipe-user">上傳者：{displayName}</span>
                        <span className="section-recipe-uploadTime">上傳時間：{time}</span>
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
                                    <input type="checkbox" className="input-check"/><label className="recipe-label">{item.ingre}</label>
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
                                    <input type="checkbox" className="input-check"/><label className="recipe-label">步驟 {index+1}</label>
                                    <p className="direction-step-content">{item.stepContent}</p>
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
                                                <span className="user-fig">版</span>
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
                            <input type="text" className="input-comment" value={comment} onClick={handleClickComment} onChange={handleKeyUpComment} placeholder=" 寫下你的心得"/>
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