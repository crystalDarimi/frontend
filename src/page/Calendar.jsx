import React, { useState, useRef, useEffect } from 'react'
import '../styles/Calendar.css'
import FullCalendar, { EventClickArg, EventContentArg } from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick
import timeGridPlugin from '@fullcalendar/timegrid';

//import '@fullcalendar/common/main.css';
//import listPlugin from '@fullcalendar/list';
import AddIcon from '@mui/icons-material/Add';
//import axios from 'axios';
import CalendarAddEvent from '../components/modals/CalendarAddEvent'
import '../styles/CalendarAddEvent.css'
import listPlugin from '@fullcalendar/list';
import {call,signout} from "../service/ApiService";
import moment from 'moment';
import {useNavigate} from "react-router-dom";
import Modal from 'react-modal';
import {API_BASE_URL}  from "../api-config.js";
const ACCESS_TOKEN = "ACCESS_TOKEN";

// export function updateOrDelete(){  
//     return(
//             <div className='updateOrDeleteButtons'>
//                 <button className='Update'onMouseEnter={openMouseHover} onMouseLeave= {closeMouseHover} onClick={()=> {setModalOpen(true); setIsLecture(false)}}>일정 수정하기</button>
//                 <button className='Delete'>삭제하기</button>
//             </div>
//     )
// }
//무시하셔도 좋습니다... 삭제 수정 시도해본 것입니다..

export default function Calendar(user) {
    const [state, setState] = useState({ eventlist: []});
    const calendarRef = useRef(null);
    const [modalOpen, setModalOpen ] = useState(false); 
    const [isLecture, setIsLecture] = useState(false);
    const [addedData, setAddedData] = useState({
        lectureTitle: "", //백엔드쪽에서 받는 객체 날짜 포멧을 맞춰서 저장할 것입니다!
        start:  "",
        end: "",
    });
    const [addedCalendar, setAddedCalendar] = useState({
        title: "", //fullcalendar쪽에서 받는 객체 속성값 이름을 title로 맞추어주어야해서 백엔드에서 받아온 lectureTitle 값을 여기 저장해서 이걸 fullcalendar에 저장할 것입니다!
        start:  "",
        end: "",
    });


    async function onEventAdded(added){
        let calendarApi = calendarRef.current.getApi();
        await calendarApi.addEvent(added);
    };


    function addEventData(added){
        const thisEvents = state.eventlist;
        thisEvents.push(added); // 배열에 아이템 추가
        setState({ eventlist: thisEvents }); // 업데이트는 반드시 this.setState로 해야됨.
        console.log("events : ", state.eventlist);
        console.log(added);    
    }

    function handleDataName(added){ //이 함수가 lectureTitle을 title로 바꾸고 date 포멧도 맞춰주는 함수입니다.

        //첫번째는 fullcalendar에 들어가는 lectureTitle을 title로 변경한 것입니다.
        //const thisEvents = state.eventlist;
        addedCalendar.title = added.lectureTitle;
        addedCalendar.start = added.start;
        addedCalendar.end = added.end;

        //두번째는 post시에 들어갈 날짜는 백엔드에서 설정한 포멧으로 맞추는 코드입니다.
        addedData.lectureTitle = added.lectureTitle;
        addedData.start = moment(added.start).format("yyyy-MM-dd HH:mm");
        addedData.end = moment(added.end).format("yyyy-MM-dd HH:mm");

        onEventAdded(addedCalendar);   
        addEventData(addedData);
        // addedevent.scheduleId = "ID-" + thisEvents.length;
        call("/eple/v1/calendar/schedule", "POST", addedData);
    }
    
    
    const [hoverBtn, setHover] = useState(false);

    //만들기 버튼 위에 커서 올리면 일정, 과외 추가버튼 나오게 조절하는 함수
    function openMouseHover(){
        setHover(true);
    }
    function closeMouseHover(){
        setHover(false);
    }

    return (
       
        <div className='Calendar'>

            <div className="PageNameCalendar">
                <p>Calendar</p>
            </div>
            <section className="Calendar1">
                <FullCalendar className="FullCalendar1"
                    ref = {calendarRef}
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    headerToolbar={{
                        left: "prev next",
                        center: "title",
                        right: "dayGridMonth timeGridWeek today"
                    }}
                    initialView="dayGridMonth"
                    contentHeight={550}
                    selectable={true} //날짜 드래그 선택
                    editable={true} //일정 옮김
                    dayHeaderFormat={{
                        weekday: 'long'
                    }}
                
                    // event = {{
                    //     onEventAdded
                    // }}
                    
                    dateClick = {function(info) {
                        //날짜 클릭하면 발생하는 이벤트 설정 가능
                      }}
                    eventClick = {function(info) {//이벤트 클릭하면 삭제 알림창 뜨고 확인 누르면 삭제
                        if(window.confirm("일정을 삭제하시겠습니까?")){
                            info.event.remove();
                        }
                        //삭제는 구현해놓았습니다.
                    /* { <div className='updateOrDeleteButtons'>
                        <button className='Update'onMouseEnter={openMouseHover} onMouseLeave= {closeMouseHover} onClick={()=> {setModalOpen(true); setIsLecture(false)}}>일정 수정하기</button>
                        <button className='Delete'>삭제하기</button>
                    </div>} 수정 추가해서 진행 중인 부분으로 일단을 무시하셔도 됩니다! */
                    }}                    
                    
                />
                <div>
                <button className="PlusBtn"  onMouseEnter={openMouseHover} >
                    <AddIcon />
                    <div className='PlusBtnWord'>
                        만들기
                    </div> 
                </button>
                {hoverBtn && <div className='hoverButtons'>
                    <button className='schedule'onMouseEnter={openMouseHover} onMouseLeave= {closeMouseHover} onClick={()=> {setModalOpen(true); setIsLecture(false)}}>일정 추가</button>
                    <button className='lecture'onMouseEnter={openMouseHover} onMouseLeave={closeMouseHover} onClick={()=> {setModalOpen(true); setIsLecture(true)}}>과외 추가</button>
                    </div>}
                </div>
            </section>
            <section className="Calendar2">
                {/* <FullCalendar className="FullCalendar2"
                    plugins={[listPlugin]}
                    initialView="listDay"
                    height={550}
                    headerToolbar={false}
                //데일리창에 대한 부분... v1에서는 무시해주세요.
                //eventAdd = {event => handleEventAdd(event)}
                /> */} 
            </section>
            {/*이벤트 추가 모달 컴포넌트를 띄우는 부분입니다.*/}
            <CalendarAddEvent 
            isLecture = {isLecture} 
            isOpen = {modalOpen} 
            onClose = {()=> setModalOpen(false)} 
            onEventAdded={(added) => { handleDataName(added); }}
            
            />

        </div>



    )
    //moment 타입으로 바꿔보기
    //ID 추가



}




    // const addEventData = (events) => {

    //     const thisEvents = state.events;
    //     events.id = "ID-" + thisEvents.length; // key를 위한 id추가
    //     thisEvents.push(events); // 배열에 아이템 추가
    //     setState({ events: thisEvents }); // 업데이트는 반드시 this.setState로 해야됨.
    //     console.log("events : ", state.events);




    //     call("eple/v1/calendar/schedule", "POST", events).then((response) =>
    //         setState({ events: response.data })
    //     );
    // };
    
// 과외에서 입력한 색상! 추가할 때 적용되게
// 가능하다면 필터..
    // const onEventAdded = added => {
    //     let calendarApi = calendarRef.current.getApi();
    //     calendarApi.addEvent(added);  
    //     }
    // const onEventGet = added => {
    //     call("eple/v1/calendar/{calendarid}", "GET", added).then((response) =>
    //         setState({ events: response.data })
    //     );
    //     let calendarApi = calendarRef.current.getApi();
    //     calendarApi.getEvent(added);
    //     // let calendarApi = calendarRef.current.getApi();
    //     // calendarApi.getEvent();
    //     //수정 필요
    //     }
    // const onEventDeleted = deleted => {
    // call({/*"/eple/v1/mystudent/lecture"*/}, "DELETE", deleted).then((response) =>
    //         setState({ deleted: response.data })
    //     );
    //     let calendarApi = calendarRef.current.getApi();
    //     calendarApi.remove();

    // }



// function setEvents(){
//     console.log("나수정 6:00");
// }
// function saveEvents(e){
//     console.log(e.target.value);
// }
// export default class Calendar extends React.Component {


//     // onEventAdded(added) {
//     //     let calendarApi = this.calendarRef.current.getApi();
//     //     calendarApi.addEvent(added);
//     // }
//     // onEventDeleted(deleted) {
//     //     let calendarApi = this.calendarRef.current.getApi();
//     //     calendarApi.remove(deleted);
//     // }

//     // async functio handleEventAdd(data) {

//     // }

//     // state = {}

//     // componentDidMount() {
//     //     this._getEvents();
//     // }

//     // _getEvents = async () => {
//     //     const events = await this._axiosEvents();
//     //     this.setState({
//     //         events
//     //     })
//     // }

//     // _axiosEvents = () => {
//     //     return axios.get('/test')
//     //         .then(res => res.data)
//     // } //백엔드,, 연결해보기
//     render() {
//         return (

//             <div className='Calendar'>
//                 <div className="PageNameCalendar">
//                     <p>Calendar</p>
//                 </div>
//                 <section className="Calendar1">
//                     <FullCalendar className="FullCalendar1"
                        
//                         plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
//                         headerToolbar={{
//                             left: "prev next",
//                             center: "title",
//                             right: "dayGridMonth timeGridWeek today"
//                         }}
//                         initialView="dayGridMonth"
//                         contentHeight={550}
//                         selectable={true} //날짜 드래그 선택
//                         editable={true} //일정 옮김
//                         dayHeaderFormat={{
//                             weekday: 'long'
//                         }}
//                         // events={this.state.event}
//                         // events={[
//                         //     { color: 'green', title: '나수정 과외', date: '2022-10-07' },
//                         //     { title: '김수정 과외', date: '2022-10-12' }
//                         // ]}
//                         dateClick={handleDateClick}
//                         events={{
//                             url: '/myfeed.php',
//                             method: 'POST',
//                             extraParams: {
//                                 custom_param1: 'something',
//                                 custom_param2: 'somethingelse'
//                             },
//                             // failure: function () {
//                             //     alert('정보가 없습니다!');
//                             // },
//                             color: 'yellow',   // a non-ajax option
//                             textColor: 'black' // a non-ajax option
//                         }}

//                     //eventAdd = {event => handleEventAdd(event)}
//                     />
//                     <button className="PlusBtn"/* onClick={this.state.modalOpen = { modalOpen: true }} */>
//                         <AddIcon />
//                         <div className='PlusBtnWord'>
//                             만들기
//                         </div>
//                     </button>
//                     <div>
//                         { /*<CalendarAddEvent className = "addEvent" isOpen={this.state.modalOpen} onClose={() => {this.setState ({modalOpen : false})}} onEventAdded={added => this.onEventAdded(added)} /> */}
//                     </div>

//                 </section>
//                 <section className="Calendar2">
//                     <FullCalendar className="FullCalendar2"
//                         plugins={[listPlugin]}
//                         initialView="listDay"
//                         contentHeight={550}
//                         headerToolbar={{
//                             right: false,
//                             left: false,
//                             center: "        ",
//                         }}
//                     //eventAdd = {event => handleEventAdd(event)}
//                     />
//                 </section>

//             </div>



//         )


//     }

// }

















