import React, { useState } from 'react';
import ArrowRightIcon from '../assets/icons/arrow-right.png'
import CloseIcon from '../assets/icons/x2.png'
import PlusIcon from '../assets/icons/plus.png'
import searchIcon from '../assets/icons/search.png'
import Navbar from './Header';
import userIcon from '../assets/images/userIcon.png'

const AddPatient = ({closeAddPatient}) => {

  const closeModal = () => {
    closeAddPatient()
  }

  const originalUsers = [
    {
      ime: 'Filip',
      prezime: 'Filipović',
      lastVisit: '12.1.2023.',
      visitCount: 5,
      email: 'filip.filipovic@gmail.com',
      age: 12,
      id: 1,
    },
    {
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
    // ... rest of your original array
  ];

  const [filteredUsers, setFilteredUsers] = useState(originalUsers);

  const filterPatients = (e) => {
    const inputValue = e.target.value.toLowerCase();
    const filtered = originalUsers.filter(
      (user) =>
        (user.ime + user.prezime).toLowerCase().includes(inputValue)
    );
    setFilteredUsers(filtered);
  };

var finalUsersList = filteredUsers.map((user) =>
      (
          <tr>
              <td>
                  <img src = {userIcon} alt = "" width = "14" className='me-3' style={{opacity: "75%"}}></img>
                  {user.ime + " " + user.prezime}
              </td>
              <td>{user.age}</td>
             
             
              <td>{user.email}</td>

              <td class ="text-center"> <button class =" btn btn-tertiary">Dodaj </button> </td>

          </tr>
      ))


  return (
    <div id = "addPatientsWrapper" class = "shadow-lg">


    <div id = "addPatientsInner">
   

    <h5 className = "pt-3 px-4 mt-2 mb-4 " style={{textAlign: "left"}}>Dodaj pacijenta {/* <button className='btn btn-tertiary mt-1' style={{float: 'right'}}>Povijest </button>  */} <img style={{ height: "23px", float: "right" }} onClick = {closeModal} src={CloseIcon}></img>  </h5>
    

<hr class = "mb-1" style={{opacity: "20%"}}></hr>




<div id = "patientSearchBoxDiv" className='px-4 pt-3 ' >


<div class="input-group mb-3 mx-0  " style={{maxWidth: "1400px"}}>
<img src= {searchIcon} class = "searchIconAddPatient" ></img>
  <input type="text" class="form-control me-0 searchInput" onChange={filterPatients} style = {{ borderTopRightRadius: "7px", borderBottomRightRadius: "7px", }} placeholder="Ime pacijenta.." aria-label="Recipient's username" aria-describedby="basic-addon2" ></input>
 
</div>
</div>


    

    <div className='px-4 pt-0'>
     <table class="table table-hover  table-bordered " id ="addPatientTable" style={{maxWidth: "1600px", maxHeight: "300px"}}>
    

  <thead>
    <tr>
      <th scope="col" >PATIENT</th>
      <th scope="col">AGE</th>
      
      <th scope="col">EMAIL</th>
      <th scope="col"></th>


    </tr>
  </thead>
  <tbody >
  {filteredUsers.map((user, index) => (
      <tr key={index}>
        <td>
          <img src={userIcon} alt="" width="14" className="me-3" style={{ opacity: "75%" }} />
          {user.ime} {user.prezime}
        </td>
        <td>{user.age}</td>
        <td>{user.email}</td>
        <td className="text-center">
          <button className="btn btn-tertiary">Dodaj</button>
        </td>
      </tr>
    ))}


  </tbody>
</table>
</div>
</div>
    </div>
    
  );
};

export default AddPatient;
