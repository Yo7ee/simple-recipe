import React from "react";
import Footer from "../Home/Footer";
import Header from "../Home/Header";
import "./UploadRecipe.css";
import cross from "../icon/cross.png";

function UploadRecipe(){
    return (
        <>
        <Header/>
        <div className="upload-cont">
            <h1 className="upload-title">新增食譜</h1>
            <div className="dish-info-cont">
                <div className="dish-cont-flex">
                    <div className="dish-name">食譜名稱</div>
                    <input className="input dish-name-" type="text"/>
                </div>
                <div className="dish-cont-flex">
                    <div className="dish-pic">食譜照片</div>
                    <input className="input dish-pic" type="image"/>
                </div>
                <div className="dish-cont-flex">
                    <div className="dish-pre-time">準備時間</div>
                    <input className="input dish-pre-time" type="number"/>
                </div>
                <div className="dish-cont-flex">
                    <div className="dish-cook-time">烹煮時間</div>
                    <input className="input dish-cook-time" type="number"/>
                </div>
                <div className="dish-cont-grid">
                    <div className="dish-ingredient">食材</div>
                    <p className="upload-describe">請填入食材及數量單位</p>
                    <div className="ingre-content">
                        <input className="input dish-ingredient" type="text"/>
                        <img className="cross" src={cross}/>
                    </div>
                    
                    <div className="btn-cont">
                        <button className="btn-add ingre">新增食材</button>
                    </div>
                </div>
                <div className="dish-cont-grid">
                    <div className="dish-direction">烹煮步驟</div>
                    <p className="upload-describe">請描述烹煮方法，包含溫度及烹煮時間</p>
                    <div className="step">步驟1</div>
                    <div className="step-content">
                        <input className="input dish-direction" type="text"/>
                        <img className="cross" src={cross}/>
                    </div>
                    <div className="step">步驟2</div>
                    <div className="step-content">
                        <input className="input dish-direction" type="text"/>
                        <img className="cross" src={cross}/>
                    </div>
                    <div className="btn-cont">
                        <button className="btn-add step">新增步驟</button>
                    </div>
                </div>
                <div className="btn-submit-cont">
                    <button className="btn-submit">送出食譜</button>
                </div>
            </div>
        </div>
        <Footer/>
        </>
    )
}

export default UploadRecipe;