import React, {useEffect, useState} from 'react';
import ArrowRightIcon from '../assets/icons/arrow-right.png'
import CloseIcon from '../assets/icons/x2.png'
import PlusIcon from '../assets/icons/plus.png'
import searchIcon from '../assets/icons/search.png'
import Navbar from './Header';
import userIcon from '../assets/images/userIcon.png'
import Select from 'react-select'

const NovaUputa = (props) => {
  const [patients, setPatients] = useState([])
  const [selectedPatient, setSelectedPatient] = useState(null)
  const [patientsFormatted, setPatientsFormatted] = useState([])
  const [content, setContent] = useState(null)
  const [currentDateTime, setCurrentDateTime] = useState('');
  const closeModal = () => {
    props.closeUputaForm()
  }
  useEffect(() => {
    fetch(props.backendRoute + "/users", {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${props.bearerToken}`,
        'Content-Type': 'application/json'
      }
    })
        .then(response => {
          if (response.status === 401) {
            props.handleLogOut()
          } else if(!response.ok){
            console.log("Error:", response.status, response.statusText);
          } else {
            return response.json();
          }
        })
        .then(parsedData => {
          setPatients(parsedData);
          setPatientsFormatted(parsedData.map(patient => ({
            label: `${patient.first_name} ${patient.last_name}`,
            value: patient.id
          })))
        })
        .catch(error => {
          console.error('Fetch error:', error);
        });
  }, []);

  useEffect(() => {
    const getCurrentDateTime = () => {
      const now = new Date();
      // Format date and time in 'yyyy-MM-ddTHH:mm' format
      const formattedDateTime = now.toISOString().slice(0, 16);
      setCurrentDateTime(formattedDateTime);
    };

    getCurrentDateTime();

    // Optionally, you can set up an interval to update the date and time every minute
    const intervalId = setInterval(getCurrentDateTime, 60000);

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    if (content && selectedPatient) {
      console.log(selectedPatient)
      fetch(props.backendRoute + "/instructions", {
        method: 'POST',
        headers: {
          'Authorization' : `Bearer ${props.bearerToken}`,
          "Content-Type": 'application/json'
        },
        body: JSON.stringify({
          'patient_id' : selectedPatient.value,
          'content' : content,
          'doctor_id' : props.user.id,
          'date' : currentDateTime
        })
      })
          .then(response => {
            // if(response.status === 401){
            //   props.handleLogOut()
            // }else
            {
              props.refreshExaminations()
              console.log(response);
            }
          })
      closeModal()
    } else {
      console.log('Some field is empty', selectedPatient, content);
    }
  }

  return (
      <div id = "addPatientsWrapper" className = "shadow-lg">


        <div id = "addPatientsInner">


          <h5 className = "pt-3 px-4 mt-2 mb-3 " style={{textAlign: "left"}}>Dodaj uputu{/* <button className='btn btn-tertiary mt-1' style={{float: 'right'}}>Povijest </button>  */} <img style={{ height: "23px", float: "right" }} onClick = {closeModal} src={CloseIcon}></img>  </h5>


          <hr className = "mb-1 mt-4" style={{opacity: "20%"}}></hr>








          <div className='px-4 pt-0'>
            <form >

              <div style={{display: "grid", gridTemplateColumns: "1fr", gridColumnGap: "20px"}} class ="mt-4">







                <div className="mb-4">

                  <Select options={patientsFormatted} placeholder = "Pacijent..."
                          onChange={selectedOption => setSelectedPatient(selectedOption)}/>
                </div>

                <div className="mb-3">
                  <label htmlFor="username" className="form-label" style={{float: 'left'}}>OPIS UPUTE</label>
                  <textarea rows = "7" type="date" className="form-control" id="username"
                            onChange={(event) => setContent(event.target.value)}/>
                </div>


              </div>


              <button type="submit" className="btn btn-primary col-12 col-md-2 py-2 mb-4" style={{float:"right"}}
                      onClick={handleSubmit}>Spremi </button>
            </form>
          </div>
        </div>
      </div>

  );
};

export default NovaUputa;
