import React from "react";
import "../styles/Sidebar.css";
import HomeIcon from '@mui/icons-material/Home';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ArchiveIcon from '@mui/icons-material/Archive';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import { Link, NavLink } from 'react-router-dom';
import { } from "../service/ApiService"; 
const TEACHER = "TEACHER";

const Sidebar = ({ children, isTeacher }) => {
    function differMenu() {
        if (localStorage.getItem("role") === TEACHER) {
            return (
                <div>
                    {menuItem.map((item, index) => (
                        <NavLink to = {item.path} key={index} className="link">
                            <div className="icon">{item.icon}</div>
                            <div className="link_text">{item.name}</div>
                        </NavLink>
                    ))}
                </div>
            )
        }
        else{
            return(
                <div>
                    <NavLink to={menuItem[0].path} className="link">
                        <div className="icon">{menuItem[0].icon}</div>
                        <div className="link_text">{menuItem[0].name}</div>
                    </NavLink>
                    <NavLink to={menuItem[2].path} className="link">
                        <div className="icon">{menuItem[2].icon}</div>
                        <div className="link_text">{menuItem[2].name}</div>
                    </NavLink>
                </div>
            )
        }
    }

    const menuItem = [
        // {
        //     name:"Dashboard",
        //     icon: <HomeIcon />,
        //     path: "./dashboard"
        // },
        {
            name: "캘린더",
            icon: <CalendarMonthIcon />,
            path: "./calendar"
        },
        // {
        //     name:"채팅메시지",
        //     icon: <ChatBubbleOutlineIcon />,
        //     path: "./chatting"
        // },
        // {
        //     name:"자료실",
        //     icon: <ArchiveIcon />,
        //     path: "./archive"
        // },
        {
            name: "My Students",
            icon: <PeopleOutlineIcon />,
            path: "./mystudents"
        },
        {
            name: "My Class",
            icon: <PeopleOutlineIcon />,
            path: "./myclass"
        },
    ]
    return (
        <div className="container">
            <div className="sidebar">
                <div className="top_section">
                    <Link to="./" >
                        <img className="logo" src="img/logo.png" alt="logo" />
                    </Link>
                </div>
                <div className="mainmenu">
                    <h6>Main Menu</h6>
                </div>
                {differMenu()}
                {/* {
                    menuItem.map((item, index) => (
                        <NavLink to = {item.path} key={index} className="link" activeclassName="active">
                            <div className="icon">{item.icon}</div>
                            <div className="link_text">{item.name}</div>
                        </NavLink>
                    ))
                } */}
            </div>
            <main className="pagetitle">{children}</main>
        </div>

    )
}

export default Sidebar;

