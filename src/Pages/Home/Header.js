import React, { useContext } from "react";
import KeywordContext from "../../Context/Keyword";
import { MobileNav, Nav } from "./Nav";
import Logo from "./Logo";
import SearchBar from "./SearchBar";

function Header({ isHome }) {
	const { direction } = useContext(KeywordContext);
	return (
		<>
			<header className={direction == "up" ? "header-hide" : null}>
				<div className='header'>
					<Logo isHome={isHome} />
					{isHome === "false" && <SearchBar className='searchBar' />}
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
