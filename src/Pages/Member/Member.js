import React, { useContext } from "react";
import { NavLink, Outlet } from "react-router-dom";
import cross from "../../icon/cross.png";
import Header from "../Home/Header";
import Foorter from "../Home/Footer";
import UserContext from "../../Context/User";

function Member (){
    const {user} = useContext(UserContext);
    console.log(user)
    return (
        <>
        <Header/>
        <div className="member-info-cont">
            <div className="member-user">
                <div className="member-user-cont-left">
                    <img className="member-user-pic" src={cross}/>
                </div>
                <div className="member-user-cont-right">
                    <div className="member-user-name">{user.displayName}</div>
                    <div className="member-user-email">{user.email}</div>
                </div>
            </div>
            <div className="member-list">
                <NavLink to="/me/recipes" className={({isActive})=> isActive? "member-link-active" : "member-link"}><li className="member-list-item">我的食譜</li></NavLink>
                <NavLink to="/me/bookmarks" className={({isActive})=> isActive? "member-link-active" : "member-link"}><li className="member-list-item">我的收藏</li></NavLink>
            </div>
            <Outlet/>
        </div>
        <Foorter/>
        </>
    )
}

export default Member;