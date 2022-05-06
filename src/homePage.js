import React from "react";
import search from "./icon/search.png";
import Header from "./Home/Header";
import Article from "./Home/Article";
import Footer from "./Home/Footer";


function HomePage(){
    return (
        <>
        <Header/>
        <section className="section-home">
            <div className="section-home-info">
                <h3>給想健康飲食的你</h3>
                <p className="section-p">透過資訊整合，尋找輕鬆上手的烹煮步驟</p>
                <div className="searchBar">
                    <input></input>
                    <button className="btn-search"><img className="search-icon" src={search}/></button>
                </div>
            </div>
        </section>
        <Article/>
        <Footer/>
        </>
    )
}

export default HomePage;