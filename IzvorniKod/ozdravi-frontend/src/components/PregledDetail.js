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

const PregledDetail = (props) => {
  const {closeNoviPregled, pregledId, refreshExaminations,
    backendRoute, bearerToken, user, examination, handleLogOut, currentRole} = props
  const [report, setReport] = useState(examination.report)
  const [errorMessage, setErrorMessage] = useState(null)
  const closeModal = () => {
    closeNoviPregled()
  }


  const insertNewline = (str) => {
    let result = '';
    let maxLength = 30 // parametar za najdulji niz znakova
    for (let i = 0; i < str.length; i += maxLength) {
      const chunk = str.substring(i, i + maxLength);
      const prevChunk = result.substring(Math.max(0, result.length - maxLength), result.length);

      // Check if the previous chunk has a space or newline character
      if (!prevChunk.includes(' ') && !prevChunk.includes('\n')) {
        result += '\n';
      }

      result += chunk;
    }
    return result;
  };



  const handleSubmit = (e) => {
    e.preventDefault()
    if(report !== ""){
      fetch(backendRoute + `/examination/${examination.id}`, {
        method: 'PUT',
        headers: {
          'Authorization' : `Bearer ${bearerToken}`,
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
          report: report,
          doctor_id: examination.doctor.id,
          patient_id: examination.patient.id,
          scheduler_id: examination.scheduler.id,
          date: examination.date,
          address: {
            street: examination.address.street,
            number: examination.address.number,
            city: examination.address.city,
            country: examination.address.country,
            longitude: examination.address.longitude,
            latitude: examination.address.latitude
          }

        })
      })
          .then(response => {
            // if(response.status === 401){
              // handleLogOut()
            // } else
            if(!response.ok){
              console.log('negotof')
              console.error("Error: ", response)
            } else{
              console.log('gotof')
              refreshExaminations()
              closeModal()
            }
          })
    } else {
        setErrorMessage("Opis pregleda ne smije ostat prazan")
    }
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
  <p style={{textAlign:"left"}} className ="text"> {examination.patient.first_name + " " + examination.patient.last_name} </p>
</div>
<div className="mb-3">
  <label htmlFor="username" className=" col-12 text-label" style={{float: 'left', textAlign:"left"}}>Doktor</label>
  <p style={{textAlign:"left"}} className ="text">{examination.doctor.first_name + " " + examination.doctor.last_name}</p>
</div>
<div className="mb-3">
  <label htmlFor="username" className=" col-12 text-label" style={{float: 'left', textAlign:"left"}}>Datum</label>
  <p style={{textAlign:"left"}} className ="text"> {examination.date.substring(0,10)}  </p>
</div>
<div className="mb-3">
  <label htmlFor="username" className=" col-12 text-label" style={{float: 'left', textAlign:"left"}}>Lokacija</label>
  <p style={{textAlign:"left"}} className ="text"> {examination.address.country + ", " + examination.address.city + ", " + examination.address.street + ", " + examination.address.number} </p>
</div>

  {currentRole === 'doctor' || currentRole === 'pediatrician' || currentRole === 'admin' ? (
      <div className="mb-3">
    <label htmlFor="username" className=" col-12 text-label" style={{float: 'left', textAlign:"left"}}>Opis pregleda</label>
    {/*<p style={{textAlign:"left"}} className ="text">{insertNewline(examination.report)}</p>*/}
    <textarea rows = "7" type="text" className="form-control" id="examination-description"
              style={{}}
              value={report}
              onChange={(e) => setReport(e.target.value)}/>

  </div>
  ) : (
    <div className="mb-3">
      <label htmlFor="username" className=" col-12 text-label" style={{float: 'left', textAlign:"left"}}>Opis pregleda </label>
      <p style={{textAlign:"left"}} className ="mb-3">{examination.report}</p>
    </div>
      )}


    <div className="mapWrapper" style={{height: "40vh", width:"90%", margin:"2% 0 auto 0", paddingBottom:"30px"}}>
      <MapComponent address={examination.address}></MapComponent>
    </div>



</div>
      { currentRole === "doctor" || currentRole === "pediatrician" || currentRole === "admin" ? (
          <button type="submit" className="btn btn-primary col-12 col-md-2 py-2 mb-4" style={{float:"right"}}
                  onClick={handleSubmit} >Spremi </button>
      ): null}

</form>
      {errorMessage ?
          <p style={{color: 'red'}}>{errorMessage}</p>
          : null}
</div>
</div>
    </div>
    
  );
};

export default PregledDetail;
