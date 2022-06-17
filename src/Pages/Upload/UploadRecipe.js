import React, { useContext, useEffect, useState } from "react";
import Header from "../Home/Header";
import Ingredient from "./Componets/Ingredient";
import Direction from "./Componets/Direction";
import "../Upload/UploadRecipe.css";
import RecipeService from "../../utils/database";
import { Timestamp } from "firebase/firestore";
import auth from "../../utils/firebase";
import { useNavigate } from "react-router-dom";
import Compressor from "compressorjs";
import IngredientsFieldContext from "./Context/IngredientsField";
import DirectionField from "./Context/DirectionField";
import UserContext from "../../Context/User";
import { UploadLoading } from "../Loading/Loading";

function UploadRecipe() {
	const [popup, setPopup] = useState(false);
	const [successPopup, setSuccessPopup] = useState(false);
	const [docRef, setDocRef] = useState("");
	const [dishName, setDishName] = useState("");
	const [dishError, setDishError] = useState("");
	const { user } = useContext(UserContext);
	const navigate = useNavigate();
	const [uploadLoading, setUploadLoading] = useState(false);

	const handleDishName = (e) => {
		if (e) {
			setDishName(e);
			setDishError("");
		} else {
			setDishError("食譜名稱不可空白");
		}
	};
	const [fileSrc, setFileSrc] = useState("");
	const handleUploadFile = (e) => {
		e.preventDefault();
		const file = e.target.files.item(0);
		if (file.size > 1000000) {
			setPopup(true);
		} else {
			new Compressor(file, {
				quality: 0.6,
				success: (compressResult) => {
					setFileSrc(compressResult);
				},
			});
		}
	};

	const [preTime, setPreTime] = useState("");
	const [preTimeError, setPreTimeError] = useState("");
	const regex = /^\d+$/;
	const handlePreTime = (e) => {
		if (regex.test(e)) {
			setPreTime(e);
			setPreTimeError("");
		} else {
			setPreTimeError("時間不可空白且為數字格式");
		}
	};
	const [cookTime, setCookTime] = useState("");
	const [cookTimeError, setCookTimeError] = useState("");
	const handleCookTime = (e) => {
		if (regex.test(e)) {
			setCookTime(e);
			setCookTimeError("");
		} else {
			setCookTimeError("時間不可空白且為數字格式");
		}
	};

	const [difficulty, setDifficulty] = useState("0");
	const handleDifficulty = (e) => {
		setDifficulty(e);
	};
	const [tool, setTool] = useState("0");

	const toolObj = {
		0: "電鍋",
		1: "烤箱",
		2: "氣炸鍋",
		3: "平底鍋",
		4: "湯鍋",
		5: "其他",
	};
	const difficultyObj = {
		0: "簡單",
		1: "中等",
		2: "特級廚師",
	};

	//食材
	const [inputFields, setInputFields] = useState([{ ingre: "" }]);

	//步驟
	const [stepFields, setStepFields] = useState([{ stepContent: "" }]);

	// const navigate = useNavigate();
	const handleOnSubmit = async (e) => {
		setUploadLoading(true);
		e.preventDefault();
		const checkArray = [
			dishName.length,
			fileSrc.size,
			preTime.length,
			cookTime.length,
			difficulty.length,
			tool.length,
			inputFields.length,
			stepFields.length,
		];
		const totalTime = parseInt(preTime) + parseInt(cookTime);
		let time = 0;
		if (totalTime < 30) {
			time = 0;
		} else if (totalTime < 60) {
			time = 1;
		} else if (totalTime < 120) {
			time = 2;
		} else {
			time = 3;
		}
		if (checkArray.every((item) => item >= 1)) {
			try {
				const imgInfo = await RecipeService.getImgInfo(fileSrc);
				const item = {
					dishName,
					preTime,
					cookTime,
					totalTimeValue: time,
					difficulty,
					difficultyName: difficultyObj[difficulty],
					tool,
					toolName: toolObj[tool],
					ingredients: inputFields,
					direction: stepFields,
					createdAt: Timestamp.now(),
					author: {
						displayName: auth.currentUser.displayName,
						uid: auth.currentUser.uid,
						email: auth.currentUser.email,
					},
					imageUrl: imgInfo[0],
					hotCount: 0,
					collectedBy: ["0"],
					likedBy: ["0"],
					likedValue: 0,
				};
				await RecipeService.setDoc(item, imgInfo[1]);
				setDocRef(imgInfo[1].id); //imgInfo[1]=docRef
				setUploadLoading(false);
				setSuccessPopup(true);
			} catch (e) {
				console.log("Error adding Item " + e);
			}
		} else {
			setUploadLoading(false);
			setPopup(true);
		}
	};
	const handleErrorSubmit = () => {
		setPopup(false);
	};
	const handleSuccesSubmit = () => {
		navigate(`/recipe/${docRef}`);
	};

	return (
		<>
			<Header />
			<div className='upload-cont'>
				<h1 className='upload-title'>新增食譜</h1>
				<form className='dish-info-cont' onSubmit={handleOnSubmit}>
					<div className='dish-cont'>
						<label className='dish-label'>
							食譜名稱
							<span className='upload-error-message'>{dishError}</span>
						</label>
						<div>
							<input
								className='input-dish-name'
								type='text'
								onChange={(e) => handleDishName(e.target.value)}
								placeholder='請輸入你的食譜名稱'
							/>
						</div>
					</div>
					<div className='dish-cont'>
						<label className='dish-label'>食譜照片</label>
						<div className='upload-img-info-cont'>
							<div className='upload-img-cont'>
								{fileSrc ? (
									<img
										className='upload-img'
										src={URL.createObjectURL(fileSrc)}
									/>
								) : (
									<label className='label-upload-img'>點此上傳照片</label>
								)}
								<input
									className='input-dish-pic'
									type='file'
									accept='image/*'
									onChange={handleUploadFile}
								/>
							</div>
							<div className='upload-img-info'>
								<p className='img-info'>1. 此為食譜封面照</p>
								<p className='img-info'>2. 建議圖片尺寸比例為3:2</p>
								<p className='img-info'>3. 檔案須小於1MB</p>
								<p className='img-info'>4. 建議iphone選取小於1MB的large選項</p>
							</div>
						</div>
					</div>
					<div className='dish-cont'>
						<label className='dish-label'>
							準備時間
							<span className='upload-error-message'>{preTimeError}</span>
						</label>
						<div className='time'>
							<input
								className='input dish-pre-time'
								type='text'
								placeholder='0'
								onChange={(e) => handlePreTime(e.target.value)}
							/>
							<p className='mins'>分鐘</p>
						</div>
					</div>
					<div className='dish-cont'>
						<label className='dish-label'>
							烹煮時間
							<span className='upload-error-message'>{cookTimeError}</span>
						</label>
						<div className='time'>
							<input
								className='input dish-cook-time'
								type='text'
								placeholder='0'
								onChange={(e) => handleCookTime(e.target.value)}
							/>
							<p className='mins'>分鐘</p>
						</div>
					</div>
					<div className='dish-cont'>
						<label className='dish-label'>烹煮難度</label>
						<div className='difficulty'>
							<label
								className={
									difficulty === "0"
										? "cook-tool-item checked"
										: "cook-tool-item"
								}>
								<input
									type='radio'
									name='difficulty'
									value='0'
									onChange={(e) => setDifficulty(e.target.value)}
								/>
								簡單
							</label>
							<label
								className={
									difficulty === "1"
										? "cook-tool-item checked"
										: "cook-tool-item"
								}>
								<input
									type='radio'
									name='difficulty'
									value='1'
									onChange={(e) => setDifficulty(e.target.value)}
								/>
								中等
							</label>
							<label
								className={
									difficulty === "2"
										? "cook-tool-item checked"
										: "cook-tool-item"
								}>
								<input
									type='radio'
									name='difficulty'
									value='2'
									onChange={(e) => setDifficulty(e.target.value)}
								/>
								特級廚師
							</label>
						</div>
					</div>
					<div className='dish-cont'>
						<label className='dish-label'>烹煮用具</label>
						<div className='tool'>
							<label
								className={
									tool === "0" ? "cook-tool-item checked" : "cook-tool-item"
								}>
								<input
									type='radio'
									name='tool'
									value='0'
									onChange={(e) => setTool(e.target.value)}
								/>
								電鍋
							</label>
							<label
								className={
									tool === "1" ? "cook-tool-item checked" : "cook-tool-item"
								}>
								<input
									type='radio'
									name='tool'
									value='1'
									onChange={(e) => setTool(e.target.value)}
								/>
								烤箱
							</label>
							<label
								className={
									tool === "2" ? "cook-tool-item checked" : "cook-tool-item"
								}>
								<input
									type='radio'
									name='tool'
									value='2'
									onChange={(e) => setTool(e.target.value)}
								/>
								氣炸鍋
							</label>
							<label
								className={
									tool === "3" ? "cook-tool-item checked" : "cook-tool-item"
								}>
								<input
									type='radio'
									name='tool'
									value='3'
									onChange={(e) => setTool(e.target.value)}
								/>
								平底鍋
							</label>
							<label
								className={
									tool === "4" ? "cook-tool-item checked" : "cook-tool-item"
								}>
								<input
									type='radio'
									name='tool'
									value='4'
									onChange={(e) => setTool(e.target.value)}
								/>
								湯鍋
							</label>
							<label
								className={
									tool === "5" ? "cook-tool-item checked" : "cook-tool-item"
								}>
								<input
									type='radio'
									name='tool'
									value='5'
									onChange={(e) => setTool(e.target.value)}
								/>
								其他
							</label>
						</div>
					</div>
					<IngredientsFieldContext.Provider
						value={{ inputFields, setInputFields }}>
						<Ingredient />
					</IngredientsFieldContext.Provider>
					<DirectionField.Provider value={{ stepFields, setStepFields }}>
						<Direction />
					</DirectionField.Provider>
					<div className='btn-submit-cont'>
						<button className='btn-submit'>送出食譜</button>
					</div>
				</form>
			</div>
			{uploadLoading && <UploadLoading />}
			{popup ? (
				<div className='popup'>
					<div className='popup-inner'>
						<p className='popup-title'>
							資料填寫尚未完成 或 格式錯誤 或 照片容量大於1MB
						</p>
						<button onClick={handleErrorSubmit}>確認</button>
					</div>
				</div>
			) : null}
			{successPopup ? (
				<div className='popup'>
					<div className='popup-inner'>
						<p className='popup-title'>食譜上傳成功</p>
						<button onClick={handleSuccesSubmit}>前往食譜頁面</button>
					</div>
				</div>
			) : null}
		</>
	);
}

export default UploadRecipe;
