import React from "react";

function Footer() {
	return (
		<footer>
			<div className='footer-cont'>
				<div className='footer-info'>
					<div className='footer-title'>推薦食譜網站</div>
					<a href='https://www.allrecipes.com/'>allrecipes</a>
					<a href='https://icook.tw/'>愛料理</a>
				</div>
				<div>
					<div className='footer-title'>製作者社群連結</div>
					<i className='fa-brands fa-github'></i>
					<i className='fa-brands fa-instagram'></i>
				</div>
			</div>
			<div className='footer-copyright'>CopyRight@2022 Simple Recipe</div>
		</footer>
	);
}

export default Footer;
