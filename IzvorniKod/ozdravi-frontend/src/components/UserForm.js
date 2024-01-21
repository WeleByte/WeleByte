import React, {useEffect, useState} from 'react';
import ArrowRightIcon from '../assets/icons/arrow-right.png'
import CloseIcon from '../assets/icons/x2.png'
import PlusIcon from '../assets/icons/plus.png'
import searchIcon from '../assets/icons/search.png'
import Navbar from './Header';
import userIcon from '../assets/images/userIcon.png'
import Select from 'react-select'
import {useSubmit} from "react-router-dom";

const UserForm = (props) => {
    const currentRole = props.role
    const [roles, setRoles] = useState([])
    const [user, setUser] = useState({
        first_name: '',
        last_name: '',
        email: '',
        oib: null,
        institution_email: '',
        password: '',
        parent_id: null,
        doctor_id: null,
        address: {
            street: null,
            number: null,
            city: null,
            country: null,
            latitude: null,
            longitude: null
        }
    });
    const [confirmPassword, setConfirmPassword] = useState('')
    const [doctorsFormatted, setDoctorsFormatted] = useState([])
    const [usersFormatted, setUsersFormatted] = useState([])
    const [pediatriciansFormatted, setPediatriciansFormatted] = useState([])
    const [parentsFormatted,  setParentsFormatted] = useState([])

    const [adminSelected, setAdminSelected] = useState(false)
    const [doctorSelected, setDoctorSelected] = useState(false)
    const [pediatricianSelected, setPediatricianSelected] = useState(false)
    const [childSelected, setChildSelected] = useState(false)
    const [parentSelected, setParentSelected] = useState(false)
    const [formatErrorMessage, setFormatErrorMessage] = useState(null)
    const [selectedDoctor, setSelectedDoctor] = useState(null)
    const [selectedParent, setSelectedParent] = useState(null)
    const closeModal = () => {
        props.closeUserForm()
    }

    const handleInputChange = (field, value) => {
        setUser((prevUser) => ({ ...prevUser, [field]: value }));
    };

    const handleAddressChange = (field, value) => {
        setUser((prevUser) => ({
            ...prevUser, address: {
                ...prevUser.address,
                [field]: value
            }
        }));
    };

    const handleUlogeChange = (selectedOptions) => {
        const selectedRoles = selectedOptions.map(option => option.value)

        if(selectedRoles.includes('child'))
            setChildSelected(true)
        else setChildSelected(false)

        if(selectedRoles.includes('pediatrician'))
            setPediatricianSelected(true)
        else setPediatricianSelected(false)

        if(selectedRoles.includes('doctor'))
            setDoctorSelected(true)
        else setDoctorSelected(false)

        if(selectedRoles.includes('parent'))
            setParentSelected(true)
        else setParentSelected(false)

        if(selectedRoles.includes('admin'))
            setAdminSelected(true)
        else setAdminSelected(false)

        if(selectedRoles){
            setUser((prevUser) => ({
                ...prevUser,
                doctor_id: null,
                parent_id: null
            }));
            setSelectedDoctor(null)
            setSelectedParent(null)
        }

        setRoles(selectedRoles)
    };

    const handleRoditeljChange = (selectedOption) => {
        setUser((prevUser) => ({
            ...prevUser,
            parent_id: selectedOption ? selectedOption.value : null
        }))

        setSelectedParent(selectedOption)
    };

    const handleDoktorChange = (selectedOption) => {

        setUser((prevUser) => ({
            ...prevUser,
            doctor_id: selectedOption ? selectedOption.value : null
        }));

        setSelectedDoctor(selectedOption)
    }

    const uloge = [
        { value: 'parent', label: 'Roditelj' },
        { value: 'child', label: 'Dijete' },
        { value: 'doctor', label: 'Doktor' },
        { value: 'pediatrician', label: 'Pedijatar' },
        { value: 'admin', label: 'Admin'}
    ]

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle the form submission with the user state
        if(user.first_name.length < 2 || user.last_name.length < 2){
            setFormatErrorMessage('Ime i/ili prezime mora biti dulje od 2 slova')

        } else if(!user.email){
            setFormatErrorMessage('Email je obavezan')
        } else if(!(/\S+@\S+\.\S+/.test(user.email)) || (user.institution_email && !(/\S+@\S+\.\S+/.test(user.institution_email)))){
            setFormatErrorMessage('Email je neispravan')
        } else if(!user.oib || user.oib.length !== 11){
            setFormatErrorMessage('OIB je neispravan')
        } else if(!childSelected && user.password.length < 6){
            setFormatErrorMessage('Šifra mora biti dulja od 6 znakova')
        } else if(!childSelected && user.password !== confirmPassword){
            setFormatErrorMessage('Šifre se ne poklapaju')
        } else if(roles.length === 0){
            setFormatErrorMessage('Odaberite ulogu')
        } else if(roles.includes('child') && (!user.parent_id || !user.doctor_id) && currentRole === 'admin'){
            console.log(currentRole)
            setFormatErrorMessage('Odaberite roditelja i doktora za dijete')
        } else if(roles.includes('parent') && !user.doctor_id){
            setFormatErrorMessage('Odaberite doktora')
        } else {
            setFormatErrorMessage(null)

            if(!user.address.city || !user.address.street || !user.address.number || !user.address.country) {
                user.address = null;
            }

            fetch(props.backendRoute + '/users', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${props.bearerToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userDTO: user,
                    roles: roles
                })

            })
                .then(response => {
                        console.log(response)
                        if(response.status === 400){
                            setFormatErrorMessage('OIB nije ispravan')
                        } else
                        if(response.status === 401){
                            props.handleLogOut()
                        }
                        else{
                            props.refreshUsers()
                            props.closeUserForm()
                        }
                    }
                )
            console.log("doktori: ", doctorsFormatted, "pedijatri: ", pediatriciansFormatted)
            console.log("useri: ", usersFormatted, "roditelji: ", parentsFormatted)
            console.log('User Data:', user, 'Roles: ', roles);
        }
    }

    useEffect(() => {
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
            }),
            fetch(props.backendRoute + '/users', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${props.bearerToken}`,
                    'Content-Type': 'application/json'
                }
            })
        ])
            .then(([pediatriciansPromise, doctorsPromise, usersPromise]) => {

                if (pediatriciansPromise.status === 401 || doctorsPromise.status === 401 || usersPromise.status === 401) {
                    /* props.handleLogOut() */
                    console.log("unauthorized!!")

                } else
                if (!pediatriciansPromise.ok || !doctorsPromise.ok || !usersPromise.ok) {
                    console.log('Error: ', pediatriciansPromise, doctorsPromise)

                } else {
                    console.log(pediatriciansPromise, doctorsPromise, usersPromise)
                    return Promise.all([pediatriciansPromise.json(), doctorsPromise.json(), usersPromise.json()])
                }
            }).then(([parsedPediatricians, parsedDoctors, parsedUsers]) =>{

            console.log(parsedPediatricians, parsedDoctors, parsedUsers);

            const parents = parsedUsers.filter(user => user.roles.map(role => role.name).includes('parent'))
            setDoctorsFormatted(parsedDoctors.map(doctor => ({
                label: `${doctor.first_name} ${doctor.last_name} (${doctor.oib})`,
                value: doctor.id
            })))

            setPediatriciansFormatted(parsedPediatricians.map(doctor => ({
                label: `${doctor.first_name} ${doctor.last_name} (${doctor.oib})`,
                value: doctor.id
            })))



            setUsersFormatted(parsedUsers.map(patient => ({
                label: `${patient.first_name} ${patient.last_name} (${patient.oib})`,
                value: patient.id
            })))


            setParentsFormatted(parents.map(parent => ({
                label: `${parent.first_name} ${parent.last_name} (${parent.oib})`,
                value: parent.id
            })))
            console.log(parsedUsers)
            // console.log("doktori: ", doctorsFormatted, "pedijatri: ", pediatriciansFormatted);
            // console.log("useri: ", usersFormatted, "roditelji: ", parentsFormatted)
        })
            .catch(error => {
                console.error(error)
            })
    }, [])

    return (
        <div id = "addPatientsWrapper" className = "shadow-lg">


            <div id = "addPatientsInner">


                <h5 className = "pt-3 px-4 mt-2 mb-3 " style={{textAlign: "left"}}>Dodaj korisnika {/* <button className='btn btn-tertiary mt-1' style={{float: 'right'}}>Povijest </button>  */} <img style={{ height: "23px", float: "right" }} onClick = {closeModal} src={CloseIcon}></img>  </h5>


                <hr className = "mb-1 mt-4" style={{opacity: "20%"}}></hr>








                <div className='px-4 pt-0' >
                    <form style={{maxHeight: "500px", overflowY: "scroll"}}>

                        <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gridColumnGap: "20px"}} class ="mt-4">

                            <div className="mb-3">
                                <label htmlFor="first-name" className="form-label" style={{ float: 'left' }}>Ime</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="username"
                                    value={user.first_name}
                                    onChange={(e) => handleInputChange('first_name', e.target.value.replace(/[^a-zA-ZščćžđöüäŠČĆŽĐÖÜÄ\\s]/, ''))}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="last-name" className="form-label" style={{float: 'left'}}>Prezime</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="username"
                                    value={user.last_name}
                                    onChange={(e) => handleInputChange('last_name', e.target.value.replace(/[^a-zA-ZščćžđöüäŠČĆŽĐÖÜÄ\\s]/, ''))}
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
                                    onChange={(e) => handleInputChange('oib', e.target.value.replace(/\D/g, ''))}
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
                                    id="password"
                                    value={user.password}
                                    onChange={(e) => handleInputChange('password', e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password-confirmation" className="form-label" autoComplete='off' style={{float: 'left'}}>Potvrdite šifru</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>



                            <div className="mb-3">
                                <Select
                                    options={
                                        parentSelected ? uloge.filter(role => role.value === 'admin' || (role.value !== 'child' && !doctorSelected && !pediatricianSelected))
                                            : adminSelected ? uloge.filter(role => role.value === 'parent' || (role.value !== 'child' && !doctorSelected && !pediatricianSelected))
                                                : adminSelected && parentSelected ? uloge.filter(role => role.value !== 'child' && !doctorSelected && !pediatricianSelected)
                                                    : doctorSelected || pediatricianSelected ? uloge.filter(role => role.value === 'parent' || role.value === 'admin')
                                                        : childSelected ? [] : uloge
                                    }
                                    isMulti={true}
                                    placeholder="Odaberite ulogu..."
                                    // value={}
                                    onChange={handleUlogeChange}
                                />
                            </div>

                            <div className="mb-4">
                                <Select
                                    options={childSelected ? parentsFormatted : []}
                                    placeholder="Odaberite roditelja..."
                                    value={selectedParent}
                                    isDisabled={!roles.includes('child')}
                                    onChange={handleRoditeljChange}
                                />
                            </div>

                            <div className="mb-4">
                                <Select
                                    options={childSelected ? pediatriciansFormatted : parentSelected ? doctorsFormatted : []}
                                    placeholder="Odaberite doktora..."
                                    value={selectedDoctor}
                                    isDisabled={!roles.includes('parent') && !roles.includes('child')}
                                    onChange={handleDoktorChange}
                                />
                            </div>
                            <div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="street" className="form-label" style={{float: 'left'}}>Ulica</label>
                                <input type="text" className="form-control" id="username"
                                       onChange={(e) => handleAddressChange('street', e.target.value)}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="street-number" className="form-label" style={{float: 'left'}}>Broj</label>
                                <input type="text" className="form-control" id="username"
                                       onChange={(e) => handleAddressChange('number', e.target.value)}
                                />
                            </div>


                            <div className="mb-3">
                                <label htmlFor="city" className="form-label" style={{float: 'left'}}>Grad</label>
                                <input type="text"  className="form-control" id="username"
                                       onChange={(e) => handleAddressChange('city', e.target.value)}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="Country" className="form-label" style={{float: 'left'}}>Drzava</label>
                                <input type="text"  className="form-control" id="username"
                                       onChange={(e) => handleAddressChange('country', e.target.value)}
                                />
                            </div>








                        </div>

                        <p style={{color: 'red'}}>{formatErrorMessage}</p>
                        <button type="submit" className="btn btn-primary col-12 col-md-2 py-2 mb-4" style={{float:"right"}} onClick={handleSubmit}>Spremi </button>
                    </form>
                </div>
            </div>
        </div>

    );
};

export default UserForm;
