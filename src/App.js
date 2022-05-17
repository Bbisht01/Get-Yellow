import logo from './logo.svg';
import './App.css';
import { useGetLocation } from './useGetLocation';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {data} from "./db"
import { Diff } from './components/Diff';


function App() {

  const location = useGetLocation() 
  //  console.log(location);

  const [dbData , setDbData] = useState(data);
  const [filterdata , setFilterData] = useState(dbData);

  const [filterParam , setFilterParam] = useState({ radius : null , discount : null , rating : null})

  console.log("dbData", dbData)
  console.log("filterdata", filterdata)
  console.log("filterParam", filterParam)

  const changeHandler = (e) =>{

    let {name} = e.target 
    setFilterParam( {...filterParam, [name] : e.target.value } )

  }


  useEffect( () =>{
    let newArr = [...dbData];

    if(filterParam.radius !== null){
        
      newArr = newArr.filter( a =>{
                 let dis = getDistanceFromLatLonInKm(location.coordinates.lat, 
                                    location.coordinates.long ,  
                                     a.lat ,  
                                     a.long );
                  console.log(  Number(filterParam.radius ) , dis  )
                 if( Number(filterParam.radius ) > dis )return a
                  
      })
      

    }

    if(filterParam.discount !== null){
         newArr =   newArr.filter(a =>{
               return a.discount >= filterParam.discount
              } )
    }
    if(filterParam.rating !== null){
         newArr =   newArr.filter(a =>{
               return a.rating == filterParam.rating
              } )
    }   
   setFilterData(newArr)

  } , [filterParam])

  function testRun(){
      filterdata.map( a =>{
        let dis = getDistanceFromLatLonInKm(location.coordinates.lat, location.coordinates.long ,  a.lat ,  a.long )
        // console.log( a.coordinates.lat , a.coordinates.long , dis)
      })
  }

  function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return d;
  }

  function deg2rad(deg) {
    return deg * (Math.PI/180)
  }


  
  return (
    <div className="App" >
      <button style={{padding:"10px",marginTop:"20px",marginBottom:"10px",backgroundColor:"whitesmoke"}}>Get My Coordinates</button><br/>
        { location.loaded ?  `Your latitude =  ${location.coordinates.lat} , Your longitude = ${location.coordinates.long}`  : "cannot get your location"}

        <hr/>
        <div style={{padding:"20px"}}>
          
        <select name="rating" onChange={(e) =>{
          changeHandler(e);
        } }>
         <option selected hidden disabled >Select rating</option>
         <option value={1}>1 star </option>
         <option value={2}>2 star </option>
         <option value={3}>3 star </option>
         <option value={4}>4 star </option>
         <option value={5}>5 star </option>
        
        </select>

        <select name="discount" onChange={(e) =>{
          changeHandler(e);
        } }>
         <option selected hidden disabled >Select discount</option>
         <option value={10}>10% </option>
         <option value={20}>20% </option>
         <option value={30}>30% </option>
         <option value={40}>40% </option>
         <option value={50}>50%</option>
        
        </select>

        <input type="text" name='radius' placeholder='enter radius in km' onChange={changeHandler} />
        </div>

        <br/> 

        <div style={{display:"grid",gridTemplateColumns:"repeat(3,25%)",justifyContent:"center"}}>
          

         {
           filterdata.length == 0 ? ( "no data available"):
           (

              filterdata.map( (item,i) =>{
                return (
                <div key={i} >
                 <img src="https://images.unsplash.com/photo-1552566626-52f8b828add9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8cmVzdGF1cmFudHxlbnwwfHwwfHw%3D&w=1000&q=80" alt="img" width="55%" height="200px"/>
                  <h3>Restaurant :{item.restaurantName}</h3>
                  <p> DISCOUNT - {item.discount} %</p>
                  <p> RATING - {item.rating}</p>
                   </div>
                )
              })

           )
        }
     
          
        </div>      



        
    </div>
  );
}
export default App;
