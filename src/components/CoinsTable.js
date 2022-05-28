import { Container, LinearProgress, Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import { ThemeProvider, createTheme, makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { CoinList } from '../config/api';
import { CryptoState } from '../Cryptocontext';
import { Navigate, useNavigate } from 'react-router-dom';
import { color, display, padding } from '@mui/system';

const darkTheme = createTheme({
    palette: {
        primary: {
            main: "#fff",
        },
        type: "dark",
    },

});

const useStyles = makeStyles({
    textField: {
        width: '70%',
        color: "white",
        outlineColor: "red"
    },
    row: {
        color: "white",
        backgroundColor: "#16171a",
        cursor: "pointer",
        "&:hover": {
            backgroundColor: "#131222"
        }
    },
    pagination:{
    "& .MuiPaginationItem-root":{
        color:"gold"
    }
    }
});
export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

const CoinsTable = () => {
    const classes = useStyles()
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false)
    const { currency, symbol } = CryptoState()
    const [page, setPage] = useState(1)

    const [coinSearch, setcoinSearch] = useState()
    const fetchData = async () => {
        setLoading(true)
        const { data } = await axios.get(CoinList(currency))
        setCoins(data)
       

        setLoading(false)
    }
 console.log(coinSearch);
    useEffect(() => {
        fetchData()
        handleSearch()

    }, [currency])

const [searchParam] = useState(["currnecy", "symbol"]);
    //handeling the search function 

    const handleSearch = () => {
        return (coins.filter((coin) => 
        {
          return (
                     coinSearch ?coin.name.toLowerCase().includes(coinSearch) || coin.symbol.toLowerCase().includes(coinSearch):coins
          )
        })
        );
    };


    const history = useNavigate()
    return (
        <ThemeProvider theme={darkTheme}>
            <Container style={{ textAlign: "center" }}>
                <Typography variant='h5' style={{
                    margin: 18, fontFamily: "Montserrat", fontWeight: "bold"
                }}>
                    CryptoCurrency Price By Market Cap
                </Typography>

                <input placeholder='Search Your Favorite Bitcoin'
                    
                    onChange={(e) => setcoinSearch(e.target.value)}
                    style= {{
                        width:'90%',
                        padding:".7rem",
                        color:"darkgrey",
                        backgroundColor:"rgba(0,0,0,0)",
                        outline:"none",
                        borderStyle:"none",
                        border:"1px solid darkgrey",
                        borderRadius:"5px",
                        "&:hover":{
                                    background:"blue"
                        }
                    }}
                    variant="outlined"

                    label="Search for Cryptocurrency" />


                <TableContainer style={{ marginTop: 10 }}>
                    {
                        loading ? (
                            <LinearProgress style={{ background: "bold" }} />
                        ) : (
                            <Table >
                                <TableHead style={{ backgroundColor: "#EEBC1D", marginTop: 10 }}>
                                    <TableRow>
                                        {["Coin", "Price", "24th change", "Market Cap"].map((head) => (
                                            <TableCell
                                                style={{
                                                    color: "black",
                                                    fontWeight: "700",
                                                    fontFamily: "Montserrat"
                                                }}
                                                key={head}
                                            // align={head === "Coin" ? "" : "right"}
                                            >

                                                {head}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {handleSearch().slice((page - 1) * 10, (page - 1) * 10 + 10).map((row) => {
                                        const profit = row.price_change_percentage_24h > 0;

                                        return (
                                            <TableRow onClick={() => history(`/coin/${row.id}`)}
                                                key={row.name}  
                                                className={classes.row}


                                            >

                                                <TableCell style={{
                                                    color: "white",
                                                    display: "flex",
                                                    gap: 15
                                                }}>
                                                    <img src={row?.image} alt={row.name} height="50"

                                                        style={{
                                                            marginBottom: 10
                                                        }} />
                                                    <div style={{
                                                        display: "flex",
                                                        flexDirection: "column",


                                                    }}>
                                                        <span style={{
                                                            textTransform: "uppercase"
                                                        }}>{row.symbol} </span>
                                                        <span style={{ color: "darkgrey" }}> {row.name} </span>
                                                    </div>
                                                </TableCell>
                                                <TableCell
                                                    style={{
                                                        color: "white"
                                                    }}
                                                >
                                                    <span >{numberWithCommas(row.current_price.toFixed(2))}</span>
                                                </TableCell>
                                                <TableCell
                                                    style={{
                                                        color: "white"
                                                    }}
                                                >
                                                    <span style={{ color: profit ? "green" : "red" }} > {profit && "+"}{numberWithCommas(row.price_change_percentage_24h.toFixed(2))}%</span>
                                                </TableCell>
                                                <TableCell
                                                    style={{
                                                        color: "white"
                                                    }}
                                                >
                                                    <span  > <span>{symbol}</span> {numberWithCommas(row.market_cap.toString().slice(0, -6))} M</span>
                                                </TableCell>

                                            </TableRow>

                                        )
                                    })}

                                </TableBody>

                            </Table>
                        )
                    }
                </TableContainer>
                <Pagination
                classes={{ ul: classes.pagination}}
                style={{
                    paddingBottom: 15,
                    padding:20,
                    width:"100%",
                    display:"flex",
                    justifyContent:"center"
                }} count={(handleSearch()?.length / 10).toFixed(0)}
                    onChange={(_, value) => {
                        setPage(value)
                        
                    }}
                   
                />
            </Container>
        </ThemeProvider>
    )
}

export default CoinsTable