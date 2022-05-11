import React, {useState, useRef} from "react";
import Footer from "../Home/Footer";
import Header from "../Home/Header";
import "./UploadRecipe.css";
import cross from "../icon/cross.png";

function UploadRecipe(){
    const [dishName, setDishName] = useState('');
    const [fileSrc, setFileSrc] = useState('');
    const handleUploadFile = (e) => {
        const file = e.target.files.item(0)
        console.log(file)
        console.log(e.target.files)
        const fileReader = new FileReader();//FileReader為瀏覽器內建類別，用途為讀取瀏覽器選中的檔案
        console.log(fileReader)
        fileReader.onload = function(){
            setFileSrc(fileReader.result);
        };
        fileReader.readAsDataURL(file) //讀取完檔案後，變成URL
    };
    const [preTime, setPreTime] = useState('');
    const [cookTime, setCookTime] = useState('');

    const [inputFields, setInputFields] = useState([{ingre:''},])

    const handleChangeInput = (index, e) => {
        const values = [...inputFields];
        values[index][e.target.name] = e.target.value;
        setInputFields(values);
    }

    const handleAddIngre = () => {
        setInputFields([...inputFields, {}])
    }
    const handleDelIngre = (index) => {
        const values = [...inputFields];
        console.log(index, values)
        values.splice(index, 1);
        console.log(values)
        setInputFields(values);
    }
    return (
        <>
        <Header/>
        <div className="upload-cont">
            <h1 className="upload-title">新增食譜</h1>
            <div className="dish-info-cont">
                <div className="dish-cont-flex">
                    <div className="dish-name">食譜名稱</div>
                    <input className="input dish-name-" type="text" onChange={(e)=>setDishName(e.target.value)}/>
                </div>
                <div className="dish-cont-flex">
                    <div className="dish-pic">食譜照片</div>
                    {fileSrc ? (
                    <div className="upload-img-cont">
                        <img className="upload-img" src={fileSrc}/>
                    </div>
                    ) : (<label className="upload-img-cont">
                    <input className="input-dish-pic" type="file" accept="image/*" onChange={handleUploadFile}/>
                    <button className="btn-upload-img">點此上傳照片</button>
                    </label>
                    )}
                </div>
                <div className="dish-cont-flex">
                    <div className="dish-pre-time">準備時間</div>
                    <input className="input dish-pre-time" type="number" onChange={(e)=>setPreTime(e.target.value)}/>
                </div>
                <div className="dish-cont-flex">
                    <div className="dish-cook-time">烹煮時間</div>
                    <input className="input dish-cook-time" type="number" onChange={(e)=>setCookTime(e.target.value)}/>
                </div>
                <div className="dish-cont-grid">
                    <div className="dish-ingredient">食材</div>
                    <p className="upload-describe">請填入食材及數量單位</p>
                    <div className="ingre-content-cont">
                        { inputFields.map((InputField, index) => (
                            <div key={index} id={index} className="ingre-content">
                                <input className="input dish-ingredient" name="ingre" value={InputField.ingre} onChange={(e) => handleChangeInput(index, e)} type="text"/>
                                <img className="cross" onClick={() => handleDelIngre(index)} src={cross}/>
                            </div>
                        ))}
                    </div>
                    <div className="btn-cont">
                        <button className="btn-add ingre" onClick={handleAddIngre}>新增食材</button>
                    </div>
                </div>
                <div className="dish-cont-grid">
                    <div className="dish-direction">烹煮步驟</div>
                    <p className="upload-describe">請描述烹煮方法，包含溫度及烹煮時間</p>
                    <div className="step">步驟1</div>
                    <div className="step-content">
                        <textarea className="input dish-direction"/>
                        <img className="cross" src={cross}/>
                    </div>
                    <div className="step">步驟2</div>
                    <div className="step-content">
                        <textarea className="input dish-direction"/>
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