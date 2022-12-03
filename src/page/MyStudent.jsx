import React, {Fragment} from 'react';
// import Mystudents from './../components/Mystudents'
import '../styles/Mystudents.css'
import { Link } from "react-router-dom";
import {useEffect, useState} from "react";
import { call } from "../service/ApiService";
import AddIcon from '@material-ui/icons/Add';


const Mystudents = () => {
    const [users, setUsers] = useState([]);
    const [result, setResult] = useState([]);

    useEffect(()=>{
        loadUser();
    },[]);

    const loadUser =  async() => {
        const result = await call("/eple/v1/mystudent/lecture");
        setUsers(result.data);
    }

    

    return(
        <div className="container">
            <h1>Mystudents</h1>
            <Link to = '/AddLecture'>
                <button id="addbtn"><p>+</p>학생 추가하기</button>
            </Link>
            <div className="card">
                <div className="card-title">
                    
                </div>
                <div className="card-body">
                    <table>
                        <thead>
                            <tr>
                                <td>이름</td>
                                <td>과목</td>
                                <td>진행회차</td>
                                <td>수업진행요일</td>
                                <td>과외 금액</td>
                                <td>수정/삭제</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users?.map((data) => (
                                    <tr>
                                        <td className="col">{data.stdName}</td>
                                        <td className="col">{data.lectureTitle}</td>
                                        <td className="col">{data.cycle}</td>
                                        <td className="col">{`${data.dayOne}${data.dayTwo}`}</td>
                                        <td className="col">{data.fee.toLocaleString()}만원</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )

}

export default Mystudents;