import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import KeywordContext from "../../Context/Keyword";
import logo from "../../icon/logo.png";
import logoMobile from "../../icon/logoMobile.png";
import { MobileNav, Nav } from "./Nav";
import SearchBar from "./SearchBar";

function Header() {
	const { direction } = useContext(KeywordContext);
	const navigate = useNavigate();

	return (
		<>
			<header className={direction == "up" ? "header-hide" : null}>
				<div className='header'>
					<Link to='/' className='header-link'>
						<img className='logo' src={logo} alt='簡單食譜 logo' />
						<img className='logo-mobile' src={logoMobile} alt='簡單食譜 logo' />
					</Link>
					<SearchBar className='searchBar' />
					<Nav />
				</div>
			</header>
			<div
				className={
					direction == "up" ? "header-mobile-nav hide" : "header-mobile-nav"
				}>
				<MobileNav />
			</div>
		</>
	);
}

export default Header;
