import "../styles/MyClass.css";
import React, { useState, useRef } from "react";
import AddChart from "./modals/AddChart";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const ChartTable = () => {
    const [info, setInfo] = useState([]);
    const lectureNum = useRef(1);
    const [modalOpen, setModalOpen ] = useState(false); 

    const handleRemove = (lectureNum) => {
        setInfo(info => info.filter(data => data.lectureNum !== lectureNum))
        lectureNum.current -= 1; //삭제시 회차 수정 필요!
    }

    const handleSave = (data) => {
        setInfo(info => info.concat(
            {
                number: lectureNum.current,
                date: data.date,
                contents: data.contents,
                homework: data.homework,
                homeworkOX: data.homeworkOX,
                progress: data.progress
            }
        ))
        lectureNum.current += 1;
    }
    return (
        <div className='ProgressChart'>

            <div className="PageName PageNameProgressChart">
                <p>학습 진도표</p>
            </div>
            <section className="Chart">
                <table className="ChartTable">
                    <thead>
                        <th>회차</th>
                        <th>수업 일시</th>
                        <th>학습 내용 및 진도</th>
                        <th>숙제</th>
                        <th>O, X</th>
                        <th>수행도</th>
                        <th>수정</th>
                        <th>삭제</th>
                    </thead>
                    <tbody>
                        {info.map(({ number, date, contents, homework, homeworkOX, progress }) => (
                            <tr key={number + date + contents +homework +homeworkOX+ progress}>
                                <td>{number}</td>
                                <td>{date}</td>
                                <td>{contents}</td>
                                <td>{homework}</td>
                                <td>{homeworkOX}</td>
                                <td>{progress}</td>
                                <td><EditIcon/></td>
                                <td><DeleteIcon onClick = {() => handleRemove()}/></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button className='add'onClick={()=> {setModalOpen(true)}}>기록 추가</button>
                <AddChart isOpen = {modalOpen} onClose = {()=> setModalOpen(false)} onChartAdded={(data) => handleSave(data)}/>
            </section>
        </div>
    )
}
export default ChartTable;