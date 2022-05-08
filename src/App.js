import React from "react";
import HomePage from "./homePage";
import Signin from "./signin/signin";
import Signup from "./signin/signup";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Recipe from "./Recipe/Recipe";

function App(){
    return (
        <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/signin" element={<Signin/>}/>
                <Route path="/signup" element={<Signup/>}/>
                <Route path="/recipe" element={<Recipe/>}/>
            </Routes>
        </BrowserRouter>
        </>
    )
}

export default App;