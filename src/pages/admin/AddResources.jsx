import React, { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import Title from "../../components/admin/Title";

const AddResources=()=>{

   const currency=import.meta.env.VITE_CURRENCY;
   
   const [shows,setShows]=useState([]);
   const [loading,setLoading]=useState(true);



   useEffect(()=>{
   },[])

 return loading ? (
    <>
     <Title text1="Add" text2="Resources"/>
     <div className="max-w-4xl mt-6 overflow-x-auto">
       <h1>Add Resources</h1>
     </div>
    </>
 ) : <Loading/>
}

export default AddResources