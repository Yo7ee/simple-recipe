import React, { useContext } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import cross from "../../icon/cross.png";
import Header from "../Home/Header";
import Foorter from "../Home/Footer";
import UserContext from "../../Context/User";
import auth from "../../utils/firebase";
import { signOut } from "firebase/auth";

function Member() {
	const { user } = useContext(UserContext);
	const navigate = useNavigate();
	const handleSignOut = () => {
		signOut(auth);
		navigate("/");
	};
	return (
		<>
			<Header />
			<div className='member-info-cont'>
				<div className='wrap'>
					<div className='member-user'>
						<div className='member-user-cont-left'>
							<li className='member-userName'>{user.displayName[0]}</li>
						</div>
						<div className='member-user-cont-right'>
							<div className='member-user-name'>{user.displayName}</div>
							<div className='member-user-email'>{user.email}</div>
						</div>
					</div>
					<div className='member-list'>
						<NavLink
							to='/me/recipes'
							className={({ isActive }) =>
								isActive ? "member-link-active" : "member-link"
							}>
							<li className='member-list-item'>我的食譜</li>
						</NavLink>
						<NavLink
							to='/me/bookmarks'
							className={({ isActive }) =>
								isActive ? "member-link-active" : "member-link"
							}>
							<li className='member-list-item'>我的收藏</li>
						</NavLink>
						<p onClick={handleSignOut} className='signOut'>
							登出
						</p>
					</div>
					<Outlet />
				</div>
			</div>
			<Foorter />
		</>
	);
}

export default Member;
