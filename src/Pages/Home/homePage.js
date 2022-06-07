import React, { useState, useContext, useEffect } from "react";
import "./homePage.css";
import logo from "../../icon/logo.png";
import Article from "./Article";
import Footer from "./Footer";
import KeywordContext from "../../Context/Keyword";
import { useNavigate, Link } from "react-router-dom";
import UserContext from "../../Context/User";

function HomePage() {
	const [isLoading, setIsLoading] = useState(false);
	console.log(isLoading);
	const navigate = useNavigate();
	const { user } = useContext(UserContext);
	const { keyword, setKeyword, direction } = useContext(KeywordContext);
	const handleSearch = () => {
		setKeyword(keyword);
		navigate(`/recipes?search=${keyword}`);
	};

	useEffect(() => {
		setKeyword("");
	}, []);

	return (
		// <Loadingcontext.Provider value={{isLoading, setIsLoading}}>
		// {isLoading ? (<Loading/>
		// )   :   (
		<div>
			<header>
				<div className='header'>
					<Link to='/' className='header-link'>
						<img className='home-logo' src={logo} alt='簡單食譜 logo' />
					</Link>
					<nav className='header-nav'>
						<Link to='/recipes' className='header-link'>
							<li>全部食譜</li>
						</Link>
						<Link to='/recipe/upload' className='header-link'>
							<li>上傳食譜</li>
						</Link>
						{user ? (
							<>
								{user.displayName ? (
									<Link to='/me/recipes' className='header-link'>
										<li className='userName'>{user.displayName[0]}</li>
									</Link>
								) : (
									<li className='userName'></li>
								)}
							</>
						) : (
							<Link to='/signin' className='header-link'>
								<li>登入/註冊</li>
							</Link>
						)}
					</nav>
				</div>
			</header>
			<div
				className={
					direction == "up" ? "header-mobile-nav hide" : "header-mobile-nav"
				}>
				<ul>
					<Link to='/recipes'>
						<li>
							<i className='fa-solid fa-bowl-food'></i>
							<p>全部食譜</p>
						</li>
					</Link>
					<Link to='/recipe/upload'>
						<li>
							<i className='fa-solid fa-pen-to-square'></i>
							<p>上傳食譜</p>
						</li>
					</Link>
					{user ? (
						<>
							{user.displayName ? (
								<Link to='/me/recipes' className='header-link'>
									<li>
										<p className='userName'>{user.displayName[0]}</p>
										<p>會員資料</p>
									</li>
								</Link>
							) : (
								<li className='userName'></li>
							)}
						</>
					) : (
						<Link to='/signin'>
							<li>
								<i className='fa-solid fa-user'></i>
								<p>登入/註冊</p>
							</li>
						</Link>
					)}
				</ul>
			</div>
			<section className='section-home'>
				<div className='section-home-info'>
					<div className='section-home-content'>
						<h3>給想健康飲食的你</h3>
						<p className='section-p'>透過資訊整合，尋找輕鬆上手的烹煮步驟</p>
						<div className='header-searchBar'>
							<div className='article-searchBar'>
								<input
									className='input-search'
									value={keyword}
									onChange={(e) => setKeyword(e.target.value)}
									placeholder='輸入食譜、食材或創建者名稱'></input>
								<div className='btn-search'>
									<i
										className='fa-solid fa-magnifying-glass'
										onClick={handleSearch}></i>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			<Article />
			<Footer />
		</div>
		// )}
		// </Loadingcontext.Provider>
	);
}

export default HomePage;
