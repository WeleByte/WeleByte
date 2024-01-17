import React, {useEffect, useState} from 'react';
import ArrowRightIcon from '../assets/icons/arrow-right.png'
import CloseIcon from '../assets/icons/x2.png'
import PlusIcon from '../assets/icons/plus.png'
import searchIcon from '../assets/icons/search.png'
import Navbar from './Header';
import userIcon from '../assets/images/userIcon.png'
import Select from 'react-select'

const SecondOpinionForm = (props) => {

  const [pediatricians, setPediatricians] = useState(null)
  const [doctors, setDoctors] = useState(null)
  const [allDoctors, setAllDoctors] = useState(null)
  const [allDoctorsFormatted, setAllDoctorsFormatted] = useState(null)
  const [secondOpinion, setSecondOpinion] = useState('')
  const [selectedDoctor, setSelectedDoctor] = useState(null)
  const closeModal = () => {
    props.closeSeccondOpinnionForm()
  }

  useEffect(() => {
    console.log(props.user)
    Promise.all([
      fetch(props.backendRoute + '/users/pediatricians', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${props.bearerToken}`,
          'Content-Type': 'application/json'
        }
      }),
      fetch(props.backendRoute + '/users/doctors', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${props.bearerToken}`,
          'Content-Type': 'application/json'
        }
      })
    ])
        .then(([pediatriciansPromise, doctorsPromise]) => {

          if (pediatriciansPromise.status === 401 || doctorsPromise.status === 401) {
            // props.handleLogOut()
            console.log("unauthorized!!")

          } else
          if (!pediatriciansPromise.ok || !doctorsPromise.ok) {
            console.error('Error: ', pediatriciansPromise, doctorsPromise)

          } else {
            console.log(pediatriciansPromise, doctorsPromise)
            return Promise.all([pediatriciansPromise.json(), doctorsPromise.json()])
          }
        }).then(([parsedPediatricians, parsedDoctors]) =>{

      console.log(parsedPediatricians, parsedDoctors);
      setPediatricians([parsedPediatricians]);
      setDoctors([parsedDoctors]);
      setAllDoctors([...parsedPediatricians, ...parsedDoctors]);

      const allDoctorsTemp= [...parsedPediatricians, ...parsedDoctors]

      setAllDoctorsFormatted(allDoctorsTemp.map(doctor => ({
        label: `${doctor.first_name} ${doctor.last_name} (${doctor.oib})`,
        value: doctor.id
      })))


      console.log(allDoctorsFormatted)
    })
        .catch(error => {
          console.error(error)
        })
  }, [])



  function handleSubmit(e) {
    e.preventDefault();

    if (secondOpinion && selectedDoctor) {

      fetch(props.backendRoute + "/second_opinions", {
        method: 'POST',
        headers: {
          'Authorization' : `Bearer ${props.bearerToken}`,
          "Content-Type": 'application/json'
        },
        body: JSON.stringify({
          requester_id: props.user.id,
          doctor_id: selectedDoctor.value,
          opinion: secondOpinion,
          content: null
        })
      })
      .then(response => {
        if (response.status === 401) {

        } else if (!response.ok) {
          console.error("Error: ", response)
        } else {
          props.refreshOpinions()
          console.log(response);
          closeModal()
        }
      })

    } else {
      console.log('Some field is empty', selectedDoctor);
    }

  }




  return (
    <div id = "addPatientsWrapper" className = "shadow-lg">


    <div id = "addPatientsInner">
   

    <h5 className = "pt-3 px-4 mt-2 mb-3 " style={{textAlign: "left"}}>Dodaj drugo mišljenje {/* <button className='btn btn-tertiary mt-1' style={{float: 'right'}}>Povijest </button>  */} <img style={{ height: "23px", float: "right" }} onClick = {closeModal} src={CloseIcon}></img>  </h5>
  

    <hr className = "mb-1 mt-4" style={{opacity: "20%"}}></hr>






    

    <div className='px-4 pt-0'>
    <form >

<div style={{display: "grid", gridTemplateColumns: "1fr", gridColumnGap: "20px"}} class ="mt-4">






<div className="mb-4">

<Select options={allDoctorsFormatted} placeholder = "Doktor kojem šaljete drugo mišljenje..."
        onChange={selectedOption => setSelectedDoctor(selectedOption)}/>
</div>


</div>

<div className="mb-3">
  <label htmlFor="username" className="form-label" style={{float: 'left'}}>Drugo mišljenje</label>
  <textarea rows = "7" type="date" className="form-control" id="username"
            onChange={(event) => setSecondOpinion(event.target.value)}/>
</div>

<button type="submit" className="btn btn-primary col-12 col-md-2 py-2 mb-4" style={{float:"right"}}
  onClick={handleSubmit}>Spremi </button>
</form>
</div>
</div>
    </div>
    
  );
};

export default SecondOpinionForm;
