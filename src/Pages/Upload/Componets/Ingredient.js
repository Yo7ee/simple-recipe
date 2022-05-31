import React, { useContext, useState } from "react";
import IngredientsFieldContext from "../Context/IngredientsField";
import cross from "../../../icon/cross.png"

function Ingredient (){
    const {inputFields ,setInputFields} = useContext(IngredientsFieldContext);
    const [error, setError] = useState('')
    const handleChangeInput = (index, e) => {
        const values = [...inputFields];
        values[index][e.target.name] = e.target.value;
        
        if(values[index][e.target.name]){
            setInputFields(values);
            setError('');
        }else{
            setError("食材欄位不可空白");
        }
        
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

    return (
        <div className="dish-cont">
            <label className="dish-label">
                食材
                <span className="upload-error-message">{error}</span>
            </label>
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
    )
}

export default Ingredient;