import React, {useState, useEffect} from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./homePage";
import Signin from "./signin/signin";
import Signup from "./signin/signup";
import UploadRecipe from "./Upload/UploadRecipe";
import Recipe from "./Recipe/Recipe";
import auth from "./firebase";
import {onAuthStateChanged} from "firebase/auth";


function App(){
    const [user, setUser]=useState(null);
    useEffect(()=>{
        onAuthStateChanged(auth, (currentUser)=>{
            setUser(currentUser)
        },[])
    })
    return (
        <>
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
            </Routes>
        </BrowserRouter>
        </>
    )
}

export default App;