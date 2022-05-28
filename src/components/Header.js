import React from 'react';
import AppBar from '@mui/material/AppBar';
import { ThemeProvider,createTheme,makeStyles } from '@material-ui/core/styles';
import { Container, MenuItem, Select, Toolbar, Typography } from '@mui/material';
import { useNavigate } from "react-router-dom"
import {CryptoState} from "../Cryptocontext"
const useStyles = makeStyles(() => ({
    title: {
        color: "gold",
        flex: 1,
        fontFamily: "Montserrat",
        cursor: "pointer"
    }
}));
const darkTheme = createTheme({
    palette: {
      primary:{
          main:"#fff",
      },
      type:"dark",
    },
    
  });


const  Header=()=> {
    const classes = useStyles();
    const history = useNavigate()

    const {currency,symbol, setcurrency} = CryptoState()
    console.log(currency);
    return (
      <ThemeProvider theme={darkTheme}>
            <AppBar color='transparent' position='static'  >
            <Container>
                <Toolbar>
                    <Typography
                    className={classes.title}
                    variant='subtitle1'
                        style={{
                            fontWeight: "bold"
                        }} 
                        onClick={() => history("/")}
                    >
                        Crypto-curr
                    </Typography>
                    <Select  variant="outlined"
                        style={{
                            width: 100,
                            height: 40,
                            marginRight: 15,
                            color:"#fff",
                            border:"1px solid white",
                            outline:"none"
                        }}
                        value = {currency}
                        onChange = {(e)=> setcurrency(e.target.value)}
                        >
                        <MenuItem value={"USD"}>
                            USD
                        </MenuItem>
                        <MenuItem value={"INR"}>
                            INR
                        </MenuItem>
                        
                    </Select>
                </Toolbar>
            </Container>
        </AppBar>
      </ThemeProvider>
    )
}

export default Header