import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./Pages/Home/homePage";
import Recipes from "./Pages/Recipes/Recipes";
import Signin from "./Pages/Signin/signin";
import Signup from "./Pages/Signin/signup";
import UploadRecipe from "./Pages/Upload/UploadRecipe";
import Recipe from "./Pages/Recipe/Recipe";
import Member from "./Pages/Member/Member";
import MyRecipes from "./Pages/Member/MyRecipes";
import MyBookmarks from "./Pages/Member/MyBookmarks";
import auth from "./utils/firebase";
import { onAuthStateChanged } from "firebase/auth";
import UserContext from "./Context/User";
import KeywordContext from "./Context/Keyword";
import Loading from "./Loading";

function App() {
	const [user, setUser] = useState(undefined);
	const [uid, setUid] = useState(0);
	const [keyword, setKeyword] = useState("");
	const [direction, setDirection] = useState("down");

	useEffect(() => {
		onAuthStateChanged(auth, (currentUser) => {
			setUser(currentUser);
			setUid(currentUser.uid);
		});
		window.addEventListener("scroll", handleWindowOffset);
	}, []);
	console.log("app", user);

	let oldOffset = 0;
	const handleWindowOffset = () => {
		if (window.scrollY > oldOffset) {
			setDirection("up");
		} else {
			setDirection("down");
		}
		oldOffset = window.scrollY;
	};
	return user === undefined ? (
		<Loading />
	) : (
		<UserContext.Provider value={{ user, setUser, uid, setUid }}>
			<KeywordContext.Provider
				value={{ keyword, setKeyword, direction, setDirection }}>
				<BrowserRouter>
					<Routes>
						<Route path='/' element={<HomePage />} />
						<Route path='/recipes' element={<Recipes />} />
						<Route path='/recipes/search=:keyword' element={<Recipes />} />
						<Route path='/recipe/:recipeId' element={<Recipe />} />
						<Route
							path='/recipe/upload'
							element={user ? <UploadRecipe /> : <Navigate to='/signin' />}
						/>
						<Route
							path='/me'
							element={user ? <Member /> : <Navigate to='/signin' />}>
							<Route path='recipes' element={<MyRecipes />} />
							<Route path='bookmarks' element={<MyBookmarks />} />
						</Route>

						<Route
							path='/signin'
							element={user ? <Navigate to='/me/recipes' /> : <Signin />}
						/>
						<Route
							path='/signup'
							element={user ? <Navigate to='/me/recipes' /> : <Signup />}
						/>
					</Routes>
				</BrowserRouter>
			</KeywordContext.Provider>
		</UserContext.Provider>
	);
}

export default App;
