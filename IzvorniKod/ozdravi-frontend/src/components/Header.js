import React, {useEffect} from 'react';
import logoPng from '../assets/images/logo.png';
import userIcon from '../assets/images/userIcon.png'
import {useState} from 'react';
import {useNavigate} from "react-router-dom";
import Select from "react-select";

const Navbar = () => {
    const uloga = "doktor"
    const navigate = useNavigate()
    const [selectedItem, setSelectedItem] = useState(localStorage.getItem('SelectedItem'))
    let userData = JSON.parse(sessionStorage.userData)
    let roles = userData.roles
    let userRolesMapped = roles.map(object => object.name)

    const [selectedRole, setSelectedRole] = useState(null)

    const [selectableRoles, setSelectableRoles] = useState([])

    
    let doctorRole = false
    let parentRole = false
    let adminRole = false
    let pediatricianRole = false

    const selectStyles = {
        control: (base, state) => ({
          ...base,
          height: '36px', // Set your desired height
          minHeight: '36px',
          maxWidth: '300px',
        
        })
      };
    const selectStylesMobile = {
        control: (base, state) => ({
          ...base,
          height: '36px', // Set your desired height
          minHeight: '36px',
          maxWidth: '200px',
          marginLeft: '15px',
          marginTop: '13px',
          marginBottom: '10px'
        }),
        menu: (base) => ({
            ...base,
            maxWidth: '200px',
            marginLeft: '15px', // This will be based on the control width
          }),
      };

    roles.forEach(role => {
        if(role.name === "admin") adminRole = true
        if(role.name === "pediatrician") pediatricianRole = true
        if(role.name === "parent") parentRole = true
        if(role.name === "doctor") doctorRole = true

    })

    const availableRoles = [
        {value: 1, label: "Admin"},
        {value: 3, label: "Doctor"},
        {value: 4, label: "Parent"},
        {value: 5, label: "Pediatrician"}
      ]


      useEffect(() => {
    
          const filteredRoles = availableRoles.filter(role => userRolesMapped.includes(role.label.toLowerCase()))
          setSelectableRoles(filteredRoles)
          console.log(selectableRoles)
    
        
      }, []);



    const handleItemClick = (e, item) => {
        // e.preventDefault()
        localStorage.setItem('SelectedItem', item)
        setSelectedItem(item)
        // selectedItem = item
        switch(item) {
            case 'home': navigate('/home')
                break
            case 'drugaMisljenja': navigate('/drugaMisljenja')
                break
            case 'pacijenti': navigate('/users')
                break
            case 'bolovanja': navigate('/bolovanja')
                break
            case 'profil': navigate('/profil')
                break
            case 'pregledi': navigate('/pregledi')
                break
            case 'upute': navigate('/upute')
                break
        }
    }

   

    return (

    
 
     
        <nav className="navbar  navbar-expand-lg navbar-light  px-3 py-3 py-lg-0  col-12" >
        <img src = {logoPng} id ="navbarLogo" alt = "" style={{height: "40px !important"}} className='ms-2'></img>
        <button className="navbar-toggler " type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup"
                aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav pt-3 pt-lg-0">

                <button className={selectedItem === 'home' ? "nav-item nav-link active text-start" : "nav-item nav-link text-start"}
                    onClick={(e)  => handleItemClick(e, 'home')}> Početna </button>
          {(<button
              className={selectedItem === 'pacijenti' ? "nav-item nav-link active text-start" : "nav-item nav-link text-start"}
              onClick={(e) => handleItemClick(e, 'pacijenti')}>

              {(doctorRole ? ("Pacijenti") : null)}
              {(pediatricianRole ? ("Pacijenti") : null)}
              {(adminRole ? ("Korisnici") : null)}
              {(parentRole ? ("Djeca") : null)}


          </button>) }

          <button className={selectedItem === 'pregledi' ? "nav-item nav-link active text-start" : "nav-item nav-link text-start"}
              onClick={(e) => handleItemClick(e, 'pregledi')}>Pregledi</button>

          <button className={selectedItem === 'drugaMisljenja' ? "nav-item nav-link active text-start" : "nav-item nav-link text-start"}
              onClick={(e) => handleItemClick(e, 'drugaMisljenja')}>Druga Misljenja</button>

          <button className={selectedItem === 'bolovanja' ? "nav-item nav-link active text-start" : "nav-item nav-link text-start"}
              onClick={(e) => handleItemClick(e, 'bolovanja')}>Bolovanja</button>

          <button className={selectedItem === 'upute' ? "nav-item nav-link active text-start" : "nav-item nav-link text-start"}
              onClick={(e) => handleItemClick(e, 'upute')}>Upute</button>

          { uloga === "roditelj" ? (  <button className="nav-item nav-link text-start">Djeca</button> ) : null }

          <div className="me-4 d-lg-none">
                  <Select styles={selectStylesMobile} isSearchable = {false}  options={selectableRoles} placeholder = {selectableRoles[0]?.label}
                          onChange={selectedOption =>
                              setSelectedRole(selectedOption)}/>
                </div>

        </div>
      </div>


    
     
      <div className="me-4 d-none d-lg-block">
                  <Select styles={selectStyles} isSearchable = {false}   options={selectableRoles} placeholder = {selectableRoles[0]?.label}
                          onChange={selectedOption =>
                              setSelectedRole(selectedOption)}/>
                </div>
    
      <button className="btn btn-secondary me-2 ps-3" id="logOutBtn" onClick={(e) => handleItemClick(e, 'profil')}>

  Moj Profil
  <img src={userIcon} id="user-icon-navbar" alt="" width="19" className="ms-3 me-1 mb-0" style={{transform: "translateY(-2px)", display: "inline", opacity: "70%", verticalAlign: "middle" }} />
</button>



    </nav>
  
  )
}

export default Navbar;
