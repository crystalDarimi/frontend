import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";


const App = () => {
    return(
        <section>
    <div className="App">
        <h1 className="welcome">
            welcome!
        </h1>
        <img className="characterLogo" src="img/characterLogo.png" alt="characterLogo"/>
    </div>
    </section>
    )
};

export default App;

