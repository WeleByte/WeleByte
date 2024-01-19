import React, {useEffect, useState} from 'react';
import ArrowRightIcon from '../assets/icons/arrow-right.png'
import CloseIcon from '../assets/icons/x2.png'
import PlusIcon from '../assets/icons/plus.png'
import searchIcon from '../assets/icons/search.png'
import Navbar from './Header';
import userIcon from '../assets/images/userIcon.png'
import Select from 'react-select'
import {useSubmit} from "react-router-dom";

const UserDetail = (props) => {
    const user = props.user
    const [roles, setRoles] = useState(props.user.roles.map(role => role.name))
    const currentRole = props.role
    const [doctorsFormatted, setDoctorsFormatted] = useState([])
    const [usersFormatted, setUsersFormatted] = useState([])
    const [pediatriciansFormatted, setPediatriciansFormatted] = useState([])
    const [parentsFormatted, setParentsFormatted] = useState([])

    const [loggedUserIsAdmin, setLoggedUserIsAdmin] = useState(false)
    const [loggedUserIsParent, setLoggedUserIsParent] = useState(false)
    const [adminSelected, setAdminSelected] = useState(false)
    const [doctorSelected, setDoctorSelected] = useState(false)
    const [pediatricianSelected, setPediatricianSelected] = useState(false)
    const [childSelected, setChildSelected] = useState(false)
    const [parentSelected, setParentSelected] = useState(false)
    const [formatErrorMessage, setFormatErrorMessage] = useState(null)
    const [selectedDoctor, setSelectedDoctor] = useState(null)
    const [selectedParent, setSelectedParent] = useState(null)
    const [displayRoles, setDisplayRoles] = useState([])
    const [filteredRoles, setFilteredRoles] = useState([])
    const [newUser, setNewUser] = useState({
        first_name: props.user.first_name,
        last_name: props.user.last_name,
        email: props.user.email,
        oib: props.user.oib,
        institution_email: props.user.institution_email,
        parent_id: props.user.parent ? props.user.parent.id : null,
        doctor_id: props.user.doctor ? props.user.doctor.id : null,
        address: props.user.address ? ({
            street: props.user.address.street,
            number: props.user.address.number,
            city: props.user.address.city,
            country: props.user.address.country,
            latitude: props.user.address.latitude,
            longitude: props.user.address.longitude
        }) : null
    })
    const uloge = [
        {value: 'parent', label: 'Roditelj'},
        {value: 'child', label: 'Dijete'},
        {value: 'doctor', label: 'Doktor'},
        {value: 'pediatrician', label: 'Pedijatar'},
        {value: 'admin', label: 'Admin'}
    ]
    const closeModal = () => {
        console.log(newUser)
        props.close()
    }

    useEffect(() => {
        setDisplayRoles(uloge
            .filter(role => roles.includes(role.value))
            .map(role => role.label))
        switch (currentRole) {
            case 'admin':
                setLoggedUserIsAdmin(true)
                break
            case 'parent':
                setLoggedUserIsParent(true)
                break
            default:
                setLoggedUserIsParent(false)
                setLoggedUserIsAdmin(false)
                break
        }
        console.log("admin role: ", loggedUserIsAdmin, currentRole)

        const userRolesMapped = props.user.roles.map(role => role.name)
        handleUlogeChange(uloge.filter(role =>
            userRolesMapped.includes(role.value)))
        setFilteredRoles(uloge.filter(role => roles.includes(role.value)))
        console.log("Korisnik: ", newUser)
    }, []);

    const handleInputChange = (field, value) => {
        setNewUser((prevUser) => ({...prevUser, [field]: value}));
    };

    const handleAddressChange = (field, value) => {
        setNewUser((prevUser) => ({
            ...prevUser, address: {
                ...prevUser.address,
                [field]: value
            }
        }));
    };

    const handleUlogeChange = (selectedOptions) => {
        const selectedRoles = selectedOptions.map(option => option.value)

        console.log(selectedRoles)
        if (selectedRoles.includes('child'))
            setChildSelected(true)
        else setChildSelected(false)

        if (selectedRoles.includes('pediatrician'))
            setPediatricianSelected(true)
        else setPediatricianSelected(false)

        if (selectedRoles.includes('doctor'))
            setDoctorSelected(true)
        else setDoctorSelected(false)

        if (selectedRoles.includes('parent'))
            setParentSelected(true)
        else setParentSelected(false)

        if (selectedRoles.includes('admin'))
            setAdminSelected(true)
        else setAdminSelected(false)

        if (!selectedRoles.includes('child')) {
            console.log("tu sam 1")
            if (!selectedRoles.includes('parent')) {
                console.log("tu sam 2")
                setNewUser((prevUser) => ({
                    ...prevUser,
                    doctor_id: null,
                    parent_id: null
                }));
                setSelectedDoctor(null)
                setSelectedParent(null)
            } else {
                console.log("tu sam 3")
                setNewUser((prevUser) => ({
                    ...prevUser,
                    parent_id: null
                }));
                setSelectedParent(null)
            }
        }

        setRoles(selectedRoles)
        setFilteredRoles(uloge.filter(role => selectedRoles.includes(role.value)))
    };

    const handleRoditeljChange = (selectedOption) => {
        setNewUser((prevUser) => ({
            ...prevUser,
            parent_id: selectedOption ? selectedOption.value : null
        }))

        setSelectedParent(selectedOption)
    };

    const handleDoktorChange = (selectedOption) => {

        setNewUser((prevUser) => ({
            ...prevUser,
            doctor_id: selectedOption ? selectedOption.value : null
        }));

        setSelectedDoctor(selectedOption)
    }


    const ulogeById = [
        {id: 1, name: "admin"},
        {id: 2, name: "child"},
        {id: 3, name: "doctor"},
        {id: 4, name: "parent"},
        {id: 5, name: "pediatrician"}
    ]

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle the form submission with the user state
        if (newUser.first_name.length < 2 || newUser.last_name.length < 2) {
            setFormatErrorMessage('Ime i/ili prezime mora biti dulje od 2 slova')

        } else if (!newUser.email) {
            setFormatErrorMessage('Email je obavezan')
        } else if (!(/\S+@\S+\.\S+/.test(newUser.email)) || (newUser.institution_email && !(/\S+@\S+\.\S+/.test(newUser.institution_email)))) {
            setFormatErrorMessage('Email je neispravan')
        } else if (!newUser.oib || newUser.oib.length !== 11) {
            setFormatErrorMessage('OIB je neispravan')
        } else if (roles.length === 0) {
            setFormatErrorMessage('Odaberite ulogu')
        } else if (roles.includes('child') && (!newUser.parent_id || !newUser.doctor_id) && currentRole === 'admin') {
            setFormatErrorMessage('Odaberite roditelja i doktora za dijete')
        } else if (roles.includes('parent') && !newUser.doctor_id) {
            setFormatErrorMessage('Odaberite doktora')
        } else {
            setFormatErrorMessage(null)


            fetch(props.backendRoute + `/user/${props.user.id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${props.bearerToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userDTO: newUser,
                    roles: roles
                })
            })
                .then(response => {
                        console.log(response)
                        if (response.status === 400) {
                            setFormatErrorMessage('Neispravni podatci')
                        } else if (!response.ok) {
                            console.error("Error: ", response)
                        } else {
                            if (props.user.id === sessionStorage.userData.id) {
                                props.handleLogOut()
                            } else {
                                props.refreshUsers()
                                closeModal()
                            }
                        }
                    }
                )
            // console.log('User Data:', newUser, 'Roles: ', roles);
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
                    // console.log("unauthorized!!")

                } else if (!pediatriciansPromise.ok || !doctorsPromise.ok || !usersPromise.ok) {
                    // console.log('Error: ', pediatriciansPromise, doctorsPromise)

                } else {
                    // console.log(pediatriciansPromise, doctorsPromise, usersPromise)
                    return Promise.all([pediatriciansPromise.json(), doctorsPromise.json(), usersPromise.json()])
                }
            }).then(([parsedPediatricians, parsedDoctors, parsedUsers]) => {

            // console.log(parsedPediatricians, parsedDoctors, parsedUsers);

            const parents = parsedUsers.filter(user => user.roles.map(role => role.name).includes('parent'))
            setDoctorsFormatted(parsedDoctors.map(doctor => ({
                label: `${doctor.first_name} ${doctor.last_name} (${doctor.oib})`,
                value: doctor.id
            })))

            const doctorsFormattedTemp = parsedDoctors.map(doctor => ({
                label: `${doctor.first_name} ${doctor.last_name} (${doctor.oib})`,
                value: doctor.id
            }))

            setPediatriciansFormatted(parsedPediatricians.map(doctor => ({
                label: `${doctor.first_name} ${doctor.last_name} (${doctor.oib})`,
                value: doctor.id
            })))

            const pediatriciansFormattedTemp = parsedPediatricians.map(doctor => ({
                label: `${doctor.first_name} ${doctor.last_name} (${doctor.oib})`,
                value: doctor.id
            }))


            setUsersFormatted(parsedUsers.map(patient => ({
                label: `${patient.first_name} ${patient.last_name} (${patient.oib})`,
                value: patient.id
            })))

            const parentsFormattedTemp = parents.map(parent => ({
                label: `${parent.first_name} ${parent.last_name} (${parent.oib})`,
                value: parent.id
            }))

            setParentsFormatted(parents.map(parent => ({
                label: `${parent.first_name} ${parent.last_name} (${parent.oib})`,
                value: parent.id
            })))
            // console.log(parsedUsers)
            // console.log("doktori: ", doctorsFormatted, "pedijatri: ", pediatriciansFormatted);
            // console.log("useri: ", usersFormatted, "roditelji: ", parentsFormatted)

            if (parentSelected && doctorsFormattedTemp.map(doctor => doctor.value).includes(user.doctor.id)) {
                setSelectedDoctor(doctorsFormattedTemp.find(doctor => doctor.value === user.doctor.id))
            }
            if (childSelected && pediatriciansFormattedTemp.map(doctor => doctor.value).includes(user.doctor.id)) {
                setSelectedDoctor(pediatriciansFormattedTemp.find(doctor => doctor.value === user.doctor.id))
            }
            if (childSelected && parentsFormattedTemp.map(parent => parent.value).includes(user.parent.id)) {
                setSelectedParent(parentsFormattedTemp.find(parent => parent.value === user.parent.id))
            }
        })
            .catch(error => {
                console.error(error)
            })
    }, [parentSelected, childSelected])

    return (
        <div id="addPatientsWrapper" className="shadow-lg">
            <div id="addPatientsInner">
                <h5 className="pt-3 px-4 mt-2 mb-3 " style={{textAlign: "left"}}>Korisnik {/* <button className='btn btn-tertiary mt-1' style={{float: 'right'}}>Povijest </button>  */}
                    <img style={{height: "23px", float: "right"}} onClick={closeModal} src={CloseIcon}></img></h5>
                <hr className="mb-1 mt-4" style={{opacity: "20%"}}></hr>
                <div className='px-4 pt-0'>
                    <form>
                        <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gridColumnGap: "20px"}} className="mt-4">
                            <div className="mb-3">
                                <label htmlFor="first-name" className="form-label" style={{float: 'left'}}>Ime</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="username"
                                    value={newUser.first_name}
                                    disabled={!loggedUserIsAdmin}
                                    onChange={(e) => handleInputChange('first_name', e.target.value.replace(/[^a-zA-ZščćžđöüäŠČĆŽĐÖÜÄ\\s]/, ''))}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="last-name" className="form-label"
                                       style={{float: 'left'}}>Prezime</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="username"
                                    value={newUser.last_name}
                                    disabled={!loggedUserIsAdmin}
                                    onChange={(e) => handleInputChange('last_name', e.target.value.replace(/[^a-zA-ZščćžđöüäŠČĆŽĐÖÜÄ\\s]/, ''))}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label" autoComplete='off'
                                       style={{float: 'left'}}>Email</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="username"
                                    value={newUser.email}
                                    disabled={!loggedUserIsAdmin}
                                    onChange={(e) => handleInputChange('email', e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="oib" className="form-label" style={{float: 'left'}}>OIB</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="username"
                                    value={newUser.oib}
                                    disabled={!loggedUserIsAdmin}
                                    onChange={(e) => handleInputChange('oib', e.target.value.replace(/\D/g, ''))}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="institution-email" className="form-label" autoComplete="off"
                                       style={{float: 'left'}}>E-mail institucije</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="username"
                                    value={newUser.institution_email}
                                    disabled={!loggedUserIsAdmin && !loggedUserIsParent}
                                    onChange={(e) => handleInputChange('institution_email', e.target.value)}
                                />
                            </div>
                            <div className="mb-3">

                            </div>

                            {loggedUserIsAdmin ? (
                                <>
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
                                            value={filteredRoles}
                                            isDisabled={!loggedUserIsAdmin}
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
                                            isDisabled={!roles.includes('parent')
                                                && !roles.includes('child')}
                                            onChange={handleDoktorChange}
                                        />
                                    </div>

                                    <div>

                                    </div>
                                </>
                            ) : null}

                            <>
                                <div className="mb-3">
                                    <label htmlFor="street" className="form-label" style={{float: 'left'}}>Ulica</label>
                                    <input type="text" className="form-control" id="username"
                                           value={newUser.address ? newUser.address.street : ''}
                                           disabled={!loggedUserIsAdmin}
                                           onChange={(e) => handleAddressChange('street', e.target.value)}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="street-number" className="form-label"
                                           style={{float: 'left'}}>Broj</label>
                                    <input type="text" className="form-control" id="username"
                                           value={newUser.address ? newUser.address.number : ''}
                                           disabled={!loggedUserIsAdmin}
                                           onChange={(e) => handleAddressChange('number', e.target.value)}
                                    />
                                </div>


                                <div className="mb-3">
                                    <label htmlFor="city" className="form-label" style={{float: 'left'}}>Grad</label>
                                    <input type="text" className="form-control" id="username"
                                           value={newUser.address ? newUser.address.city : ''}
                                           disabled={!loggedUserIsAdmin}
                                           onChange={(e) => handleAddressChange('city', e.target.value)}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="Country" className="form-label"
                                           style={{float: 'left'}}>Država</label>
                                    <input type="text" className="form-control" id="username"
                                           value={newUser.address ? newUser.address.country : ''}
                                           disabled={!loggedUserIsAdmin}
                                           onChange={(e) => handleAddressChange('country', e.target.value)}
                                    />
                                </div>
                            </>

                            {!loggedUserIsAdmin ? (
                                <div className="mb-3">
                                    <label htmlFor="username" className=" col-12 text-label"
                                           style={{float: 'left', textAlign: "left"}}>Uloge </label>
                                    <p style={{textAlign: "left"}} className="mb-3"> {
                                        displayRoles.map((role, index) => index === displayRoles.length - 1 ? role : `${role}, `)
                                    } </p>
                                </div>
                            ) : null}
                        </div>


                        <p style={{color: 'red'}}>{formatErrorMessage}</p>
                        <button type="submit" className="btn btn-primary col-12 col-md-2 py-2 mb-4"
                                style={{float: "right"}} onClick={handleSubmit}>Spremi
                        </button>
                    </form>
                </div>
            </div>
        </div>

    );
};

export default UserDetail;