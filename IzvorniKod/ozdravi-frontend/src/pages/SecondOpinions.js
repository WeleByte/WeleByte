import React, {useState} from 'react';
import Navbar from '../components/Header';
import ArrowRightIcon from '../assets/icons/arrow-right.png'

const SecondOpinions = () => {

  const uloga = "doktor"

  const [selectedStatus, setSelectedStatus] = useState('svi')
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
      <div className = "card mb-2" style={{textAlign: "left"}}>
          <div className="card-body pregledajCardBody" style={{paddingRight: "130px"}}>
              <h5 className="card-title ">Moguća dijagnoza: {secondOpinion.ime + " " + secondOpinion.prezime}</h5>
              <p style={{fontSize: "13px"}}
                 className='mb-1'>{secondOpinion.bolnica} • {secondOpinion.status}</p>
              <button className='btn btn-primary pregledajGumbPc'  style={{position:"absolute", right:"1rem", top: "30%"}}>Pregledaj           <img width="14" height="14" className = "ms-2  " src={ArrowRightIcon} style={{marginBottom: "2px"}}  alt="right"/>
              </button>
              <button className='btn btn-primary pregledajGumbMobile mt-3 col-12'  >Pregledaj <img width="14" height="14" className = "ms-2  " src={ArrowRightIcon} style={{marginBottom: "2px"}}  alt="right"/>
              </button>

          </div>
      </div>
  ) )


  return (
      
    
    <div id = "HomePageWrapper">
     <Navbar></Navbar>

  
     <div id = "seccondOppWrapper">
<h3 className = "pt-3 px-4 mt-2 " style={{textAlign: "left"}}>Druga Mišljenja {/* <button className='btn btn-tertiary mt-1' style={{float: 'right'}}>Povijest </button>  */} </h3>
<p style={{textAlign: "left"}} className = "px-4 mb-2 ">{nepregledanoCount} nepregledanih</p>



<div id = "usersSelectorDiv" className = "px-4 pb-1 pt-0 " style={{display: "flex", justifyContent: "left", flexWrap: "wrap"}}>
    <button className = {selectedStatus === 'svi' ?
        "btn btn-primary me-2 mt-2" : "btn btn-secondary me-2 mt-2"}
            id = "nepregledano" onClick={() => setSelectedStatus('svi')}>SVI</button>

    <button className = {selectedStatus === 'nepregledano' ?
        "btn btn-primary me-2 mt-2" : "btn btn-secondary me-2 mt-2"}
            id = "nepregledano" onClick={() => setSelectedStatus('nepregledano')}>NEPREGLEDANO</button>

    <button className = {selectedStatus === 'pregledano' ?
        "btn btn-primary me-2 mt-2" : "btn btn-secondary me-2 mt-2"}
            id = "pregledano" onClick={() => setSelectedStatus('pregledano')}>PREGLEDANO</button>
    </div>

    <p style={{textAlign: "left", fontSize: "13px"}} className='px-4 mb-0 mt-4 mb-1'>INBOX</p>
    
    <div class = "px-4 pt-1 ">
        {finalSecondOpinionsList}
    </div>

    </div>
     
    </div>
  );
};

export default SecondOpinions;
