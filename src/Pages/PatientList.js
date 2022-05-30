import React, { useEffect, useState } from 'react'
import PageHeader from '../Components/Common/PageHeader'
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone';
import { makeStyles, Paper, TableBody, TableCell, TableRow, Toolbar } from '@material-ui/core';
import useTable from '../Components/useTable';
import api from '../api/PatientAPI'
import axios from 'axios';
import Controls from '../Components/Controls/Controls';

const useStyles = makeStyles(theme => ({

}))

const headCells = [
    { id: 'uhid', label: 'UHID' },
    { id: 'patientName', label: 'Patient Name' },
    { id: 'contactNo', label: 'Contact No' },
    { id: 'appointmentDate', label: 'Appointment Date'},    
    { id: 'actions', label: 'Actions', disableSorting: true }
]


export default function PatientList() {
    const classes = useStyles();
    const [patientAppointments, setPatientAppointment] = useState([]);
    const {
        TblContainer,
        TblHead,
        TblPagination
    } = useTable(patientAppointments, headCells)

    useEffect(() => {
        // const fetchPatientsAppointment = async ()=> {
        //     try{
        //         const response = await api.get('/Patient/GetPatientAppointmentDetails');
        //         //setRecords(response.data);
        //         console.log(response.data);
        //     }   
        //     catch(err){

        //     }
        // }
        // fetchPatientsAppointment();
        axios.get("https://localhost:5001/api/Patient/GetPatientAppointmentDetails")
            .then(res => {
                debugger;
                if (!res.data.succeeded) {
                    console.log("No Records Found")
                }
                else {
                    setPatientAppointment(res.data.data);
                    
                }
            })
            .catch(err => console.log(err));
        
    }, []);
    return (
        <>
            <PageHeader
                title="Patient Details"
                subTitle="Manage PAtient Details"
                icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
            />
            <Paper className={classes.pageContent}>
                <TblContainer>
                    <TblHead />
                    <TableBody>
                    {
                        
                        patientAppointments.map(item =>
                        (
                            <TableRow key={item.patientUHID}>
                                <TableCell>{item.patientUHID}</TableCell>
                                <TableCell>{item.patientName}</TableCell>
                                <TableCell>{item.contactNo}</TableCell>
                                <TableCell>{item.appointmentDate}</TableCell>
                                <TableCell style={{ display: 'flex', margin: '5px' }}>
                                    {/* <Controls.ActionButton color='primary'
                                     onClick={() => { openInPopup(item) }}  >
                                        <EditOutlinedIcon fontSize="small" />
                                    </Controls.ActionButton> */}
                                    {/* <Controls.ActionButton color='secondary'
                                        onClick={() => {
                                                setConfirmDialog({
                                                    isOpen: true,
                                                    title: 'Are you sure to delete this record?',
                                                    subTitle: "You can't undo this operation",
                                                    onConfirm: () => { onDelete(item.patientUHID) }
                                                })
                                            }} >
                                        <DeleteOutlinedIcon fontSize="small" />
                                    </Controls.ActionButton>
                                    <Controls.ActionButton color='primary' >
                                        <VisibilityOutlinedIcon fontSize="small" />
                                    </Controls.ActionButton> */}
                                </TableCell>
                            </TableRow>
                        ))
                    }                    
                </TableBody>
                </TblContainer>
            </Paper>
        </>
    )
}
