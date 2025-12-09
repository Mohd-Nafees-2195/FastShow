
const getMoviesFromShows = (shows) => {
  const movies=[];
  const movieMap={}
  for(let i=0;i<shows.length;i++){
    const key=shows[i].movie.id;
    const value=shows[i].movie;
    if(!movieMap[key]){
        movieMap[key]=value;
    }
  }
  for (let key in movieMap) {
   if (movieMap.hasOwnProperty(key)) {  
     movies.push(movieMap[key]);
   }
  }
  return movies;
}

export default getMoviesFromShows;