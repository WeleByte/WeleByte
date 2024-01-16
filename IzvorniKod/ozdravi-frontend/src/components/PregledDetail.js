import React, { useEffect, useState } from 'react';
import ArrowRightIcon from '../assets/icons/arrow-right.png'
import CloseIcon from '../assets/icons/x2.png'
import PlusIcon from '../assets/icons/plus.png'
import searchIcon from '../assets/icons/search.png'
import Navbar from './Header';
import userIcon from '../assets/images/userIcon.png'
import Select from 'react-select'
import MapComponent from "./MapComponent";
import { Navigate } from 'react-router-dom';
import findAddress from "../assets/scripts/AddressFinder";

const PregledDetail = ({closeNoviPregled, pregledId, backendRoute, bearerToken, user, examination}) => {

  const closeModal = () => {
    closeNoviPregled()
  }

  useEffect(() => {
    console.log(examination)
  }, []);

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
  <p style={{textAlign:"left"}} class ="text"> {examination.patient.first_name + " " + examination.patient.last_name} </p>
</div>
<div className="mb-3">
  <label htmlFor="username" className=" col-12 text-label" style={{float: 'left', textAlign:"left"}}>Doktor</label>
  <p style={{textAlign:"left"}} class ="text">{examination.doctor.first_name + " " + examination.doctor.last_name}</p>
</div>
<div className="mb-3">
  <label htmlFor="username" className=" col-12 text-label" style={{float: 'left', textAlign:"left"}}>Datum</label>
  <p style={{textAlign:"left"}} class ="text"> {examination.date.substring(0,10)}  </p>
</div>
<div className="mb-3">
  <label htmlFor="username" className=" col-12 text-label" style={{float: 'left', textAlign:"left"}}>Lokacija</label>
  <p style={{textAlign:"left"}} class ="text"> {examination.address.country + ", " + examination.address.city + ", " + examination.address.street + ", " + examination.address.number} </p>
</div>








</div>

<div className="mb-3">
  <label htmlFor="username" className=" col-12 text-label" style={{float: 'left', textAlign:"left"}}>Opis pregleda</label>
  <p style={{textAlign:"left"}} class ="text mb-5">{examination.report}</p>
</div>
      <div className="mapWrapper" style={{height: "40vh", width:"90%", margin:"0 auto", paddingBottom:"30px"}}>
        <MapComponent address={examination.address}></MapComponent>
      </div>

</form>
</div>
</div>
    </div>
    
  );
};

export default PregledDetail;
