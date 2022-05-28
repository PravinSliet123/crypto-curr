import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { SingleCoin } from '../config/api';
import { CryptoState } from '../Cryptocontext';

const  Coinpage = ()=> {
  const {id}  = useParams();

  const [coins, setCoins] = useState()

   const {currnecy, symbol} = CryptoState()

   const fetchData =  async()=>{
     const {data} = await axios.get(SingleCoin(id))
     setCoins(data)
     console.log(data);
   }
        
  useEffect(() => {
    fetchData();
  
    
  }, [])


  

  return (
    <div>{}</div>
  )
}

export default Coinpage