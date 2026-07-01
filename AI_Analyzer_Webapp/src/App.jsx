import { useState,useEffect } from "react"
import Nav from './Nav.jsx';
import Hero from './Hero.jsx'


function App(){
  return(
    <>
    <div className = "h-auto flex flex-col ">
    <Nav/>
    <Hero/>    
    </div>
       
    </>

  );
}
export default App;
