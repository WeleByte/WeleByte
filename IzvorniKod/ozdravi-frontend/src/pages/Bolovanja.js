import React, {useState} from 'react';
import Navbar from '../components/Header';
import ArrowRightIcon from '../assets/icons/arrow-right-blue.png'
import {useNavigate} from "react-router-dom";

import SeccondOpinnionResponse from '../components/UputaDetail';
import SickLeaveRecommendationForm from '../components/SickLeaveRecommendationForm';
import SickLeaveRecommendationDetail from '../components/SickLeaveRecommendationDetail';

const Bolovanja = () => {

    const user = JSON.parse(sessionStorage.userData)
    const role = user.roles[0].name

  const [selectedStatus, setSelectedStatus] = useState('svi')
  const bearerToken = sessionStorage.bearerToken
 const [novoMisljenjeOpen, setNovoMisljenjeOpen] = useState(false)
 const [novoMisljenjeDetail, setNovoMisljenjeDetail] = useState(false)

  const toggleNovoMisljenje = () => {
        
    setNovoMisljenjeOpen(!novoMisljenjeOpen);
    
   
};
  const toggleMisljenjeDetail = () => {
    setNovoMisljenjeDetail(!novoMisljenjeDetail);
};

  const original = [
      {
          ime: 'Filip', prezime: 'Filipović', lastVisit: '12.1.2023.',
          visitCount: 5, email: 'filip.filipovic@gmail.com', age: 12,
          bolnica: 'Moje ime je Veronika', status: 'nepregledano'
      }, {
          ime: 'Ivan', prezime: 'Ivanovic', lastVisit: '25.6.2023.',
          visitCount: 2, email: 'ivan.ivanovic@gmail.com', age: 69,
          bolnica: 'Vinogradska', status: 'pregledano'
      }, {
          ime: 'Milica', prezime: 'Srbić', lastVisit: '12.1.2023.',
          visitCount: 7, email: 'milica.srbic@gmail.com', age: 23,
          bolnica: 'Rebro', status: 'nepregledano'
      }, {
          ime: 'Joža', prezime: 'Mužić', lastVisit: '69.420.1337.',
          visitCount: 89, email: 'jozica.muzic@gmail.com', age: 8,
          bolnica: 'Trauma', status: 'pregledano'
      }, {
          ime: 'Đurđa', prezime: 'Đurđić', lastVisit: '24.2.1923.',
          visitCount: 257, email: 'jozica.muzic@gmail.com', age: 96,
          bolnica: 'Bolnica Sunce', status: 'nepregledano'
      }, {
          ime: 'Đurđa', prezime: 'Đurđić', lastVisit: '24.2.1923.',
          visitCount: 257, email: 'jozica.muzic@gmail.com', age: 96,
          bolnica: 'Bolnica Sunce', status: 'nepregledano'
      }
  ];
  let nepregledanoCount = original.filter(item => item.status === 'nepregledano').length
  let pregledanoCount = original.filter(item => item.status === 'pregledano').length
  let filteredSecondOpinions

  switch(selectedStatus) {
      case 'svi' :
          filteredSecondOpinions = original
          break
      case 'nepregledano' :
          filteredSecondOpinions = original.filter(user => user.status === 'nepregledano')
          break
      case 'pregledano' :
          filteredSecondOpinions = original.filter(user => user.status === 'pregledano')
  }

  const finalSecondOpinionsList = filteredSecondOpinions.map((secondOpinion) => (
   
      <div className = "card mb-0" style={{textAlign: "left"}}>
          <div className="card-body pregledajCardBody" style={{paddingRight: "130px"}}>
              <h5 className="card-title ">Moguća dijagnoza: {secondOpinion.ime + " " + secondOpinion.prezime}</h5>
              <p style={{fontSize: "13px"}}
                 className='mb-1'>{secondOpinion.bolnica} • {secondOpinion.status}</p>
              <button className='btn btn-secondary pregledajGumbPc'  style={{position:"absolute", right:"1rem", top: "30%"}} onClick = {toggleMisljenjeDetail}>Pregledaj   <img width="14" height="14" className = "ms-1 pregledaj-btn  " src={ArrowRightIcon} style={{marginBottom: "2px"}}  alt="right"/>       {/*  <img width="14" height="14" className = "ms-2  " src={ArrowRightIcon} style={{marginBottom: "2px"}}  alt="right"/> */}
              </button>
              <button className='btn btn-secondary pregledajGumbMobile mt-3 '  onClick = {toggleMisljenjeDetail} style={{zIndex: "100"}}>Pregledaj <img width="14" height="14" className = "ms-1 pregledaj-btn  " src={ArrowRightIcon} style={{marginBottom: "2px"}}  alt="right"/>
              </button>

          </div>
      </div>
    
  ))

  if(!bearerToken){
      return null
  }
  return (
      
    
    <div id = "HomePageWrapper">
     <Navbar></Navbar>

     {novoMisljenjeOpen && <SickLeaveRecommendationForm closeSeccondOpinnionForm = {toggleNovoMisljenje}/>}
     {novoMisljenjeDetail && <SickLeaveRecommendationDetail closeSeccondOpinnionForm = {toggleMisljenjeDetail} role = {role} />}
  
     <div id = "seccondOppWrapper">

        {/*     <p style={{textAlign: "left", fontSize: "13px"}} className='px-4 mb-2 mt-2 mb-1'>4 nepregledanih - 7 pregledanih</p> */}
        <h5 className = "pt-3 px-4 mt-2 " style={{textAlign: "left", maxWidth: "1246px"}}>Preporuke za bolovanja
                    {/* <button className='btn btn-tertiary mt-1' style={{float: 'right'}}>Povijest </button>  */}
                    
                    {role == "pediatrician" || role ==="admin" ? (
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



    
    <div class = "px-4 pt-1 " id = "secondOppinionList">
       {/*  <div class = "selectorHeader">
            <button class ="btn selector-btn selector-btn-selected col-6">Nepregledano ({nepregledanoCount})</button>
            <button class ="btn selector-btn selector-btn-unselected col-6">Pregledano ({nepregledanoCount + 3})</button>
        </div> */}
        {finalSecondOpinionsList}
    </div>

    </div>
     
    </div>
  );
};

export default Bolovanja;
