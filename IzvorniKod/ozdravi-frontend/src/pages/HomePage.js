import React from 'react';
import Navbar from '../components/Header';
import patientsImage from '../assets/images/patientsNo2.png'
import drugoMisljenje from '../assets/images/drugoMisljenje.png'
import bolovanje from '../assets/images/bolovanje.png'
import djeca from '../assets/images/kids2.png'
import HomeCard from '../components/HomeCard';



const HomePage = () => {

  const uloga = "doktor"

  return (
      
    
    <div id = "HomePageWrapper">
     <Navbar></Navbar>

    <div id = "homePageWrapperInner">
          <h3 className = "pt-4 px-4 mt-2" style={{textAlign: "left"}}>Dobrodošao nazad, Filip.</h3>
    <p style={{textAlign: "left"}} className = "px-4">Što ćemo raditi danas?</p>
     <div className='homePageCardSection p-4 pt-0 ps-3' >

    
    { uloga === "doktor" || uloga === "pedijatar" ? (<HomeCard title = "Moji Pacijenti" description= "34 odraslih • 4 djece" image= {patientsImage} buttonText="Vidi sve"/>) : null}
    <HomeCard title = "Druga Mišljenja" description= "3 za pregled" image= {drugoMisljenje} buttonText = "Pregledaj"/>
    <HomeCard title = "Preporuke za bolovanje" description= "7 za pregled" image= {bolovanje} buttonText = "Pregledaj"/>


    { uloga !== "roditelj" ? ( <HomeCard title = "Moja djeca" description= "3 prijavljenje djece" image= {djeca} buttonText = "Vidi sve"/> ) : null}

     </div>
     </div>

    </div>
  );
};

export default HomePage;
