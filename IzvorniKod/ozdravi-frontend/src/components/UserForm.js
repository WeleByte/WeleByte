import React, { useState } from 'react';
import ArrowRightIcon from '../assets/icons/arrow-right.png'
import CloseIcon from '../assets/icons/x2.png'
import PlusIcon from '../assets/icons/plus.png'
import searchIcon from '../assets/icons/search.png'
import Navbar from './Header';
import userIcon from '../assets/images/userIcon.png'
import Select from 'react-select'

const UserForm = ({closeNoviPregled}) => {

    const [user, setUser] = useState({
        first_name: '',
        last_name: '',
        email: '',
        oib: '',
        institution_email: '',
        password: '',
        roles: [],
        parent: null,
        doctor: null,
        address: {
            street: '',
            number: '',
            city: '',
            country: ''
        }
    });
    const [confirmPassword, setConfirmPassword] = useState('')
  const closeModal = () => {
    closeNoviPregled()
  }

    const handleInputChange = (field, value) => {
        setUser((prevUser) => ({ ...prevUser, [field]: value }));
    };

    const handleUlogeChange = (selectedOptions) => {
        setUser((prevUser) => ({ ...prevUser, uloge: selectedOptions }));
    };

    const handleRoditeljChange = (selectedOption) => {
        setUser((prevUser) => ({ ...prevUser, parent: selectedOption }));
    };

    const handleDoktorChange = (selectedOption) => {
        setUser((prevUser) => ({ ...prevUser, doctor: selectedOption }));
    };


  const uloge = [
    { value: 'parent', label: 'Roditelj' },
    { value: 'child', label: 'Dijete' },
    { value: 'doctor', label: 'Doktor' },
    { value: 'pediatrician', label: 'Pedijatar' }

  ]
    const pacijenti = [{value : 1, label:"durda"}]

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle the form submission with the user state
        console.log('User Data:', user);
    };



  return (
    <div id = "addPatientsWrapper" className = "shadow-lg">


    <div id = "addPatientsInner">
   

    <h5 className = "pt-3 px-4 mt-2 mb-3 " style={{textAlign: "left"}}>Dodaj korisnika {/* <button className='btn btn-tertiary mt-1' style={{float: 'right'}}>Povijest </button>  */} <img style={{ height: "23px", float: "right" }} onClick = {closeModal} src={CloseIcon}></img>  </h5>
  

<hr className = "mb-1 mt-4" style={{opacity: "20%"}}></hr>






    

    <div className='px-4 pt-0'>
    <form onSubmit={handleSubmit}>

<div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gridColumnGap: "20px"}} class ="mt-4">

    <div className="mb-3">
        <label htmlFor="first-name" className="form-label" style={{ float: 'left' }}>Ime</label>
        <input
            type="text"
            className="form-control"
            id="username"
            value={user.firstName}
            onChange={(e) => handleInputChange('first_name', e.target.value)}
        />
    </div>
    <div className="mb-3">
      <label htmlFor="last-name" className="form-label" style={{float: 'left'}}>Prezime</label>
      <input
          type="text"
          className="form-control"
          id="username"
          value={user.last_name}
          onChange={(e) => handleInputChange('last_name', e.target.value)}
            />
    </div>
    <div className="mb-3">
      <label htmlFor="email" className="form-label" autoComplete='off' style={{float: 'left'}}>Email</label>
      <input
          type="text"
          className="form-control"
          id="username"
          value={user.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
            />
    </div>
    <div className="mb-3">
      <label htmlFor="oib" className="form-label" style={{float: 'left'}}>OIB</label>
      <input
          type="text"
          className="form-control"
          id="username"
          value={user.oib}
          onChange={(e) => handleInputChange('oib', e.target.value)}
            />
    </div>
    <div className="mb-3">
      <label htmlFor="institution-email" className="form-label" autoComplete="off" style={{float: 'left'}}>E-mail institucije</label>
      <input
          type="text"
          className="form-control"
          id="username"
          value={user.institution_email}
          onChange={(e) => handleInputChange('institution_email', e.target.value)}
            />
    </div>
    <div className="mb-3">

    </div>
    <div className="mb-3">
      <label htmlFor="password" className="form-label" autoComplete='off' style={{float: 'left'}}>Šifra</label>
      <input
          type="password"
          className="form-control"
          id="username"
          value={user.password}
          onChange={(e) => handleInputChange('password', e.target.value)}
            />
    </div>
    <div className="mb-3">
      <label htmlFor="password-confirmation" className="form-label" autoComplete='off' style={{float: 'left'}}>Potvrdite šifru</label>
      <input
          type="password"
          className="form-control"
          id="username"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
            />
    </div>



    <div className="mb-3">
        <Select
            options={uloge}
            isMulti={true}
            placeholder="Odaberite ulogu..."
            value={user.uloge}
            onChange={handleUlogeChange}
        />
    </div>

    <div className="mb-4">
        <Select
            options={pacijenti}
            placeholder="Odaberite roditelja..."
            value={user.roditelj}
            onChange={handleRoditeljChange}
        />
    </div>

    <div className="mb-4">
        <Select
            options={pacijenti}
            placeholder="Odaberite doktora..."
            value={user.doctor}
            onChange={handleDoktorChange}
        />
    </div>

    <div className="mb-3">
      <label htmlFor="street" className="form-label" style={{float: 'left'}}>Ulica</label>
      <input type="text" className="form-control" id="username"
            />
    </div>

    <div className="mb-3">
      <label htmlFor="street-number" className="form-label" style={{float: 'left'}}>Broj</label>
      <input type="text" className="form-control" id="username"
            />
    </div>


    <div className="mb-3">
        <label htmlFor="city" className="form-label" style={{float: 'left'}}>Grad</label>
        <input type="text"  className="form-control" id="username"
        />
    </div>

    <div className="mb-3">
        <label htmlFor="Country" className="form-label" style={{float: 'left'}}>Drzava</label>
        <input type="text"  className="form-control" id="username"
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
