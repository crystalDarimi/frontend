import "../styles/MyClass.css";
import React, { useState, useRef, useEffect } from "react";
import AddChart from "./modals/AddChart";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { call } from "../service/ApiService";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { } from "../service/ApiService"; 
import moment from "moment";
const TEACHER = "TEACHER";

const ChartTable = () => {
    const [info, setInfo] = useState([]);
    const lectureNum = useRef(1);
    const [modalOpen, setModalOpen] = useState(false);
    const [lectureEntity, setLectureEntity] = useState(null);
    const [lectures, setLectures] = useState([]);

    const options = [
        'one', 'two', 'three'
    ]
    const defaultOption = options[0];

    const handleRemove = ({ id }) => {
        const newInfo = info.filter((data) => data.id !== id)
        call("/eple/v1/calender/myclass", "DELETE", id)
        setInfo(newInfo);
        let i = 0;
        for (; i < info.length; i++) {
            if (info[i].id >= id) {
                info[i].id--;
            }
        }
        lectureNum.current = i;

    }

    useEffect(()=>{
        loadInfo();
    },[]);

    const loadInfo =  async() => {
        const result = await call("/eple/v1/myclass");
        setInfo(result.data);
    }

    function showButton(){
        if(localStorage.getItem("role") === TEACHER){
            return(<button className='add' onClick={() => { setModalOpen(true) }}>기록 추가</button>)
        }
    }


    const handleSave = async (data) => {
        setInfo(info => info.concat(
            {
                id: lectureNum.current,
                title: data.title,
                content: data.content,
                homework: data.homework,
                createdAt: moment(Date()).format("yyyy-MM-dd HH:mm"),
                //updatedAt: data.updatedAt,
                user_id: localStorage.getItem("username")
                // number: lectureNum.current,
                // date: data.date,
                // contents: data.contents,
                // homework: data.homework,
                // homeworkOX: data.homeworkOX,
                // progress: data.progress
            }
        ))
        lectureNum.current += 1;
        console.log()
        await call("/eple/v1/calender/myclass", "POST", info);


    }
    return (
        <div className='ProgressChart'>

            <div className="PageName PageNameProgressChart">
                <p>My Class</p>
            </div>
            <section className="Chart">
                <div className="myClassHeader">
                    <div className="dropdowngroup">
                        <label className="text myclassdropdown">수업 선택</label>
                        <Dropdown className="selectmyclass" options={lectures} onChange={(lecture) => setLectureEntity(lecture)} value={defaultOption} placeholder="Select an option" />
                    </div>
                    {showButton()} {/*선생님만 기록 추가 가능 */}
                    
                </div>
                <table className="ChartTable">
                    <thead>
                        <tr>
                            <th>회차</th>
                            <th>수업 이름</th>
                            <th>학습 내용 및 진도</th>
                            <th>숙제</th>
                            <th>생성 날짜</th>
                            {/* <th>수정 날짜</th> */}
                            <th>작성자</th>
                            <th>삭제</th>
                        </tr>
                    </thead>
                    <tbody>
                        {info.map(({ id, title, content, homework, createdAt, updatedAt, user_id }) => (
                            <tr  height = "100px" key={id + title + content + homework + createdAt + updatedAt + user_id}>
                                <td width= "50px">{id}</td>
                                <td>{title}</td>
                                <td>{content}</td>
                                <td>{homework}</td>
                                <td width= "100px">{createdAt}</td>
                                {/* <td>{updatedAt}</td> */}
                                <td>{user_id}</td>
                                <td><DeleteIcon onClick={() => handleRemove({ id })} /></td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <AddChart isOpen={modalOpen} onClose={() => setModalOpen(false)} onChartAdded={(data) => handleSave(data)} />
            </section>
        </div>
    )
}
export default ChartTable;