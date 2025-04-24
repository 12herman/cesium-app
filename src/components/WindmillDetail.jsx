import React from 'react'
import { PiAngle } from "react-icons/pi";
import { FaTemperatureEmpty } from "react-icons/fa6";
import { GoGraph } from "react-icons/go";
import { PiWindmill } from "react-icons/pi";
import { useWindCardDetails, WindCardDetailsProvider } from '../context/WindCardDetailsProvider';

export const PichAngleCard = () =>{
  const {doubleClick,windmillCardDatas} = useWindCardDetails();


  
  
  return (
    <WindCardDetailsProvider>
    <div className={`${!doubleClick.state ? 'hidden' : 'block'} absolute z-10 left-1/2 -translate-x-[150%] top-1/2 -translate-y-[200%] bg-white/40 rounded-lg block w-[150px] sm:w-[200px] text-black`} style={{padding: "10px"}}>
  <span style={{padding:"0 0 5px 0"}} className="flex justify-between items-center border-b-1 border-b-gray-500">
  <h2 className="text-sm font-medium">Pich Angles</h2><PiAngle size={20}/>
  </span>
  <ul className="flex flex-col gap-y-1 " style={{padding:"5px 0 0px 0"}}>
  {Object.keys(windmillCardDatas.data).length > 0  ? (<>
    <li  className="text-sm flex justify-between items-center"> Blade 1: <span className="font-medium">{Math.round(windmillCardDatas.data.bladeAngles.blade1 * 100)/100}°</span></li>
    <li className="text-sm flex justify-between items-center"> Blade2: <span className="font-medium">{Math.round(windmillCardDatas.data.bladeAngles.blade2 * 100)/100}</span></li>
   <li className="text-sm flex justify-between items-center"> Blade3: <span className="font-medium">{Math.round(windmillCardDatas.data.bladeAngles.blade3 * 100)/100}</span></li>
   </>)
  : ""}
  </ul>
 </div>
 </WindCardDetailsProvider>
  );
}

export const TemperatureCard =()=>{
  const {doubleClick,windmillCardDatas} = useWindCardDetails();
  return(
    <WindCardDetailsProvider>
    <div className={`${!doubleClick.state ? 'hidden' : 'block'} absolute z-10 left-1/2 -translate-x-[150%] top-1/2 -translate-y-[120%] bg-white/40 rounded-lg block w-[200px] text-black`} style={{padding: "10px",marginTop:"4px"}}>
    <span style={{padding:"0 0 5px 0"}} className="flex justify-between items-center border-b-1 border-b-gray-500">
    <h2 className="text-sm font-medium">Temperature</h2><FaTemperatureEmpty size={20}/>
    </span>
    <ul className="flex flex-col gap-y-1 " style={{padding:"5px 0 0px 0"}}>
    {Object.keys(windmillCardDatas.data).length > 0 ? (<>
      <li className="text-sm flex justify-between items-center"> Gear Box : <span className="font-medium">{windmillCardDatas.data.temperature.gearbox.toFixed(2)}°C</span></li>
      <li className="text-sm flex justify-between items-center"> Generator : <span className="font-medium">{windmillCardDatas.data.temperature.generator.toFixed(2)}°C</span></li>
    </>) :""}
    
    </ul>
   </div>
   </WindCardDetailsProvider>
  )
}

export const WindCard =()=>{
  const {doubleClick,windmillCardDatas} = useWindCardDetails();
  return(
    <WindCardDetailsProvider>
    <div className={`${!doubleClick.state ? 'hidden' : 'block'} absolute z-10 left-1/2 -translate-x-[150%] top-1/2 -translate-y-[10%] bg-white/40 rounded-lg block w-[200px] text-black`} style={{padding: "10px",marginTop:"4px"}}>
    <span style={{padding:"0 0 5px 0"}} className="flex justify-between items-center border-b-1 border-b-gray-500">
    <h2 className="text-sm font-medium">Wind Data</h2><GoGraph size={20}/>
    </span>
    <ul className="flex flex-col gap-y-1 " style={{padding:"5px 0 0px 0"}}>
     {Object.keys(windmillCardDatas.data).length > 0 ? (<>
      <li className="text-sm flex justify-between items-center"> Direction: <span className="font-medium">{windmillCardDatas.data.windSpeed.direction}°</span></li>
     <li className="text-sm flex justify-between items-center"> Speed: <span className="font-medium">{windmillCardDatas.data.windSpeed.speed} km/h</span></li>
     </>) : ""}
    </ul>
   </div>
   </WindCardDetailsProvider>
  )
}

export const WindmillDetailCard = () => {
  const {doubleClick,windmillCardDatas} = useWindCardDetails();
  return(
    <WindCardDetailsProvider>
    <div className={`${!doubleClick.state ? 'hidden' : 'block'} absolute z-10 left-1/2 translate-x-[30%] top-1/2 -translate-y-[205%] bg-white/40 rounded-lg block w-[200px] text-black`} style={{padding: "10px",marginTop:"4px"}}>
    <span style={{padding:"0 0 5px 0"}} className="flex justify-between items-center border-b-1 border-b-gray-500">
    <h2 className="text-sm font-medium">{Object.keys(windmillCardDatas.data).length > 0 ? windmillCardDatas.data.name : ""}</h2> <div className='relative'><span className={`status ${(Object.keys(windmillCardDatas.data).length > 0) && windmillCardDatas.data.windmillStatus ? "status-success" : "status-error"}  animate-bounce absolute`}></span><PiWindmill  size={20}/></div>
    </span>
    <ul className="flex flex-col gap-y-1 " style={{padding:"5px 0 0px 0"}}>
     {Object.keys(windmillCardDatas.data).length > 0 ? (<>
      <li className="text-sm flex justify-between items-center"> Observed Power: <span className="font-medium">{windmillCardDatas.data.windmillPower.observed.toFixed(2)} kw</span></li>
     <li className="text-sm flex justify-between items-center"> Physical Modal: <span className="font-medium">{windmillCardDatas.data.windmillPower.physical.toFixed(2)} kw</span></li>
     <li className="text-sm flex justify-between items-center"> Data model: <span className="font-medium">{windmillCardDatas.data.windmillPower.data.toFixed(2)} kw</span></li>
     </>) : ""}
    </ul>
   </div>
   </WindCardDetailsProvider>
  )
}


