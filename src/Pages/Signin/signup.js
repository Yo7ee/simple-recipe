import React, {useState} from "react";
import auth from "../../firebase";
import { createUserWithEmailAndPassword, updateProfile} from "firebase/auth";
import Footer from "../Home/Footer";
import {Link, useNavigate} from "react-router-dom";


const Signup = () =>{
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [popup, setPopup] = useState(false);
    const handleSignup = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential)=>{
            updateProfile(userCredential.user, {
                displayName:name
            })
        }).then(()=>{
            setPopup(true);
        })
        .catch((error)=>{
            switch(error.code){
                case "auth/invalid-email":
                    setErrorMessage("信箱不可空白或信箱格式不正確");
                    break;
                case "auth/email-already-in-use":
                    setErrorMessage("信箱已存在");
                    break;
                case "auth/weak-password":
                    setErrorMessage("密碼需大於六位數");
                    break;
                default:
            }
        })
    }
    return(
        <>
        <header>
            <div className="header">
                <Link to="/"><h1>Simple Recipe</h1></Link>
            </div>
        </header>
        <div className="member-cont">
            <div className="signup-cont">
                <div className="signin-head-cont">
                    <div className="signin-title">註冊帳號</div>
                </div>
                <form className="form-signin" onSubmit={handleSignup}>
                    <input className="input-name" type="text" value={name} onChange={(e)=> setName(e.target.value)} placeholder=" 請輸入名稱"/>
                    <input className="input-signin" type="text" value={email} pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}" onChange={(e) => setEmail(e.target.value)} placeholder=" 請輸入信箱"/>
                    <input className="input-signin" type="password" value={password} minLength="6" onChange={(e) => setPassword(e.target.value)} placeholder=" 請輸入密碼"/>
                    <button className="btn-submit">註冊帳號</button>
                </form>
                <p className="error-message">{errorMessage}</p>
                我有帳號，<Link to="/Signin" className="switch">點此登入</Link>
            </div>
        </div>
        {popup ? (
        <div className="popup">
            <div className="popup-inner">
                <p className="popup-title">註冊成功</p>
                <Link to="/" className="popup-switch">點擊回首頁</Link>
            </div>
        </div>
        )   :   (
            null
        )}
        <Footer/>
        </>
    )
}

export default Signup; 
