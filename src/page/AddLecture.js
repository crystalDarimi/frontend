// import React, {useState} from "react";

// import {Button , Grid, TextField,Paper } from "@mui/material";
/*
class AddLecture extends React.Component {
    constructor(props) {
        super(props);
        this.state = { item: { title: "" } };
        this.add = props.add;
    }
    onInputChange = (e) => {
        const thisItem = this.state.item;
        thisItem.title = e.target.value;
        this.setState({ item: thisItem });
        console.log(thisItem);
    };
    onButtonClick = () => {
        this.add(this.state.item);
        this.setState({ item: { title: "" } });
    };
    enterKeyEventHandler = (e) => {
        if (e.key === "Enter") {
            this.onButtonClick();
        }
    };
    render() {
        return (
            <Paper style={{ margin: 16, padding: 16 }}>
                <Grid container>
                    <Grid xs={11} md={11} item style={{ paddingRight: 16 }}>
                        <TextField
                            placeholder="Add Lecture here"
                            fullWidth
                            onChange={this.onInputChange}
                            value={this.state.item.title}
                            onKeyPress={this.enterKeyEventHandler}
                        />
                    </Grid>
                    <Grid xs={1} md={1} item>
                        <Button
                            fullWidth
                            color="secondary"
                            variant="outlined"
                            onClick={this.onButtonClick}
                        >
                            +
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        );
    }
}
*/


// const AddLecture = (props) =>{
// //사용자의 입력을 저장할 오브젝트
// //const [item , setItem] = useState({item: {lectureTitle:""}});
//     const [state, setState] = useState({item: {lectureTitle:""}});
//     const addItem = props.addItem;



//     //onInputChange 함수
//     const onInputChange = (e) =>{
//         const thisItem = state.item;
//         thisItem.lectureTitle=e.target.value;
//         setState({item:thisItem});
//         console.log(thisItem);
//     };

//     //onButtonClick 함수
//     const onButtonClick =()=> {
//         addItem(state.item);
//         setState({item:{lectureTitle: ""}});//addItem 함수 사용
//         //setItem({lectureTitle:""});
//     }

//     //enterKeyEvent 함수
//     const enterKeyEventHandler =(e) =>{
//         if(e.key === "Enter"){
//             onButtonClick();
//         }
//     };

//     //onInputChange 함수 ~ TextField 연결
//     return(
//         <Paper style = {{ margin: 16, padding: 16 }}>
//             <Grid container>
//                 <Grid xs ={11} md={11} item style={{paddingRight:16}}>
//                     <TextField placeholder="Add Lecture here"
//                                fullWidth
//                                onChange={onInputChange}

//                                value={state.item.lectureTitle}
//                                onKeyPress={enterKeyEventHandler}
//                     />
//                 </Grid>
//                 <Grid xs ={1} md={1} item>
//                     <Button fullWidth style={{height:'100%'}} color ="secondary" variant="outlined"
//                             onClick={onButtonClick}>
//                         +
//                     </Button>
//                 </Grid>
//             </Grid>
//         </Paper>
//     );
// }










// export default AddLecture;


import React, {useState} from 'react';
// import '../styles/AddmyStudents.css'
import DatePicker from "react-datepicker";
// import Header from './../components/Header';
import axios from 'axios';
import {useNavigate} from "react-router-dom";




const AddLecture = () => {
        const [color,setColor]=useState('');
        console.log(color);

        let navigate = useNavigate()

        const [user, setUser] = useState({
            lectureTitle:"",
            stdName:"",
            cycle:"",
            fee:"",
            minutesPerOnce:"",
            dayOne:"",
            dayTwo:"",
            stdNumber:"",
            momNumber:"",
            schoolAge:""
        })

        const{lectureTitle, cycle, fee, minutesPerOnce, dayOne, dayTwo, stdNumber, momNumber, schoolAge, stdName} = user

        const onInputChange=(e) =>{
            setUser({...user,[e.target.name]:e.target.value})
        }

        const onSubmit= async(e)=>{
            e.preventDefault();
            
            await axios.post("http://prod-eple-crystal-api-service.ap-northeast-2.elasticbeanstalk.com/eple/v1/mystudent/lecture", user) // url넣어둠
            navigate("/mystudents") // mystudents페이지로 이동하도록
            console.log(e)
        }

        return (
            <form >
                <div className='AddLecture'>
                        {/* <Header>
                            <h1>mystudents</h1>
                        </Header> */}
                    <div className="container">
                        <div className="lectureTitle">
                            <label>과외 이름</label>
                            <input name="lectureTitle" type="text" value={lectureTitle} onChange={(e)=>onInputChange(e)}/>
                        </div>
                        <div className="color">
                            <div style={{background:'red',width:'50px',height:'50px'}} onClick={()=>setColor('red')}/>
                            <div style={{background:'blue',width:'50px',height:'50px'}} onClick={()=>setColor('blue')}/>
                            <div style={{background:'yellow',width:'50px',height:'50px'}} onClick={()=>setColor('yellow')}/>
                            <div style={{background:'black',width:'50px',height:'50px'}} onClick={()=>setColor('black')}/>
                            <div style={{background:'grey',width:'50px',height:'50px'}} onClick={()=>setColor('grey')}/>
                            <input name={'color'} placeholder={color}/>
                        </div>
                        <div className="cycle">
                            <label>입금 주기</label>
                            <input name="cycle" type="number" value={cycle} onChange={(e) => onInputChange(e)} />
                        </div>
                        <div className="minutesPerOnce">
                            <label>과외 1회당 진행 시간</label>
                            <input name="minutesPerOnce" type="number" value={minutesPerOnce} onChange={(e) => onInputChange(e)} />
                        </div>
                        <div className="dayOne">
                            <label>과외 요일 1</label>
                            <input name="dayOne" type="number" value={dayOne} onChange={(e) => onInputChange(e)} />
                        </div>
                        <div className="dayTwo">
                            <label>과외 요일 2</label>
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
                            <label>나이/학교</label>
                            <input name="schoolAge" value={schoolAge} onChange={(e) => onInputChange(e)} />
                        </div>
                        <div className="btn">
                            <button type="submit"  onSubmit={e => onSubmit(e)}>작성완료</button>
                        </div>
                        </div>
                       
                </div>
            </form>
    );
}

export default AddLecture;