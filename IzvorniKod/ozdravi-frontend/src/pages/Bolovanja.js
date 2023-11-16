import React, {useState} from 'react';
import Navbar from '../components/Header';
import ArrowRightIcon from '../assets/icons/arrow-right.png'


const Bolovanja = () => {

  const uloga = "doktor"

  const [selectedState, setSelectedState] = useState('svi')

  return (

    
    <div id = "HomePageWrapper">
     <Navbar></Navbar>

  

     <div id = "seccondOppWrapper">
<h3 className = "pt-3 px-4 mt-2 " style={{textAlign: "left"}}>Preporuke za bolovanje {/* <button className='btn btn-tertiary mt-1' style={{float: 'right'}}>Povijest </button>  */} </h3>
<p style={{textAlign: "left"}} className = "px-4 mb-2 ">3 nepregledanih</p>



<div id = "usersSelectorDiv" className = "px-4 pb-1 pt-0 " style={{display: "flex", justifyContent: "left", flexWrap: "wrap"}}>
    <button className = {selectedState === 'svi' ?
        "btn btn-primary me-2 mt-2" : "btn btn-secondary me-2 mt-2"}
            id = "nepregledano" onClick={() => setSelectedState('svi')}>SVI</button>

    <button className = {selectedState === 'nepregledano' ?
        "btn btn-primary me-2 mt-2" : "btn btn-secondary me-2 mt-2"}
            id = "nepregledano" onClick={() => setSelectedState('nepregledano')}>NEPREGLEDANO</button>

    <button className = {selectedState === 'pregledano' ?
        "btn btn-primary me-2 mt-2" : "btn btn-secondary me-2 mt-2"}
            id = "pregledano" onClick={() => setSelectedState('pregledano')}>PREGLEDANO</button>
    </div>

    <p style={{textAlign: "left", fontSize: "13px"}} className='px-4 mb-0 mt-4 mb-1'>INBOX</p>
    
    <div class = "px-4 pt-1 ">

        <div class = "card mb-2" style={{textAlign: "left"}}>
        <div class="card-body pregledajCardBody"  style={{paddingRight: "130px"}}>
      <h5 class="card-title ">Moguća dijagnoza Filipa Filipovića</h5>
      <p style={{fontSize: "13px"}} className='mb-1'>Bolnica Sunce • Filip Filipović</p>
      
    <button className='btn btn-primary pregledajGumbPc'  style={{position:"absolute", right:"1rem", top: "30%"}}>Pregledaj           <img width="14" height="14" className = "ms-2  " src={ArrowRightIcon} style={{marginBottom: "2px"}}  alt="right"/>
</button>
    <button className='btn btn-primary pregledajGumbMobile mt-3 col-12'  >Pregledaj           <img width="14" height="14" className = "ms-2  " src={ArrowRightIcon} style={{marginBottom: "2px"}}  alt="right"/>
</button>
     
      
    </div>
        </div>
        
        <div class = "card mb-2" style={{textAlign: "left"}}>
        <div class="card-body pregledajCardBody"  style={{paddingRight: "130px"}}>
      <h5 class="card-title ">Moguća dijagnoza Filipa Filipovića</h5>
      <p style={{fontSize: "13px"}} className='mb-1'>Bolnica Sunce • Filip Filipović</p>
      
    <button className='btn btn-primary pregledajGumbPc'  style={{position:"absolute", right:"1rem", top: "30%"}}>Pregledaj           <img width="14" height="14" className = "ms-2  " src={ArrowRightIcon} style={{marginBottom: "2px"}}  alt="right"/>
</button>
    <button className='btn btn-primary pregledajGumbMobile mt-3 col-12'  >Pregledaj           <img width="14" height="14" className = "ms-2  " src={ArrowRightIcon} style={{marginBottom: "2px"}}  alt="right"/>
</button>
     
      
    </div>
        </div>
        
        <div class = "card mb-2" style={{textAlign: "left"}}>
        <div class="card-body pregledajCardBody"  style={{paddingRight: "130px"}}>
      <h5 class="card-title ">Moguća dijagnoza Filipa Filipovića</h5>
      <p style={{fontSize: "13px"}} className='mb-1'>Bolnica Sunce • Filip Filipović</p>
      
    <button className='btn btn-primary pregledajGumbPc'  style={{position:"absolute", right:"1rem", top: "30%"}}>Pregledaj           <img width="14" height="14" className = "ms-2  " src={ArrowRightIcon} style={{marginBottom: "2px"}}  alt="right"/>
</button>
    <button className='btn btn-primary pregledajGumbMobile mt-3 col-12'  >Pregledaj           <img width="14" height="14" className = "ms-2  " src={ArrowRightIcon} style={{marginBottom: "2px"}}  alt="right"/>
</button>
     
      
    </div>
        </div>
        
        
        
       
       
        



        
    </div>

    </div>
     
    </div>
  );
};

export default Bolovanja;
