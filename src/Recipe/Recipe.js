import React, { useEffect, useState } from "react";
import "../Home/homePage.css";
import "./Recipe.css";
import Header from "../Home/Header";
import Footer from "../Home/Footer";
import RecipeService from "../database";
import {Timestamp} from "firebase/firestore";
import auth from "../firebase";

function Recipe(){
    const id = window.location.href.split('/').pop();
    const [recipe, setRecipe] = useState([{author:{}}]);
    const [ingre, setIngre] = useState([]);
    const [step, setStep] = useState([]);
    const [displayName, setDisplayName] = useState('');
    const showRecipe = async () => {
        const data = await RecipeService.getOneDoc(id);
        setRecipe(data);
        setIngre(data.ingredients)
        setStep(data.direction)
        setDisplayName(data.author.diplayName)
        console.log(data)
    }

    const [commentList, setCommentList] = useState([]);
    const showComment = async () => {
        const data = await RecipeService.getCommentDoc();
        setCommentList(data)
    }

    useEffect(()=>{
        showRecipe();
        // showComment();
    }, [])

    const [comment, setComment] = useState('');
    const handleOnSubmit = async (e) => {
        e.preventDefault();
        try {
            const item = {
                comment,
                displayName:auth.currentUser.displayName,
                createdAt:Timestamp.now()
            }
            await RecipeService.setCommentDoc(id, item);
            console.log("leave comment")
        } catch(e){
            console.log("Error adding Item " + e)
        }
        setComment('');
    }

    return(
        <>
            <Header/>
            <section className="section-recipe">
                <div className="section-recipe-info">
                    <div className="section-recipe-title">
                        <span>{recipe.dishName}</span>
                        <span>上傳者：{displayName}</span>
                    </div>
                    <div className="section-recipe-figure-time">
                        <figure className="section-recipe-figure">
                            {/* <img className="section-recipe-img" src={recipe.imageUrl}/> */}
                        </figure>
                        <div className="section-recipe-time">
                            <div className="section-recipe-time-cont">
                                <span className="time-icon"/>
                                <p>prep.: {recipe.preTime}mins</p>
                                <p>cook: {recipe.cookTime}mins</p>
                                <p>total: {parseInt(recipe.preTime)+parseInt(recipe.cookTime)}mins</p>
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
                                    <input type="checkbox" className="input-check"/><label>{item.ingre}</label>
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
                                    <input type="checkbox" className="input-check"/><label>步驟{index+1}</label>
                                    <p>{item.stepContent}</p>
                                </div>
                                )
                            )
                        }
                    </div>
                </div>
                <div className="article-recipe-comment">
                    <div className="comment">實作心得</div>
                        {
                            commentList.map((item)=>{
                                console.log(item)
                                    (
                                    <div className="comment-user-cont">
                                        <div className="comment-user">
                                            <div className="user">
                                                <span className="user-fig">版</span>
                                                <span className="user-name">{item.displayName}</span>
                                                <span className="date">2022-05-05</span>
                                            </div>
                                            <div className="content">{item.comment}</div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                        <div className="comment-user-cont">
                            <div className="comment-user">
                                <div className="user">
                                    <span className="user-fig">版</span>
                                    <span className="user-name">版主</span>
                                    <span className="date">2022-05-05</span>
                                </div>
                                <div className="content">簡單容易上手</div>
                            </div>
                        </div>
                        <form className="comment-blank-content" onSubmit={(e)=>{handleOnSubmit(e)}}>
                            <input type="text" className="input-comment" onChange={(e)=>setComment(e.target.value)} placeholder="寫下你的心得"/>
                            <button className="btn-comment">送出</button>
                        </form>
                </div>
            </article>
            <Footer/>
        </>
    )
}

export default Recipe;