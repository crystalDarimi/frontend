import React, {useState} from 'react';
import '../styles/AddLecture.css'
// import Header from './../components/Header';
import {useNavigate} from "react-router-dom";
import { call } from "../service/ApiService";




const AddLecture = () => {
        let navigate = useNavigate()

        const [user, setUser] = useState({
            lectureCode:"",
            lectureTitle:"",
            color:"",
            stdName:"",
            cycle:"",
            fee:"",
            minutesPerOnce:"",
            dayOne:"",
            dayTwo:"",
            stdNumber:"",
            momNumber:"",
            schoolAge:""
        });
        const [inviteCode, setInviteCode] = useState(null);
        const [isOpenForModal, setIsOpenForModal] = useState(false);

        const{lectureCode, lectureTitle, color, cycle, fee, minutesPerOnce, dayOne, dayTwo, stdNumber, momNumber, schoolAge, stdName} = user

        const onInputChange=(e) =>{
            setUser({...user,[e.target.name]:e.target.value})
        }

        const onColorChange = (value) => {
            setUser({...user, color: value })
        }

        const onSubmit= async (e) =>{
            e.preventDefault();
            const res = await call("/eple/v1/mystudent/lecture", "POST", user); // call함수에 url 담겨져 있어서 그냥 불러오기만 하면됌
            setInviteCode(res);
            setIsOpenForModal(true);
        }

        return (
            <div>
            <h1>Mystudents</h1>
                <div className='AddLecture'>
                    <form onSubmit={onSubmit}>
                    <div className="container">
                        <div className="lectureCode">
                            <label>과외 코드</label>
                            <input name="lectureCode" type="text" value={lectureCode} onChange={(e)=>onInputChange(e)}/>
                        </div>
                        <div className="lectureTitle">
                            <label>과목 이름</label>
                            <input name="lectureTitle" type="text" value={lectureTitle} onChange={(e)=>onInputChange(e)}/>
                        </div>
                        <div className="color">
                            <label>과외 색상 선택</label>
                            <div className="colorpick">
                                <div style={{background:'red',width:'50px',height:'50px'}} onClick={()=>onColorChange('red')} />
                                <div style={{background:'blue',width:'50px',height:'50px'}} onClick={()=>onColorChange('blue')} />
                                <div style={{background:'yellow',width:'50px',height:'50px'}} onClick={()=>onColorChange('yellow')} />
                                <div style={{background:'black',width:'50px',height:'50px'}} onClick={()=>onColorChange('black')} />
                                <div style={{background:'grey',width:'50px',height:'50px'}} onClick={()=>onColorChange('grey')} />
                                </div>
                            <input name={'color'} value={color} onChange={(e)=>onInputChange(e)}/>
                        </div>
                        <div className="cycle">
                            <label>입금 주기</label>
                            <input name="cycle" type="number" value={cycle} onChange={(e) => onInputChange(e)} />
                        </div>
                        <div className="minutesPerOnce">
                            <label>과외 1회당 진행 시간</label>
                            <input name="minutesPerOnce" type="number" value={minutesPerOnce} onChange={(e) => onInputChange(e)} />
                        </div>
                        {/* <div className="dayOne">
                            <label>과외 요일 1</label>
                            <label>
                            <input name="dayOne" type="radio" value={1} onChange={(e) => onInputChange(e)} />
                                월요일
                            </label>
                        </div> */}
                        <div className="dayOne">
                            <label>과외 요일 1 - 숫자로 입력(월:0, 화:1, 수:2, 목:3, 금:4, 토:5, 일: 6)</label>
                            <input name="dayOne" type="number" value={dayOne} onChange={(e) => onInputChange(e)} />
                        </div>
                        <div className="dayTwo">
                            <label>과외 요일 2 - 숫자로 입력(월:0, 화:1, 수:2, 목:3, 금:4, 토:5, 일: 6)</label>
                            <input name="dayTwo" type="number"  value={dayTwo} onChange={(e) => onInputChange(e)} />
                        </div>
                        <div className="fee">
                            <label>과외비</label>
                            <input name="fee" type="number" value={fee} onChange={(e)=>onInputChange(e)}/>만원
                        </div>
                        <div className="stdName">
                            <label>학생 이름</label>
                            <input name="stdName" type="text" value={stdName} onChange={(e)=>onInputChange(e)}/>
                        </div>
                        <div className="stdNumber">
                            <label>학생 연락처</label>
                            <input name="stdNumber" type="tel" value={stdNumber} onChange={(e) => onInputChange(e)} />
                        </div>
                        <div className="momNumber">
                            <label>부모님 연락처</label>
                            <input name="momNumber" type="tel" value={momNumber} onChange={(e) => onInputChange(e)} />
                        </div>
                        <div className="schoolAge">
                            <label>학교/나이</label>
                            <input name="schoolAge" value={schoolAge} onChange={(e) => onInputChange(e)} />
                        </div>
                        <div className="btn">
                            <button type="submit">작성완료</button>
                        </div>
                        </div>
                       
            </form>
                </div>
                {isOpenForModal ? (
                <div className='invite-box'>
                    <div>
                        초대링크
                    </div>
                    <div>
                    {inviteCode}
                    </div>
                    <div className='footer'>
                        <a onClick={() => navigate('/mystudents')}>목록으로 가기</a>
                    </div>
                </div>
                )
                : <></>}
            </div>
    );
}

export default AddLecture;