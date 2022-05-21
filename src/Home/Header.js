import React, {useState, useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import auth from "../firebase";
import {onAuthStateChanged, signOut} from "firebase/auth";


function Header(){
    const [user, setUser]=useState(null);
    useEffect(()=>{
        onAuthStateChanged(auth, (currentUser)=>{
            setUser(currentUser)
        },[])
    })
    const navigate = useNavigate();
    const handleSignOut = () => {
        signOut(auth);
        navigate("/");
    }
    console.log(user)
    return (
        <header>
            <div className="header">
                <Link to="/"><h1>Simple Recipe</h1></Link>
                <nav>
                    {user ? (
                        <>
                        <li className="userName">{(user.displayName)[0]}</li>
                        <li onClick={handleSignOut}>登出</li>
                        </>
                    )   :   (
                        <Link to="/signin"><li>登入/註冊</li></Link>
                    )}
                    <Link to="/recipe/upload"><li>上傳食譜</li></Link>
                </nav>
            </div>
        </header>
    )
}

export default Header;