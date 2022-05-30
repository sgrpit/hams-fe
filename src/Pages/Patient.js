import React, { useEffect, useState } from 'react'
import PageHeader from '../Components/Common/PageHeader'
import Controls from '../Components/Controls/Controls';
import useTable from '../Components/useTable';
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone';
import PatientRegistration from './PatientRegistration';
import { Icon, InputAdornment, makeStyles, Paper, Table, TableBody, TableCell, TableHead, TableRow, Toolbar } from '@material-ui/core';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import AddIcon from '@material-ui/icons/Add'
import { Search } from '@material-ui/icons';
import Popup from '../Components/Popup';
import api from '../api/PatientAPI';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import ConfirmDialog from '../Components/Common/ConfirmDialogue';


const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    },
    searchInput: {
        width: '75%'
    },
    newButton: {
        position: 'absolute',
        right: '10px'
    }
}))

const headCells = [
    { id: 'uhid', label: 'UHID' },
    { id: 'patientName', label: 'Patient NAme' },
    { id: 'contactNo', label: 'Contact No' },    
    { id: 'actions', label: 'Actions', disableSorting: true }
]

export default function Patient() {
    const classes = useStyles();
    const histroy = useHistory();
    const [records, setRecords] = useState([]);
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [openPopup, setOpenPopup] = useState(false)
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })
    const [recordForEdit, setRecordForEdit] = useState(null)
    

    useEffect(() => {
        const fetchPatients = async ()=> {
            try{
                const response = await api.get('/Patient');
                setRecords(response.data.data);
                // console.log(response.data);
            }   
            catch(err){

            }
        }
        fetchPatients();
    }, [])

    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } = useTable(records, headCells, filterFn);

    const openInPopup = item => {
        setRecordForEdit(item)
        setOpenPopup(true)
    }

    const handleSearch = e => {

    }

    const addOrEdit = (patient, resetForm) => {
        
        const response = api.post("/Patient", patient);
        const allRecords = [...records, response.data];
        setRecords(allRecords);
        resetForm();
    }

    const onDelete = patientUHID => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })

        const response = api.delete('/Patient?patientUHID=' + patientUHID);
    }


    return (
        <>
            <PageHeader
                title="Patient Details"
                subTitle="Manage PAtient Details"
                icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
            />
            <Paper className={classes.pageContent}>
            <Toolbar>
                    <Controls.Input
                        label="Search Employees"
                        className={classes.searchInput}
                        InputProps={{
                            startAdornment: (<InputAdornment position="start">
                                <Search />
                            </InputAdornment>)
                        }}
                         onChange={handleSearch}
                    />
                    <Controls.Button
                        text="Add New"
                        variant="outlined"
                        startIcon={<AddIcon />}
                        className={classes.newButton}
                        onClick={() => { setOpenPopup(true); setRecordForEdit(null); }}
                    />
                </Toolbar>
            <TblContainer>
                <TblHead />
                <TableBody>
                    {
                        records.map(item =>
                        (
                            <TableRow key={item.id}>
                                <TableCell>{item.patientUHID}</TableCell>
                                <TableCell>{item.patientName}</TableCell>
                                <TableCell>{item.contactNo}</TableCell>
                                <TableCell style={{ display: 'flex', margin: '5px' }}>
                                    <Controls.ActionButton color='primary'
                                     onClick={() => { openInPopup(item) }}  >
                                        <EditOutlinedIcon fontSize="small" />
                                    </Controls.ActionButton>
                                    <Controls.ActionButton color='secondary'
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
                                    </Controls.ActionButton>
                                </TableCell>
                            </TableRow>
                        ))
                    }                    
                </TableBody>
            </TblContainer>
            </Paper>
            <Popup
                title="Add Patient" openPopup={openPopup} setOpenPopup={setOpenPopup} >
                <PatientRegistration recordForEdit={recordForEdit}
                    addOrEdit={addOrEdit}></PatientRegistration>
            </Popup>
            <ConfirmDialog
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
            />
        </>
    )
}
