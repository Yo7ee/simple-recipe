import React, { useContext } from "react";
import DifficultyField from "../Context/DifficultyField";

function Difficulty() {
	const { difficulty, setDifficulty } = useContext(DifficultyField);

	return (
		<div className='dish-cont'>
			<label className='dish-label'>烹煮難度</label>
			<div className='difficulty'>
				<label
					className={
						difficulty === "0" ? "cook-tool-item checked" : "cook-tool-item"
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
						difficulty === "1" ? "cook-tool-item checked" : "cook-tool-item"
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
						difficulty === "2" ? "cook-tool-item checked" : "cook-tool-item"
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
	);
}
export default Difficulty;
