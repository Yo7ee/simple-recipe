import React, { useContext, useState } from "react";
import DirectionField from "../Context/DirectionField";
import cross from "../../../icon/cross.png";

function Direction (){
    const {stepFields, setStepFields} = useContext(DirectionField);
    const [error, setError] = useState('');

    const handleChangeTextarea = (index, e) => {
        const values = [...stepFields];
        values[index][e.target.name] = e.target.value;
        if(values[index][e.target.name]){
            setStepFields(values);
            setError('');
        }else{
            setError("步驟欄位不可空白");
        }
    }
    const handleAddStep = (e) => {
        e.preventDefault();
        setStepFields([...stepFields, {stepContent:''}]);
    }
    const handleDelStep = (index) => {
        const values = [...stepFields];
        values.splice(index, 1);
        setStepFields(values);
    }

    return (
        <div className="dish-cont-grid">
            <label className="dish-label">
                烹煮步驟
                <span className="upload-error-message">{error}</span>
            </label>
            <p className="upload-describe">請描述烹煮方法，包含溫度及烹煮時間</p>
            <div className="step-content-cont">
                {stepFields.map((textareaField, index) => (
                    <div key={index}>
                        <div className="step">步驟{index+1}</div>
                        <div className="step-content">
                            <textarea className="input dish-direction" name="stepContent" value={textareaField.stepContent} placeholder="放入160度C預熱的烤箱，烤10分鐘後，即完成料理" onChange={(e) => handleChangeTextarea(index, e)}/>
                            <img className="cross" onClick={() => handleDelStep(index)} src={cross}/>
                        </div>
                    </div>
                ))}
            </div>
            <div className="btn-cont">
                <button className="btn-add" onClick={(e) => handleAddStep(e)}>新增步驟</button>
            </div>
        </div>
    )
}

export default Direction;