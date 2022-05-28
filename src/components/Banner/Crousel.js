import {React, useEffect, useState} from 'react'
 import { makeStyles } from '@mui/styles'
import { height } from '@mui/system'
import axios from 'axios'
import { CryptoState } from '../../Cryptocontext'
import {TrendingCoins} from "../../config/api"
import AliceCarousel from 'react-alice-carousel'
import { Link } from 'react-router-dom'

 const useStyles = makeStyles((theme)=>({
  crousel:{
    height:"50%",
    display:"flex",
    alignItems:"center"

  }
  ,
  crouselItem :{
      display:"flex",
      flexDirection:"column",
      alignItems:"center",
      cursor:"pointer",
      textTransform:"uppercase",
      color:"white"
  }
 }))

 export function numberWithCommas (x) {
   return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")
 }

const Crousel = () => {

  const [trending, setTrending] = useState([])
  const classes = useStyles()
  const {currency} = CryptoState()

  useEffect(() => {
    fetchTrendingCoins()
  }, [currency])
  
  const items = trending.map((coin)=>{
    let profit = coin.price_change_percentage_24h;

    return (
      <Link className={classes.crouselItem} 
      to = {`/coins/ ${coin.id}`}
      >
       <img
       
       src= {coin?.image}
       alt = {coin.name}
       height = "80"
       style={{marginBottom:10}}
       />

       <span>{coin?.symbol}
         &nbsp;

         <span  
         style={{color: profit > 0? "rgba(14,203,129)":"red"}}
         > {profit && "+"} {coin?.price_change_percentage_24h?.toFixed(2)} </span>
       </span >

       <span style={{fontSize:22, fontWeight:500}}>
         {Symbol}   {numberWithCommas(coin.current_price.toFixed(2))}
       </span>
          
      </Link>
    )
  })
  const responsive = {
    0:{
      items:2
    },
    512:{
      items: 4
    }
  }

  const fetchTrendingCoins = async ()=>{
    const {data} = await axios.get(TrendingCoins(currency))
    setTrending(data);
    // console.log(data);
  }
  return (
    <div className={classes.crousel}>
      
      <AliceCarousel 
      
      mouseTracking
      infinite
      disableButtonsControls
      autoPlayInterval={1000}
      animationDuration= {1500}
      disableDotsControls
      responsive= {responsive}
      autoPlay
      
      items={items}
      />

    </div>
  )
}

export default Crousel