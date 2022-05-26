import React, { useEffect, useState } from "react";
import "./member.css";
import { getAuth } from "firebase/auth";
import RecipeService from "../../utils/database";
import {Link} from "react-router-dom"

function MyRecipes (){
    const [myRecipe, setMyRecipe] = useState([]);
    const [myRecipeNumber, setMyRecipeNumber] = useState(0)

    const auth = getAuth();
    const userName = auth.currentUser.displayName;
    const showMyRecipe = async () => {
        const data = await RecipeService.getFilterDoc("author.displayName", userName);
        setMyRecipe(data)
        setMyRecipeNumber(data.length);
    }
    const handleDelRecipe = async (id) => {
        await RecipeService.deleteDoc(id);
        showMyRecipe;
    }

    useEffect(()=>{
        showMyRecipe();
    }, [])
    
    return (
        <>
        <div className="myRecipe-number">{myRecipeNumber} 篇食譜</div>
        {myRecipeNumber == 0 &&
            <div className="myRecipe-none">目前沒有新增的食譜</div>
        }
        {
            myRecipe.map((item)=>{
                return (
                    <div className="myRecipe-cont" key={item.id}>
                        <Link to={`/recipe/${item.id}`} className="myRecipe-link">
                            <div className="myRecipe-name">{item.dishName}</div>
                            <div className="myRecipe-ingre">食材</div>
                            <div className="myRecipe-time-cont">
                                <p>總烹煮時間</p>
                                <p className="myRecipe-time">{parseInt(item.preTime)+parseInt(item.cookTime)}分鐘</p>
                            </div>
                        </Link>
                        <button className="myRecipe-btn-del" onClick={(e)=>handleDelRecipe(item.id)}>刪除</button>
                        <Link to={`/recipe/${item.id}`} className="myRecipe-link">
                            <figure className="myRecipe-fig">
                                {/* <img className="myRecipe-img" src={item.imageUrl}/> */}
                            </figure>
                        </Link>
                    </div>
                )
            })
        }
        </>
    )
}

export default MyRecipes;