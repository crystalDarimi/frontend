import React, { useState, useRef } from "react";
import Modal from 'react-modal';


export default function AddChart({ isOpen, onClose, onChartAdded }) {
    const [number, setNumber] = useState(null);
    const [date, setDate] = useState(" ");
    const [contents, setContents] = useState(" ");
    const [homework, setHomework] = useState(" ");
    const [homeworkOX, setHomeworkOX] = useState(" ");
    const [progress, setProgress] = useState(" ");


    const onSubmit = (data) => {
        data.preventDefault();
        onChartAdded({
            number,
            date,
            contents,
            homework,
            homeworkOX,
            progress
        })
        onClose();
    }
    //if문으로 일정 과외 나누기

    return (

        <div className="addChart">
            <Modal isOpen={isOpen} onRequestClose={onClose} className="addChartModal">
                <form onSubmit={onSubmit} className="addChartForm">

                    <div className="addChartFormInsider">
                        {/* <div>
                        <input className="UserInput inputNumber" value={number} onChange={(e) => setNumber(e.target.value)} />
                            <label className="numberOfLecture">회차</label><br></br>
                            
                        </div> */}

                        <div>
                            <label className="text chartDate">수업 일시</label>
                            <input type = 'date' className="UserInput lectureDate" value={date} onChange={(e) => setDate(e.target.value)} />

                        </div>

                        <div>
                            <label className="lectureContents">학습 내용 및 진도</label>
                            <textarea className="lectureContents" value={contents} onChange={(e) => setContents(e.target.value)} />
                        </div>

                        <div>
                            <label className="homework">숙제</label>
                            <input className="homework" value={homework} onChange={(e) => setHomework(e.target.value)} />
                        </div>
                        <div>
                            <label className="homeworkOX">O, X</label>
                            <select className="homeworkOX" value={homeworkOX} onChange={(e) => setHomeworkOX(e.target.value)}>
                                <option>○</option>
                                <option>X</option>
                                <option>△</option>
                            </select>
                        </div>
                        <div>
                            <label className="progress">수행도</label>
                            <textarea className="progress" value={progress} onChange={(e) => setProgress(e.target.value)}/>
                        </div>

                        <div>
                            <button type="submit" className="closeBtn" /*  onClick={() => closeModal(false)} */>저장하기</button>
                        </div>
                    </div>


                </form>
            </Modal>
        </div>

    )

}