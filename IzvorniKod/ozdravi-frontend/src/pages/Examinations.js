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
import InfoIcon from '../assets/icons/info.png'
import { useNavigate } from "react-router-dom";

import NoviPregled from '../components/NoviPregled';
import PregledDetail from '../components/PregledDetail';


const Examinations = (props) => {

    const backendRoute = props.backendRoute
    const navigate = useNavigate()
    const bearerToken = sessionStorage.bearerToken

    const [selectedUsers, setSelectedUsers] = useState('svi')
    let currentOpenedOptions = null;
    let optionsOpened= false;
    const [refreshExaminations, setRefreshExaminations] = useState(false)
    const [selectedExaminations, setSelectedExaminations] = useState([])
    const [searchedExaminations, setsearchedExaminations] = useState([])
    const [parentExaminations, setParentExaminations] = useState([])
    const [childExaminations, setChildExaminations] = useState([])
    const [isAddPatientVisible, showAddPatient] = useState(false);
    const [isPregledDetailVisible, setIsPregledDetailVisible] = useState(false);
    const [selectedPregledId, setSelectedPregledId] = useState("")
    const uloga = sessionStorage.getItem('currentRole');
    const [selectedStatus, setSelectedStatus] = useState('roditelj')
    const currentRole = sessionStorage.getItem('currentRole')

    const [user, setUser] = useState('')
    const [roles, setRoles] = useState([""])



    const [page, setPage] = useState(1);
    const [pageSize, setpageSize] = useState(5);
    const [startItem, setStartItem] = useState(1)

    function pageUp() {
        if ((page + 1) * pageSize > roundUpToNearestMultipleOf5(selectedExaminations.length)) {
            return
        }
        setPage(page + 1);
        setStartItem((page-1)*pageSize + 1)

    }

    function pageDown() {

        if ((page - 1) === 0) {
            return
        }
        setPage(page - 1)
    }

    function roundUpToNearestMultipleOf5(number) {
        return Math.ceil(number / 5) * 5;
    }

    const searchExaminations = (e) => {
        console.log(e)
        const inputValue = e.target.value.toLowerCase()
        const filtered = selectedExaminations.filter(
            (examination) =>
                (examination.patient.first_name + examination.patient.last_name).toLowerCase().includes(inputValue)
        );
        setsearchedExaminations(filtered)
    }


    useEffect(() => {
        if(bearerToken === '' || bearerToken === null || bearerToken === undefined) {
            navigate('/login')
        }else{
            setUser(JSON.parse(sessionStorage.userData))


        }
    }, []);

    const toggleRefreshExaminations = () => {
        setRefreshExaminations((prev) => !prev);
    }
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

    const togglePregledDetail = (id) => {
        setSelectedPregledId(id);
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
                if(parsedData){
                    console.log(parsedData)


                    setParentExaminations(parsedData.filter(examination => examination.patient.roles
                        .map(role => role.name).includes('parent')))

                    setChildExaminations(parsedData.filter(examination => examination.patient.roles
                        .map(role => role.name).includes('child')))

                    setsearchedExaminations(parsedData.filter(examination => examination.patient.roles
                        .map(role => role.name).includes('parent')))

                    switch (currentRole) {
                        case 'parent' :
                            setSelectedExaminations(parsedData.filter(examination => examination.patient.roles
                                .map(role => role.name).includes('parent')))
                            break
                        case 'pediatrician' :
                            setSelectedExaminations(parsedData.filter(examination => examination.patient.roles
                                .map(role => role.name).includes('child')))
                            break
                        case 'doctor' :
                            setSelectedExaminations(parsedData)
                            break
                        case 'admin' :
                            setSelectedExaminations(parsedData)
                            break
                        default:
                            handleLogOut()
                    }
                } else {
                    console.log('parsedData empty')
                }
            })
        // .catch(error => {
        //     console.error('Fetch error:', error);
        // });
    }, [refreshExaminations]);

    const handleFilterButton = (state) => {
        if (state === 'roditelj') {
            setPage(1)
            setSelectedExaminations(parentExaminations)
            setsearchedExaminations(parentExaminations)
            setSelectedStatus('roditelj')
        } else if (state === 'djeca') {
            setPage(1)
            setSelectedExaminations(childExaminations)
            setsearchedExaminations(childExaminations)
            setSelectedStatus('djeca')
        }
    }

    if(!bearerToken){
        return null
    }

    return (


        <div id = "UsersWrapper">
            <Navbar backendRoute={backendRoute} bearerToken={bearerToken}></Navbar>

            {noviPregledOtvoren && <NoviPregled closeNoviPregled = {toggleNoviPregled}
                                                backendRoute={backendRoute}
                                                bearerToken={bearerToken}
                                                handleLogOut={handleLogOut}
                                                user={user}
                                                refreshExaminations={toggleRefreshExaminations}/>}
            {isPregledDetailVisible && <PregledDetail backendRoute={backendRoute}
                                                      bearerToken={bearerToken}
                                                      handleLogOut={handleLogOut}
                                                      user={user}
                                                      closeNoviPregled = {togglePregledDetail}
                                                      pregledId = {selectedPregledId}
                                                      examination = {searchedExaminations[((page-1)*pageSize) + selectedPregledId]}
                                                      closeUserOptions={closeUserOptions}
                                                      currentRole={currentRole}
                                                      refreshExaminations={toggleRefreshExaminations}/>}


            {selectedExaminations.length !== 0 ? (
                <div id = "usersWrapperInner">


                    <h5 className="pt-3 px-4 mt-2" style={{textAlign: "left", maxWidth: "1246px"}}>Pregledi
                        {/* <button className='btn btn-tertiary mt-1' style={{float: 'right'}}>Povijest </button> */}

                        {(uloga === "doctor" || uloga === "pediatrician" || uloga === "admin") && (
                            <button className="btn btn-primary" style={{float:"right"}} onClick={toggleNoviPregled}>
                                Novi Pregled +
                            </button>
                        )}
                    </h5>

                    <p style={{textAlign: "left", maxWidth: "1200px"}} className = "px-4 mb-2 ">{selectedExaminations ? selectedExaminations.length : 0} pregleda</p>

                    {currentRole === 'parent' ? (
                        <div id="usersSelectorDiv" className="px-4 pb-1 pt-0 " style={{ display: "flex", justifyContent: "left", flexWrap: "wrap" }}>
                            {/*<button className = {selectedStatus === 'svi' ?*/}
                            {/*    "btn btn-primary chip-selected  me-2 mt-2" : "btn btn-secondary chip-unselected me-2 mt-2"}*/}
                            {/*        id = "nepregledano" onClick={() => setSelectedStatus('svi')}>Sve</button>*/}

                            <button className={selectedStatus === 'roditelj' ?
                                "btn btn-primary   me-2 mt-2" : "btn btn-secondary btn-secondary-unselected  me-2 mt-2"}
                                    id="nepregledano" onClick={() => handleFilterButton('roditelj')}>Moji Pregledi</button>


                            <button className={selectedStatus === 'djeca' ?
                                "btn btn-primary  me-2 mt-2" : "btn btn-secondary btn-secondary-unselected me-2 mt-2"}
                                    id="pregledano" onClick={() => handleFilterButton('djeca')}>Moja djeca</button>
                        </div>
                    ) : null}

                    {currentRole === 'admin' ? (
                        <div id="usersSelectorDiv" className="px-4 pb-1 pt-0 " style={{ display: "flex", justifyContent: "left", flexWrap: "wrap" }}>
                            {/*<button className = {selectedStatus === 'svi' ?*/}
                            {/*    "btn btn-primary chip-selected  me-2 mt-2" : "btn btn-secondary chip-unselected me-2 mt-2"}*/}
                            {/*        id = "nepregledano" onClick={() => setSelectedStatus('svi')}>Sve</button>*/}

                            <button className={selectedStatus === 'roditelj' ?
                                "btn btn-primary   me-2 mt-2" : "btn btn-secondary btn-secondary-unselected   me-2 mt-2"}
                                    id="nepregledano" onClick={() => handleFilterButton('roditelj')}> Odrasli </button>


                            <button className={selectedStatus === 'djeca' ?
                                "btn btn-primary  me-2 mt-2" : "btn btn-secondary btn-secondary-unselected me-2 mt-2"}
                                    id="pregledano" onClick={() => handleFilterButton('djeca')}> Djeca  </button>
                        </div>
                    ) : null}


                    {/* <div id = "usersSelectorDiv" className = "px-4 pb-1 pt-0 " style={{display: "flex", justifyContent: "left", flexWrap: "wrap"}}>


    <button className = {selectedUsers === 'svi' ?
        "btn btn-primary me-2 mt-2" : "btn btn-secondary me-2 mt-2"}
            id = "nepregledano" onClick={() => setSelectedUsers('svi')}>Svi</button>

    <button className = {selectedUsers === 'odrasli' ?
        "btn btn-primary me-2 mt-2" : "btn btn-secondary me-2 mt-2"}
            id = "nepregledano" onClick={() => setSelectedUsers('odrasli')}> Odrasli</button>

    <button className = {selectedUsers === 'djeca' ?
        "btn btn-primary me-2 mt-2" : "btn btn-secondary me-2 mt-2"}
            id = "pregledano" onClick={() => setSelectedUsers('djeca')}> Djeca</button>

</div>  */}


                    <div id = "patientSearchBoxDiv" className='px-4 pt-3 ' >

                        <div className="input-group mb-0 mx-0  p-3 searchContainer" style={{maxWidth: "1200px"}} >
                            <img src= {searchIcon} className = "searchIconUsers"></img>
                            <input type="text" className="form-control me-0 searchInput" id = "searchInput" onChange={searchExaminations} style = {{ borderTopRightRadius: "7px", borderBottomRightRadius: "7px", }}
                                   placeholder="Pretraži" aria-label="Recipient's username" aria-describedby="basic-addon2" ></input>

                        </div>
                    </div>




                    <div className='px-4 pt-0'>
                        <table className="table  table-bordered " id= "usersTable" style={{maxWidth: "1200px"}}>



                            <thead>
                            <tr>
                                <th scope="col" >PACIJENT</th>
                                {/* <th scope="col">DOKTOR</th>
                            <th scope="col">EMAIL PACIJENTA</th> */}
                                <th scope="col">OPIS PREGLEDA</th>
                                <th scope="col">ADRESA</th>
                                <th scope="col"></th>


                            </tr>
                            </thead>
                            <tbody>
                            {searchedExaminations.slice((page-1) * pageSize,page * pageSize).map((examination, index) =>
                                (
                                    <tr key={examination.id} style={{ position: 'relative' }}>
                                        <td scope="row">
                                            <img src = {userIcon} alt = "" width = "14" className='me-3' style={{opacity: "75%"}}></img>
                                            {examination.patient.first_name + " " + examination.patient.last_name}
                                        </td>
                                        {/* <td>{examination.doctor.first_name + " " + examination.doctor.last_name}</td>
                                    <td>{examination.patient.email}</td> */}
                                        <td>{examination.report.length >= 30 ? examination.report.substring(0, 30) + "..." : examination.report}</td>
                                        <td>{examination.address.street}</td>

                                        <td style={{width: "10px"}}><img className ="me-2 ms-2 pe-1 mt-1" style={{ height: "19px", float: "right", opacity: "80%" }} onClick={() => togglePregledDetail(index)} src={InfoIcon}/></td>


                                    </tr>
                                ))}

                            </tbody>
                        </table>
                        <div className="input-group mb-0 mx-0  paginationContainer " style={{maxWidth: "1200px"}} >


                            <span className = "me-3">{searchedExaminations.length === 0 ? 0 : ((page-1)*pageSize + 1) + " - " + (Math.min((page)*pageSize, searchedExaminations.length))} of {searchedExaminations.length}</span>
                            <img src= {chevronLeft} style={{float: "right"}} onClick={pageDown}  className={(page - 1) !== 0 ? "chevronIcon" : "chevronIcon chevronDisabled"} ></img>
                            <img src= {chevronRight} style={{float: "right"}} onClick={pageUp} className={((page + 1) * pageSize <= roundUpToNearestMultipleOf5(searchedExaminations.length)) ? "chevronIcon" : "chevronIcon chevronDisabled"} ></img>

                        </div>
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
                        Još nema unesenih pregleda

                    </h5>


                    <p style={{textAlign: "center", maxWidth: "1200px"}} className = "px-4 mb-2 mt-1 ">{selectedExaminations.length} {" "}

                        pregleda

                    </p>
                    {(uloga === "doctor" || uloga === "pediatrician" || uloga === "admin"  ? (
                        <button className = "btn btn-primary ms-2 mt-2 " style={{}} onClick= {toggleNoviPregled}>Novi pregled +</button>  ) : null)}

                </div>
            )}
        </div>
    );
};

export default Examinations;