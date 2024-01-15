import React, {useEffect, useState} from 'react';
import Navbar from '../components/Header';
import ArrowRightIcon from '../assets/icons/arrow-right-blue.png'
import {useNavigate} from "react-router-dom";

import SeccondOpinnionResponse from '../components/UputaDetail';
import SickLeaveRecommendationForm from '../components/SickLeaveRecommendationForm';
import SickLeaveRecommendationDetail from '../components/SickLeaveRecommendationDetail';

const Bolovanja = (props) => {

    const user = JSON.parse(sessionStorage.userData)
    const currentRole = sessionStorage.getItem('currentRole');
    const backendRoute = props.backendRoute
    const [selectedStatus, setSelectedStatus] = useState('svi')
    const bearerToken = sessionStorage.bearerToken
    const navigate = useNavigate()
    const [novoBolovanjeOpen, setNovoBolovanjeOpen] = useState(false)
    const [novoBolovanjeDetail, setNovoBolovanjeDetail] = useState(false)
    const [recommendations, setRecommendations] = useState([])
    const [currentDetailId, setCurrentDetailId] = useState()

    useEffect(() => {
        fetch(backendRoute + "/role", {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${bearerToken}`,
                'Content-type': 'application/json'
            }
        })
            .then(response => {
                if(response.status === 401){
                    handleLogOut()
                } else if(!response.ok) {
                    console.log(response)
                }
                else {
                    return response.json()
                }
            })
            .then(parsedRole => {
                console.log(parsedRole)
             
            })
    }, []);

  const toggleNovoMisljenje = () => {
        
    setNovoBolovanjeOpen(!novoBolovanjeOpen);
};

  const toggleBolovanjeDetail = () => {
    setNovoBolovanjeDetail(!novoBolovanjeDetail);
};

    function handleLogOut() {
        sessionStorage.clear()
        localStorage.clear()
        navigate('/login')
    }

    useEffect(() => {
        fetch(backendRoute + "/sick_leave_recommendations", {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${bearerToken}`,
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (response.status === 401) {
                    handleLogOut()
                } else if(!response.ok){
                    console.log("Error:", response, response.status, response.statusText);
                } else {
                    return response.json();
                }
            })
            .then(parsedData => {
                console.log(parsedData)
                setRecommendations(parsedData);

            })
        // .catch(error => {
        //     console.error('Fetch error:', error);
        // });
    }, []);

  // switch(selectedStatus) {
  //     case 'svi' :
  //         filteredSecondOpinions = original
  //         break
  //     case 'nepregledano' :
  //         filteredSecondOpinions = original.filter(user => user.status === 'nepregledano')
  //         break
  //     case 'pregledano' :
  //         filteredSecondOpinions = original.filter(user => user.status === 'pregledano')
  // }



  if(!bearerToken){
      return null
  }

    function handleBolovanjeDetail(id) {
        console.log("id: ", id)
        setCurrentDetailId(id)
        toggleBolovanjeDetail()
    }

    return (
      
    
    <div id = "HomePageWrapper">
     <Navbar backendRoute={backendRoute} bearerToken={bearerToken}></Navbar>

     {novoBolovanjeOpen && <SickLeaveRecommendationForm closeSeccondOpinnionForm = {toggleNovoMisljenje}/>}
     {novoBolovanjeDetail && <SickLeaveRecommendationDetail closeBolovanjeDetail= {toggleBolovanjeDetail}
                                                            role = {currentRole}
                                                            backendRoute={backendRoute}
                                                            bearerToken={bearerToken}
                                                            recommendationId={currentDetailId}
                                                            handleLogOut={handleLogOut}/>}
  {recommendations.length != 0 ? (
     <div id = "seccondOppWrapper">

        {/*     <p style={{textAlign: "left", fontSize: "13px"}} className='px-4 mb-2 mt-2 mb-1'>4 nepregledanih - 7 pregledanih</p> */}
        <h5 className = "pt-3 px-4 mt-2 " style={{textAlign: "left", maxWidth: "1246px"}}>Preporuke za bolovanja
                    {/* <button className='btn btn-tertiary mt-1' style={{float: 'right'}}>Povijest </button>  */}
                    
                    {currentRole === "pediatrician" || currentRole ==="admin" ? (
                        <button className = "btn btn-primary" style={{float:"right"}} onClick= {toggleNovoMisljenje}>Dodaj Preporuku +</button> 
                    ) : null }
                    
                    </h5>
                 <p style={{textAlign: "left", maxWidth: "1200px"}} className = "px-4 mb-4 ">{10} nepregladnih</p> 


{/*     <p style={{textAlign: "left", fontSize: "13px"}} className='px-4 mb-2 mt-2 mb-1'>4 nepregledanih - 7 pregledanih</p> */}


{/* <div id = "usersSelectorDiv" className = "px-4 pb-1 pt-0 " style={{display: "flex", justifyContent: "left", flexWrap: "wrap"}}>
    <button className = {selectedStatus === 'svi' ?
        "btn btn-primary chip-selected  me-2 mt-2" : "btn btn-secondary chip-unselected me-2 mt-2"}
            id = "nepregledano" onClick={() => setSelectedStatus('svi')}>Sve</button>

    <button className = {selectedStatus === 'nepregledano' ?
        "btn btn-primary chip-selected  me-2 mt-2" : "btn btn-secondary chip-unselected  me-2 mt-2"}
            id = "nepregledano" onClick={() => setSelectedStatus('nepregledano')}>Nepregledano</button>

    <button className = {selectedStatus === 'pregledano' ?
        "btn btn-primary chip-selected  me-2 mt-2" : "btn btn-secondary chip-unselected  me-2 mt-2"}
            id = "pregledano" onClick={() => setSelectedStatus('pregledano')}>Pregledano</button>
    </div> */}




    <div className = "px-4 pt-1 " id = "secondOppinionList">
       {/*  <div class = "selectorHeader">
            <button class ="btn selector-btn selector-btn-selected col-6">Nepregledano ({nepregledanoCount})</button>
            <button class ="btn selector-btn selector-btn-unselected col-6">Pregledano ({nepregledanoCount + 3})</button>
        </div> */}
        {
            recommendations.map((recommendation) => (

            <div key={recommendation.id} className = "card mb-0" style={{textAlign: "left"}}>
                <div className="card-body pregledajCardBody" style={{paddingRight: "130px"}}>
                    <h5 className="card-title ">Moguća dijagnoza: {recommendation.parent.first_name + " " + recommendation.parent.last_name}</h5>
                    <p style={{fontSize: "13px"}}
                       className='mb-1'>{} • {}</p>
                    <button className='btn btn-secondary pregledajGumbPc'  style={{position:"absolute", right:"1rem", top: "30%"}} onClick = {() => handleBolovanjeDetail(recommendation.id)}>Pregledaj <img width="14" height="14" className = "ms-1 pregledaj-btn  " src={ArrowRightIcon} style={{marginBottom: "2px"}}  alt="right"/>       {/*  <img width="14" height="14" className = "ms-2  " src={ArrowRightIcon} style={{marginBottom: "2px"}}  alt="right"/> */}
                    </button>
                    <button className='btn btn-secondary pregledajGumbMobile mt-3 '  onClick = {() => handleBolovanjeDetail(recommendation.id)} style={{zIndex: "100"}}>Pregledaj <img width="14" height="14" className = "ms-1 pregledaj-btn  " src={ArrowRightIcon} style={{marginBottom: "2px"}}  alt="right"/>
                    </button>

                </div>
            </div>

        ))}
    </div>

    </div>  ): (
                <div id = "usersWrapperInner" style={{
                    display: "flex",        // Enable Flexbox
                    flexDirection: "column", // Stack children vertically
                    justifyContent: "center", // Center content vertically
                    alignItems: "center",    // Center content horizontally
                    height: "90vh",   
                       // Take full viewport height
                       // Optional: If you still want additional padding on top
                }}>


                <h5 className = " px-4 mt-0 pt-0 " style={{textAlign: "center", maxWidth: "1246px"}}>
                Nema preporuka za bolovanje

                         </h5>
    
    
                     <p style={{textAlign: "center", maxWidth: "1200px"}} className = "px-4 mb-2 mt-1 ">{recommendations.length} {" "} 
                     
                preporuka
    
                     </p> 
                     {(currentRole === "doctor" || currentRole === "pediatrician" || currentRole === "admin"  ? (
                        <button className = "btn btn-primary ms-2 mt-2 " style={{}} onClick= {toggleNovoMisljenje}>Nova preporuka +</button>  ) : null)}
                       
                    </div>
            )}
     
    </div>
  );
};

export default Bolovanja;
