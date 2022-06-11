import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import UserContext from "../../Context/User";
import KeywordContext from "../../Context/Keyword";
import logo from "../../icon/logo.png";
import logoMobile from "../../icon/logoMobile.png";

function Header() {
	const { user } = useContext(UserContext);
	const { keyword, setKeyword, direction } = useContext(KeywordContext);
	const navigate = useNavigate();

	const handleSearch = () => {
		setKeyword(keyword);
		navigate(`/recipes?search=${keyword}`);
	};

	return (
		<>
			<header className={direction == "up" ? "header-hide" : null}>
				<div className='header'>
					<Link to='/' className='header-link'>
						<img className='logo' src={logo} alt='簡單食譜 logo' />
						<img className='logo-mobile' src={logoMobile} alt='簡單食譜 logo' />
					</Link>
					<div className='header-searchBar'>
						<div className='searchBar'>
							<input
								className='input-search'
								value={keyword}
								onChange={(e) => setKeyword(e.target.value)}
								placeholder=' 輸入食譜、食材或創建者名稱'></input>
							<div className='btn-search'>
								<i
									className='fa-solid fa-magnifying-glass'
									onClick={handleSearch}></i>
							</div>
						</div>
					</div>
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
					<NavLink
						to='/recipes'
						className={({ isActive }) => (isActive ? "selected" : null)}>
						<li>
							<i className='fa-solid fa-bowl-food'></i>
							<p>全部食譜</p>
						</li>
					</NavLink>
					<NavLink
						to='/recipe/upload'
						className={({ isActive }) => (isActive ? "selected" : null)}>
						<li>
							<i className='fa-solid fa-pen-to-square'></i>
							<p>上傳食譜</p>
						</li>
					</NavLink>
					{user ? (
						<>
							{user.displayName ? (
								<NavLink
									to='/me/recipes'
									className={({ isActive }) =>
										isActive ? "header-link selected" : "header-link"
									}>
									<li>
										<div className='userName'>{user.displayName[0]}</div>
										<p>會員資料</p>
									</li>
								</NavLink>
							) : (
								<li className='userName'></li>
							)}
						</>
					) : (
						<NavLink
							to='/signin'
							className={({ isActive }) => (isActive ? "selected" : null)}>
							<li>
								<i className='fa-solid fa-user'></i>
								<p>登入/註冊</p>
							</li>
						</NavLink>
					)}
				</ul>
			</div>
		</>
	);
}

export default Header;
