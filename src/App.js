import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Header from './components/Header';
import Homepage  from './pages/Homepage';
import Coinpage from "./pages/Coinpage"
import {makeStyles} from "@mui/styles" 
const useStyles = makeStyles({
  App: {
    backgroundColor: "#14161a",
    // border: 0,
    // borderRadius: 3,
    // boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
     color: 'white',
    // height: 48,
    // padding: '0 30px',
    minHeight:"100vh"
  },
});
function App() {

 
  const calsses = useStyles()
  return (
    <BrowserRouter>
    <div className={calsses.App}>
      <Header/>
      <Routes>
      <Route  exact path='/' element ={<Homepage/>}/>
      <Route  path='/coin/:id' element ={<Coinpage/>}/>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
