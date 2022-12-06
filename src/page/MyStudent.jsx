import React, {Fragment} from 'react';
// import Mystudents from './../components/Mystudents'
import '../styles/Mystudents.css'
import { Link, useParams } from "react-router-dom";
import {useEffect, useState} from "react";
import { call } from "../service/ApiService";




const Mystudents = () => {
    const [users, setUsers] = useState([]);
    const [result, setResult] = useState([]);

    const {lectureCode} = useParams()

    useEffect(()=>{
        loadUser();
    },[]);

    const loadUser =  async() => {
        const result = await call("/eple/v1/mystudent/lecture");
        setUsers(result.data);
    }

    const deleteLecture = async (lectureCode) => {
        await call(`/eple/v1/mystudent/${lectureCode}`, "DELETE", lectureCode)
        loadUser()
        
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
                                <td>과외코드</td>
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
                                        <td className="col">{data.lectureCode}</td>
                                        <td className="col">{data.stdName}</td>
                                        <td className="col">{data.lectureTitle}</td>
                                        <td className="col">{data.cycle}</td>
                                        <td className="col">{`${data.dayOne}${data.dayTwo}`}</td>
                                        <td className="col">{data.fee.toLocaleString()}만원</td>
                                        <td>
                                        <Link to = {`/EditLecture/${data.id}`}>
                                            <button className='edit'>Edit</button>
                                        </Link>
                                    
                                        <button className='delete' onClick={() => deleteLecture(data.lectureCode)}>Delete</button>
                                       
                                        </td>
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