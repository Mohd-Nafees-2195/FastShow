
const getTheatreIds = (city) => {
   const theatres=city.theatres;
   const ids=[];
   for(let i=0;i<theatres.length;i++){
    ids.push(theatres[i].id);
   }
   return ids;
}

export default getTheatreIds;