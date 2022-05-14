import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import auth from "../firebase";
import {onAuthStateChanged, signOut} from "firebase/auth";


function Header(){
    const [user, setUser]=useState(null);
    useEffect(()=>{
        onAuthStateChanged(auth, (currentUser)=>{
            setUser(currentUser)
        },[])
    })
    console.log(user)
    return (
        <header>
            <div className="header">
                <Link to="/"><h1>Simple Recipe</h1></Link>
                <nav>
                    <Link to="/recipe/upload"><li>上傳食譜</li></Link>
                    {user ? (
                        <>
                        <li className="userName">{user.displayName}</li>
                        <li onClick={()=>signOut(auth)}>登出</li>
                        </>
                    )   :   (
                        <Link to="/signin"><li>登入/註冊</li></Link>
                    )}
                </nav>
            </div>
        </header>
    )
}

export default Header;