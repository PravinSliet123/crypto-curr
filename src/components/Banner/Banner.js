import React from 'react'
import { makeStyles } from '@mui/styles'
import { Container, Typography } from '@mui/material';
import "./Banner.css"
import Crousel from './Crousel';


const useStyles = makeStyles(() => ({
    banner: {
      //  backgroundImage:"url(./public/banner.jpg)",
    },
    bannerContent:{
        height:400,
        display:"flex",
        flexDirection:"column",
        paddingTop:25,
        justifyContent:"space-around",
        
    },
    tagline:{
      display:"flex",
      height:"40%",
      flexDirection:'column',
      justifyContent:"center",
      textAlign:"center"

    }
}));
const  Banner =()=> {
    const classes = useStyles();
  return (
    <div  className="customBanner {classes.Banner}"  >
        
        <Container className={classes.bannerContent} >
          <div className={classes.tagline}>
          <Typography variant='h2' style={{
            fontWeight:"bold",
            marginBottom:15,
            fontFamily:"Montserrat"
          }}>
            Crypto Currency
          </Typography>
          <Typography variant='subtitle2' style={{
            color:"darkgray",
            textTransform:"capitalize",
            fontFamily:"Montserrat"
          }}>
           Get all the Info regarding your favorite Crypto Currency
          </Typography>
          </div>
          <Crousel/>
        </Container>
    </div>
  )
}

export default Banner