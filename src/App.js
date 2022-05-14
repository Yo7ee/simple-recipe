import React from "react";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import HomePage from "./homePage";
import Signin from "./signin/signin";
import Signup from "./signin/signup";
import UploadRecipe from "./Upload/UploadRecipe";
import Recipe from "./Recipe/Recipe";


function App(){
    return (
        <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/signin" element={<Signin/>}/>
                <Route path="/signup" element={<Signup/>}/>
                <Route path="/recipe/upload" element={<UploadRecipe/>}/>
                <Route path="/recipe/:recipeId" element={<Recipe/>}/>
            </Routes>
        </BrowserRouter>
        </>
    )
}

export default App;