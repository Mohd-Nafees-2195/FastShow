
const filterShowsByTheatre = (input)=> {
  // Parse the startTime
  const showsDataByTheatre={};
  

  // Extract date part (YYYY-MM-DD) in UTC


  // Create the transformed object
    for(let i=0;i<input.length;i++){
     const theatre=input[i].screen.theatre;
     // for(let j=0;j<showTimings.length;j++) {
      // const startDate = new Date(showTimings[j].startTime);
      const dateKey = theatre.name;

     
      if (!showsDataByTheatre[dateKey]) {
          const show=[input[i]]
          showsDataByTheatre[dateKey]=show;
      } else {
          showsDataByTheatre[dateKey].push(input[i]);
      }
      //  }
    }

  return showsDataByTheatre;
}

export default filterShowsByTheatre;