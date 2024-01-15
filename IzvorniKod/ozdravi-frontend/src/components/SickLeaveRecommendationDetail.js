import React, {useEffect, useState} from 'react';
import ArrowRightIcon from '../assets/icons/arrow-right.png'
import CloseIcon from '../assets/icons/x2.png'
import PlusIcon from '../assets/icons/plus.png'
import searchIcon from '../assets/icons/search.png'
import Navbar from './Header';
import userIcon from '../assets/images/userIcon.png'
import Select from 'react-select'

const SickLeaveRecommendationDetail = (props) => {
  const role = sessionStorage.getItem('currentRole');
  
  const backendRoute = props.backendRoute
  const bearerToken = props.bearerToken
  const [recommendation, setRecommendation] = useState(null)

  useEffect(() => {
    console.log(props.recommendationId)
    fetch(backendRoute + `/sick_leave_recommendation/${props.recommendationId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${bearerToken}`,
        'Content-Type': 'application/json'
      }
    })
        .then(response => {
          // if (response.status === 401) {
          //   props.handleLogOut()
          // } else
            if(!response.ok){
            console.log("Error:", response, response.status, response.statusText);
          } else {
            return response.json();
          }
        })
        .then(parsedData => {
          console.log(parsedData)
          setRecommendation(parsedData);

        })
    // .catch(error => {
    //     console.error('Fetch error:', error);
    // });
  }, []);
  const closeModal = () => {
    props.closeBolovanjeDetail()
  }


  const doktori = [
    { value: '1', label: 'Chocolate' },
    { value: '2', label: 'Marta Martovič' },
    { value: '3', label: 'Vanilla' }
  ]





  return (
    <div id = "addPatientsWrapper" className = "shadow-lg">


    <div id = "addPatientsInner">
   

    <h5 className = "pt-3 px-4 mt-2 mb-3 " style={{textAlign: "left"}}>Preporuku za bolovanje {/* <button className='btn btn-tertiary mt-1' style={{float: 'right'}}>Povijest </button>  */} <img style={{ height: "23px", float: "right" }} onClick = {closeModal} src={CloseIcon}></img>  </h5>
  

    <hr className = "mb-1 mt-4" style={{opacity: "20%"}}></hr>






    

    <div className='px-4 pt-0'>
    <form >

<div style={{display: "grid", gridTemplateColumns: "1fr", gridColumnGap: "20px"}} class ="mt-4">








<div className="mb-3">
  <label htmlFor="username" className=" col-12 text-label" style={{float: 'left', textAlign:"left"}}>Pregled</label>
  <p style={{textAlign:"left"}} class ="text">21.12.2023 - Pregled štitnjače - Johny Smith</p>
</div>
</div>



      {recommendation ? (
          <>
<div className="mb-3">
  <label htmlFor="username" className=" col-12 text-label" style={{float: 'left', textAlign:"left"}}>Doktor </label>
  <p style={{textAlign:"left"}} className ="text">Iva Mrkić</p>
</div>
<div className="mb-3 mt-4">
  <label htmlFor="username" className=" col-12 text-label" style={{float: 'left', textAlign:"left"}}>Roditelj </label>
  <p style={{textAlign:"left"}} className ="text">{recommendation.parent.first_name + " " + recommendation.parent.last_name}</p>
</div>
<div className="mb-3 mt-4">
  <label htmlFor="username" className=" col-12 text-label" style={{float: 'left', textAlign:"left"}}>Status </label>
  <p style={{textAlign:"left"}} className ="text mb-md-5 mb-4">{recommendation.status ? "Odobreno" : "Čeka odobrenje"}</p>
</div>




{ role === "doctor" ? (
<button type="submit" className="btn btn-primary col-12 col-md-2 py-2 mb-2 mb-md-4" style={{float:"right"}} >Odobri </button> 
): null} 

{ role === "doctor" ? (
<button type="submit" className="btn btn-danger col-12 col-md-2 py-2 mb-3 mb-md-4 mx-md-2" style={{float:"right"}} >Odbij </button>
): null}
</>
      ) : ( <p>Loading...</p>)}
</form>
</div>
</div>
    </div>
    
  );
};

export default SickLeaveRecommendationDetail;
