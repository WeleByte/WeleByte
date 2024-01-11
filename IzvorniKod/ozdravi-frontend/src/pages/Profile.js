import React, {useEffect} from 'react';
import loginVector from '../assets/images/loginVector.png';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Navbar from '../components/Header';
import Select from "react-select";

const ProfilePage = (props) => {
  const backendRoute = props.backendRoute
  const navigate = useNavigate();
  const [user, setUser] = useState('')
  const [firstName, setFirstName] = useState(user.first_name)
  const [lastName, setLastName] = useState(user.last_name)
  const [OIB, setOIB] = useState(user.oib)
  const [institutionEmail, setInstitutionEmail] = useState(user.institution_email)
  const [incorrectName, setIncorrectName] = useState(false)
  const [incorrectOIB, setIncorrectOIB] = useState(false)
  const [incorrectEmailFormat, setIncorrectEmailFormat] = useState(false)
  const [saveFailed, setSaveFailed] = useState(false)
  const bearerToken = sessionStorage.bearerToken
  const [errorMessage, setErrorMessage] = useState('')
  const [selectableRoles, setSelectableRoles] = useState([])
  const [selectedRole, setSelectedRole] = useState(null)

  const availableRoles = [
    {value: 1, label: "Admin"},
    {value: 3, label: "Doctor"},
    {value: 4, label: "Parent"},
    {value: 5, label: "Pediatrician"}
  ]


  useEffect(() => {
    if(bearerToken === '' || bearerToken === null || bearerToken === undefined) {
      navigate('/login')
    } else {
      const fetchedUser = (JSON.parse(sessionStorage.userData))
      setUser(fetchedUser)
      setFirstName(fetchedUser.first_name)
      setLastName(fetchedUser.last_name)
      setOIB(fetchedUser.oib)
      setInstitutionEmail(fetchedUser.institution_email)

      const userRolesMapped = fetchedUser.roles.map(role => role.name)

      // let availableRolesCopy = availableRoles
      // console.log(userRolesMapped)
      // if(!userRolesMapped.includes("admin")) availableRolesCopy.splice(availableRoles.length - 4, 1)
      // if(!userRolesMapped.includes("doctor")) availableRolesCopy.splice(availableRoles.length - 3, 1)
      // if(!userRolesMapped.includes("parent")) availableRolesCopy.splice(availableRoles.length - 2, 1)
      // if(!userRolesMapped.includes("pediatrician")) availableRolesCopy.splice(availableRoles.length - 1, 1)
      // console.log(availableRolesCopy)
      const filteredRoles = availableRoles.filter(role => userRolesMapped.includes(role.label.toLowerCase()))
      setSelectableRoles(filteredRoles)

    }
  }, []);
  const handleSignOut = () => {
    sessionStorage.clear()
    localStorage.clear()
    navigate('/login')
}

  const handleSave = async (e) => {
    e.preventDefault();
    //check login format
    if((firstName !== '' || lastName !== '') && (firstName.length < 2 || lastName.length < 2)){
      setIncorrectName(true)
      return
    }
    setIncorrectName(false)

    if(OIB !== '' && OIB.length !== 11) {
      setIncorrectOIB(true)
      return
    }
    setIncorrectOIB(false)

    if(!(institutionEmail === '' || institutionEmail === undefined || institutionEmail === null)
        && !(/\S+@\S+\.\S+/.test(institutionEmail))) {
      setIncorrectEmailFormat(true)
      return
    }
    setIncorrectEmailFormat(false)

    //if format is correct, check which fields are empty
    if(firstName === '') setFirstName(user.first_name)
    if(lastName === '') setLastName(user.last_name)
    if(OIB === '') setOIB(user.oib)
    if(institutionEmail === '') setInstitutionEmail(user.institution_email)


    //data verification

    fetch(backendRoute + "/change_role", {
      method: 'POST',
      headers: {
        'Authorization' : `Bearer ${bearerToken}`,
        'Content-Type' : 'application/json'
      },
      body: {
        'role_id' : selectedRole.value
      }
    })
    .then(response => {
      if(!response.ok){
        console.log(response)
      } else {
        console.log(response.json())
      }
    })

    const response = await fetch(backendRoute + `/user/${user.id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${bearerToken}`,
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify({
        'email': user.email,
        'password': user.password,
        'institution_email': institutionEmail,
        'oib': OIB,
        'first_name': firstName,
        'last_name': lastName
      })
    })

    // if(response.status)
    if(response.status === 400){
      setErrorMessage("OIB je neispravan")
      setSaveFailed(true)
    } else if(response.status === 401){
      handleSignOut()
    } else if(!response.ok) {
      setSaveFailed(true)
      setErrorMessage("Dogodila se pogreska")
    } else {
      setSaveFailed(false)
      user.first_name = firstName
      user.last_name = lastName
      user.oib = OIB
      user.institution_email = institutionEmail
      sessionStorage.setItem('userData', JSON.stringify(user))

      navigate('/home');
    }

  };

  if(!bearerToken){
    return null
  }
  return (

  
    <div id = "HomePageWrapper">

      <Navbar></Navbar>
        <div className="row" id = "loginRow"  style={{paddingTop: "50px"}}>

          <div className="col-12 mx-auto " >
            <h2 className = "text-start">Vaš profil</h2>
            <p className = "text-start">
            {
              incorrectName ? ("Ime i prezime ") :
                  incorrectOIB ? ("OIB je neispravan") :
                      incorrectEmailFormat ? ("Email institucije nije ispravan") :
                          saveFailed ? (errorMessage) : "Promijenite svoje podatke"
            } </p>
            <form onSubmit={handleSave} className ="pt-3">

              <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gridColumnGap: "20px"}}>

              {/*----------------------------FIRST NAME-----------------------------*/}
              <div className="mb-3">
                <label htmlFor="username" className="form-label" style={{float: 'left'}}>IME</label>
                <input type="text" className="form-control"
                       id="username" value={firstName}
                       onChange={(e) =>
                           setFirstName(e.target.value.replace(/[^a-zA-ZščćžđöüäŠČĆŽĐÖÜÄ\\s]/, ''))}/>
              </div>

              {/*----------------------------LAST NAME-----------------------------*/}
              <div className="mb-3">
                <label htmlFor="username" className="form-label" style={{float: 'left'}}>PREZIME</label>
                <input type="text" className="form-control"
                       id="username" value={lastName}
                       onChange={(e) =>
                           setLastName(e.target.value.replace(/[^a-zA-ZščćžđöüäŠČĆŽĐÖÜÄ\\s]/, ''))}/>
              </div>

              {/*-------------------------------OIB--------------------------------*/}
              <div className="mb-3">
                <label htmlFor="username" className="form-label" style={{float: 'left'}}>OIB</label>
                <input type="text" className="form-control"
                       id="username" value={OIB}
                       onChange={(e) =>
                           setOIB(e.target.value.replace(/\D/g, ''))}/>
              </div>

              {/*------------------------INSTITUTION EMAIL-------------------------*/}
              <div className="mb-3">
                <label htmlFor="password" className="form-label" style={{float: 'left'}}>E-MAIL INSTITUCIJE</label>
                <input type="text" className="form-control"
                       id="username" value={institutionEmail}
                       onChange={(e) => setInstitutionEmail(e.target.value)}/>
              </div>


            
              </div>
              <button type="submit" className="btn btn-primary col-12 py-2 mt-3">Spremi promjene</button>
              <button type="submit" style={{fontWeight: "bold"}} className="btn  btn-danger mt-2 col-12 py-2"
                      onClick={(e) => handleSignOut()}>Odjavi se</button>

            </form>
          </div>
        </div>
      </div>
  );
};

export default ProfilePage;
