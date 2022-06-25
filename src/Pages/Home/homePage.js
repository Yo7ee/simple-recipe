import React, { useContext, useEffect } from "react";
import "./homePage.css";
import logo from "../../icon/logo.png";
import Article from "./Article";
import Footer from "./Footer";
import KeywordContext from "../../Context/Keyword";
import { Link } from "react-router-dom";
import { Nav, MobileNav } from "./Nav";
import SearchBar from "./SearchBar";

function HomePage() {
	const { setKeyword, direction } = useContext(KeywordContext);

	useEffect(() => {
		setKeyword("");
	}, []);

	return (
		<div className='home'>
			<header className={direction == "up" ? "header-hide" : null}>
				<div className='header'>
					<Link to='/' className='header-link'>
						<img className='home-logo' src={logo} alt='簡單食譜 logo' />
					</Link>
					<Nav />
				</div>
			</header>
			<div
				className={
					direction == "up" ? "header-mobile-nav hide" : "header-mobile-nav"
				}>
				<MobileNav />
			</div>
			<section className='section-home'>
				<div className='section-home-info'>
					<div className='section-home-content'>
						<h3>給想健康飲食的你</h3>
						<p className='section-p'>透過資訊整合，尋找輕鬆上手的烹煮步驟</p>
						<SearchBar className='article-searchBar' />
					</div>
				</div>
			</section>
			<Article />
			<Footer />
		</div>
	);
}

export default HomePage;
