import React, {useState, useEffect, useId} from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./homePage";
import Signin from "./Pages/Signin/signin";
import Signup from "./Pages/Signin/signup";
import UploadRecipe from "./Pages/Upload/UploadRecipe";
import Recipe from "./Pages/Recipe/Recipe";
import Member from "./Pages/Member/Member";
import MyRecipes from "./Pages/Member/MyRecipes";
import MyBookmarks from "./Pages/Member/MyBookmarks";
import auth from "./firebase";
import {onAuthStateChanged} from "firebase/auth";
import UserContext from "./Context/User";


function App(){
    const [user, setUser]=useState(null);
    const [uid, setUid] =useState(1);
    useEffect(()=>{
        onAuthStateChanged(auth, (currentUser)=>{
            setUser(currentUser);
            setUid(currentUser.uid);
        },[])
    })
    return (
        <UserContext.Provider value={{user, setUser, uid, setUid}}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/signin" element={<Signin/>}/>
                    <Route path="/signup" element={<Signup/>}/>
                    <Route path="/recipe/upload" element=
                        { user ? (<UploadRecipe/> )
                        : (<Navigate to="/signin"/>)}
                    />
                    <Route path="/recipe/:recipeId" element={<Recipe/>}/>
                    <Route path="/me" element={<Member/>}>
                        <Route path="recipes" element={<MyRecipes/>}/>
                        <Route path="bookmarks" element={<MyBookmarks/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </UserContext.Provider>
    )
}

export default App;