import React, { useContext, useEffect } from "react";
import "./homePage.css";
import Article from "./Article";
import Footer from "./Footer";
import KeywordContext from "../../Context/Keyword";
import { Nav, MobileNav } from "./Nav";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import Header from "./Header";

function HomePage() {
	const { setKeyword } = useContext(KeywordContext);

	useEffect(() => {
		setKeyword("");
	}, []);

	return (
		<div className='home'>
			<Header isHome='true' />
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
