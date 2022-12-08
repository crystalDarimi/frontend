import React, { useState, useRef, useEffect } from "react";
import DatePicker from "react-datepicker";
/* import Datetime from 'react-datetime'; */
import "react-datepicker/dist/react-datepicker.css";
import '../../styles/CalendarAddEvent.css'
import Modal from 'react-modal';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import {call,signout} from "../../service/ApiService";


export default function CalendarAddEvent({ isLecture, isOpen, onClose, onEventAdded }/* { isOpen, onClose, onEventAdded } */) {
    const [title, setTitle] = useState("");
    const [start, setStart] = useState(new Date());
    const [end, setEnd] = useState(new Date());
    const [lectureTitle, setLectureTitle] = useState(""); // lectureList에서 선택된 lectureTitle
    const [lectureList, setLectureList] = useState([]); //string list 형태로 받아올 lectureTitle들..
    //const [users, setUsers] = useState([]);
    

    //lecturelist 넣을 lecture들을 불러오기
    useEffect(()=>{
        loadLecture();
    },[]);

    const loadLecture =  async() => {
        const result = await call("/eple/v1/mystudent/lecture"); //아마 이 부분에 그 lectureTitle url이 들어가면 될 것 같습니다!
        setLectureList(result.data);
        console.log(lectureTitle)
    }
    


    //연동 전 dropbar에 들어가는 임시값입니다! 지우셔도 됩니다.
    const options = [
        'one', 'two', 'three'
    ]
    const defaultOption = lectureList[0];


    const onSubmit = (event) => {
        event.preventDefault();
        onEventAdded({
            title,
            lectureTitle,
            start,
            end,          
        })
        onClose();
    }

    return (

        <div className="addEvntBase">

            <Modal appElement={document.getElementById('app')} ariaHideApp={false} isOpen={isOpen} onRequestClose={onClose} className="addEvntModal">
                {/*일정버튼은 잠시 주석처리 했습니다. */}
                {!isLecture && <form onSubmit={onSubmit} className="addEvntForm">

                    <div className="addEvntFormInsider">
                        <div>
                            <label className="text eventTitle">일정 제목</label><br></br>
                            <input className="UserInput inputTitle" placeholder="일정 제목" value={lectureTitle} name = "LecturTitle" onChange={(e) => setLectureTitle(e.target.value)} />
                        </div>

                        <div>
                            <label className="text eventStart">일정 시작</label>
                            <DatePicker className="UserInput inputStart start" showTimeSelect timeIntervals={15} timeCaption="Time" selected={start} name = "start" dateFormat="MM/dd/yyyy h:mm aa" onChange={(start) => setStart(start)} />

                        </div>

                        <div>
                            <label className="text eventEnd">일정 종료</label>
                            <DatePicker className="UserInput inputEnd end" showTimeSelect timeIntervals={15} timeCaption="Time" name="end" selected={end} dateFormat="MM/dd/yyyy h:mm aa" onChange={(end) => setEnd(end)} />
                        </div>

                        <div>
                            <button type="submit" className="closeBtn" >저장하기</button>
                        </div>
                    </div>


                </form>}
                {isLecture && <form onSubmit={onSubmit} className="addEvntForm">
                    <div className="addEvntFormInsider">
                        <div>
                            <label className="text dropdown">과외 선택</label>
                            {/*<Dropdown className = "selectLecture" options={lectureList} onChange={(lecture) => setLectureTitle(lecture)} value={defaultOption} placeholder="Select an option"  /> */}
                            {/* 아래 임시를 지우고 이런식으로 {options}에 과외 리스트 값을 넣으면 될 것 같습니다.*/}
                            <Dropdown className = "selectLecture" options={options} onChange={(lecture) => setLectureTitle(lecture)} value={defaultOption} placeholder="Select an option"  />
                        </div>
                        {/* <div>
                            <label className="text eventTitle">과외 제목</label><br></br>
                            <input className="UserInput inputTitle" placeholder="일정 제목" value={title} name="LectureTitle" onChange={(e) => setTitle(e.target.value)} />
                        </div> */}

                        <div>
                            <label className="text eventStart">과외 시작</label>
                            <DatePicker className="UserInput inputStart start" showTimeSelect timeIntervals={15} timeCaption="Time" name="start" selected={start} dateFormat="MM/dd/yyyy h:mm aa" onChange={(start) => { setStart(start); setEnd(null) }} />
                        </div>

                        <div>
                            <label className="text eventEnd">과외 종료</label>
                            <DatePicker className="UserInput inputEnd end" showTimeSelect timeIntervals={15} timeCaption="Time" name="end" selected={end} dateFormat="MM/dd/yyyy h:mm aa" onChange={(end) => setEnd(end)} />
                        </div>

                        <div>
                            <button type="submit" className="closeBtn" >저장하기</button>
                        </div>
                    </div>
                </form>}

            </Modal>
        </div>

    )

}