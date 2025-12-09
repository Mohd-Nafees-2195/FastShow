import { ClockIcon } from "lucide-react";
import React, { useState } from "react"
import isoTimeFormat from "../lib/isoTimeFormat";
import { useNavigate } from "react-router-dom";

const TimeCard=({item})=>{

    const[selectedTime,setSelectedTime]=useState(null);
    const navigate=useNavigate();

    // console.log(item.time+" nafees");
    const onSelectedTime=()=>{
      navigate('/movies/layout/'+item.showId+'/'+item.time);
    }
    
    return (
     <div key={item.time} className="fw-60 bg-primary/10 border border-primary/20 rounded-lg 
       py-2 h-max md:sticky md:top-30 m-1 cursor-pointer transition hover:bg-primary/20" onClick={onSelectedTime}>
        <div className="mt-5 space-y-1">
          {/* {show.dateTime[date].map((item)=>( */}
            <div className="flex items-center gap-1 px-4 py-1 w-max rounded-r-md 
              cursor-pointer transition">
                <p className="text-sm">{item.ScreenName}</p>
            </div>
            <div key={item.time}
              className={`flex items-center gap-2 px-4 py-1 w-max rounded-r-md`}>
              <ClockIcon className="w-4 h-4"/>
              <p className="text-sm">{isoTimeFormat(item.time)}</p>
            </div>
          {/* ))} */}
        </div>
      </div>
    )
}

export default TimeCard

{/* <div key={item.time} onClick={()=>setSelectedTime(item)} 
              className={`flex items-center gap-2 px-4 py-1 w-max rounded-r-md 
              cursor-pointer transition ${selectedTime?.time===item.time ? 
               'bg-primary text-white':'hover:bg-primary/20'} `}>
              <ClockIcon className="w-4 h-4"/>
              <p className="text-sm">{isoTimeFormat(item.time)}</p>
            </div> */}