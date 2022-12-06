import React, { useState } from "react";
import "./index.css";
import App from "./App";
import Login from "./page/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Typography, Box } from "@mui/material";
import Signup from "./page/Signup";
import Calendar from "./page/Calendar";
import './components/Sidebar';
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import MyStudents from "./page/MyStudent";
import AddLecture from './page/AddLecture';
import EditLecture from './page/EditLecture';


function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {"Copyright © "}
            crystal darimi, {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}
const AppRouter = () => {
    const [teacher, setTeacher] = useState(false);
    let isTeacher;
    function teacherTrue() {
        setTeacher(true);
    }
    function giveTeacher(){
        isTeacher = teacher;
        return isTeacher;
    }

    return (
        <div>
            <BrowserRouter>
                {<Header />}
                <Sidebar>
                <Routes>
                    <Route path ="/login" element = {<Login/>}/>
                    <Route path ="/" element = {<App /> }/>
                    <Route path = "/signup" element = {<Signup/> }/>
                    <Route path="/calendar" element={<Calendar/>}/>
                    <Route path="/mystudents" element={<MyStudents/>}/>
                    <Route path="/AddLecture" element={<AddLecture />}/>
                    <Route path="/EditLecture/:id" element={<EditLecture />}/>
                </Routes>
                </Sidebar>
            </BrowserRouter>
            <footer>
                <Box mt={5} className="copyright">
                    <Copyright />
                </Box>
            </footer>
        </div>
    );
};

export default AppRouter;
