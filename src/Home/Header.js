import React from "react";
import {Link} from "react-router-dom";

function Header(){
    return (
        <header>
            <div className="header">
                <Link to="/"><h1>Simple Recipe</h1></Link>
                <nav>
                    <Link to="/recipe"><li>上傳食譜</li></Link>
                    <Link to="/signin"><li>登入/註冊</li></Link>
                </nav>
            </div>
        </header>
    )
}

export default Header;