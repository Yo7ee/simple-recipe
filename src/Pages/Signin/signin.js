import React, { useState } from "react";
import auth, { provider } from "../../utils/firebase";
import {
	signInWithEmailAndPassword,
	signInWithPopup,
	GoogleAuthProvider,
} from "firebase/auth";
import Header from "../Home/Header";
import Footer from "../Home/Footer";
import { Link, useNavigate } from "react-router-dom";
import google from "../../icon/google.png";

function Signin() {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const handleSignin = (e) => {
		e.preventDefault();
		signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				const displayName = userCredential.user.displayName;
				navigate("/me/recipes"); //將使用者redirect到會員頁面
			})
			.catch((error) => {
				switch (error.code) {
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
			});
	};
	const handleGoogleSignin = () => {
		signInWithPopup(auth, provider)
			.then((result) => {
				navigate("/me/recipes"); //將使用者redirect到會員頁面
			})
			.catch((error) => {
				// Handle Errors here.
				const errorCode = error.code;
				const errorMessage = error.message;
				setErrorMessage(errorMessage);
				// The email of the user's account used.
				const email = error.customData.email;
				// The AuthCredential type that was used.
				const credential = GoogleAuthProvider.credentialFromError(error);
				// ...
			});
	};
	return (
		<>
			<Header />
			<div className='member-cont'>
				<div className='signin-cont'>
					<div className='signin-head-cont'>
						<div className='signin-title'>登入帳號</div>
					</div>
					<form className='form-signin' onSubmit={handleSignin}>
						<input
							className='input-signin'
							type='text'
							value={email}
							pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}'
							onChange={(e) => setEmail(e.target.value)}
							placeholder=' guest@guest.com'
						/>
						<input
							className='input-signin'
							type='password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							placeholder=' guest1'
						/>
						<button className='btn-submit'>登入帳號</button>
					</form>
					<p className='error-message'>{errorMessage}</p>
					<div className='no-account'>
						我還沒有帳號，
						<Link to='/signup' className='switch'>
							點此註冊
						</Link>
					</div>
					<div className='split-line'>
						<span></span>
						<p>使用社群帳號登入</p>
						<span></span>
					</div>
					<div className='google-signin-btn' onClick={handleGoogleSignin}>
						<img className='google-logo' src={google} />
						<p>Google 登入</p>
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
}
export default Signin;
