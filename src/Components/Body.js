import React, { useState } from 'react'
import HotelCard from './HotelCard'
import axios, { Axios } from 'axios';
import {Link} from 'react-router-dom';

export default function Body(props) {
  let currentHotelList = [
    

];
let [loading,setLoading] = useState(true);
     let cityChangeEventHandler = (event)=>{
      setLoading(true);
      let requestString="http://localhost:8080/getHotelByCity?city=";
      let city = event.target.options[event.target.selectedIndex].text;
      console.log(city);
      requestString+=city;
      axios.get(requestString).then(function(response){
                currentHotelList = response.data
                console.log(currentHotelList);
               
                
               
                setCurrentHotels(currentHotelList);
                setLoading(false)
              })
             
    }
    
    let [currentHotels,setCurrentHotels] = useState([]);
  return (
    <div>
      <select className="form-select" aria-label="Default select example" onChange={cityChangeEventHandler}>
  <option selected>Select City</option>
  <option value="1">Hyderabad</option>
  <option value="2">Bangalore</option>
  <option value="3">Delhi</option>
</select>
<div className="d-flex flex-center">
  {loading ? (
        <p>Loading...</p>
      ) :
currentHotels.map((hotel,index)=>{
    console.log('Hey')
       return <div className="m-2">
         <HotelCard hotelDesc={hotel} key={index} handleCommentClick={props.handleCommentClick}></HotelCard>
        </div>
       
})}
 </div>
 
    </div>
    
  )
}
