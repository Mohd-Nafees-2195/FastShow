
const getShowSheet = (showSheets) => {
   const newShowSheets={
      "silver":[],
      "gold":[],
      "platinum":[]
   };
   for(let i=0;i<showSheets.length;i++){
      if (showSheets[i].seatType === "SILVER") {
         newShowSheets.silver.push(showSheets[i]);
      } else if (showSheets[i].seatType === "GOLD") {
         newShowSheets.gold.push(showSheets[i]);
      } else {
         newShowSheets.platinum.push(showSheets[i]);
      }
   }
   return newShowSheets;
}

export default getShowSheet;