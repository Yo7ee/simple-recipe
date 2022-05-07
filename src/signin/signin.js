import React, {useState} from "react";
import cross from "../icon/cross.png";
import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

function Signin(){
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignin = (e) =>{
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential)=>{
            const user = userCredential.user;
            console.log(user)
        })
        .catch((error)=>{
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("errorCode: " + errorCode + " errorMessage: "+ errorMessage);
        })
    }

    const handleSignup = (e) => {
        e.preventDefault();
        console.log(email)
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential)=>{
            const user = userCredential.user;
            console.log(user)
        })
        .catch((error)=>{
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("errorCode: " + errorCode + " errorMessage: "+ errorMessage);
        })
    }

    const WindowSignin = () =>{
        <div className="signin-cont">
                <div className="signin-head-cont">
                    <div className="signin-title">登入帳號</div>
                    <img className="cross" src={cross}/>
                </div>
                <form className="form-signin" onSubmit={handleSignin}>
                    <input className="input-email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="請輸入信箱"/>
                    <input className="input-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="請輸入密碼"/>
                    <button className="btn-submit">登入帳號</button>
                </form>
                
                <div className="switch">我還沒有帳號，點此註冊</div>
            </div>
    }

    const WindowSignup = () =>{
        return(
            <div className="signin-cont">
                    <div className="signin-head-cont">
                        <div className="signin-title">註冊帳號</div>
                        <img className="cross" src={cross}/>
                    </div>
                    <form className="form-signin" onSubmit={handleSignup}>
                        <input className="input-name" type="text" value={name} onChange={(e)=> setName(e.target.value)} placeholder="請輸入名稱" />
                        <input className="input-email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="請輸入信箱"/>
                        <input className="input-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="請輸入密碼"/>
                        <button className="btn-submit">註冊帳號</button>
                    </form>
                    <div className="switch">我有帳號，點此登入</div>
                </div>
        )
    }

    return (
        <div className="signin-cont">
            <div className="signin-head-cont">
                <div className="signin-title">登入帳號</div>
                <img className="cross" src={cross}/>
            </div>
            <form className="form-signin" onSubmit={handleSignin}>
                <input className="input-email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="請輸入信箱"/>
                <input className="input-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="請輸入密碼"/>
                <button className="btn-submit">登入帳號</button>
            </form>
            
            <div className="switch" onClick={WindowSignup}>我還沒有帳號，點此註冊</div>
        </div>
    )
}

export default Signin;