import axios from "axios";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const Loadings=()=>{

    const {ids}=useParams();
    const navigate=useNavigate();
    const bookingPayload={
        "userId":1,
        "showSheetIds":ids.split(",").map(s => Number(s.trim())),
        "paymentMode":0
    }

    const getPaymentLonk=async ()=>{
        try{
            const bookingResult=await axios.post("http://localhost:8080/tickets",bookingPayload);
            //console.log(bookingResult.data);
            const paymentPayload={"bookingId":bookingResult.data.id}
            const paymentLink=await axios.post("http://localhost:8080/payment/stripe/createPaymentLink",paymentPayload);
            //console.log(paymentLink.data);
            // navigate(paymentLink.data.url)
            window.open(paymentLink.data.url, "_blank", "noopener,noreferrer");
            //Now start from -> After payment suuccessfull redirect to the my-booking page, for that add that url while payment link creation

        }catch(error){
           return toast("Something went wrong , Plaese Try Again")
        }
    }

    console.log(ids);

    useEffect(()=>{
        getPaymentLonk();
    },[])

    return(
        <div className="flex justify-center items-center h-[80vh]">
            <div className="animate-spin rounded-full h-14 w-14 border-2 border-t-primary">

            </div>
        </div>
    )
}

export default Loadings