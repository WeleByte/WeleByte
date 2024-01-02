import React, { useState } from 'react';
import ArrowRightIcon from '../assets/icons/arrow-right.png'
import CloseIcon from '../assets/icons/x2.png'
import PlusIcon from '../assets/icons/plus.png'
import searchIcon from '../assets/icons/search.png'
import Navbar from './Header';
import userIcon from '../assets/images/userIcon.png'
import Select from 'react-select'

const PregledDetail = ({closeNoviPregled}) => {

  const closeModal = () => {
    closeNoviPregled()
  }


  return (
    <div id = "addPatientsWrapper" className = "shadow-lg">


    <div id = "addPatientsInner">
   

    <h5 className = "pt-3 px-4 mt-2 mb-3 " style={{textAlign: "left"}}>Detalji pregleda {/* <button className='btn btn-tertiary mt-1' style={{float: 'right'}}>Povijest </button>  */} <img style={{ height: "23px", float: "right" }} onClick = {closeModal} src={CloseIcon}></img>  </h5>
  

<hr className = "mb-1 mt-4" style={{opacity: "20%"}}></hr>






    

    <div className='px-4 pt-0'>
    <form >

<div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gridColumnGap: "20px"}} class ="mt-4">



<div className="mb-3">
  <label htmlFor="username" className=" col-12 text-label" style={{float: 'left', textAlign:"left"}}>Pacijent</label>
  <p style={{textAlign:"left"}} class ="text">Marko Marković</p>
</div>
<div className="mb-3">
  <label htmlFor="username" className=" col-12 text-label" style={{float: 'left', textAlign:"left"}}>Doktor</label>
  <p style={{textAlign:"left"}} class ="text">Ivan Ivanović</p>
</div>
<div className="mb-3">
  <label htmlFor="username" className=" col-12 text-label" style={{float: 'left', textAlign:"left"}}>Datum</label>
  <p style={{textAlign:"left"}} class ="text">3.8.2023</p>
</div>
<div className="mb-3">
  <label htmlFor="username" className=" col-12 text-label" style={{float: 'left', textAlign:"left"}}>Lokacija</label>
  <p style={{textAlign:"left"}} class ="text">Zagreb, Hrvatska</p>
</div>








</div>

<div className="mb-3">
  <label htmlFor="username" className=" col-12 text-label" style={{float: 'left', textAlign:"left"}}>Opis pregleda</label>
  <p style={{textAlign:"left"}} class ="text mb-5">Na današnjem pregledu kod doktora, pacijent je opisao svoje simptome i medicinsku povijest. Doktor je pažljivo pregledao pacijenta, mjerio vitalne znakove i postavljao relevantna pitanja. Nakon toga, doktor je postavio preliminarnu dijagnozu i preporučio određene terapijske mjere. Pacijentu su dana dodatna uputstva i naloženo je da slijedi propisani tretman te da se pridržava zakazanih kontrolnih termina. Pregled je završen, a pacijent je napustio ordinaciju sa svim potrebnim informacijama i uputama.</p>
</div>

</form>
</div>
</div>
    </div>
    
  );
};

export default PregledDetail;
