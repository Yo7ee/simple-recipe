import React from "react";
import { Link } from "react-router-dom";
function Popup({ title, type, label, handleClick }) {
	return (
		<div className='popup'>
			<div className='popup-inner'>
				<p className='popup-title'>{title}</p>
				{type === "link" ? (
					<Link to='/' className='popup-switch'>
						{label}
					</Link>
				) : (
					<button onClick={handleClick}>{label}</button>
				)}
			</div>
		</div>
	);
}
export default Popup;
