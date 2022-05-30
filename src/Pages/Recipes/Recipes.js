import React, {useContext, useEffect, useState, useTransition} from "react";
import { Link } from "react-router-dom";
import UserContext from "../../Context/User";
import RecipeService from "../../utils/database";
import hotIcon from "../../icon/hotIcon.svg";
import Header from "../Home/Header";
import Footer from "../Home/Footer";
import search from "../../icon/search.png";
import {algolia, client} from "../../utils/algolia";
import KeywordContext from "../../Context/Keyword";
import "../Recipes/Recipes.css";

function Recipes(){
    const {uid} = useContext(UserContext);
    const {keyword, setKeyword} = useContext(KeywordContext);
    const [results, setResults] = useState([]);
    //Filter
    const [tool, setTool] = useState('')
    const [difficulty, setDifficulty] =useState('')
    const [time, setTime] = useState('')

    //Sorting
    const [sorting, setSorting] = useState(0)

    const handleSearch = () => {
        algolia.search(keyword).then((result)=>{
            setResults(result.hits);
        })
    }

    const handleFiltering = () => {
        //運用array, filter, join將判斷結果轉換為algolia filters格式
        const array = [tool, difficulty, time]
        const filterArray = array.filter((item)=>item != '')
        const item = filterArray.join(' AND ')
        console.log(item)
        algolia.search(keyword, {
            filters:item
        }).then((result)=>{
            setResults(result.hits)
        })
    }
    const handleSorting = (replica) => {
        const indexName = replica;
        client.initIndex(indexName).search(keyword).then((result)=>{
            setResults(result.hits);
        })
    }
    useEffect(()=>{
        handleSearch();
    }, [])

    useEffect(()=>{
        handleFiltering();
    }, [tool, difficulty, time])


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


    return (
    <>
        <Header/>
        <section className="section-home">
            <div className="section-home-info">
                <h3>給想健康飲食的你</h3>
                <p className="section-p">透過資訊整合，尋找輕鬆上手的烹煮步驟</p>
                <div className="searchBar">
                    <input className="input-search" value={keyword} onChange={(e)=>setKeyword(e.target.value)}></input>
                    <button className="btn-search" onClick={handleSearch}><img className="search-icon" src={search}/></button>
                </div>
            </div>
        </section>
        <section className="recipes-filter">
            <div className="wrap">
                <div className="recipes-filter-cont">
                    <div className="recipes-filter-list-cont">
                        <div className="recipes-filter-title">烹煮工具: </div>
                        <div className="recipes-filter-list">
                            <label className={tool == "" ? "filter-item active" :"filter-item"}>
                                <input type="radio" name="tool" value="" onChange={()=>handleFiltering(setTool(""))}/>全部
                            </label>
                            <label className={tool == "tool:0" ? "filter-item active" :"filter-item"}>
                                <input type="radio" name="tool" value="0" onChange={(e)=>{handleFiltering(setTool(`tool:${e.target.value}`))}}/>烤箱
                            </label>
                            <label className={tool == "tool:1" ? "filter-item active" :"filter-item"}>
                                <input type="radio" name="tool" value="1" onChange={(e)=>{handleFiltering(setTool(`tool:${e.target.value}`))}}/>電鍋
                            </label>
                            <label className={tool == "tool:2" ? "filter-item active" :"filter-item"}>
                                <input type="radio" name="tool" value="2" onChange={(e)=>{handleFiltering(setTool(`tool:${e.target.value}`))}}/>氣炸鍋
                            </label>
                            <label className={tool == "tool:3" ? "filter-item active" :"filter-item"}>
                                <input type="radio" name="tool" value="3" onChange={(e)=>{handleFiltering(setTool(`tool:${e.target.value}`))}}/>平底鍋
                            </label>
                            <label className={tool == "tool:4" ? "filter-item active" :"filter-item"}>
                                <input type="radio" name="tool" value="4" onChange={(e)=>{handleFiltering(setTool(`tool:${e.target.value}`))}}/>湯鍋
                            </label>
                            <label className={tool == "tool:5" ? "filter-item active" :"filter-item"}>
                                <input type="radio" name="tool" value="5" onChange={(e)=>{handleFiltering(setTool(`tool:${e.target.value}`))}}/>其他
                            </label>
                        </div>
                    </div>
                    <div className="recipes-filter-list-cont">
                        <div className="recipes-filter-title">烹煮時間: </div>
                        <div className="recipes-filter-list">
                            <label className={ time == "" ? "filter-item active" : "filter-item" }>
                                <input type="radio" name="time" value="" onChange={()=>handleFiltering(setTime(""))}/>全部
                            </label>
                            <label className={ time == "totalTimeValue:0" ? "filter-item active" : "filter-item" }>
                                <input type="radio" name="time" value="0" onChange={()=>handleFiltering(setTime("totalTimeValue:0"))}/>30 分鐘以下
                            </label>
                            <label className={ time == "totalTimeValue:1" ? "filter-item active" : "filter-item" }>
                                <input type="radio" name="time" value="1" onChange={()=>handleFiltering(setTime("totalTimeValue:1"))}/>0.5 - 1 小時
                            </label>
                            <label className={ time == "totalTimeValue:2" ? "filter-item active" : "filter-item" }>
                                <input type="radio" name="time" value="2" onChange={()=>handleFiltering(setTime("totalTimeValue:2"))}/>1 - 2 小時
                            </label>
                            <label className={ time == "totalTimeValue:3" ? "filter-item active" : "filter-item" }>
                                <input type="radio" name="time" value="3" onChange={(e)=>handleFiltering(setTime("totalTimeValue:3"))}/>2 小時以上
                            </label>
                        </div>
                    </div>
                    <div className="recipes-filter-list-cont">
                        <div className="recipes-filter-title">食譜難度: </div>
                        <div className="recipes-filter-list">
                            <label className={ difficulty == "" ? "filter-item active" : "filter-item"}>
                                <input type="radio" name="difficulty" value="" onChange={()=>handleFiltering(setDifficulty(""))}/>全部
                            </label>
                            <label className={ difficulty == "difficulty:0" ? "filter-item active" : "filter-item"}>
                                <input type="radio" name="difficulty" value="0" onChange={(e)=>{handleFiltering(setDifficulty(`difficulty:${e.target.value}`))}}/>簡單
                            </label>
                            <label className={ difficulty == "difficulty:1" ? "filter-item active" : "filter-item"}>
                                <input type="radio" name="difficulty" value="1" onChange={(e)=>{handleFiltering(setDifficulty(`difficulty:${e.target.value}`))}}/>中等
                            </label>
                            <label className={ difficulty == "difficulty:2" ? "filter-item active" : "filter-item"}>
                                <input type="radio" name="difficulty" value="2" onChange={(e)=>{handleFiltering(setDifficulty(`difficulty:${e.target.value}`))}}/>特級廚師
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section className="recipes-sort">
            <div className="wrap">
                <div className="recipes-sort-cont">
                    <div className="sort-list">
                        <label className= {sorting == 0 ? "sort-item active" : "sort-item"}>
                            <input type="radio" name="sort" onChange={()=>{handleSorting("totalTimeValue_asc"), setSorting(0)}}/>
                            <i>烹煮時間</i>
                        </label>
                        <label className={sorting == 1 ? "sort-item active" : "sort-item"}>
                            <input type="radio" name="sort" onChange={()=>{handleSorting("difficulty_asc"), setSorting(1)}}/>
                            <i>食譜難度</i>
                        </label>
                        <label className={sorting == 2 ? "sort-item active" : "sort-item"}>
                            <input type="radio" name="sort" onChange={()=>{handleSorting("hotCount_desc"), setSorting(2)}}/>
                            <i>熱門程度</i>
                        </label>
                        <label className={sorting == 3 ? "sort-item active" : "sort-item"}>
                            <input type="radio" name="sort" onChange={()=>{handleSorting("likedBy_desc"), setSorting(3)}}/>
                            <i>喜愛排名</i>
                        </label>
                    </div>
                </div>
            </div>

        </section>
        <article className="article-article">
                    <div className="article-cont">
                        <div className="filter-title">篩選結果有 {results.length} 個食譜</div>
                        <div className="wrap-dishCard">
                        {
                            results.map((item) => {
                                console.log("render")
                                const isCollected = item.collectedBy?.includes(uid);
                                const isLiked = item.likedBy?.includes(uid);
                                return (
                                    <Link to={`/recipe/${item.objectID}`} key={item.objectID} className="dishCard" onClick={()=>handleHotClink("hotCount", item.objectID, item.hotCount)}>
                                        <figure>
                                            {/* <img className="dishCard-img" src={item.imageUrl}/> */}
                                            <svg viewBox="0 0 32 32" className={isCollected ? "dishCard-bookmark collected" : "dishCard-bookmark"} onClick={(e)=>handleToggle(isCollected, "collectedBy", e, item.objectID)}><path d="M23.8,2H8.2C6.5,2,5.1,3.4,5.1,5.1v24.6c0,0.2,0.2,0.3,0.4,0.3l10.4-4.5c0.1,0,0.2,0,0.2,0  L26.6,30c0.2,0.1,0.4-0.1,0.4-0.3V5.1C26.9,3.4,25.5,2,23.8,2z"/></svg>
                                        </figure>
                                        <figcaption>
                                            <div>{item.dishName}</div>
                                            <svg viewBox="0 0 24 24" className={isLiked ? "dishCard-heart liked" : "dishCard-heart"} onClick={(e)=>handleToggle(isLiked, "likedBy", e, item.objectID)}><path d="M22.2,4.1c2.7,2.7,2.4,6.9-0.4,9.5l-8.4,7.9c-0.8,0.7-2.1,0.7-2.9,0l-8.4-7.9c-2.7-2.6-3-6.8-0.4-9.5   C4.6,1.4,9.2,1.3,12,4C14.8,1.3,19.4,1.4,22.2,4.1z"/></svg>
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
        <Footer/>
        </>
    )
}

export default Recipes;