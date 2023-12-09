import React, { useState } from 'react';
import ArrowRightIcon from '../assets/icons/arrow-right.png'
import CloseIcon from '../assets/icons/x2.png'
import PlusIcon from '../assets/icons/plus.png'
import searchIcon from '../assets/icons/search.png'
import Navbar from './Header';
import userIcon from '../assets/images/userIcon.png'

const NoviPregled = ({closeNoviPregled}) => {

  const closeModal = () => {
    closeNoviPregled()
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
   

    <h5 className = "pt-3 px-4 mt-2 mb-3 " style={{textAlign: "left"}}>Dodaj pregled {/* <button className='btn btn-tertiary mt-1' style={{float: 'right'}}>Povijest </button>  */} <img style={{ height: "23px", float: "right" }} onClick = {closeModal} src={CloseIcon}></img>  </h5>
  

<hr class = "mb-1 mt-4" style={{opacity: "20%"}}></hr>






    

    <div className='px-4 pt-0'>
    <form >

<div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gridColumnGap: "20px"}} class ="mt-4">

{/*----------------------------FIRST NAME-----------------------------*/}

<div className="mb-3">
  <label htmlFor="username" className="form-label" style={{float: 'left'}}>IME</label>
  <input type="text" className="form-control" id="username" 
        />
</div>

{/*----------------------------LAST NAME-----------------------------*/}
<div className="mb-3">
  <label htmlFor="username" className="form-label" style={{float: 'left'}}>PREZIME</label>
  <input type="text" className="form-control" id="username"
        />
</div>


<div className="mb-3">
  <label htmlFor="username" className="form-label" style={{float: 'left'}}>OIB</label>
  <input type="text" className="form-control" id="username" 
        />
</div>







<div className="mb-3">
  <label htmlFor="username" className="form-label" style={{float: 'left'}}>DATUM</label>
  <input type="date" className="form-control" id="username" 
        />
</div>







</div>

<div className="mb-3">
  <label htmlFor="username" className="form-label" style={{float: 'left'}}>OPIS PREGLEDA</label>
  <textarea rows = "7" type="date" className="form-control" id="username" 
        />
</div>

<button type="submit" className="btn btn-primary col-12 col-md-2 py-2 mb-4" style={{float:"right"}} >Spremi </button>
</form>
</div>
</div>
    </div>
    
  );
};

export default NoviPregled;
