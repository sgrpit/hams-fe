import React, { useState } from 'react'
import PageHeader from '../Components/Common/PageHeader'
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone';
import StaffRegistration from './StaffRegistration';
import { makeStyles, Paper } from '@material-ui/core';
import api from '../api/StaffApi';

import { useHistory } from 'react-router-dom';
import { withRouter } from 'react-router-dom';


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

function Staff() {
    const history = useHistory()
    const classes = useStyles();
    const [staffDetails, setStaffDetails] = useState([]);
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [openPopup, setOpenPopup] = useState(false)
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })
    const [staffDetailsForEdit, setStaffDetailsForEdit] = useState(null)

    const addOrEditStaff = (staff, resetForm) => {
        debugger;
        const response = api.post("/Staff", staff);
        const allRecords = [...staffDetails, response.data];
        setStaffDetails(allRecords);
        history.push('/StaffList')
        resetForm();
    }
    return (
        <>
            <PageHeader 
                title="Staff Details" 
                subTitle="Manage Staff Details" 
                icon={<PeopleOutlineTwoToneIcon fontSize="large" />}                
            />
            <Paper className={classes.pageContent}>
                <StaffRegistration staffDetailsForEdit={staffDetailsForEdit}
                    addOrEditStaff={addOrEditStaff} />
            </Paper>
            
        </>
    )
}

export default withRouter(Staff)
