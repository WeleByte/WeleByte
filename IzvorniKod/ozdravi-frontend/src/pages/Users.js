import React, {useState} from 'react';
import Navbar from '../components/Header';
import userIcon from '../assets/images/userIcon.png'


const Users = () => {

  const uloga = "doktor"
  const [selectedUsers, setSelectedUsers] = useState('svi')

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

              <td ><img width="18" height="18" src="https://img.icons8.com/ios-glyphs/30/menu-2.png" alt="menu-2"/></td>

          </tr>
      ))



  return (
      
    
    <div id = "UsersWrapper">
     <Navbar></Navbar>


    <div id = "usersWrapperInner">
   

    <h3 className = "pt-3 px-4 mt-2 " style={{textAlign: "left"}}>Pacijenti {/* <button className='btn btn-tertiary mt-1' style={{float: 'right'}}>Povijest </button>  */} </h3>
<p style={{textAlign: "left"}} className = "px-4 mb-2 ">{odrasliCount} odraslih • {djecaCount} djece</p>



<div id = "usersSelectorDiv" className = "px-4 pb-1 pt-0 " style={{display: "flex", justifyContent: "left", flexWrap: "wrap"}}>

    <button className = {selectedUsers === 'svi' ?
        "btn btn-primary me-2 mt-2" : "btn btn-secondary me-2 mt-2"}
            id = "nepregledano" onClick={() => setSelectedUsers('svi')}>SVI</button>

    <button className = {selectedUsers === 'odrasli' ?
        "btn btn-primary me-2 mt-2" : "btn btn-secondary me-2 mt-2"}
            id = "nepregledano" onClick={() => setSelectedUsers('odrasli')}> ODRASLI</button>

    <button className = {selectedUsers === 'djeca' ?
        "btn btn-primary me-2 mt-2" : "btn btn-secondary me-2 mt-2"}
            id = "pregledano" onClick={() => setSelectedUsers('djeca')}> DJECA</button>

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
</div>
</div>
    </div>
  );
};

export default Users;
