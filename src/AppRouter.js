import React from "react";
import "./index.css";
import App from "./App";
import Login from "./page/Login";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import {Typography, Box} from "@mui/material";
import Signup from "./page/Signup";
import Calendar from "./page/Calendar";
import './components/Sidebar';
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import MyClass from "./page/MyClass";
import Mystudents from "./page/Mystudents";
import AddLecture from "./page/AddLecture";


function Copyright(){
    return(
        <Typography  variant="body2" color="textSecondary" align="center">
            {"Copyright © "}
            crystal darimi, {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}
const AppRouter=() =>{
    return(
        <div>
            <BrowserRouter>
                {<Header />}
                <Sidebar>
                    <section>
                <Routes>
                    <Route path ="/login" element = {<Login/>}/>
                    <Route path ="/" element = {<App /> }/>
                    <Route path = "/signup" element = {<Signup/> }/>
                    <Route path="/calendar" element={<Calendar/>}/>
                    <Route path="/mystudent" element={<Mystudents/>}/>
                    <Route path="/myclass" element={<MyClass/>}/>
                    <Route path="/AddLecture" element={<AddLecture />}/>

                </Routes>
                </section>
                </Sidebar>
            </BrowserRouter>
            <footer>
            <Box mt ={5} className="copyright">
                <Copyright />
             </Box>
             </footer>
        </div>
    );
};

export default AppRouter;
