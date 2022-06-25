import React, { useContext } from "react";
import ToolField from "../Context/ToolField";

function Tool() {
	const { tool, setTool } = useContext(ToolField);

	return (
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
	);
}

export default Tool;
