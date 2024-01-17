import React, {useEffect, useState} from 'react';
import Navbar from '../components/Header';
import ArrowRightIcon from '../assets/icons/arrow-right-blue.png'
import {useNavigate} from "react-router-dom";
import SecondOpinionForm from '../components/SecondOpinionForm';
import SecondOpinionResponse from '../components/SecondOpinionResponse';

const SecondOpinions = (props) => {

    const backendRoute = props.backendRoute
    const navigate = useNavigate()
    const [selectedStatus, setSelectedStatus] = useState('svi')
    const bearerToken = sessionStorage.bearerToken
    const [secondOpinions, setSecondOpinions] = useState([])
    const [currentDetailId, setCurrentDetailId] = useState(null)
    const [novoMisljenjeOpen, setNovoMisljenjeOpen] = useState(false)
    const [novoMisljenjeDetail, setNovoMisljenjeDetail] = useState(false)
    const uloga = sessionStorage.getItem('currentRole');
    const [user, setUser] = useState(null)
    const [refreshOpinions, setRefreshOpinions] = useState(false)

    useEffect(() => {
        if(bearerToken === '' || bearerToken === null || bearerToken === undefined) {
            navigate('/login')
        }else{
            setUser(JSON.parse(sessionStorage.userData))


        }
    }, []);


    useEffect(() => {
        fetch(backendRoute + "/second_opinions", {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${bearerToken}`,
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (response.status === 401) {
                    console.log("unauthorized!!")
                    /* handleLogOut() */
                } else
                if(!response.ok){
                    console.log("Error:", response.status, response.statusText);
                } else {
                    return response.json();
                }
            })
            .then(parsedData => {
                console.log(parsedData)
                setSecondOpinions(parsedData);
                console.log(secondOpinions)
            })
            .catch(error => {
                console.error('Fetch error:', error);
            });
    }, [refreshOpinions]);

    function handleLogOut() {
        sessionStorage.clear()
        localStorage.clear()
        navigate('/login')
    }

    const toggleNovoMisljenje = () => {

        setNovoMisljenjeOpen(!novoMisljenjeOpen);


    };

    const toggleMisljenjeDetail = () => {
        console.log("hello")
        setNovoMisljenjeDetail(!novoMisljenjeDetail);

    };

    const toggleRefreshOpinions = () => {
        setRefreshOpinions((prev) => !prev);
    }

    function handleMisljenjeDetail(id) {
        console.log("handlemisljenje called")
        setCurrentDetailId(id)
        console.log("passed id: ", id)
        console.log("set id: ", currentDetailId)
        toggleMisljenjeDetail()
    }

    if(!bearerToken){
        return null
    }


    return (


        <div id = "HomePageWrapper">
            <Navbar backendRoute={backendRoute} bearerToken={bearerToken}></Navbar>

            {novoMisljenjeOpen && <SecondOpinionForm closeSeccondOpinnionForm = {toggleNovoMisljenje}
                                                     backendRoute={backendRoute}
                                                     bearerToken={bearerToken}
                                                     handleLogOut={handleLogOut}
                                                     user={user} refreshOpinions={toggleRefreshOpinions}/>}
            {novoMisljenjeDetail && <SecondOpinionResponse closeSeccondOpinnionForm = {toggleMisljenjeDetail}
                                                           currentOpinionId={currentDetailId}
                                                           backendRoute={backendRoute}
                                                           bearerToken={bearerToken}
                                                           handleLogOut={handleLogOut}
                                                           role = {uloga}
                                                           />}
            {secondOpinions.length !== 0 ? (
            <div id = "seccondOppWrapper">

                {/*     <p style={{textAlign: "left", fontSize: "13px"}} className='px-4 mb-2 mt-2 mb-1'>4 nepregledanih - 7 pregledanih</p> */}

                <h5 className = "pt-3 px-4 mt-2 " style={{textAlign: "left", maxWidth: "1246px"}}>Druga Mišljenja
                    {/* <button className='btn btn-tertiary mt-1' style={{float: 'right'}}>Povijest </button>  */}
                    {(uloga === "parent" || uloga === "admin") && (
                    <button className = "btn btn-primary" style={{float:"right"}} onClick= {toggleNovoMisljenje}>Dodaj Mišljenje +</button> 
                    )} 
                    </h5>
                <p style={{textAlign: "left", maxWidth: "1200px"}} className = "px-4 mb-4 ">{secondOpinions?.length} dostupna</p>


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
                    {secondOpinions?.map((secondOpinion) => (
                        <div key={secondOpinion.id} className="card mb-0" style={{textAlign: "left"}}>
                            <div className="card-body pregledajCardBody" style={{paddingRight: "130px"}}>
                                <h5 className="card-title ">Pacijent: {secondOpinion.requester.first_name + " " + secondOpinion.requester.last_name}</h5>
                                <p style={{fontSize: "13px"}}
                                   className='mb-1'>{secondOpinion.content} • {secondOpinion.doctor.first_name + " " + secondOpinion.doctor.last_name}</p>
                               
                               
                                <button className='btn btn-secondary pregledajGumbPc'
                                        style={{position: "absolute", right: "1rem", top: "30%"}}
                                        onClick={() => handleMisljenjeDetail(secondOpinion.id)}>Pregledaj <img width="14" height="14"
                                                                                                               className="ms-1 pregledaj-btn  "
                                                                                                               src={ArrowRightIcon}
                                                                                                               style={{marginBottom: "2px"}}
                                                                                                               alt="right"/> {/*  <img width="14" height="14" className = "ms-2  " src={ArrowRightIcon} style={{marginBottom: "2px"}}  alt="right"/> */}
                                </button>
                                <button className='btn btn-secondary pregledajGumbMobile mt-3 '
                                        onClick={() => handleMisljenjeDetail(secondOpinion.id)}
                                        style={{zIndex: "100"}}>Pregledaj <img width="14" height="14"
                                                                               className="ms-1 pregledaj-btn  " src={ArrowRightIcon}
                                                                               style={{marginBottom: "2px"}} alt="right"/>
                                </button>

                            </div>
                        </div>
                    ))}
                </div>

            </div>) 
                : (
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
                    Nema drugih mišljenja
    
                    </h5>
                        <p style={{textAlign: "center", maxWidth: "1200px"}} className = "px-4 mb-2 mt-1 ">
                            {secondOpinions.length} {" "} </p>
                         {(uloga === "parent" ? (
                            <button className = "btn btn-primary ms-2 mt-2 " style={{}} onClick= {toggleNovoMisljenje}>Dodaj mišljenje +</button>  ) : null)}
                           
                        </div>
                )}
         

        </div>
    );
};

export default SecondOpinions;