import React, {useEffect, useState} from 'react';
import Navbar from '../components/Header';
import ArrowRightIcon from '../assets/icons/arrow-right-blue.png'
import {useNavigate} from "react-router-dom";

import SeccondOpinnionResponse from '../components/UputaDetail';
import SickLeaveRecommendationForm from '../components/NovaUputa';
import NovaUputa from '../components/NovaUputa';
import UputaDetail from '../components/UputaDetail';

const Upute = (props) => {
    const navigate = useNavigate()
    const bearerToken = sessionStorage.bearerToken
    const backendRoute = props.backendRoute
    const [instructions, setInstructions] = useState([])
    const [novoMisljenjeOpen, setNovoMisljenjeOpen] = useState(false)
    const [novoMisljenjeDetail, setNovoMisljenjeDetail] = useState(false)
    const [currentInstructionId, setCurrentInstructionId] = useState(null)
    const [user, setUser] = useState('')
    const [refreshExaminations, setRefreshExaminations] = useState(false)


    const uloga = sessionStorage.getItem('currentRole');

    useEffect(() => {
        if(bearerToken === '' || bearerToken === null || bearerToken === undefined) {
            navigate('/login')
        }else{
            setUser(JSON.parse(sessionStorage.userData))
            
            // const logUser = JSON.parse(sessionStorage.userData)
            // console.log(logUser)
        }
    }, []);


    const toggleNovaUputa = () => {

        setNovoMisljenjeOpen(!novoMisljenjeOpen);


    };
    const toggleRefreshExaminations = () => {
        setRefreshExaminations((prev) => !prev);
    }
  const toggleInstructionDetail = () => {
    console.log("hello")
    setNovoMisljenjeDetail(!novoMisljenjeDetail);
   
};

  const handleInstructionDetail = (id) => {
      setCurrentInstructionId(id)
      console.log("passed id: ", id)
      console.log("set id: ", currentInstructionId)
      toggleInstructionDetail()
  }

    useEffect(() => {
        fetch(backendRoute + "/instructions", {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${bearerToken}`,
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (response.status === 401) {
                    handleLogOut()
                } else
                if(!response.ok){
                    console.log("Error:", response.status, response.statusText);
                } else {
                    return response.json();
                }
            })
            .then(parsedData => {
                console.log(parsedData)
                setInstructions(parsedData)

            })
            .catch(error => {
                console.error('Fetch error:', error);
            });
    }, [refreshExaminations]);

    function handleLogOut() {
        sessionStorage.clear()
        localStorage.clear()
        navigate('/login')
    }

  if(!bearerToken){
      return null
  }
  return (
      
    
    <div id = "HomePageWrapper">
     <Navbar backendRoute={backendRoute} bearerToken={bearerToken}></Navbar>

        {novoMisljenjeOpen && <NovaUputa closeUputaForm = {toggleNovaUputa}
                                         backendRoute={backendRoute}
                                         bearerToken={bearerToken}
                                         handleLogOut={handleLogOut}
                                         user={user}
                                         refreshExaminations={toggleRefreshExaminations}/>
        }

     {novoMisljenjeDetail && <UputaDetail closeInstructionDetail = {toggleInstructionDetail}
                                          currentInstructionId={currentInstructionId}
                                          backendRoute={backendRoute}
                                          bearerToken={bearerToken}
                                          handleLogOut={handleLogOut}/>}
    
    {instructions.length !== 0 ? (
     <div id = "seccondOppWrapper">

        {/*     <p style={{textAlign: "left", fontSize: "13px"}} className='px-4 mb-2 mt-2 mb-1'>4 nepregledanih - 7 pregledanih</p> */}
        <h5 className = "pt-3 px-4 mt-2 " style={{textAlign: "left", maxWidth: "1246px"}}>Upute
                    {/* <button className='btn btn-tertiary mt-1' style={{float: 'right'}}>Povijest </button>  */}
                    {(uloga === "admin" || uloga === "doctor" || uloga === "pediatrician") && (
                    <button className = "btn btn-primary" style={{float:"right"}} onClick= {toggleNovaUputa}>Dodaj Uputu +</button> 
                    )}</h5>
                    <p style={{textAlign: "left", maxWidth: "1200px"}} className = "px-4 mb-4 ">{instructions ? instructions.length : 0} uputa</p>


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
        
        {instructions.map((instruction) => {
            const formattedDate = new Date(instruction.date).toLocaleDateString()

            return(
            <div key={instruction.id} className = "card mb-0" style={{textAlign: "left"}}>
                <div className="card-body pregledajCardBody" style={{paddingRight: "130px"}}>
                    <h5 className="card-title ">Pacijent: {instruction.patient.first_name + " " + instruction.patient.last_name}</h5>
                    <p style={{fontSize: "13px"}}
                       className='mb-1'>{formattedDate} • {instruction.doctor.first_name + " " + instruction.doctor.last_name}</p>
                    <button className='btn btn-secondary pregledajGumbPc'  style={{position:"absolute", right:"1rem", top: "30%"}} onClick={() => handleInstructionDetail(instruction.id)}>Pregledaj   <img width="14" height="14" className = "ms-1 pregledaj-btn  " src={ArrowRightIcon} style={{marginBottom: "2px"}}  alt="right"/>       {/*  <img width="14" height="14" className = "ms-2  " src={ArrowRightIcon} style={{marginBottom: "2px"}}  alt="right"/> */}
                    </button>
                    <button className='btn btn-secondary pregledajGumbMobile mt-3 '  onClick={() => handleInstructionDetail(instruction.id)} style={{zIndex: "100"}}>Pregledaj <img width="14" height="14" className = "ms-1 pregledaj-btn  " src={ArrowRightIcon} style={{marginBottom: "2px"}}  alt="right"/>
                    </button>

                </div>
            </div>

        )})}
    </div>

    </div> ): (
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
                Još nema unesenih uputa

                         </h5>
    
    
                     <p style={{textAlign: "center", maxWidth: "1200px"}} className = "px-4 mb-2 mt-1 ">{instructions.length} {" "} 
                     
                uputa
    
                     </p> 
                     {(uloga === "doctor" || uloga === "pediatrician" || uloga === "admin"  ? (
                        <button className = "btn btn-primary ms-2 mt-2 " style={{}} onClick= {toggleNovaUputa}>Nova uputa +</button>  ) : null)}
                       
                    </div>
            )}
     
    </div> 
  );
};

export default Upute;
