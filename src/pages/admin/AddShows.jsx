import React, { useEffect, useState } from "react";
import { assets, dummyShowsData } from "../../assets/assets";
import Loading from "../../components/Loading";
import Title from "../../components/admin/Title";
import {CheckIcon, DeleteIcon, StarIcon} from 'lucide-react'
import { kConverter } from "../../lib/kConvertor";
import axiosInstance from "../../lib/axiosInstance";

const AddShows=()=>{

 const currency=import.meta.env.VITE_CURRENCY;
 const user=JSON.parse(localStorage.getItem("user"));

 const [nowPlayingMovies, setNowPlayingMovies]=useState([]);
 const [selectedMovie, setSelectedMovie]=useState(null);
 const [dateTimeSelection,setDateTimeSelection]=useState({});
 const [dateTimeInput,setDateTimeInput]=useState("");
//  const [showPrice,setShowPrice]=useState("");

 const [showPriceOfSilver,setShowPriceOfSilver]=useState("");
 const [showPriceOfGold,setShowPriceOfGold]=useState("");
 const [showPriceOfPlatinum,setShowPriceOfPlatinum]=useState("");

const [theatreInfo,setTheaterInfo]=useState([]);
const [screenInfo,setScreenInfo]=useState([]);

const [theatreId,setTheaterId]=useState(null);
const [screenId,setScreenId]=useState(null);
// const [loading, setLoading]=useState(true);

   const fetchTheaterInfo=async()=>{
      axiosInstance.get("/theatres/data/"+user.id).then(
         response=>{
            setTheaterInfo(response.data.theatres);
            console.log(response.data.theatres);
         }).then(error=>{
            console.error();
         })
      // setLoading(false);
   };

   //Write a function to calcurate area


//All active movies 
 const fetchNowPlayingMovies=async()=>{
   //Fetch all active movies from bacend with sorted by date in desc
   axiosInstance.get("/movies/active").then(
      response=>{
         // console.log(response.data.movies);
         setNowPlayingMovies(response.data.movies);
         // console.log(response.data.movies);
      }).then(error=>{
         console.error();
      })
   // setNowPlayingMovies(dummyShowsData);

 }

 //Show timing selection section
 const handleDateTimeAdd=()=>{
   if(!dateTimeInput) return;
   const [date,time]=dateTimeInput.split("T");
   if(!date||!time) return;

   setDateTimeSelection((prev)=>{
      const times=prev[date] || [];
      if(!times.includes(time)){
         return {...prev,[date]: [...times,time]};
      }
      return prev;
   });
 };

 const handleDateTimeRemove=(date,time)=>{
   setDateTimeSelection((prev)=>{
      const filteredTimes=prev[date].filter((t)=>t!==time);
      if(filteredTimes.length===0){
         const {[date]: _, ...rest}=prev;
         return rest;
      }
      return {
         ...prev,
         [date]:filteredTimes,
      };
   });
 }


const handleTheatreChange = async (e) => {
  const theatreId1 = e.target.value;
//   setSelectedTheatreId(theatreId);
  

  if (!theatreId1) {
    setScreenInfo([]);
    return;
  }
  console.log(theatreId1,"hi");
  setTheaterId(theatreId1);
//   payLoad.theatreId=theatreId1;
  //Get List of screen form theater and setScreenInfo 

  theatreInfo.map((theatre)=>{
    if(theatre.id==theatreId1){
      setScreenInfo(theatre.screens);
      console.log(theatre.screens);
    }
  })
};

const handleScreenChange= async (e)=>{
   const screenId1=e.target.value;
   if(!screenId1){
      return;
   }
   // payLoad.screenId=screenId;
   setScreenId(screenId1);
}

const handleOnClick=()=>{
   // console.log(payLoad.theatreId);

   const payLoad={
   screenId:screenId,
   theatreId:theatreId,
   movieId:selectedMovie,
   showTimings:dateTimeSelection,
   features:[],
   showSheets:[] //add show sheet using sheet price accordingly 
   // start from here
 };
   console.log(payLoad);
}



 useEffect(()=>{
   fetchTheaterInfo();
   fetchNowPlayingMovies();
 },[])

 return nowPlayingMovies.length>0 ? (
    <>
     <Title text1="Add" text2="Shows"/>
     <p className="mt-10 text-lg font-medium">Available Movies</p>
     <div className="overflow-x-auto pb-4">
      <div className="group flex flex-wrap gap-4 mt-4 w-max">
         {nowPlayingMovies.map((movie)=>(
            <div key={movie.id} className={`relative max-w-40 cursor-pointer 
             group-hover:not-hover:opacity-40 hover:-translate-y-1 transition 
             duration-300`} onClick={()=>setSelectedMovie(movie.id)}>
               <div className="relative rounded-lg overflow-hidden">
                  <img src={movie.imagesUrl} alt="" className="w-full 
                   object-cover brightness-90"/>
                   <div className="text-sm flex items-center justify-between 
                    p-2 bg-black/70 w-full absolute bottom-0 left-0">
                     <p className="flex items-center gap-1 text-gray-400">
                        <StarIcon className="w-4 h-4 text-primary fill-primary"/>
                        {movie.ratings}
                     </p>
                     <p className="text gray-300">{kConverter(movie.votes)} Votes</p>
                   </div>
               </div>
               {selectedMovie===movie.id && (
                  <div className="absolute top-2 right-2 flex items-center 
                   justify-center bg-primary h-6 w-6 rounded">
                     <CheckIcon className="w-4 h-4 text-white" strokeWidth={2.5}/>
                  </div>
               )}
               <p className="font-medium truncate">{movie.title}</p>
               <p className="text-gray-400 text-sm">{movie.createdAt?.split("T")[0]}</p>
            </div>
         ))}
      </div>
     </div>

     {/* Show Price Input for SILVER, GOLD, PLATINUM seats*/}
     <div className="mt-8">
      <label className="block text-ms font-medium mb-2 mt-4">Show Price for Silver Seates</label>
      <div className="inline-flex items-center gap-2 border border-gray-600 
       px-3 py-2 rounded-md">
         <p className="text-gray-400 text-sm">{currency}</p>
         <input min={0} type="number" value={showPriceOfSilver} onChange={(e)=>
            setShowPriceOfSilver(e.target.value)} placeholder="Enter Show Price"
            className="outline-none"/>
      </div>
      <label className="block text-ms font-medium mb-2 mt-4">Show Price for Gold Seats</label>
      <div className="inline-flex items-center gap-2 border border-gray-600 
       px-3 py-2 rounded-md">
         <p className="text-gray-400 text-sm">{currency}</p>
         <input min={0} type="number" value={showPriceOfGold} onChange={(e)=>
            setShowPriceOfGold(e.target.value)} placeholder="Enter Show Price"
            className="outline-none"/>
      </div>
      <label className="block text-ms font-medium mb-2 mt-4">Show Price for Platinum Seats</label>
      <div className="inline-flex items-center gap-2 border border-gray-600 
       px-3 py-2 rounded-md">
         <p className="text-gray-400 text-sm">{currency}</p>
         <input min={0} type="number" value={showPriceOfPlatinum} onChange={(e)=>
            setShowPriceOfPlatinum(e.target.value)} placeholder="Enter Show Price"
            className="outline-none"/>
      </div>
     </div>

       <div className="overflow-x-auto mt-5 my-4">
          <label>Choose a theater:</label>

          <select className="text-black bg-white" id="theater" name="theater" onChange={handleTheatreChange}>
             <option value="">-- Select Theater --</option>

             {theatreInfo.map((theater) => (
                <option key={theater.id} value={theater.id}>
                   {theater.name}
                </option>
             ))}
          </select>
       </div>

       {screenInfo.length>0 && <div className="overflow-x-auto mt-5 my-4">
          <label>Choose a Screen:</label>

          <select className="text-black bg-white" id="screen" name="screen" onChange={handleScreenChange}>
             <option value="">-- Select Screen --</option>

             {screenInfo.map((screen) => (
                <option key={screen.id} value={screen.id}>
                   {screen.name}
                </option>
             ))}
          </select>
       </div>}


     {/* Date Time Selection */}
     <div className="mt-6">
      <label className="block text-ms font-medium mb-2">Select Date And Time</label>
       <div className="inline-flex items-center gap-2 border border-gray-600 
       px-3 py-2 rounded-md">
         <input type="datetime-local" value={dateTimeInput} onChange={(e)=>
            setDateTimeInput(e.target.value)} className="outline-none rounded-md"/>
          <button onClick={handleDateTimeAdd} className="bg-primary/80 
            text-white px-3 py-2 text-sm rounded-lg hover:bg-primary cursor-pointer">
               Add Time
          </button>
       </div>
     </div>

     {/* Dispaly Selected Time  */}
     {Object.keys(dateTimeSelection).length>0&&(
      <div className="mt-6">
         <h2 className="mb-2">Selected Date-Time</h2>
         <ul className="space-y-3">
            {Object.entries(dateTimeSelection).map(([date,times])=>(
               <li key={date}>
                  <div className="font-medium">{date}</div>
                  <div className="flex flex-wrap gap-2 mt-1 text-sm">
                     {times.map((time)=>(
                        <div key={time} className="border border-primary 
                         px-2 py-1 flex items-center rounded">
                           <span>{time}</span>
                           <DeleteIcon onClick={()=>handleDateTimeRemove(date,time)} 
                              width={15} className="ml-1 text-red-500 hover:text-red-700 cursor-pointer"/>
                        </div>
                     ))}
                  </div>
               </li>

            ))}
         </ul>
      </div>
     )}
     <button className="bg-primary text-white px-8 py-2 mt-6 rounded 
      hover:bg-primary/90 transition-all cursor-pointer"
      onClick={handleOnClick}>
         Add Show
     </button>
    </>
 ):<Loading/>
}

export default AddShows