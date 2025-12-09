import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { assets, dummyDateTimeData, dummyShowsData } from "../assets/assets";
import Loading from "../components/Loading";
import {ArrowRightIcon, ClockIcon} from 'lucide-react'
import isoTimeFormat from "../lib/isoTimeFormat";
import BlurCircle from "../components/BlurCircle";
import toast from 'react-hot-toast'
import axios from "axios";
import getShowSheet from "../lib/getShowSheet";

const SeatLayout = () => {

  const {id,time}=useParams();

  const groupRows=["A","B","C"];

  const[selectedSeats,setSelectedSeats]=useState([]);
  // const[selectedTime,setSelectedTime]=useState(null);
  // const[show,setShow]=useState(null);
  const[showSheets,setShowSheets]=useState(null);


  const navigate=useNavigate();

  const getShow=async ()=>{
    axios.get('http://localhost:8080/shows/'+id) 
    .then(response => {
            if(response.data.show){
              //console.log(response.data.show.showSheets);
              // setShow(response.data.show);
              setShowSheets(getShowSheet(response.data.show.showSheets));
              // console.log(getShowSheet(response.data.show.showSheets));
            }
        })
        .catch(error => {
            // console.error('Error fetching data:', error);
            toast("Invalid show");
        });
  }

  const handleSeatClick=(seatId)=>{
    // if(!selectedTime){
    //   return toast("Please Select Time First");
    // }
    if(!selectedSeats.includes(seatId)&&selectedSeats.length>4){
      return toast("You can select 5 seats max");
    }
    setSelectedSeats(prev=>prev.includes(seatId)?prev.filter(seat=>seat!==seatId):[...prev,seatId]);
  }

  const renderSeates=(row,showSheet)=>(
    <div key={row} className="flex gap-2 mt-2">
      <div className="flex flex-wrap items-center justify-center gap-2">
        {/* {Array.from({length:showSheet},(_, i)=>{
          const seatId=`${row}${showSheet.id}`;
          return (
            <button key={seatId} onClick={()=>handleSeatClick(seatId)} 
             className={`h-8 w-8 rounded border border-primary/60 cursor-pointer 
              ${selectedSeats.includes(seatId) && "bg-primary text-white"}`}>
                {seatId}
            </button>
          )
        })} */}
        {showSheet.map((seat,index)=>{
          const seatId=`${row}${index+1}`;
          // const seatName=`${row}${index+1}`;
          return (
            <button key={seat.id} onClick={()=>handleSeatClick(seat.id)} 
             className={`h-8 w-8 rounded border border-primary/60 cursor-pointer 
              ${selectedSeats.includes(seat.id) && "bg-primary text-white"}`}>
                {seatId}
            </button>
          )
        })}
      </div>
    </div>
  );

  const handleProceetToCheckout=()=>{
      if(selectedSeats.length==0){
        return toast("Please Select Al-least one seat");
      }
      navigate('/loadings/'+selectedSeats);
  }

  useEffect(()=>{
    getShow();
  },[])

  return showSheets ? (
     <div className="flex flex-col md:flex-row px-6 md:px-16 lg:px-40 py-30 md:pt-50">

      {/* Seat layout */}
      <div className="relative flex-1 flex flex-col items-center max-md:mt-16">
        <BlurCircle top="-100px" left="-100px"/>
        <BlurCircle top="0" right="0"/>
        <h1 className="text-2xl font-semibold mb-4">Select Your Seat</h1>
        <img src={assets.screenImage} alt="Screen" />
        <p className="text-gray-400 text-sm mb-6">SCREEN SIDE</p>

        <div className="flex flex-col items-center mt-10 text-xs text-gray-300">
          
          {/* For front seats */}
          <div className="grid grid-cols-2 md:grid-cols-1 gap-8 md:gap-2 mb-6">
            {/* {groupRows[0].map((row,index)=>renderSeates(row,showSheets[index]))} */}
            {showSheets["silver"].length>0 ? renderSeates("A",showSheets["silver"]):toast("No Sheets available")}
          </div>

          <div className="grid grid-cols-2 gap-11">
            {/* {
             groupRows.slice(1).map((group,index)=>(
              <div key={index}>
                {
                 group.map((row,rowIndex)=>renderSeates(row,showSheets.length>=2?showSheets[index+rowIndex]:[]))
                }
              </div>
             ))
            } */}
            {showSheets["gold"]&&renderSeates("B",showSheets["gold"])}
            {showSheets["platinum"]&&renderSeates("C",showSheets["platinum"])}
          </div>
        </div>

        <button className="flex items-center gap-1 mt-20 px-10 py-3 text-sm 
         bg-primary hover:bg-primary-dull transition rounded-full font-medium 
         cursor-pointer active:scale-95" onClick={handleProceetToCheckout}>
          Proceed To Checkout
          <ArrowRightIcon strokeWidth={3} className="w-4 h-4"/>
        </button>

      </div>
     </div>
  ) : (
    <Loading/>
  )
};
export default SeatLayout;
