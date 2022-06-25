import React from "react";
import { Link } from "react-router-dom";
import logo from "../../icon/logo.png";
import logoMobile from "../../icon/logoMobile.png";

function Logo({ isHome }) {
	return isHome === "true" ? (
		<Link to='/' className='header-link'>
			<img className='home-logo' src={logo} alt='簡單食譜 logo' />
		</Link>
	) : (
		<Link to='/' className='header-link'>
			<img className='logo' src={logo} alt='簡單食譜 logo' />
			<img className='logo-mobile' src={logoMobile} alt='簡單食譜 logo' />
		</Link>
	);
}

export default Logo;
