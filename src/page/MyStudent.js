// import React, { useState, useEffect } from "react";
// import "../App.css";
// import Lecture from "../components/Lecture";
// import {Container, List, Paper} from "@mui/material";
// import AddLecture from "./AddLecture"
// import {call,signout} from "../service/ApiService";



// const MyStudent = () => {
//     const [state, setState] = useState({ items: []});
//     const [loading, setLoading] = useState(true);


//     // componentDidMount 대신 userEffect 사용
//     useEffect(() => {
//         call("/eple/v1/mystudent/lecture", "GET", null).then((response) =>{
//             setState({items: response.data});

//             setLoading(false);
//         });
//     }, []);

//     const addItem = (item) => {

//         const thisItems = state.items;
//         item.id = "ID-" + thisItems.length; // key를 위한 id추가
//         thisItems.push(item); // 배열에 아이템 추가
//         setState({ items: thisItems }); // 업데이트는 반드시 this.setState로 해야됨.
//         console.log("items : ", state.items);




//         call("/eple/v1/mystudent/lecture", "POST", item).then((response) =>
//             setState({ items: response.data })
//         );
//     };

//     const deleteItem = (item) => {
//         call("/eple/v1/mystudent/lecture", "DELETE", item).then((response) =>
//             setState({ items: response.data })
//         );
//     };

//     const updateItem = (item) => {
//         call("/eple/v1/mystudent/lecture", "PUT", item).then((response) =>
//             setState({ items: response.data })
//         );
//     };



//     var lectureItems = state.items.length > 0 && (
//         <Paper style={{ margin: 16 }}>
//             <List>
//                 {state.items.map((item, idx) => (
//                     <Lecture
//                         item={item}
//                         key={item.id}
//                         deleteItem={deleteItem}
//                         updateItem={updateItem}
//                     />
//                 ))}
//             </List>
//         </Paper>
//     );

//     //로딩중이 아닐 때 렌더링할 부분
//     let lectureListPage = (
//         <div>
//             <Container maxWidth="md">
//                 <AddLecture addItem={addItem} />
//                 <div className="LectureList">{lectureItems}</div>
//             </Container>
//         </div>
//     );

//     let loadingPage = <h1> 로딩중..</h1>;
//     let content = loadingPage;
//     if(!loading){
//         //로딩중이 아니면 lecture page
//         content = lectureListPage;
//     }

//     // 3. props로 넘겨주기
//     return <div className="MyStudent"> {content}
//     </div>

// };

// export default MyStudent;

import React, {Fragment} from 'react';
// import Mystudents from './../components/Mystudents'
import '../styles/Mystudents.css'
// import Header from './../components/Header';
import { Link } from "react-router-dom";
// import axios from '../utils.js'
import axios from 'axios';
import {useEffect, useState} from "react";
import MyStudent from './MyStudent';


const studentsData = [
    {
            "lecture_Code": 1,
            "lectureTitle": "영어독해",
            "color": null,
            "stdName": '김철수',
            "cycle": '3회/8회',
            "fee": 100000,
            "minutesPerOnce": 0,
            "day_1": '월',
            "day_2": '화',
            "stdNumber": null,
            "momNumber": null,
            "schoolAge": null,
            "time_1": null,
            "time_2": null,
            "scheduleCounter": 0,
            "presentCycle": 0,
            "scheduleEntities": null
    },
    {
        "lecture_Code": 2,
        "lectureTitle": "고등 상 수학",
        "color": null,
        "stdName": '김하림',
        "cycle": '2회/10회',
        "fee": 200000,
        "minutesPerOnce": 0,
        "day_1": '수',
        "day_2": '금',
        "stdNumber": null,
        "momNumber": null,
        "schoolAge": null,
        "time_1": null,
        "time_2": null,
        "scheduleCounter": 0,
        "presentCycle": 0,
        "scheduleEntities": null
    },
    {
        "lecture_Code": 3,
        "lectureTitle": "영어 문법",
        "color": null,
        "stdName": '김선생',
        "cycle": '3회/8회',
        "fee": 300000,
        "minutesPerOnce": 0,
        "day_1": '금',
        "day_2": '토',
        "stdNumber": null,
        "momNumber": null,
        "schoolAge": null,
        "time_1": null,
        "time_2": null,
        "scheduleCounter": 0,
        "presentCycle": 0,
        "scheduleEntities": null
    }
]

const Mystudents = () => {
    const [users, setUsers] = useState([]);
    const [result, setResult] = useState([]);

    useEffect(()=>{
        loadUser();
        //ssetUsers(studentsData);
    },[]);

    const loadUser =  async() => {
        const result = await axios.get("http://prod-eple-crystal-api-service.ap-northeast-2.elasticbeanstalk.com/eple/v1/mystudent/lecture");
        console.log(result,"asd");
        setUsers(result.data);
        //const result = await axios.get('https://reqres.in/api/users?page=1')
        //setResult(result.data.data)
    }
    return(
        <div className="container">s
            <h1>학생 관리 페이지</h1>
            <Link to = '/AddLecture'>
                <button>학생 추가하기</button>
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
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map((data) =>{
                                    <tr>
                                        <th scope='row'>{data.stdName}</th>
                                        <div className="col">{data.lectureTitle}</div>
                                        <div className="col">{data.cycle}</div>
                                        {<div className="col">{`${data.day_1}${data.day_2}`}</div>}
                                        {<div className="col">{data.fee.toLocaleString()}만원</div>}
                                    </tr>
                                })

                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )

}

export default Mystudents;