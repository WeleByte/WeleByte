import React, {useEffect, useState} from 'react';
import ArrowRightIcon from '../assets/icons/arrow-right.png'
import CloseIcon from '../assets/icons/x2.png'
import PlusIcon from '../assets/icons/plus.png'
import searchIcon from '../assets/icons/search.png'
import Navbar from './Header';
import userIcon from '../assets/images/userIcon.png'
import Select from 'react-select'

const UserDetail = (props) => {

  const [instruction, setInstruction] = useState(null)
  const role = props.role
  const user = props.user
  const rolesMapped = user.roles.map(role => role.name)
  const closeModal = () => {
    props.close()
  }
  useEffect(() => {
    console.log(user)
  }, []);
  

  return (
    <div id = "addPatientsWrapper" className = "shadow-lg">


    <div id = "addPatientsInner">
   

    <h5 className = "pt-3 px-4 mt-2 mb-3 " style={{textAlign: "left"}}> 
    {
      role === "doctor" || role === "pediatrician" ? ("Pacijent") : role === "parent" ? "Dijete"
          : rolesMapped.includes("child") ? "Dijete" : "Korisnik"
    }
     {/* <button className='btn btn-tertiary mt-1' style={{float: 'right'}}>Povijest </button>  */} <img style={{ height: "23px", float: "right" }} onClick = {closeModal} src={CloseIcon}></img>  </h5>
  

    <hr className = "mb-1 mt-4" style={{opacity: "20%"}}></hr>
    

    <div className='px-4 pt-0'>
    <form >

<div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gridColumnGap: "20px"}} className ="mt-4">



<div className="mb-3">
  <label htmlFor="first_name" className=" col-12 text-label" style={{float: 'left', textAlign:"left"}}>Ime i prezime</label>
  <p style={{textAlign:"left"}} className ="text">{user.first_name + " " + user.last_name}</p>
</div>
<div className="mb-3">
  <label htmlFor="last_name" className=" col-12 text-label" style={{float: 'left', textAlign:"left"}}>OIB</label>
  <p style={{textAlign:"left"}} className ="text">{user.oib}</p>
</div>
  <div className="mb-3">
    <label htmlFor="email" className=" col-12 text-label" style={{float: 'left', textAlign:"left"}}>Email</label>
    <p style={{textAlign:"left"}} className ="text">{user.email}</p>
  </div>

  <div className="mb-3">
    <label htmlFor="institution-email" className=" col-12 text-label" style={{float: 'left', textAlign:"left"}}>Email Institucije</label>
    <p style={{textAlign:"left"}} className ="text">{user.institution_email ? user.institution_email : "Nije upisano"}</p>
  </div>

  <div className="mb-3">
    <label htmlFor="address" className=" col-12 text-label" style={{float: 'left', textAlign:"left"}}>Adresa</label>
    <p style={{textAlign:"left"}} className ="text">{user.address ? user.address.street + " " + user.address.number
                                                                  : "Nije upisano"}</p>
  </div>

  {role === "parent" ?

      <div className="mb-3">
        <label htmlFor="doctor" className=" col-12 text-label" style={{float: 'left', textAlign:"left"}}>Pedijatar</label>
        <p style={{textAlign:"left"}} className ="text">{user.doctor.first_name} {user.doctor.last_name}</p>
      </div>

      : role === "pediatrician" ?

          <div className="mb-3">
            <label htmlFor="parent" className=" col-12 text-label" style={{float: 'left', textAlign:"left"}}>Roditelj</label>
            <p style={{textAlign:"left"}} className ="text">{user.parent.first_name} {user.parent.last_name}</p>
          </div>

          : null
  }

  {role === "admin" ?/*Dovrsiti za admina*/
      rolesMapped.includes("child") ?
          <>
          <div className="mb-3">
            <label htmlFor="parent" className=" col-12 text-label" style={{float: 'left', textAlign:"left"}}>Roditelj</label>
            <p style={{textAlign:"left"}} className ="text">{user.parent.first_name} {user.parent.last_name}</p>
          </div>
          <div className="mb-3">
            <label htmlFor="doctor" className=" col-12 text-label" style={{float: 'left', textAlign:"left"}}>Pedijatar</label>
            <p style={{textAlign:"left"}} className ="text">{user.doctor.first_name} {user.doctor.last_name}</p>
          </div>
          </>
      : rolesMapped.includes("doctor") || rolesMapped.includes("pediatrician") || rolesMapped.includes("parent") ?
          <div className="mb-3">
            <label htmlFor="doctor" className=" col-12 text-label" style={{float: 'left', textAlign:"left"}}>Doktor</label>
            <p style={{textAlign:"left"}} className ="text">{user.doctor ? user.doctor.first_name + " " + user.doctor.last_name
                                                            : "Nije upisano"}</p>
          </div>
      : null : null
  }


</div>







</form>
</div>
    
</div>
    </div>
    
  );
};

export default UserDetail;
