import React, {useState} from "react";
import Footer from "../Home/Footer";
import Header from "../Home/Header";
import "../Upload/UploadRecipe.css";
import cross from "../../icon/cross.png";
import RecipeService from "../../utils/database";
import {Timestamp} from "firebase/firestore";
import auth from "../../utils/firebase";
import { useNavigate } from "react-router-dom";
import Compressor from "compressorjs";

function UploadRecipe(){
    const [dishName, setDishName] = useState('');
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
    const [cookTime, setCookTime] = useState('');

    //食材
    const [inputFields, setInputFields] = useState([{ingre:''},]);

    const handleChangeInput = (index, e) => {
        const values = [...inputFields];
        values[index][e.target.name] = e.target.value;
        setInputFields(values);
    }
    const handleAddIngre = (e) => {
        e.preventDefault();
        setInputFields([...inputFields, {ingre:''}])
    }
    const handleDelIngre = (index) => {
        const values = [...inputFields];
        console.log(index, values)
        values.splice(index, 1);
        console.log(values)
        setInputFields(values);
    }

    //步驟
    const [textareaFields, setTextareaFields] = useState([{stepContent:''}]);

    const handleChangeTextarea = (index, e) => {
        const values = [...textareaFields];
        values[index][e.target.name] = e.target.value;
        setTextareaFields(values);
    }
    const handleAddStep = (e) => {
        e.preventDefault();
        setTextareaFields([...textareaFields, {stepContent:''}]);
    }
    const handleDelStep = (index) => {
        const values = [...textareaFields];
        values.splice(index, 1);
        setTextareaFields(values);
    }
    const navigate = useNavigate();
    const handleOnSubmit = async (e) => {
        e.preventDefault();
        try{
            const imgInfo = await RecipeService.getImgInfo(fileSrc);
            console.log(imgInfo[0])
            const item = {
                dishName,
                preTime,
                cookTime,
                "ingredients":inputFields,
                "direction":textareaFields,
                createdAt:Timestamp.now(),
                author:{
                    displayName:auth.currentUser.displayName,
                    uid:auth.currentUser.uid,
                    email:auth.currentUser.email,
                },
                imageUrl:imgInfo[0],
                "hotCount":0,
            }
            await RecipeService.setDoc(item, imgInfo[1]);
            navigate("/");
        } catch(e){
            console.log("Error adding Item " + e)
        }
    }

    return (
        <>
        <Header/>
        <div className="upload-cont">
            <h1 className="upload-title">新增食譜</h1>
            <form className="dish-info-cont" onSubmit={handleOnSubmit}>
                <div className="dish-cont-flex">
                    <div className="dish-name">食譜名稱</div>
                    <input className="input dish-name" type="text" onChange={(e)=>setDishName(e.target.value)}/>
                </div>
                <div className="dish-cont-flex">
                    <div className="dish-pic">食譜照片</div>
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
                <div className="dish-cont-flex">
                    <div className="dish-pre-time">準備時間</div>
                    <input className="input dish-pre-time" type="number" onChange={(e)=>setPreTime(e.target.value)}/>
                    <div>分鐘</div>
                </div>
                <div className="dish-cont-flex">
                    <div className="dish-cook-time">烹煮時間</div>
                    <input className="input dish-cook-time" type="number" onChange={(e)=>setCookTime(e.target.value)}/>
                    <div>分鐘</div>
                </div>
                <div className="dish-cont-grid">
                    <div className="dish-ingredient">食材</div>
                    <p className="upload-describe">請填入食材及數量單位</p>
                    <div className="ingre-content-cont">
                        { inputFields.map((InputField, index) => (
                            <div key={index} id={index} className="ingre-content">
                                <input className="input dish-ingredient" name="ingre" value={InputField.ingre} onChange={(e) => handleChangeInput(index, e)} type="text" placeholder="1公克的鹽"/>
                                <img className="cross" onClick={() => handleDelIngre(index)} src={cross}/>
                            </div>
                        ))}
                    </div>
                    <div className="btn-cont">
                        <button className="btn-add ingre" onClick={(e) => handleAddIngre(e)}>新增食材</button>
                    </div>
                </div>
                <div className="dish-cont-grid">
                    <div className="dish-direction">烹煮步驟</div>
                    <p className="upload-describe">請描述烹煮方法，包含溫度及烹煮時間</p>
                    <div className="step-content-cont">
                        {textareaFields.map((textareaField, index) => (
                            <div key={index}>
                                <div className="step">步驟{index+1}</div>
                                <div className="step-content">
                                    <textarea className="input dish-direction" name="stepContent" value={textareaField.stepContent} onChange={(e) => handleChangeTextarea(index, e)}/>
                                    <img className="cross" onClick={() => handleDelStep(index)} src={cross}/>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="btn-cont">
                        <button className="btn-add" onClick={(e) => handleAddStep(e)}>新增步驟</button>
                    </div>
                </div>
                <div className="btn-submit-cont">
                    <button className="btn-submit">送出食譜</button>
                </div>
            </form>
        </div>
        <Footer/>
        </>
    )
}

export default UploadRecipe;