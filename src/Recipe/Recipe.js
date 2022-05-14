import React, { useEffect, useState } from "react";
import "../Home/homePage.css";
import "./Recipe.css";
import Header from "../Home/Header";
import Footer from "../Home/Footer";
import RecipeService from "../database";

function Recipe(){
    const id = window.location.href.split('/').pop();
    const [recipe, setRecipe] = useState([])
    const showRecipe = async () => {
        const data = await RecipeService.getOneDoc(id);
        setRecipe(data);
    }
    useEffect(()=>{
        showRecipe();
    }, [])

    return(
        <>
            <Header/>
            <section className="section-recipe">
                <div className="section-recipe-info">
                    <div className="section-recipe-title">
                        <span>{recipe.dishName}</span>
                        <span>上傳者：版主</span>
                    </div>
                    <div className="section-recipe-figure-time">
                        <figure className="section-recipe-figure"></figure>
                        <div className="section-recipe-time">
                            <div className="section-recipe-time-cont">
                                <span className="time-icon"/>
                                <p>prep.: 5mins</p>
                                <p>cook: 16mins</p>
                                <p>total: 21mins</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <article className="article-recipe">
                <div className="article-recipe-ingredient">
                    <div className="ingredient">食材</div>
                    <div className="ingredient-item">
                        <div className="item">
                            <input type="checkbox" className="input-check"/><label>鹽</label>
                        </div>
                        <div className="item">
                            <input type="checkbox" className="input-check"/><label>雞胸肉</label>
                        </div>
                    </div>
                </div>
                <div className="article-recipe-direction">
                    <div className="direction">烹煮方法</div>
                    <div className="direction-step">
                        <div className="step">
                            <input type="checkbox" className="input-check"/><label>步驟一</label>
                            <p>用鹽醃漬雞胸肉</p>
                        </div>
                        <div className="step">
                            <input type="checkbox" className="input-check"/><label>步驟二</label>
                            <p>180C預熱烤箱，將雞胸肉有膜的那面朝下，放入烤箱，烤10分鐘，燜6分鐘</p>
                        </div>
                    </div>
                </div>
                <div className="article-recipe-comment">
                    <div className="comment">實作心得</div>
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
                        <div className="comment-blank-content">
                            <input type="text" className="input-comment" placeholder="寫下你的心得"/>
                            <button className="btn-comment">送出</button>
                        </div>
                </div>
            </article>
            <Footer/>
        </>
    )
}

export default Recipe;