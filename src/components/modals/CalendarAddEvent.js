import React, { useState, useRef } from "react";
import DatePicker from "react-datepicker";
/* import Datetime from 'react-datetime'; */
import { setExtendedProp } from '@fullcalendar/react'
import "react-datepicker/dist/react-datepicker.css";
import '../../styles/CalendarAddEvent.css'
import Modal from 'react-modal';
import {TextField}  from "@mui/material";


export default function CalendarAddEvent({ isLecture, isOpen, onClose, onEventAdded, changeName}/* { isOpen, onClose, onEventAdded } */) {
    const [title, setTitle] = useState("");
    const [start, setStart] = useState(new Date());
    const [end, setEnd] = useState(new Date());

    const [state, setState] = useState({
        title: "",
        start: "",
        end: ""
    })

    const onSubmit = (event) => {
        event.preventDefault();
        onEventAdded({
            title,
            start,
            end
        })
        onClose();
        // changeName({
        //     lectureTitle: {title},
        //     start: {start.toIS}

        // })
    }
    //if문으로 일정 과외 나누기

    return (

        <div className="addEvntBase">

            <Modal appElement={document.getElementById('app')}  ariaHideApp={false} isOpen={isOpen} onRequestClose={onClose} className="addEvntModal">
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


                </form>}
                {isLecture && <form onSubmit={onSubmit} className="addEvntForm">
                    <div className="addEvntFormInsider">
                        <div>
                            <label className="text eventTitle">과외 제목</label><br></br>
                            <input className="UserInput inputTitle" placeholder="일정 제목" value={title} name = "LectureTitle"onChange={(e) => setTitle(e.target.value)} />
                        </div>

                        <div>
                            <label className="text eventStart">과외 시작</label>
                            <DatePicker className="UserInput inputStart start" showTimeSelect timeIntervals={15} timeCaption="Time" name = "start"selected={start} dateFormat="MM/dd/yyyy h:mm aa" onChange={(start) => {setStart(start).format("YYYY-MM-DDTHH:mm:sszz"); setEnd(null).format("YYYY-MM-DDTHH:mm:sszz")}} />
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