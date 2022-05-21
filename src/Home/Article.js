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
                        return (
                            <Link to={`/recipe/${item.id}`} key={item.id} className="dishCard">
                                <figure>
                                    {/* <img className="dishCard-img" src={item.imageUrl}/> */}
                                </figure>
                                <figcaption>{item.dishName}</figcaption>
                                <div className="dishCard-time">
                                    <p>總烹煮時間</p>
                                    <p>{parseInt(item.preTime)+parseInt(item.cookTime)}分鐘</p>
                                </div>
                                <div className="dishCard-user">{item.author.displayName}</div>
                            </Link>
                        )
                    })
                }
            </div>
        </article>
    )
}

export default Article;