import React, { createContext, useContext, useState } from 'react'

export const WindCardDetailsContext = createContext();

export const WindCardDetailsProvider = ({children}) =>{
    const [doubleClickState,setDoubleClickState] = useState(false);
    const doubleClick ={
        state: doubleClickState,
        setState: (value) => {
            setDoubleClickState(value);
        }
    };
    const [windmillCardData, setWindmillCardData] = useState({});
    const windmillCardDatas = {
        data: windmillCardData,
        setData: (value) => {
            setWindmillCardData(value);
        }
    };
  return(
    <WindCardDetailsContext.Provider value={{doubleClick,windmillCardDatas}}>
      {children}
    </WindCardDetailsContext.Provider>
  )
}

export const useWindCardDetails = () => useContext(WindCardDetailsContext);