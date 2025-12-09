import React, { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import {useNavigate, useParams} from 'react-router-dom'
import BlurCircle from "./BlurCircle";
import MovieCard from "./MovieCard";
import { dummyShowsData } from "../assets/assets";
import Loading from "./Loading";
import axios from 'axios';
import toast from 'react-hot-toast'
import getTheatreIds from "../lib/getTheatreIds";
import getMoviesFromShows from "../lib/getMoviesFromShows";

const FeaturedSection=({selectedCity})=>{

    const BASEURL=import.meta.env.BASEURL;

    // const {id}=useParams();
    const navigate=useNavigate();

    const [movies,setMovies]=useState([]);
    const [loading,setLoading]=useState(true);

    const getTheatreByCityId=async ()=>{        
         axios.get('http://localhost:8080/cities/'+selectedCity) // Sample API
        .then(response => {
            const theatreIds=getTheatreIds(response.data.city).join(',');
            console.log(theatreIds+' aaaaaaaaaaa');
            axios.get('http://localhost:8080/shows/allShows?theatreIds='+theatreIds) // Get All Shows By TheatreIds and then extract movies from them
            .then(response => {
              console.log(response.data.shows);
              setMovies(getMoviesFromShows(response.data.shows));
              setLoading(false);
            })
            .catch(error => {
            // console.error('Error fetching data:', error);
             setLoading(false);
             toast("Show not available");
           });
        })
        .catch(error => {
            // console.error('Error fetching data:', error);
            toast("Show not available");
        });
    }

    const moviesData=async ()=>{      
           
         axios.get('http://localhost:8080/movies') // Sample API
        .then(response => {
            console.log(response.data.movies);
            setMovies(response.data.movies);
            setLoading(false);
        })
        .catch(error => {
            // console.error('Error fetching data:', error);
            setLoading(false);
            toast("Show not available");
        });
    }

    useEffect(()=>{
        getTheatreByCityId();
    },[]);

    return !loading ? (
        <div className="px-6 md:px-16 lg:px-24 xl:px-44 overflow-hidden">

            <div className="relative flex items-center justify-between pt-20 pb-10">
                <BlurCircle top="0" right="-80px"/>
                <p className="text-gray-300 font-medium text-lg">Now Showing</p>
                <button onClick={()=>navigate('/movies')}
                 className="group flex items-center gap-2 text-sm text-gray-300 cursor-pointer">
                    View All 
                    <ArrowRight className="group-hover:translate-x-0.5 transition w-4.5 h-4.5"/> 
                </button>
            </div>

            <div className="flex flex-wrap max-sm:justify-center gap-8 mt-8">
                {
                    movies.length > 0 ? (
                       movies.slice(0, 6).map((movie) => (
                         <MovieCard key={movie.id} movie={movie} />
                        ))
                     ) : (
                          <div>No Show Available</div>
                     )
                }
                {/* {movies.slice(0,6).map((movie)=>(
                    <MovieCard key={movie.id} movie={movie}/>
                ))} */}
            </div>

            <div className="flex justify-center mt-20">
                <button className="px-10 py-3 text-sm bg-primary hover:bg-primary-dull 
                 transition rounded-md font-medium cursor-pointer" 
                 onClick={()=>{navigate('/movies');scrollTo(0,0);}}>
                    Show More
                </button>
            </div>
        </div>
    ):<Loading/>
}

export default FeaturedSection