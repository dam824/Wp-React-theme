import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CatPage from '../Components/CatPage/CatPage';
import ArticleDetails from '../Components/ArticleDetails/ArticleDetails';
 
 

function AppRouter(){
    return(
        <Routes>
            <Route path="/" element={<CatPage />}></Route>
            <Route path="/article/:id" element={<ArticleDetails />}></Route>
            <Route path="/category/:categoryName" element={<CatPage />}></Route>
            <Route path="/category/all" element={<CatPage />}></Route>
        </Routes>
    )
}
export default AppRouter;