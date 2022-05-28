import React, { Children, createContext, useContext,useState, useEffect } from 'react';
const Crypto = createContext()


function Cryptocontext({children}) {

    const [currency, setcurrency] = useState("INR")
    const [symbol, setSymbol] = useState("Rs")

    

    useEffect(() => {
      if(currency === "INR")
      {
          setSymbol("Rs")
      }
      else if(currency === "USD")
      {
        setSymbol("$")   
      }
    }, [currency]);
    
    
  return (
    <Crypto.Provider value={{currency, symbol,setcurrency}} >
        {children}
    </Crypto.Provider>
  )
}

export default Cryptocontext;

export const CryptoState = ()=>{
   return useContext(Crypto)
}