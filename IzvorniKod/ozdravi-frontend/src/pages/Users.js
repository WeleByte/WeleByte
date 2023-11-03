import React from 'react';
import Navbar from '../components/Header';
import userIcon from '../assets/images/userIcon.png'


const Users = () => {

  const uloga = "doktor"

  const original = [];

  return (
      
    
    <div id = "UsersWrapper">
     <Navbar></Navbar>


    <div id = "usersWrapperInner">
   

    <h3 className = "pt-3 px-4 mt-2 " style={{textAlign: "left"}}>Pacijenti {/* <button className='btn btn-tertiary mt-1' style={{float: 'right'}}>Povijest </button>  */} </h3>
<p style={{textAlign: "left"}} className = "px-4 mb-2 ">34 odraslih • 4 djece</p>



<div id = "usersSelectorDiv" className = "px-4 pb-1 pt-0 " style={{display: "flex", justifyContent: "left", flexWrap: "wrap"}}>
        <button class = "btn btn-primary me-2 mt-2"  id = "nepregledano">SVI</button>
        <button class = "btn btn-secondary me-2 mt-2" id = "nepregledano"> ODRASLI</button>
        <button class = "btn btn-secondary me-auto mt-2" id = "pregledano"> DJECA</button>
    </div>


<div id = "patientSearchBoxDiv" className='px-4 pt-3 ' >

<div class="input-group mb-3  " style={{maxWidth: "1200px"}}>
  <input type="text" class="form-control me-2" style = {{ borderTopRightRadius: "7px", borderBottomRightRadius: "7px", }} placeholder="Ime pacijenta.." aria-label="Recipient's username" aria-describedby="basic-addon2" ></input>
  <div class="input-group-append">
    <span class="input-group-text" id="searchButton">Search</span>
  </div>
</div>
</div>


    

    <div className='px-4 pt-0'>
     <table class="table table-hover  table-bordered " style={{maxWidth: "1200px"}}>
    

  <thead>
    <tr>
      <th scope="col" >PATIENT</th>
      <th scope="col">LAST VISIT</th>
      <th scope="col">NO. VISITS</th>
      <th scope="col">EMAIL</th>
      <th></th>

    </tr>
  </thead>
  <tbody>
    <tr>
      <td scope="row">  
     <img src = {userIcon} alt = "" width = "14" className='me-3' style={{opacity: "75%"}}></img>
      Filip Filipović
      </td>
      <td>12.1.2023.</td>
      <td>7</td>
      <td>filip@filipovic.com</td>
      <td ><img width="18" height="18" src="https://img.icons8.com/ios-glyphs/30/menu-2.png" alt="menu-2"/></td>

    </tr>
    <tr>
      <td scope="row">
      <img src = {userIcon} alt = "" width = "14" className='me-3' style={{opacity: "75%"}}></img>
      Ivan Ivanovic
      </td>
      <td>25.6.2023.</td>
      <td>5</td>
      <td>ivan@ivanovic.ai</td>
      <td><img width="18" height="18" src="https://img.icons8.com/ios-glyphs/30/menu-2.png" alt="menu-2"/></td>

    </tr>
    <tr>
      <td scope="row">
      <img src = {userIcon} alt = "" width = "14" className='me-3' style={{opacity: "75%"}}></img>
     Milica Srbić
      </td>
      <td>28.7.2023.</td>
      <td>13</td>
      <td>milica@milanovic.com</td>
      <td><img width="18" height="18" src="https://img.icons8.com/ios-glyphs/30/menu-2.png" alt="menu-2"/></td>
    </tr>

    
  </tbody>
</table>
</div>
</div>
    </div>
  );
};

export default Users;
