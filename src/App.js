import React from "react";
import styles from "./App.module.scss";
import AppRouter from "./Routes/AppRouter";

import Nav from "./Components/Nav/Nav";
import Banner from "./Components/Banner/Banner";

 

function App() {
    return (
         
        <div className={styles.appContainer}>
        
                <Nav />
                <Banner />
                <h1>Hello from react </h1>
                <AppRouter />
                
               
        </div>
         
    );
}

export default App;
