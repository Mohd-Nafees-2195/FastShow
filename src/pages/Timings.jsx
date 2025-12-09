import axios from "axios";
import transformShowTiming from "../lib/transformShowTiming";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import TimeCard from "../components/TimeCard";
import Loading from "../components/Loading";
import BlurCircle from "../components/BlurCircle";
import filterShowsByTheatre from "../lib/filterShowsByTheatre";

const Timings=()=>{


  const {id,date}=useParams();
  const[shows,setShow]=useState(null);

  const getShow=async ()=>{
    axios.get('http://localhost:8080/shows/allShows/'+id+'/'+date) //will return all shows of same date
    .then(response => {
            if(response.data.shows){
              setShow({
               allShows:filterShowsByTheatre(response.data.shows)  //filterShowsByDate(response.data.shows),
               //dateTime:transformShowTiming(response.data.shows)
              })
               console.log(filterShowsByTheatre(response.data.shows)+' aaadadsdxxx');
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            toast("Invalid show");
        });
  }
  

  const renderTimeCard=(theatreName,dateTime)=>(
          <div key={theatreName} className="flex flex-wrap px-6 m-1 md:px-8 lg:px-40 py-10 md:pt-10 rounded border 
          border-primary/60">
           
            <div className="text-gray-400 text-md m-6">
              Theatre : {theatreName}
            </div>
             {dateTime[date]?.map((item)=>(
                <TimeCard key={item.time} item={item}/>
             ))}
          </div>
  );

  useEffect(()=>{
    getShow();
  },[])

    
    return shows ? (
         <>
          <div className="flex flex-col md:flex-col px-6 md:px-16 lg:px-40 py-30 md:pt-50">
            <BlurCircle top="-50px" left="-50px"/>
            <BlurCircle top="100px" right="1000"/>

             {Object.entries(shows.allShows).map(([theatreName, show]) => (
               show.length>0 ? renderTimeCard(theatreName,transformShowTiming(show)) : toast('No timing available for '+theatreName)
             ))}

          </div>
         </>
    ) : <Loading/>
}

export default Timings