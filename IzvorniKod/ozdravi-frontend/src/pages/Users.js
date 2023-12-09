import React, {useState} from 'react';
import Navbar from '../components/Header';
import userIcon from '../assets/images/userIcon.png'
import AddPatient from '../components/AddPatient';
import searchIcon from '../assets/icons/search.png'
import chevronLeft from '../assets/icons/chevron-left.png'
import chevronRight from '../assets/icons/chevron-right.png'


const Users = () => {

  const uloga = "doktor"
  const [selectedUsers, setSelectedUsers] = useState('svi')

  const [isAddPatientVisible, showAddPatient] = useState(false);

  const toggleAddPatient = () => {
    showAddPatient(!isAddPatientVisible);
  };

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


  const finalUsersList = filteredUsers.map((user) =>
      (
          <tr>
              <td scope="row">
                  <img src = {userIcon} alt = "" width = "14" className='me-3' style={{opacity: "75%"}}></img>
                  {user.ime + " " + user.prezime}
              </td>
              <td>{user.age}</td>
              <td>{user.lastVisit}</td>
              <td>{user.visitCount}</td>
              <td>{user.email}</td>

              <td class = "three-dot-td"><img width="18" height="18" src="https://img.icons8.com/ios-glyphs/30/menu-2.png" alt="menu-2"/></td>

          </tr>
      ))



  return (
      
    
    <div id = "UsersWrapper">
     <Navbar></Navbar>

     {isAddPatientVisible && <AddPatient closeAddPatient = {toggleAddPatient}/>}
     


    <div id = "usersWrapperInner">
   

    <h3 className = "pt-3 px-4 mt-2 " style={{textAlign: "left", maxWidth: "1246px"}}>Pacijenti {/* <button className='btn btn-tertiary mt-1' style={{float: 'right'}}>Povijest </button>  */} <button class = "btn btn-primary" style={{float:"right"}} onClick= {toggleAddPatient}>Novi Pacijent +</button> </h3>
<p style={{textAlign: "left", maxWidth: "1200px"}} className = "px-4 mb-2 ">{odrasliCount} odraslih • {djecaCount} djece</p>



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

<div class="input-group mb-0 mx-0  p-3 searchContainer" style={{maxWidth: "1200px"}} >
<img src= {searchIcon} class = "searchIconUsers"></img>
  <input type="text" class="form-control me-0 searchInput" style = {{ borderTopRightRadius: "7px", borderBottomRightRadius: "7px", }} placeholder="Pretraži" aria-label="Recipient's username" aria-describedby="basic-addon2" ></input>
 
</div>
</div>


    

    <div className='px-4 pt-0'>
     <table class="table table-hover  table-bordered " id= "usersTable" style={{maxWidth: "1200px"}}>
    


  <thead>
    <tr>
      <th scope="col" >PATIENT</th>
      <th scope="col">AGE</th>
      <th scope="col">LAST VISIT</th>
      <th scope="col">NO. VISITS</th>
      <th scope="col">EMAIL</th>
      <th scope="col"></th>


    </tr>
  </thead>
  <tbody>
    {finalUsersList}

  </tbody>
</table>
<div class="input-group mb-0 mx-0  paginationContainer " style={{maxWidth: "1200px"}} >

<span class = "me-3">1-5 of 6</span>   
<img src= {chevronLeft} style={{float: "right"}} class = "chevronIcon"></img>
<img src= {chevronRight} style={{float: "right"}} class = "chevronIcon"></img>

</div>
</div>
</div>
    </div>
  );
};

export default Users;
