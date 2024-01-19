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
import UserForm from '../components/UserForm';
import UserDetail from '../components/UserDetail';
import InfoIcon from '../assets/icons/info.png'


const Users = (props) => {

    const backendRoute = props.backendRoute
    const bearerToken = sessionStorage.bearerToken
    const user = JSON.parse(sessionStorage.userData)
    const roles = user.roles
    
    const [rolesMapped, setRolesMapped] = useState([""])
    const navigate = useNavigate()
    var [currentOpenedOptions, setCurrentOpenedOptions] = useState(null);
    let optionsOpened= false;
    const [refreshUsers, setRefreshUsers] = useState(false)
    const [isAddPatientVisible, showAddPatient] = useState(false);
    const [addUserVisible, setAddUserVisible] = useState(false);
    const [userDetailVisible, setUserDetailVisible] = useState(false);
    const [users, setUsers] = useState([])
    const [filteredUsers, setFilteredUsers] = useState([])

    const [selectedUserIndex, setselectedUserIndex] = useState(false)
    const currentRole = sessionStorage.getItem('currentRole');

    const [selectedUsers, setSelectedUsers] = useState("svi")

    const [searchedUsers, setSearchedUsers] = useState([])

    const [page, setPage] = useState(1);
    const [pageSize, setpageSize] = useState(5);
    const [startItem, setStartItem] = useState(1)

    function pageUp() {
        if ((page + 1) * pageSize > roundUpToNearestMultipleOf5(searchedUsers.length)) {
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

    //go to /home if not admin/doctor/pediatrician
    useEffect(() => {
        let containsValidRole = false
        roles.forEach(role => {
            if(role.name === "admin" || role.name === "pediatrician" || role.name === "doctor"){
                containsValidRole = true
            }
        })
        
        setRolesMapped(user.roles.map(obj => obj.name))

        /* if(!containsValidRole){
            navigate("/home")
        } */

    }, []);


    function clearSearch() {
        document.getElementById("searchInput").value = "";
    }

    const searchUsers = (e) => {
        const inputValue = e.target.value.toLowerCase()
        const filtered = filteredUsers.filter(
            (user) =>
                (user.first_name + user.last_name).toLowerCase().includes(inputValue)
        );
        setSearchedUsers(filtered)
    }


    const toggleRefreshUsers = () => {
        setRefreshUsers((prev) => !prev);
    }

    const toggleAddPatient = () => {
        showAddPatient(!isAddPatientVisible);
    };
    const toggleAddUser = () => {
        setAddUserVisible(!addUserVisible);
    };
    const toggleUserDetail = (index, close) => {
        setselectedUserIndex(index)
        if (close) {
            
            closeUserOptions(selectedUserIndex)
        }
        setUserDetailVisible(!userDetailVisible);
    };
    const toggleUserDetail2 = (index) => {
        setselectedUserIndex(index)
        
        setUserDetailVisible(!userDetailVisible);
    };

    const [noviPregledOtvoren, setNoviPregledOtvoren] = useState(false);

    const toggleNoviPregled = () => {
        setNoviPregledOtvoren(!noviPregledOtvoren);
        closeUserOptions(currentOpenedOptions)
    };

    function changeSelectedUsers(choice) {
        setSelectedUsers(choice);
        setPage(1)
        switch (choice) {
            case "svi":
                setFilteredUsers(users)
                setSearchedUsers(users)
                break
            case "roditelji":
                setFilteredUsers(users.filter(user => user.roles.map(obj => obj.name).includes("parent")))
                setSearchedUsers(users.filter(user => user.roles.map(obj => obj.name).includes("parent")))
                break
            case "djeca":
                setFilteredUsers(users.filter(user => user.roles.map(obj => obj.name).includes("child")))
                setSearchedUsers(users.filter(user => user.roles.map(obj => obj.name).includes("child")))
                break
            case "doktori":
                setFilteredUsers(users.filter(user => user.roles.map(obj => obj.name).includes("doctor")))
                setSearchedUsers(users.filter(user => user.roles.map(obj => obj.name).includes("doctor")))
                break
            case "pedijatri":
                setFilteredUsers(users.filter(user => user.roles.map(obj => obj.name).includes("pediatrician")))
                setSearchedUsers(users.filter(user => user.roles.map(obj => obj.name).includes("pediatrician")))
                break
            default:
                setFilteredUsers(users)
                setSearchedUsers(users)
                break
        }
        clearSearch() 
    }

    const closeUserOptions = (index) => {

        console.log("closing")
        console.log(index)
        const tbody = document.querySelector(`#usersTable tbody`);
        const tr = tbody.querySelector(`tr:nth-child(${index + 1})`);


        const userOptions = tr.querySelector('.userOptions');

        userOptions.style.display = 'none';


    }

    const openUserOptions = (index) => {
        console.log("opening");
        console.log(currentOpenedOptions);

        setselectedUserIndex(index)

        // Close previously opened options if any
        if (currentOpenedOptions !== null && currentOpenedOptions !== index) {
            closeUserOptions(currentOpenedOptions);
        }

        optionsOpened = true;

        const tbody = document.querySelector(`#usersTable tbody`);
        const tr = tbody.querySelector(`tr:nth-child(${index + 1})`);
        const userOptions = tr.querySelector('.userOptions');

        userOptions.style.display = 'block';

        setCurrentOpenedOptions(index);
    }


    // State and other variables...

    function handleLogOut() {
        sessionStorage.clear()
        localStorage.clear()
        navigate('/login')
    }

    useEffect(() => {
        fetch(backendRoute + "/users", {
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
                    console.log("Error:", response.status, response.statusText);
                } else {
                    return response.json();
                }
            })
            .then(parsedData => {
                console.log(parsedData)
                setUsers(parsedData);
                setFilteredUsers(parsedData)
                setSearchedUsers(parsedData)
            })
            .catch(error => {
                console.error('Fetch error:', error);
            });
    }, [refreshUsers]); // Include dependencies in the array if needed


    return (


        <div id = "UsersWrapper">
            <Navbar backendRoute={backendRoute} bearerToken={bearerToken}></Navbar>

            {isAddPatientVisible && <AddPatient closeAddPatient = {toggleAddPatient}
                                                backendRoute={backendRoute}
                                                bearerToken={bearerToken}
                                                handleLogOut={handleLogOut}
                                                refreshUsers={toggleRefreshUsers}/>}

            {noviPregledOtvoren && <NoviPregled closeNoviPregled = {toggleNoviPregled}/>}

            {addUserVisible && <UserForm closeUserForm = {toggleAddUser}
                                         handleLogOut={handleLogOut}
                                         backendRoute={backendRoute}
                                         bearerToken={bearerToken}
                                         refreshUsers={toggleRefreshUsers}/>}

            {userDetailVisible && <UserDetail close = {toggleUserDetail}
                                              role = {currentRole}
                                              user = {searchedUsers[((page-1)*pageSize) + selectedUserIndex]}
                                              backendRoute={backendRoute}
                                              bearerToken={bearerToken}
                                              refreshUsers={toggleRefreshUsers}
                                              handleLogOut={handleLogOut}/>}



            {users.length !== 0 ? (

           
            <div id = "usersWrapperInner">


            <h5 className = "pt-3 px-4 mt-2 " style={{textAlign: "left", maxWidth: "1246px"}}>
            {(currentRole === "admin" ? ("Korisnici") : null)}
            {(currentRole === "doctor" || currentRole === "pediatrician" ? ("Moji Pacijenti") : null)}
            {(currentRole === "parent" ? ("Moja Djeca") : null)}

                    {/* <button className='btn btn-tertiary mt-1' style={{float: 'right'}}>Povijest </button>  */}
                   
                    {(currentRole === "doctor" || currentRole === "pediatrician"  ? (
                    <button className = "btn btn-primary ms-2" style={{float:"right"}} onClick= {toggleAddPatient}>Novi Pacijent +</button>  ) : null)}
                   
                    {(currentRole === "admin" ? 
                        <button className="btn btn-primary" style={{float: "right"}} onClick={toggleAddUser}>
                            Novi Korisnik +
                        </button> 
                    : null)} </h5>


                 <p style={{textAlign: "left", maxWidth: "1200px"}} className = "px-4 mb-2 ">{users.length} 
                 
                {(currentRole === "admin" ? (" korisnika") : null)}
                {(currentRole === "doctor" ? (" pacijenata") : null)}
                {(currentRole === "parent" ? (" djece") : null)}

                 </p> 

                {/* <p style={{textAlign: "left", maxWidth: "1200px"}} className = "px-4 mb-2 ">{odrasliCount + djecaCount} pacijenata</p> */}


                {currentRole === "admin" ? (
                    <div id = "usersSelectorDiv" className = "px-4 pb-2 pt-0 " style={{display: "flex", justifyContent: "left", flexWrap: "wrap"}}>

                    <button className = {selectedUsers === 'svi' ?
                        "btn btn-primary me-2 mt-2" : "btn btn-secondary btn-secondary-unselected me-2 mt-2"}
                            id = "nepregledano" onClick={() => changeSelectedUsers('svi')}>Svi</button>
                
                    <button className = {selectedUsers === 'roditelji' ?
                        "btn btn-primary me-2 mt-2" : "btn btn-secondary btn-secondary-unselected me-2 mt-2"}
                            id = "nepregledano" onClick={() => changeSelectedUsers('roditelji')}> Roditelji</button>
                
                    <button className = {selectedUsers === 'djeca' ?
                        "btn btn-primary me-2 mt-2" : "btn btn-secondary btn-secondary-unselected me-2 mt-2"}
                            id = "pregledano" onClick={() => changeSelectedUsers('djeca')}> Djeca</button>
                    <button className = {selectedUsers === 'doktori' ?
                        "btn btn-primary me-2 mt-2" : "btn btn-secondary btn-secondary-unselected me-2 mt-2"}
                            id = "pregledano" onClick={() => changeSelectedUsers('doktori')}> Doktori</button>
                    <button className = {selectedUsers === 'pedijatri' ?
                        "btn btn-primary me-2 mt-2" : "btn btn-secondary btn-secondary-unselected me-2 mt-2"}
                            id = "pregledano" onClick={() => changeSelectedUsers('pedijatri')}> Pedijatri</button>
                
                </div>
                ) : null}
                


                <div id = "patientSearchBoxDiv" className='px-4 pt-3 ' >

                    <div className="input-group mb-0 mx-0  p-3 searchContainer" style={{maxWidth: "1200px"}} >
                        <img src= {searchIcon} className = "searchIconUsers"></img>
                        <input type="text" className="form-control me-0 searchInput" id = "searchInput" onChange={searchUsers}  style = {{ borderTopRightRadius: "7px", borderBottomRightRadius: "7px", }} placeholder="Pretraži" aria-label="Recipient's email" aria-describedby="basic-addon2" ></input>

                    </div>
                </div>




                <div className='px-4 pt-0'>
                    <table className="table  table-bordered " id= "usersTable" style={{maxWidth: "1200px"}}>



                        <thead>
                        <tr>
                            <th scope="col" >PACIJENT</th>
                            <th scope="col">OIB</th>
                            <th scope="col">EMAIL</th>
                            <th scope="col"></th>


                        </tr>
                        </thead>
                        <tbody>
                        {searchedUsers.slice((page-1) * pageSize,page * pageSize).map((user, index) => (

                            
                            <tr key={user.id} style={{ position: 'relative' }} >
                                <td scope="row">
                                    <img src = {userIcon} alt = "" width = "14" className='me-3' style={{opacity: "75%"}}></img>
                                    {user.first_name + " " + user.last_name}
                                </td>

                                <td>{user.oib}</td>
                                <td>{user.email}</td>

                                {currentRole === "parent" || currentRole === "admin" ? (
                                                                    <td style={{width: "10px"}}><img className ="me-2 ms-2 pe-1 mt-1" style={{ height: "19px", float: "right", opacity: "80%" }} onClick={() => toggleUserDetail(index, false)} src={InfoIcon}/></td>

                                ): (<td className = "three-dot-td" >

                                <img width="18" height="18" onClick={() => openUserOptions(index)}
                                     src="https://img.icons8.com/ios-glyphs/30/menu-2.png" alt="menu-2"/>

                           
                                <ul className="list-group userOptions shadow-lg p-0 border" style={{display:"none", maxWidth: "220px"}} >
                                    <p className ="mb-2 mt-2 ps-3 py-1" style={{textAlign: "left"}}>Akcije
                                        <img className =" mt-1 closeActionsIcon" style={{ height: "19px", float: "right", opacity: "80%"}}
                                             onClick={() => closeUserOptions(index)} src={CloseIcon}></img>
                                    </p>
                                    <hr className ="mt-0 mb-0" style={{opacity: "20%"}}></hr>
                                    {/* <button onClick={toggleNoviPregled} className =" ps-3 col-12 mb-2 mt-2 py-2 novi-pregled-btn"
                                            style={{opaciy: "80%",textAlign: "left", fontWeight:"500", border:"none", background:"none"}} > Novi pregled
                                        <img className ="me-3 mt-1"
                                             style={{ height: "19px", float: "right", opacity: "80%" }} src={Plus2Icon}>
                                        </img>
                                    </button> */}
                                    <button onClick={() => toggleUserDetail(index, true)}  className =" ps-3 col-12 mb-2 mt-2  py-2 novi-pregled-btn" style={{opaciy: "80%",textAlign: "left", fontWeight:"500", border:"none", background:"none"}} > Detalji  <img className ="me-3 mt-1" style={{ height: "19px", float: "right", opacity: "80%" }} src={InfoIcon}></img> </button>
                                    
                                    {currentRole === "doctor" || currentRole === "pediatrician" ? (
                                    <button className =" ps-3  col-12 mb-2 py-2 delete-btn"
                                            style={{opaciy: "80%",textAlign: "left", fontWeight:"500", border:"none", background:"none"}}> Ukloni
                                        <img className ="me-3 mt-1"
                                             style={{ height: "19px", float: "right", opacity: "800%" }}  src={TrashIcon}></img>
                                    </button>
                                    ): null}
                                    {/*{rolesMapped.includes("admin")  ? (*/}
                                    {/*<button className =" ps-3  col-12 mb-2 py-2 delete-btn"*/}
                                    {/*        style={{opaciy: "80%",textAlign: "left", fontWeight:"500", border:"none", background:"none"}}> Izbriši*/}
                                    {/*    <img className ="me-3 mt-1"*/}
                                    {/*         style={{ height: "19px", float: "right", opacity: "800%" }}  src={TrashIcon}></img>*/}
                                    {/*</button>*/}
                                    {/*): null}*/}

                                </ul>
                            </td>)}

                                

                            </tr>
                        ))}

                        </tbody>
                    </table>
                    <div className="input-group mb-0 mx-0  paginationContainer " style={{maxWidth: "1200px"}} >

                        <span className = "me-3">{searchedUsers.length === 0 ? 0 : ((page-1)*pageSize + 1) + " - " + (Math.min((page)*pageSize, searchedUsers.length))} of {searchedUsers.length}</span>
                        <img src= {chevronLeft} style={{float: "right"}} onClick={pageDown}  className={(page - 1) !== 0 ? "chevronIcon" : "chevronIcon chevronDisabled"} ></img>
                        <img src= {chevronRight} style={{float: "right"}} onClick={pageUp} className={((page + 1) * pageSize <= roundUpToNearestMultipleOf5(searchedUsers.length)) ? "chevronIcon" : "chevronIcon chevronDisabled"} ></img>

                    </div>
                </div>
            </div>  ) : (
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
                {(currentRole === "admin" ? ("Nema prijavljenih korisnika") : null)}
                {(currentRole === "doctor" || currentRole === "pediatrician" ? ("Nemate prijavljenih pacijenata") : null)}
                {(currentRole === "parent" ? ("Nemate prijavljenje djece") : null)}
    
                     
                       
                         </h5>
    
    
                     <p style={{textAlign: "center", maxWidth: "1200px"}} className = "px-4 mb-2 mt-1 ">{users.length} 
                     
                    {(currentRole === "admin" ? (" korisnika") : null)}
                    {(currentRole === "doctor" || currentRole === "admin" ? (" pacijenata") : null)}
                    {(currentRole === "parent" ? (" djece") : null)}
    
                     </p> 
                     {(currentRole === "doctor" || currentRole === "pediatrician"  ? (
                        <button className = "btn btn-primary ms-2 mt-2 " style={{}} onClick= {toggleAddPatient}>Novi Pacijent +</button>  ) : null)}
                       
                        {(currentRole === "admin" ? 
                            <button className="btn btn-primary" style={{float: "center"}} onClick={toggleAddUser}>
                                Novi Korisnik +
                            </button> 
                        : null)}
                    </div>
    
            )}
        </div>
    );
};

export default Users;
