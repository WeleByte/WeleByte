import React, {useEffect, useState} from 'react';
import ArrowRightIcon from '../assets/icons/arrow-right.png'
import CloseIcon from '../assets/icons/x2.png'
import PlusIcon from '../assets/icons/plus.png'
import searchIcon from '../assets/icons/search.png'
import Navbar from './Header';
import userIcon from '../assets/images/userIcon.png'
import Select from 'react-select'
import userForm from "./UserForm";

const SickLeaveRecommendationForm = (props) => {

  const [selectedExamination, setSelectedExamination] = useState(null)
  const [examinations, setExaminations] = useState(null)
  const closeModal = () => {
    props.closeSeccondOpinnionForm()
  }


  useEffect(() => {
    fetch(props.backendRoute + "/examinations", {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${props.bearerToken}`,
        'Content-Type': 'application/json'
      }
    })
        .then(response => {
          if (response.status === 401) {
            props.handleLogOut()
          } else if(!response.ok){
            console.log("Error:", response, response.status, response.statusText);
          } else {
            return response.json();
          }
        })
        .then(parsedData => {
          console.log(parsedData)
          setExaminations(parsedData.map(examination => ({
            value: examination.id,
            label: examination.patient.first_name + " " + examination.patient.last_name + ": "
            + (examination.report.length < 30 ? examination.report : (examination.report.substring(0, 30) + "..."))
          })));

        })
  }, []);


  const handleNewRecommendation = (e) => {
    e.preventDefault()
    fetch(props.backendRoute + "/sick_leave_recommendations", {
      method: 'POST',
      headers: {
        'Authorization' : `Bearer ${props.bearerToken}`,
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({
        examination_id: selectedExamination.value
      })
    })
        .then(response => {
          console.log(response)
          props.refreshRecommendations()
          closeModal()

        })
  }

  return (
    <div id = "addPatientsWrapper" className = "shadow-lg">


    <div id = "addPatientsInner">
   

    <h5 className = "pt-3 px-4 mt-2 mb-3 " style={{textAlign: "left"}}>Dodaj preporuku za bolovanje {/* <button className='btn btn-tertiary mt-1' style={{float: 'right'}}>Povijest </button>  */} <img style={{ height: "23px", float: "right" }} onClick = {closeModal} src={CloseIcon}></img>  </h5>
  

    <hr className = "mb-1 mt-4" style={{opacity: "20%"}}></hr>






    

    <div className='px-4 pt-0'>
    <form >

<div style={{display: "grid", gridTemplateColumns: "1fr", gridColumnGap: "20px"}} class ="mt-4">






<div className="mb-4" >

<Select options={examinations} placeholder = "Pregled..."
        onChange={selectedOption => setSelectedExamination(selectedOption)}/>
</div>


</div>


<button type="submit" className="btn btn-primary col-12 col-md-2 py-2 mb-4" style={{float:"right"}}
onClick={handleNewRecommendation} >Spremi </button>
</form>
</div>
</div>
    </div>
    
  );
};

export default SickLeaveRecommendationForm;
