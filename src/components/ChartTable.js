import "../styles/MyClass.css";
import React, { useState, useRef } from "react";
import AddChart from "./modals/AddChart";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { call } from "../service/ApiService";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

const ChartTable = () => {
    const [info, setInfo] = useState([]);
    const lectureNum = useRef(1);
    const [modalOpen, setModalOpen ] = useState(false); 
    const [lectureEntity, setLectureEntity] = useState(null)

    const options = [
        'one', 'two', 'three'
    ]
    const defaultOption = options[0];

    const handleRemove = ({id}) => {
        const newInfo = info.filter((data) => data.id !== id)
        setInfo(newInfo);
        let i = 0;
        for (; i < info.length; i++) 
            {
                if(info[i].id >= id){
                    info[i].id--;
                }
            }
            lectureNum.current = i;
    }



    const handleSave = async (data) => {
        setInfo(info => info.concat(
            {
                id: lectureNum.current,
                title: data.title,
                content: data.content,
                homework: data.homework,
                createdAt: data.createdAt,
                updatedAt: data.updatedAt,
                user_id: data.user_id
                // number: lectureNum.current,
                // date: data.date,
                // contents: data.contents,
                // homework: data.homework,
                // homeworkOX: data.homeworkOX,
                // progress: data.progress
            }
        ))
        lectureNum.current += 1;
        //await call("eple/v1/calender/myclass", "POST", info);
        
    }
    return (
        <div className='ProgressChart'>

            <div className="PageName PageNameProgressChart">
                <p>학습 진도표</p>
            </div>
            <section className="Chart">
            <div className="myClassHeader">
                <div className="dropdowngroup">
                <label className="text myclassdropdown">수업 선택</label>
                <Dropdown className = "selectmyclass" options={options} onChange={(lecture) => setLectureEntity(lecture)} value={defaultOption} placeholder="Select an option"  />      
                </div> 
                <button className='add'onClick={()=> {setModalOpen(true)}}>기록 추가</button>
            </div>
                <table className="ChartTable">
                    <thead>
                       <tr>
                        <th>클래스 번호</th>
                        <th>수업 이름</th>
                        <th>학습 내용 및 진도</th>
                        <th>숙제</th>
                        <th>생성 날짜</th>
                        <th>수정 날짜</th>
                        <th>작성자</th>
                        <th>삭제</th>
                        </tr>
                    </thead>
                    <tbody>
                        {info.map(({id, title,content, homework, createdAt, updatedAt, user_id }) => (
                            <tr key={id + title + content + homework + createdAt + updatedAt + user_id}>
                                <td>{id}</td>
                                <td>{title}</td>
                                <td>{content}</td>
                                <td>{homework}</td>
                                <td>{createdAt}</td>
                                <td>{updatedAt}</td>
                                <td>{user_id}</td>
                                <td><DeleteIcon onClick = {() =>handleRemove({id})}/></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                
                <AddChart isOpen = {modalOpen} onClose = {()=> setModalOpen(false)} onChartAdded={(data) => handleSave(data)}/>
            </section>
        </div>
    )
}
export default ChartTable;