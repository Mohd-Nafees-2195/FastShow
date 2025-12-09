import React, { useState } from "react";
import HeroSection from "../components/HeroSection";
import FeaturedSection from "../components/FeaturedSection";
import TrailerSection from "../components/TrailerSection";
import City from "../components/City";

const Home = () => {

  const [selectedCity, setSelectedCity] = useState("");
  // const [city, setCity] = useState([]);

  return (
    <>
     <HeroSection/>
      <City
        isOpen={!selectedCity}
        onCitySelect={(city) => setSelectedCity(city)}

      />
     {selectedCity&&<FeaturedSection selectedCity={selectedCity}/>}
     <TrailerSection/>
    </>
  )
};
export default Home;
