import React, {useState, useContext, useEffect} from "react";
import "./Pages/Home/homePage.css";
import search from "./icon/search.png";
import Header from "./Pages/Home/Header";
import Article from "./Pages/Home/Article";
import Footer from "./Pages/Home/Footer";
import KeywordContext from "./Context/Keyword";
import { useNavigate } from "react-router";


function HomePage(){
    const [isLoading, setIsLoading] = useState(false)
    console.log(isLoading)
    const navigate = useNavigate();
    
    const {keyword, setKeyword} = useContext(KeywordContext);
    const handleSearch = () => {
        setKeyword(keyword);
        navigate(`/recipes?search=${keyword}`);
        }
    useEffect(()=>{
        setKeyword('')
    }, [])
    

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
                    <input className="input-search" value={keyword} onChange={(e)=>setKeyword(e.target.value)}></input>
                    <button className="btn-search" onClick={handleSearch}><img className="search-icon" src={search}/></button>
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