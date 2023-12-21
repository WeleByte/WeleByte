import React, {useState, useEffect } from 'react';
import Navbar from '../components/Header';
import userIcon from '../assets/images/userIcon.png'
import AddPatient from '../components/AddPatient';
import searchIcon from '../assets/icons/search.png'
import chevronLeft from '../assets/icons/chevron-left.png'
import chevronRight from '../assets/icons/chevron-right.png'
import CloseIcon from '../assets/icons/x2.png'
import TrashIcon from '../assets/icons/trash.png'
import Plus2Icon from '../assets/icons/plus2.png'
import { useNavigate } from "react-router-dom";

import NoviPregled from '../components/NoviPregled';


const Examinations = (props) => {

    const backendRoute = props.backendRoute
    const navigate = useNavigate()
    const bearerToken = sessionStorage.bearerToken
    const uloga = "doktor"
    const [selectedUsers, setSelectedUsers] = useState('svi')
    let currentOpenedOptions = null;
    let optionsOpened= false;
    const [examinations, setExaminations] = useState([])
    const [isAddPatientVisible, showAddPatient] = useState(false);
    const [isPregledDetailVisible, setIsPregledDetailVisible] = useState(false);


    const toggleAddPatient = () => {
        showAddPatient(!isAddPatientVisible);

    };

    const [noviPregledOtvoren, setNoviPregledOtvoren] = useState(false);

    const toggleNoviPregled = () => {
        setNoviPregledOtvoren(!noviPregledOtvoren);
        if (currentOpenedOptions) {
            closeUserOptions(currentOpenedOptions)
        }
       
    };

    const togglePregledDetail = () => {
        setIsPregledDetailVisible(!isPregledDetailVisible);
        if (currentOpenedOptions) {
            closeUserOptions(currentOpenedOptions)
        }
       
    };

    const closeUserOptions = (index) => {
        console.log("closing")
        
            const tbody = document.querySelector(`#usersTable tbody`);
            const tr = tbody.querySelector(`#usersTable tr:nth-child(${index + 1})`);


            const userOptions = tr.querySelector('.userOptions');

            userOptions.style.display = 'none';

    }

    
    const openUserOptions = (index) => {
        console.log("opening");
        console.log(currentOpenedOptions);
    
        // Close previously opened options if any
        if (currentOpenedOptions !== null && currentOpenedOptions !== index) {
            closeUserOptions(currentOpenedOptions);
        }
    
        optionsOpened = true;
    
        const tbody = document.querySelector(`#usersTable tbody`);
        const tr = tbody.querySelector(`tr:nth-child(${index + 1})`);
        const userOptions = tr.querySelector('.userOptions');
    
        userOptions.style.display = 'block';
    
        currentOpenedOptions = index;
    }

    useEffect(() => {
        

       
        
    }, []); // Empty dependency array ensures the effect runs only once on mount




    /*----------------------------------------------HARKODIRANO
      const original = [
          {
              ime: 'Filip', prezime: 'Filipović', lastVisit: '12.1.2023.',
              visitCount: 5, email: 'filip.filipovic@gmail.com', age: 12
          }, {
              ime: 'Ivan', prezime: 'Ivanovic', lastVisit: '25.6.2023.',
              visitCount: 2, email: 'ivan.ivanovic@gmail.com', age: 69
          }, {
              ime: 'Milica', prezime: 'Srbić', lastVisit: '12.1.2023.',
              visitCount: 7, email: 'milica.srbic@gmail.com', age: 23
          }, {
              ime: 'Joža', prezime: 'Mužić', lastVisit: '69.420.1337.',
              visitCount: 89, email: 'jozica.muzic@gmail.com', age: 8
          }, {
              ime: 'Đurđa', prezime: 'Đurđić', lastVisit: '24.2.1923.',
              visitCount: 257, email: 'jozica.muzic@gmail.com', age: 96
          }
      ];

      let odrasliCount = original.filter(user => user.age >= 18).length
      let djecaCount = original.filter(user => user.age < 18).length
      let filteredUsers

        switch(selectedUsers){
            case 'svi' : filteredUsers = original
                break
            case 'odrasli' : filteredUsers = original.filter(user => user.age >= 18)
                break
            case 'djeca' : filteredUsers = original.filter(user => user.age < 18)
                break
      }

     ---------------------------------------------------------------------*/

    function handleLogOut() {
        sessionStorage.clear()
        localStorage.clear()
        navigate('/login')
    }

    useEffect(() => {
        fetch(backendRoute + "/examinations", {
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
                setExaminations(parsedData);
                
            })
            // .catch(error => {
            //     console.error('Fetch error:', error);
            // });
    }, []);

    if(!bearerToken){
        return null
    }

    return (


        <div id = "UsersWrapper">
            <Navbar></Navbar>

            {noviPregledOtvoren && <NoviPregled closeNoviPregled = {toggleNoviPregled}/>}
            



            <div id = "usersWrapperInner">


                <h3 className = "pt-3 px-4 mt-2 " style={{textAlign: "left", maxWidth: "1246px"}}>Pregledi
                    {/* <button className='btn btn-tertiary mt-1' style={{float: 'right'}}>Povijest </button>  */}
                    <button className = "btn btn-primary" style={{float:"right"}} onClick= {toggleNoviPregled}>Novi Pregled +</button> </h3>
                {/* <p style={{textAlign: "left", maxWidth: "1200px"}} className = "px-4 mb-2 ">{odrasliCount + djecaCount} pacijenata</p> */}



                {/* <div id = "usersSelectorDiv" className = "px-4 pb-1 pt-0 " style={{display: "flex", justifyContent: "left", flexWrap: "wrap"}}>

    <button className = {selectedUsers === 'svi' ?
        "btn btn-primary me-2 mt-2" : "btn btn-secondary me-2 mt-2"}
            id = "nepregledano" onClick={() => setSelectedUsers('svi')}>SVI</button>

    <button className = {selectedUsers === 'odrasli' ?
        "btn btn-primary me-2 mt-2" : "btn btn-secondary me-2 mt-2"}
            id = "nepregledano" onClick={() => setSelectedUsers('odrasli')}> ODRASLI</button>

    <button className = {selectedUsers === 'djeca' ?
        "btn btn-primary me-2 mt-2" : "btn btn-secondary me-2 mt-2"}
            id = "pregledano" onClick={() => setSelectedUsers('djeca')}> DJECA</button>

</div> */}


                <div id = "patientSearchBoxDiv" className='px-4 pt-3 ' >

                    <div className="input-group mb-0 mx-0  p-3 searchContainer" style={{maxWidth: "1200px"}} >
                        <img src= {searchIcon} className = "searchIconUsers"></img>
                        <input type="text" className="form-control me-0 searchInput" style = {{ borderTopRightRadius: "7px", borderBottomRightRadius: "7px", }}
                               placeholder="Pretraži" aria-label="Recipient's username" aria-describedby="basic-addon2" ></input>

                    </div>
                </div>




                <div className='px-4 pt-0'>
                    <table className="table  table-bordered " id= "usersTable" style={{maxWidth: "1200px"}}>



                        <thead>
                        <tr>
                            <th scope="col" >PACIJENT</th>
                            <th scope="col">DOKTOR</th>
                            <th scope="col">LAST VISIT</th>
                            <th scope="col">NO. VISITS</th>
                            <th scope="col">ADRESA</th>
                            <th scope="col"></th>


                        </tr>
                        </thead>
                        <tbody>
                        {examinations.map((examination, index) =>
                            (
                                <tr  style={{ position: 'relative' }}>
                                    <td scope="row">
                                        <img src = {userIcon} alt = "" width = "14" className='me-3' style={{opacity: "75%"}}></img>
                                        {examination.patient.first_name + " " + examination.patient.last_name}
                                    </td>
                                    <td>{examination.doctor.first_name + " " + examination.doctor.last_name}</td>
                                    <td>{examination.patient.email}</td>
                                    <td>{examination.report}</td>
                                    <td>{examination.address.street}</td>

                                    <td className = "three-dot-td" >


                                        <img width="18" height="18" onClick={() => openUserOptions(index)}  src="https://img.icons8.com/ios-glyphs/30/menu-2.png" alt="menu-2"/></td>

                                    <ul className="list-group userOptions shadow-lg p-0 border" style={{display:"none"}}>
                                        <p className ="mb-2 mt-2 ps-3 py-1" style={{textAlign: "left"}}>Akcije <img className =" mt-1 closeActionsIcon" style={{ height: "19px", float: "right", opacity: "80%"}} onClick={() => closeUserOptions(index)} src={CloseIcon}></img>  </p>
                                        <hr className ="mt-0 mb-0" style={{opacity: "20%"}}></hr>
                                        <button onClick={toggleNoviPregled} className =" ps-3 col-12 mb-2 mt-2 py-2 novi-pregled-btn" style={{opaciy: "80%",textAlign: "left", fontWeight:"500", border:"none", background:"none"}} > Novi pregled  <img className ="me-3 mt-1" style={{ height: "19px", float: "right", opacity: "80%" }} src={Plus2Icon}></img> </button>

                                        <button className =" ps-3  col-12 mb-2 py-2 delete-btn" style={{opaciy: "80%",textAlign: "left", fontWeight:"500", border:"none", background:"none"}}> Izbriši <img className ="me-3 mt-1" style={{ height: "19px", float: "right", opacity: "800%" }}  src={TrashIcon}></img> </button>

                                    </ul>

                                </tr>
                            ))}

                        </tbody>
                    </table>
                    <div className="input-group mb-0 mx-0  paginationContainer " style={{maxWidth: "1200px"}} >

                        <span className = "me-3">{examinations === [] ? (0) : (1 + '-' + examinations.length)} of {examinations.length}</span>
                        <img src= {chevronLeft} style={{float: "right"}} className = "chevronIcon"></img>
                        <img src= {chevronRight} style={{float: "right"}} className = "chevronIcon"></img>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Examinations;
