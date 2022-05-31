import React, {useEffect, useState} from "react";
import Header from "../Home/Header";
import Ingredient from "./Componets/Ingredient";
import Direction from "./Componets/Direction";
import "../Upload/UploadRecipe.css";
import RecipeService from "../../utils/database";
import {Timestamp} from "firebase/firestore";
import auth from "../../utils/firebase";
import { useNavigate } from "react-router-dom";
import Compressor from "compressorjs";
import IngredientsFieldContext from "./Context/IngredientsField";
import DirectionField from "./Context/DirectionField";

function UploadRecipe(){
    const [popup, setPopup] = useState(false);
    const [dishName, setDishName] = useState('');
    const [dishError, setDishError] = useState('')
    const handleDishName = (e) => {
        if(e){
            setDishName(e);
            setDishError('');
        }else{
            setDishError("食譜名稱不可空白")
        }
    }
    const [fileSrc, setFileSrc] = useState('');
    const handleUploadFile = (e) => {
        e.preventDefault();
        const file = e.target.files.item(0);
        new Compressor (file, {
            quality:0.5,
            success:(compressResult)=>{
                console.log(compressResult)
                setFileSrc(compressResult)
            }
        })
    };

    const [preTime, setPreTime] = useState('');
    const [preTimeError, setPreTimeError] = useState('');
    const regex = /^\d+$/
    const handlePreTime = (e) => {
        console.log(e)
        if(regex.test(e)){
            setPreTime(e);
            setPreTimeError('');
        }else{
            setPreTimeError("時間不可空白且為數字格式")
        }
    }
    const [cookTime, setCookTime] = useState('');
    const [cookTimeError, setCookTimeError] = useState('')
    const handleCookTime = (e) => {
        console.log(e)
        if(regex.test(e)){
            setCookTime(e);
            setCookTimeError('');
        }else{
            setCookTimeError("時間不可空白且為數字格式")
        }
    }

    const totalTime = parseInt(preTime)+parseInt(cookTime);
        let time = 0;
        if ( totalTime < 30){
            time = 0;
        }else if( totalTime < 60){
            time = 1;
        }else if( totalTime < 120){
            time= 2;
        }else{
            time= 3;
        }

    const [difficulty, setDifficulty] =useState("0");
    const handleDifficulty = (e) =>{
        setDifficulty(e);
    }
    const [tool, setTool] =useState("0");
    console.log(tool.length>=1)
    const toolArray = ["電鍋", "烤箱", "氣炸鍋", "平底鍋", "湯鍋", "其他"]
    // const toolObj = {
    //     0: "電鍋", 
    //     1: "烤箱",
    //     2: "氣炸鍋",
    //     3: "平底鍋",
    //     4: "湯鍋",
    //     5: "其他"
    // }
    const handleTool = (e) => {
        setTool(e)
    }

    //食材
    const [inputFields, setInputFields] = useState([{ingre:''},]);

    //步驟
    const [stepFields, setStepFields] = useState([{stepContent:''}]);

    const navigate = useNavigate();
    const handleOnSubmit = async (e) => {
        e.preventDefault();
        const checkArray = [dishName.length, fileSrc.length, preTime.length, cookTime.length, difficulty.length, tool.length, inputFields.length, stepFields.length]
        if(checkArray.every(item => item >= 1)){
            try{
                const imgInfo = await RecipeService.getImgInfo(fileSrc);
                console.log(imgInfo[0])
                const item = {
                    dishName,
                    preTime,
                    cookTime,
                    "totalTimeValue": time,
                    difficulty,
                    tool,
                    "toolName": toolObj[tool],
                    "ingredients":inputFields,
                    "direction":stepFields,
                    createdAt:Timestamp.now(),
                    author:{
                        displayName:auth.currentUser.displayName,
                        uid:auth.currentUser.uid,
                        email:auth.currentUser.email,
                    },
                    imageUrl:imgInfo[0],
                    "hotCount":0,
                    "collectedBy":["0"],
                    "likedBy":["0"]
                }
                await RecipeService.setDoc(item, imgInfo[1]);
                navigate("/")
            } catch(e){
                console.log("Error adding Item " + e)
            }
        }else{
            console.log("error")
            setPopup(true);
        }
    }
    const handleErrorSubmit = () => {
        setPopup(false)
    }

    return (
        <>
        <Header/>
        <div className="upload-cont">
            <h1 className="upload-title">新增食譜</h1>
            <form className="dish-info-cont" onSubmit={handleOnSubmit}>
                <div className="dish-cont">
                    <label className="dish-label">
                        食譜名稱
                        <span className="upload-error-message">{dishError}</span>
                    </label>
                    <div>
                        <input className="input dish-name" type="text" onChange={(e)=>handleDishName(e.target.value)}/>
                    </div>
                </div>
                <div className="dish-cont">
                    <label className="dish-label">食譜照片</label>
                    {fileSrc ? (
                    <div className="upload-img-cont">
                        <img className="upload-img" src={URL.createObjectURL(fileSrc)}/>
                    </div>
                    ) : (
                    <div className="upload-img-cont">
                        <label className="label-upload-img">點此上傳照片</label>
                        <input className="input-dish-pic" type="file" accept="image/*, .heic" onChange={handleUploadFile}/>
                    </div>
                    )}
                </div>
                <div className="dish-cont">
                    <label className="dish-label">
                        準備時間
                        <span className="upload-error-message">{preTimeError}</span>
                    </label>
                    <div className="time">
                        <input className="input dish-pre-time" type="text" placeholder="0" onChange={(e)=>handlePreTime(e.target.value)}/>
                        <p className="mins">分鐘</p>
                    </div>
                </div>
                <div className="dish-cont">
                    <label className="dish-label">
                        烹煮時間
                        <span className="upload-error-message">{cookTimeError}</span>
                    </label>
                    <div className="time">
                        <input className="input dish-cook-time" type="text" placeholder="0" onChange={(e)=>handleCookTime(e.target.value)}/>
                        <p className="mins">分鐘</p>
                    </div>
                </div>
                <div className="dish-cont">
                    <label className="dish-label">烹煮難度</label>
                    <div className="difficulty">
                        <label className={ difficulty === "0" ? "cook-tool-item checked" : "cook-tool-item"}>
                            <input type="radio" name="difficulty" value="0" onChange={(e)=>setDifficulty(e.target.value)}/>簡單
                        </label>
                        <label className={ difficulty === "1" ? "cook-tool-item checked" : "cook-tool-item"}>
                            <input type="radio" name="difficulty" value="1" onChange={(e)=>setDifficulty(e.target.value)}/>中等
                        </label>
                        <label className={ difficulty === "2" ? "cook-tool-item checked" : "cook-tool-item"}>
                            <input type="radio" name="difficulty" value="2" onChange={(e)=>setDifficulty(e.target.value)}/>特級廚師
                        </label>
                    </div>
                </div>
                <div className="dish-cont">
                    <label className="dish-label">烹煮用具</label>
                    <div className="tool">
                    {/* map出來的變數會變成非變數，無法藉由setTool變更className */}
                        {
                            toolArray.map((item, index) => (
                                <label key={index} className={ tool === index ? "cook-tool-item checked" : "cook-tool-item"}>
                                    <input type="radio" name="tool" value={index} onChange={(e)=>handleTool(e.target.value)}/>{item}
                                </label>
                            ))
                        }
                    </div>
                    {/* <label className={ tool === "0" ? "cook-tool-item checked" : "cook-tool-item"}>
                        <input type="radio" name="tool" value="0" onChange={(e)=>setTool(e.target.value)}/>電鍋
                    </label>
                    <label className={ tool === "1" ? "cook-tool-item checked" : "cook-tool-item"}>
                        <input type="radio" name="tool" value="1" onChange={(e)=>setTool(e.target.value)}/>烤箱
                    </label>
                    <label className={ tool === "2" ? "cook-tool-item checked" : "cook-tool-item"}>
                        <input type="radio" name="tool" value="2" onChange={(e)=>setTool(e.target.value)}/>氣炸鍋
                    </label>
                    <label className={ tool === "3" ? "cook-tool-item checked" : "cook-tool-item"}>
                        <input type="radio" name="tool" value="3" onChange={(e)=>setTool(e.target.value)}/>平底鍋
                    </label>
                    <label className={ tool === "4" ? "cook-tool-item checked" : "cook-tool-item"}>
                        <input type="radio" name="tool" value="4" onChange={(e)=>setTool(e.target.value)}/>湯鍋
                    </label>
                    <label className={ tool === "5" ? "cook-tool-item checked" : "cook-tool-item"}>
                        <input type="radio" name="tool" value="5" onChange={(e)=>setTool(e.target.value)}/>其他
                    </label> */}
                </div>
                <IngredientsFieldContext.Provider value={{inputFields, setInputFields}}>
                    <Ingredient/>
                </IngredientsFieldContext.Provider>
                <DirectionField.Provider value={{stepFields, setStepFields}}>
                    <Direction/>
                </DirectionField.Provider>
                <div className="btn-submit-cont">
                    <button className="btn-submit">送出食譜</button>
                </div>
            </form>
        </div>
        {popup ? (
        <div className="popup">
            <div className="popup-inner">
                <p className="popup-title">資料填寫尚未完成或格式錯誤</p>
                <button onClick={handleErrorSubmit}>確認</button>
            </div>
        </div>
        )   :   (
            null
        )}
        </>
    )
}

export default UploadRecipe;