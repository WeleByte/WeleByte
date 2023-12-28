import React, { useState } from 'react';
import ArrowRightIcon from '../assets/icons/arrow-right.png'
import CloseIcon from '../assets/icons/x2.png'
import PlusIcon from '../assets/icons/plus.png'
import searchIcon from '../assets/icons/search.png'
import Navbar from './Header';
import userIcon from '../assets/images/userIcon.png'
import Select from 'react-select'

const UputaDetail = ({closeSeccondOpinnionForm}) => {

  const closeModal = () => {
    closeSeccondOpinnionForm()
  }

 

  const doktori = [
    { value: '1', label: 'Chocolate' },
    { value: '2', label: 'Marta Martovič' },
    { value: '3', label: 'Vanilla' }
  ]





  return (
    <div id = "addPatientsWrapper" className = "shadow-lg">


    <div id = "addPatientsInner">
   

    <h5 className = "pt-3 px-4 mt-2 mb-3 " style={{textAlign: "left"}}>Uputa {/* <button className='btn btn-tertiary mt-1' style={{float: 'right'}}>Povijest </button>  */} <img style={{ height: "23px", float: "right" }} onClick = {closeModal} src={CloseIcon}></img>  </h5>
  

    <hr className = "mb-1 mt-4" style={{opacity: "20%"}}></hr>






    

    <div className='px-4 pt-0'>
    <form >

<div style={{display: "grid", gridTemplateColumns: "1fr", gridColumnGap: "20px"}} class ="mt-4">








<div className="mb-3">
  <label htmlFor="username" className=" col-12 text-label" style={{float: 'left', textAlign:"left"}}>Uputa</label>
  <p style={{textAlign:"left"}} class ="text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce lectus eros, dapibus et odio vitae, placerat rutrum odio. Duis vel hendrerit velit. Integer interdum enim vel felis fermentum, id faucibus ex tempor. Curabitur iaculis sapien eu dictum porttitor. Aenean fermentum neque lectus, vel varius ipsum convallis eu. Duis auctor eros eget arcu iaculis dignissim. Praesent nec metus sollicitudin, lobortis nisi a, dictum ante. Morbi in justo ac ante finibus blandit a at neque.
Fusce tristique velit diam, in fringilla massa faucibus eu. Integer lectus tortor, fringilla in urna id, condimentum ultrices ex. Praesent viverra pretium rutrum. Proin elementum molestie nisi. Aliquam erat volutpat. Nulla fermentum a elit ac tempus. Quisque ac odio at leo consectetur consectetur a sed nibh. Vestibulum consectetur gravida libero at fermentum. Cras et sodales nisl. Nam pharetra ornare pulvinar.</p>
</div>
</div>







</form>
</div>
</div>
    </div>
    
  );
};

export default UputaDetail;
