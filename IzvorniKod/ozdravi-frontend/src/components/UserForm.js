import React, { useState } from 'react';
import ArrowRightIcon from '../assets/icons/arrow-right.png'
import CloseIcon from '../assets/icons/x2.png'
import PlusIcon from '../assets/icons/plus.png'
import searchIcon from '../assets/icons/search.png'
import Navbar from './Header';
import userIcon from '../assets/images/userIcon.png'
import Select from 'react-select'

const UserForm = ({closeNoviPregled}) => {

  const closeModal = () => {
    closeNoviPregled()
  }

 

  const uloge = [
    { value: '1', label: 'Roditelj' },
    { value: '2', label: 'Dijete' },
    { value: '3', label: 'Doktor' },
    { value: '4', label: 'Pedijatar' }

  ]

  const pacijenti = [
    { value: '1', label: 'Chocolate' },
    { value: '2', label: 'Marta Martovič' },
    { value: '3', label: 'Vanilla' }
  ]



  return (
    <div id = "addPatientsWrapper" className = "shadow-lg">


    <div id = "addPatientsInner">
   

    <h5 className = "pt-3 px-4 mt-2 mb-3 " style={{textAlign: "left"}}>Dodaj korisnika {/* <button className='btn btn-tertiary mt-1' style={{float: 'right'}}>Povijest </button>  */} <img style={{ height: "23px", float: "right" }} onClick = {closeModal} src={CloseIcon}></img>  </h5>
  

<hr className = "mb-1 mt-4" style={{opacity: "20%"}}></hr>






    

    <div className='px-4 pt-0'>
    <form >

<div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gridColumnGap: "20px"}} class ="mt-4">

<div className="mb-3">
  <label htmlFor="username" className="form-label" style={{float: 'left'}}>Ime</label>
  <input type="text" className="form-control" id="username" 
        />
</div>
<div className="mb-3">
  <label htmlFor="username" className="form-label" style={{float: 'left'}}>Prezime</label>
  <input type="text" className="form-control" id="username" 
        />
</div>
<div className="mb-3">
  <label htmlFor="username" className="form-label" autoComplete='off' style={{float: 'left'}}>Email</label>
  <input type="text" className="form-control" id="username" 
        />
</div>
<div className="mb-3">
  <label htmlFor="username" className="form-label" style={{float: 'left'}}>OIB</label>
  <input type="text" className="form-control" id="username" 
        />
</div>
<div className="mb-3">
  <label htmlFor="username" className="form-label" autoComplete="off" style={{float: 'left'}}>E-mail institucije</label>
  <input type="text" className="form-control" id="username" 
        />
</div>
<div className="mb-3">
 
</div>
<div className="mb-3">
  <label htmlFor="username" className="form-label" autoComplete='off' style={{float: 'left'}}>Šifra</label>
  <input type="password" className="form-control" id="username" 
        />
</div>
<div className="mb-3">
  <label htmlFor="username" className="form-label" autoComplete='off' style={{float: 'left'}}>Potvrdite šifru</label>
  <input type="password" className="form-control" id="username" 
        />
</div>



<div className="mb-3">

<Select options={uloge} isMulti={true} placeholder = "Odaberite ulogu..." />

</div>



<div className="mb-4">

<Select options={pacijenti} placeholder = "Odaberite roditelja..."/>
</div>
<div className="mb-4">

<Select options={pacijenti} placeholder = "Odaberite doktora..."/>
</div>
<div className="mb-4">

</div>

<div className="mb-3">
  <label htmlFor="username" className="form-label" style={{float: 'left'}}>Ulica</label>
  <input type="password" className="form-control" id="username" 
        />
</div>

<div className="mb-3">
  <label htmlFor="username" className="form-label" style={{float: 'left'}}>Broj</label>
  <input type="password" className="form-control" id="username" 
        />
</div>


<div className="mb-3">
  <label htmlFor="username" className="form-label" style={{float: 'left'}}>Grad</label>
  <input type="password"  className="form-control" id="username" 
        />
</div>








</div>


<button type="submit" className="btn btn-primary col-12 col-md-2 py-2 mb-4" style={{float:"right"}} >Spremi </button>
</form>
</div>
</div>
    </div>
    
  );
};

export default UserForm;
