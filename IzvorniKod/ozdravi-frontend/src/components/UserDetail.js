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
  const closeModal = () => {
    props.close()
  }

  

  return (
    <div id = "addPatientsWrapper" className = "shadow-lg">


    <div id = "addPatientsInner">
   

    <h5 className = "pt-3 px-4 mt-2 mb-3 " style={{textAlign: "left"}}> 
    {
      role == "doctor" || role == "patient" ? ("Pacijent") : "Korisnik"
    }
     {/* <button className='btn btn-tertiary mt-1' style={{float: 'right'}}>Povijest </button>  */} <img style={{ height: "23px", float: "right" }} onClick = {closeModal} src={CloseIcon}></img>  </h5>
  

    <hr className = "mb-1 mt-4" style={{opacity: "20%"}}></hr>
    

    <div className='px-4 pt-0'>
    <form >

<div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gridColumnGap: "20px"}} class ="mt-4">



<div className="mb-3">
  <label htmlFor="username" className=" col-12 text-label" style={{float: 'left', textAlign:"left"}}>Ime</label>
  <p style={{textAlign:"left"}} class ="text">{user.first_name + " " + user.last_name}</p>
</div>
<div className="mb-3">
  <label htmlFor="username" className=" col-12 text-label" style={{float: 'left', textAlign:"left"}}>OIB</label>
  <p style={{textAlign:"left"}} class ="text">{user.oib}</p>
</div>
<div className="mb-3">
  <label htmlFor="username" className=" col-12 text-label" style={{float: 'left', textAlign:"left"}}>Email</label>
  <p style={{textAlign:"left"}} class ="text">{user.email}</p>
</div>
</div>







</form>
</div>
    
</div>
    </div>
    
  );
};

export default UserDetail;
