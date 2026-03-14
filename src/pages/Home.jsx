import React, { useEffect, useState } from "react";
import HeroSection from "../components/HeroSection";
import FeaturedSection from "../components/FeaturedSection";
import TrailerSection from "../components/TrailerSection";
import City from "../components/City";
import toast from "react-hot-toast";

const Home = () => {

  const [selectedCity, setSelectedCity] = useState("");
  const isCitySelected=localStorage.getItem("selectedCity");
  //This is for health check of server chenge it later
  

  // useEffect()={
    
  // }
   
  return (
    <>
     <HeroSection/>
      {!isCitySelected&&<City
        isOpen={!selectedCity}
        onCitySelect={(city) => setSelectedCity(city)}
        
      />
      }
     {isCitySelected&&<FeaturedSection selectedCity={isCitySelected}/>}
     <TrailerSection/>
    </>
  )
};
export default Home;
