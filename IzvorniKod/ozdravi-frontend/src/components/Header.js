import React from 'react';
import logoPng from '../assets/images/logo.png';
import userIcon from '../assets/images/userIcon.png'
import {useState} from 'react';
import {useNavigate} from "react-router-dom";

const Navbar = () => {
    const uloga = "doktor"
    const navigate = useNavigate()

    const [selectedItem, setSelectedItem] = useState(localStorage.getItem('SelectedItem'))
    const handleItemClick = (e, item) => {
        // e.preventDefault()
        localStorage.setItem('SelectedItem', item)
        setSelectedItem(item)
        console.log(selectedItem)
        switch(item) {
            case 'home': navigate('/home')
                break
            case 'drugaMisljenja': navigate('/drugaMisljenja')
                break
            case 'pacijenti': navigate('/users')
                break
            case 'bolovanja': navigate('/bolovanja')
                break
        }
    }
  return (
      

    
    <div id = "HomePageWrapper">
     
     <nav className="navbar  navbar-expand-lg navbar-light  px-3 py-3 py-lg-0  " >
      <img src = {logoPng} id ="navbarLogo" alt = "" style={{height: "40px !important"}} className='ms-2'></img>
      <button className="navbar-toggler " type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav ">
          <button className={selectedItem === 'home' ? "nav-item nav-link active" : "nav-item nav-link"}
             onClick={(e)  => handleItemClick(e, 'home')}> Početna </button>

          { uloga === "doktor" || uloga === "pedijatar" ? (  <button
              className={selectedItem === 'pacijenti' ? "nav-item nav-link active" : "nav-item nav-link"}
               onClick={(e) => handleItemClick(e, 'pacijenti')}>Pacijenti</button> ) : null }

          <button className={selectedItem === 'drugaMisljenja' ? "nav-item nav-link active" : "nav-item nav-link"}
              onClick={(e) => handleItemClick(e, 'drugaMisljenja')}>Druga Misljenja</button>

          <button className={selectedItem === 'bolovanja' ? "nav-item nav-link active" : "nav-item nav-link"}
              onClick={(e) => handleItemClick(e, 'bolovanja')}>Bolovanja</button>

          { uloga === "roditelj" ? (  <button className="nav-item nav-link">Djeca</button> ) : null }
        </div>
      </div>


    
      <button className="btn btn-secondary me-2 ps-3" id="logOutBtn">

  Moj Profil
  <img src={userIcon} id="user-icon-navbar" alt="" width="19" className="ms-3 me-1 mb-0" style={{transform: "translateY(-2px)", display: "inline", opacity: "70%", verticalAlign: "middle" }} />
</button>



    </nav>
    </div>
  );
};

export default Navbar;
