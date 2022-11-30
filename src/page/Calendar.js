import React, { useState, useRef, useEffect } from 'react'
import '../styles/Calendar.css'
import FullCalendar, { EventClickArg, EventContentArg } from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick
import timeGridPlugin from '@fullcalendar/timegrid';
import '../../node_modules/@fullcalendar/common/main.css';
//import listPlugin from '@fullcalendar/list';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import CalendarAddEvent from '../components/modals/CalendarAddEvent'
import '../styles/CalendarAddEvent.css'
import listPlugin from '@fullcalendar/list';
import {call,signout} from "../service/ApiService.js";
import moment from 'moment';
import {API_BASE_URL}  from "../api-config.js";

const ACCESS_TOKEN = "ACCESS_TOKEN";


export default function Calendar() {
    let headers = new Headers({
        "Content-Type": "application/json",
    });

    //로컬 스토리지에서 ACESS TOKEN 가져오기
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    if(accessToken && accessToken !== null){
        headers.append("Authorization","Bearer "+accessToken);
    }

    const [state, setState] = useState({ eventlist: [
        
    ]});
    const calendarRef = useRef(null);
    const [modalOpen, setModalOpen ] = useState(false); 
    const [isLecture, setIsLecture] = useState(false);

    const [addedevent, setAddedevent] = useState({
        id: "",
        lectureTitle: "",
        start:  moment().format("yyyy-MM-dd HH:mm"),
        end:  moment().format("yyyy-MM-dd HH:mm")
    });

    // useEffect(() => {
    //     call("/eple/v1/calendar/schedule", "GET", null).then((response) =>{
    //         setState({items: response.data});
    //     });
    // }, []);

    const onEventAdded = (added) => {
        let calendarApi = calendarRef.current.getApi();
        calendarApi.addEvent(added);
        // call("eple/v1/calendar/schedule", "POST", added).then((response) =>
        //     setState({ events: response.data })
        // );
    };


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
    async function addEventData(){
        const thisEvents = state.eventlist;
        thisEvents.push(addedevent); // 배열에 아이템 추가
        // setState({ eventlist: thisEvents }); // 업데이트는 반드시 this.setState로 해야됨.
        // console.log("events : ", state.eventlist);
        // console.log(added)
        fetch(API_BASE_URL+"/eple/v1/calendar/schedule",{
            headers: headers,
            method: "POST",
            body: addedevent,
        }
        
        ).then((response) =>
        setState({ eventlist: response.data })
    );
    console.log("handleDataName : " ,addedevent);
        console.log("eventlist : ", state.eventlist)
        //await axios.post("http://prod-eple-crystal-api-service.ap-northeast-2.elasticbeanstalk.com/eple/v1/calendar/schedule", addedevent)
    }
    
    function handleDataName(event){
        const thisEvents = state.eventlist;
        addedevent.lectureTitle = JSON.stringify(event.title);
        addedevent.start = moment(event.start).format("yyyy-MM-dd HH:mm");
        addedevent.end = moment(event.end).format("yyyy-MM-dd HH:mm");
        addedevent.id = "ID-" + thisEvents.length;
        
        return addedevent;
    }
    
    const [hoverBtn, setHover] = useState(false);
    // function getEvent(id){
    //     let calendarApi = calendarRef.current.getApi();
    //     calendarApi.getEventById(id);
    // }

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
                        
                            //alert('Clicked on: ' + info.dateStr);//날짜 클릭하면 뭐 나옴}
 
                      }}
                    eventClick = {function(info) {
                    if(window.confirm("일정을 삭제하시겠습니까?")){
                        info.event.remove();
                    }
                        //delete event from calender
                    }} 
                    // event = {getEventById(

                    // )
                    // }
                   
                   
                    
                    
                    // events={{
                    //     url: '/myfeed.php',
                    //     method: 'POST',
                    //     extraParams: {
                    //         custom_param1: 'something',
                    //         custom_param2: 'somethingelse'
                    //     },
                    //     // failure: function () {
                    //     //     alert('정보가 없습니다!');
                    //     // },
                    //     color: 'yellow',   // a non-ajax option
                    //     textColor: 'black' // a non-ajax option
                    // }}

                //eventAdd = {event => handleEventAdd(event)}
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
                
                <div>
                    {/* <CalendarAddEvent className = "addEvent" isOpen={this.state.modalOpen} onClose={() => {this.setState ({modalOpen : false})}} onEventAdded={added => this.onEventAdded(added)} /> */}
                </div>

            </section>
            <section className="Calendar2">
                <FullCalendar className="FullCalendar2"
                    plugins={[listPlugin]}
                    initialView="listDay"
                    height={550}
                    headerToolbar={false}
                
                //eventAdd = {event => handleEventAdd(event)}
                />
            </section>
            <CalendarAddEvent 
            isLecture = {isLecture} 
            isOpen = {modalOpen} 
            onClose = {()=> {setModalOpen(false); addEventData(addedevent)}} 
            onEventAdded={(added) => {onEventAdded(added); handleDataName(added)}}
            
            />

        </div>



    )
    //moment 타입으로 바꿔보기
    //ID 추가



}



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

















