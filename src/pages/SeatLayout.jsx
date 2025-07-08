import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { dummyDateTimeData, dummyShowsData } from "../assets/assets";
import Loading from "../components/Loading";

const SeatLayout = () => {

  const {id,date}=useParams();

  const[selectedDate,SetSelectedDate]=useState([]);
  const[selectedTime,SetSelectedTime]=useState(null);
  const[show,setShow]=useState(null);

  const navigate=useNavigate();

  const getShow=async ()=>{
    const show=dummyShowsData.find(show=> show._id===id);
    if(show){
      setShow({
        movie:show,
        dateTime:dummyDateTimeData
      })
    }
  }

  useEffect(()=>{
    setShow();
  },[])

  return show ? (
     <div className="">

     </div>
  ) : (
    <Loading/>
  )
};
export default SeatLayout;
