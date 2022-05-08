import React, {useState} from "react";
import auth from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Header from "../Home/Header";
import {Link} from "react-router-dom";

const Signup = () =>{
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const handleSignup = (e) => {
        e.preventDefault();
        console.log(email)
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential)=>{
            const user = userCredential.user;
            console.log(user)
        })
        .catch((error)=>{
            console.log(error.code)
            switch(error.code){
                case "auth/invalid-email":
                    setErrorMessage("信箱格式不正確");
                    break;
                case "auth/email-already-in-use":
                    setErrorMessage("信箱已存在");
                    break;
                case "auth/weak-password":
                    setErrorMessage("密碼需大於六位數");
                    break;
                default:
            console.log(errorMessage)
            }
        })
    }
    return(
        <>
        <Header/>
        <div className="member-cont">
            <div className="signup-cont">
                <div className="signin-head-cont">
                    <div className="signin-title">註冊帳號</div>
                </div>
                <form className="form-signin" onSubmit={handleSignup}>
                    <input className="input-name" type="text" value={name} onChange={(e)=> setName(e.target.value)} placeholder=" 請輸入名稱" required />
                    <input className="input-signin" type="text" value={email} pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}" onChange={(e) => setEmail(e.target.value)} placeholder=" 請輸入信箱" required/>
                    <input className="input-signin" type="password" value={password} minLength="6" onChange={(e) => setPassword(e.target.value)} placeholder=" 請輸入密碼" required/>
                    <button className="btn-submit">註冊帳號</button>
                </form>
                <p className="error-message">{errorMessage ? errorMessage : ''}</p>
                <Link to="/Signin">我有帳號，點此登入</Link>
            </div>
        </div>
        </>
    )
}

export default Signup;

