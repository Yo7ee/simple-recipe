import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import UserContext from "../../Context/User";

export function Nav() {
	const { user } = useContext(UserContext);
	return (
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
	);
}

export function MobileNav() {
	const { user } = useContext(UserContext);
	return (
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
	);
}
