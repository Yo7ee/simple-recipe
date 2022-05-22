import React, {createContext, useState} from "react";
import "./Home/homePage.css";
import search from "./icon/search.png";
import Header from "./Home/Header";
import Article from "./Home/Article";
import Footer from "./Home/Footer";
import Loading from "./Loading";
import Loadingcontext from "./context";


function HomePage(){
    const [isLoading, setIsLoading] = useState(false)
    console.log(isLoading)
    return (
        // <Loadingcontext.Provider value={{isLoading, setIsLoading}}>
        // {isLoading ? (<Loading/> 
        // )   :   (
        <>
        <Header/>
        <section className="section-home">
            <div className="section-home-info">
                <h3>給想健康飲食的你</h3>
                <p className="section-p">透過資訊整合，尋找輕鬆上手的烹煮步驟</p>
                <div className="searchBar">
                    <input className="input-search"></input>
                    <button className="btn-search"><img className="search-icon" src={search}/></button>
                </div>
            </div>
        </section>
        <Article/>
        <Footer/>
        </>
        // )}
        // </Loadingcontext.Provider>
    )
}

export default HomePage;