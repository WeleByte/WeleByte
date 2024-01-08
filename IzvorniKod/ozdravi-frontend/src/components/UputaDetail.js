import React, {useEffect, useState} from 'react';
import ArrowRightIcon from '../assets/icons/arrow-right.png'
import CloseIcon from '../assets/icons/x2.png'
import PlusIcon from '../assets/icons/plus.png'
import searchIcon from '../assets/icons/search.png'
import Navbar from './Header';
import userIcon from '../assets/images/userIcon.png'
import Select from 'react-select'

const UputaDetail = (props) => {

  const [instruction, setInstruction] = useState(null)
  const closeModal = () => {
    props.closeInstructionDetail()
  }

  useEffect(() => {
    console.log(props.currentInstructionId)
    if(props.currentInstructionId !== null && props.currentInstructionId !== undefined) {
      fetch(props.backendRoute + `/instruction/${props.currentInstructionId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${props.bearerToken}`,
          'Content-Type': 'application/json'
        }
      })
          .then(response => {
            // if (response.status === 401) {
            //   props.handleLogOut()
            // } else
            if (!response.ok) {
              console.log("Error:", response.status, response.statusText);
            } else {
              return response.json();
            }
          })
          .then(parsedData => {
            console.log("Parsed Data: ", parsedData)
            setInstruction(parsedData)
          })
          .catch(error => {
            console.error('Fetch error:', error);
          });
    }
  }, [props.currentInstructionId]);





  return (
    <div id = "addPatientsWrapper" className = "shadow-lg">


    <div id = "addPatientsInner">
   

    <h5 className = "pt-3 px-4 mt-2 mb-3 " style={{textAlign: "left"}}>Uputa {/* <button className='btn btn-tertiary mt-1' style={{float: 'right'}}>Povijest </button>  */} <img style={{ height: "23px", float: "right" }} onClick = {closeModal} src={CloseIcon}></img>  </h5>
  

    <hr className = "mb-1 mt-4" style={{opacity: "20%"}}></hr>


      {instruction ? (
    

    <div className='px-4 pt-0'>
    <form >

<div style={{display: "grid", gridTemplateColumns: "1fr", gridColumnGap: "20px"}} class ="mt-4">








<div className="mb-3">
  <label htmlFor="username" className=" col-12 text-label" style={{float: 'left', textAlign:"left"}}>Pacijent </label>
  <p style={{textAlign:"left"}} class ="text">{instruction.patient.first_name + " " + instruction.patient.last_name}</p>
</div>
<div className="mb-3">
  <label htmlFor="username" className=" col-12 text-label" style={{float: 'left', textAlign:"left"}}>Uputa</label>
  <p style={{textAlign:"left"}} class ="text">{instruction.content}</p>
</div>

</div>







</form>
</div>
    ) : (<p>Loading...</p>)
      }
</div>
    </div>
    
  );
};

export default UputaDetail;
