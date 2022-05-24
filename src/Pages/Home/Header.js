import React, {useContext} from "react";
import {Link, useNavigate} from "react-router-dom";
import auth from "../../firebase";
import {signOut} from "firebase/auth";
import UserContext from "../../Context/User";


function Header(){

    const {user} = useContext(UserContext)
    const navigate = useNavigate();
    const handleSignOut = () => {
        signOut(auth);
        navigate("/");
    }
    return (
        <header>
            <div className="header">
                <Link to="/" className="header-link"><h1>Simple Recipe</h1></Link>
                <nav>
                    {user? (
                        <>
                        {user.displayName ? <Link to="/me/recipes" className="header-link"><li className="userName">{(user.displayName)[0]}</li></Link>
                        : <li className="userName"></li>}
                        
                        <li onClick={handleSignOut}>登出</li>
                        </>
                    )   :   (
                        <Link to="/signin" className="header-link"><li>登入/註冊</li></Link>
                    )}
                    <Link to="/recipe/upload" className="header-link"><li>上傳食譜</li></Link>
                </nav>
            </div>
        </header>
    )
}

export default Header;