import React, { useState, useRef, useEffect } from "react";
import DatePicker from "react-datepicker";
/* import Datetime from 'react-datetime'; */
import "react-datepicker/dist/react-datepicker.css";
import '../../styles/CalendarAddEvent.css'
import Select from 'react-select'
import Modal from 'react-modal';
import 'react-dropdown/style.css';
import {call,signout} from "../../service/ApiService";


export default function CalendarAddEvent({ isLecture, isOpen, onClose, onEventAdded }/* { isOpen, onClose, onEventAdded } */) {
    const [title, setTitle] = useState("");
    const [users, setUsers] = useState([]);
    const [start, setStart] = useState(new Date());
    const [end, setEnd] = useState(new Date());
    // //const [lectureTitle, setLectureTitle] = useState(""); // lectureList에서 선택된 lectureTitle
    const [lectureList, setLectureList] = useState([]); //string list 형태로 받아올 lectureTitle들..
    const [lectures, setLectures] = useState([]);
    //const [users, setUsers] = useState([]);
    

//     //lecturelist 넣을 lecture들을 불러오기
//     useEffect(()=>{
//         loadLecture();
//     },[]);

//     const loadLecture =  async() => {
//         const lectures =  await call("/eple/v1/mystudent/lecture", "GET");
//         setLectureList(lectures.data);
//         console.log(lectureList);
//  //아마 이 부분에 그 lectureTitle url이 들어가면 될 것 같습니다!
//         // lectureList = lectures.data.map(lecture => (
//         //     lecture.lectureTitle
//         // ))
//         // console.log(lectureList)
//     }

useEffect(()=>{
    loadLecture();
},[]);

const loadLecture = async() => {
    const result = await call("/eple/v1/mystudent/lecture", "GET");
    console.log(result);
    await setLectures(result.data.map((lecture) => (lecture.lectureTitle)));
    console.log(lectures);
    //titleList(await result.data);
}
async function titleList(data){
    setLectureList(data);
    console.log(await lectureList);
    const list = await lectureList.map((lecture) => (lecture.lectureTitle));
    console.log(await list);
    setLectures(await list);
    console.log(await lectures);   
}




    //연동 전 dropbar에 들어가는 임시값입니다! 지우셔도 됩니다.
    const options = [
        'one', 'two', 'three'
    ]


    const onSubmit = (event) => {
        event.preventDefault();
        onEventAdded({
            title,
            start,
            end,          
        })
        onClose();
    }

    return (

        <div className="addEvntBase">

            <Modal appElement={document.getElementById('app')} ariaHideApp={false} isOpen={isOpen} onRequestClose={onClose} className="addEvntModal">
                {/* 일정버튼은 잠시 주석처리 했습니다.
                {!isLecture && <form onSubmit={onSubmit} className="addEvntForm">

                    <div className="addEvntFormInsider">
                        <div>
                            <label className="text eventTitle">일정 제목</label><br></br>
                            <input className="UserInput inputTitle" placeholder="일정 제목" value={title} name = "LecturTitle" onChange={(e) => setTitle(e.target.value)} />
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


                </form>} */}
                {isLecture && <form onSubmit={onSubmit} className="addEvntForm">
                    <div className="addEvntFormInsider">
                        <div>
                            <label className="text dropdown">과외 선택</label>
                            {/*<Dropdown className = "selectLecture" options={lectureList} onChange={(lecture) => setLectureTitle(lecture)} value={defaultOption} placeholder="Select an option"  /> */}
                            {/* 아래 임시를 지우고 이런식으로 {options}에 과외 리스트 값을 넣으면 될 것 같습니다.*/}
                            {/* <Dropdown className = "selectLecture" options={lectures} onChange={(select) => setTitle(select)} value={title} placeholder="Select an option"  /> */}
                           <select name="lectureselect"  onChange={(e) => setTitle(e.target.value)}>
                           {
                                lectures?.map((data) => (
                                   <option value={data}>{data}</option>
                                ))
                            }
                            {console.log(title)}
                           </select>
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