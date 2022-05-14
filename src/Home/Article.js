import RecipeService from "../database";
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";

function Article(){
    const [dish, setDish] = useState([]);

    const showDish = async () =>{
        const data = await RecipeService.getDoc();
        setDish(data);
    }
    useEffect(()=>{
        showDish();
    }, [])
    
    const handleOnclick = (e) => {

    }

    return (
        <article className="article-article">
            <div className="article-cont">
                {
                    dish.map((item) => {
                        console.log(item)
                        return (
                            <Link to={`/recipe/${item.id}`} key={item.id} className="dishCard" onClick={(e)=>handleOnclick(e)}>
                                <figure>
                                    <img className="dishCard-img" src={item.imageUrl}/>
                                </figure>
                                <figcaption>{item.dishName}</figcaption>
                                <div className="dishCard-time">
                                    <p>prep.</p>
                                    <p>cook</p>
                                    <p>total</p>
                                    <p>{item.preTime}mins</p>
                                    <p>{item.cookTime}mins</p>
                                    <p>{parseInt(item.preTime)+parseInt(item.cookTime)}mins</p>
                                </div>
                                <div className="dishCard-user">{item.author.diplayName}</div>
                            </Link>
                        )
                    })
                }
                
                <div className="dishCard">
                    <figure></figure>
                    <figcaption>雞胸肉</figcaption>
                    <div className="dishCard-time">
                        <p>prep.</p>
                        <p>cook</p>
                        <p>total</p>
                        <p>5mins</p>
                        <p>16mins</p>
                        <p>21mins</p>
                    </div>
                </div>
                <div className="dishCard">
                    <figure></figure>
                    <figcaption>雞胸肉</figcaption>
                    <div className="dishCard-time">
                        <p>prep.</p>
                        <p>cook</p>
                        <p>total</p>
                        <p>5mins</p>
                        <p>16mins</p>
                        <p>21mins</p>
                    </div>
                </div>
                <div className="dishCard">
                    <figure></figure>
                    <figcaption>雞胸肉</figcaption>
                    <div className="dishCard-time">
                        <p>prep.</p>
                        <p>cook</p>
                        <p>total</p>
                        <p>5mins</p>
                        <p>16mins</p>
                        <p>21mins</p>
                    </div>
                </div>
                <div className="dishCard">
                    <figure></figure>
                    <figcaption>雞胸肉</figcaption>
                    <div className="dishCard-time">
                        <p>prep.</p>
                        <p>cook</p>
                        <p>total</p>
                        <p>5mins</p>
                        <p>16mins</p>
                        <p>21mins</p>
                    </div>
                </div>
            </div>
        </article>
    )
}

export default Article;