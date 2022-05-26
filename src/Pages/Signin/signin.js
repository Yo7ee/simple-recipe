import React, {useState} from "react";
import auth from "../../utils/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import Header from "../Home/Header";
import Footer from "../Home/Footer";
import { Link, useNavigate } from "react-router-dom";

function Signin(){
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const handleSignin = (e) =>{
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential)=>{
            const displayName = userCredential.user.displayName;
            
            navigate(-1);//將使用者redirect到前一個頁面
        })
        .catch((error)=>{
            switch(error.code){
                case "auth/invalid-email":
                    setErrorMessage("信箱不可空白或信箱格式不正確");
                    break;
                case "auth/wrong-password":
                    setErrorMessage("密碼錯誤");
                    break;
                case "auth/user-not-found":
                    setErrorMessage("信箱不存在");
                    break;
                default:
            }
        })
    }
    return (
        <>
        <Header/>
        <div className="member-cont">
            <div className="signin-cont">
                <div className="signin-head-cont">
                    <div className="signin-title">登入帳號</div>
                </div>
                <form className="form-signin" onSubmit={handleSignin}>
                    <input className="input-signin" type="text" value={email} pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}" onChange={(e) => setEmail(e.target.value)} placeholder=" 請輸入信箱"/>
                    <input className="input-signin" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder=" 請輸入密碼"/>
                    <button className="btn-submit">登入帳號</button>
                </form>
                <p className="error-message">{errorMessage}</p>
                我還沒有帳號，<Link to="/signup" className="switch">點此註冊</Link>
            </div>
        </div>
        <Footer/>
        </>
    )
}
export default Signin;

