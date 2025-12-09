
const transformSingleShowTimings = (input)=> {
  const showTimingsData={};


  // Create the transformed object
    for(let i=0;i<input.length;i++){
      const startDate = new Date(input[i].startTime);
      const dateKey = startDate.toISOString().split('T')[0];
     
      if (!showTimingsData[dateKey]) {
           const time=[{
             time: startDate.toISOString(),
             showId: String(input[i].id), // ensure it's a string
             ScreenName: input[i].screen.name
            }]
          showTimingsData[dateKey]=time;
      } else {
         const time={
            time: startDate.toISOString(),
            showId: String(input[i].id), // ensure it's a string
            ScreenName: input[i].screen.name
          }
          showTimingsData[dateKey].push(time);
      }
    }

  return showTimingsData;
}

export default transformSingleShowTimings;
