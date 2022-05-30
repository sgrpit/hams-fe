import React, { useEffect, useState } from 'react'
import PageHeader from '../../Components/Common/PageHeader'
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone';
import { makeStyles, Paper, TableBody, TableCell, TableHead, TableRow, } from '@material-ui/core';
import api from '../../api/StaffApi'
import useTable from '../../Components/useTable';
import Controls from '../../Components/Controls/Controls';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';



const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    },
    newButton: {
        position: 'absolute',
        right: '10px'
    }
}))

const headCells = [
    { id: 'staffId', label: 'Staff ID' },
    { id: 'staffName', label: 'Staff Name' },
    { id: 'contactNo', label: 'Contact No' },    
    { id: 'Email ', label: 'Actions', disableSorting: true }
]

export default function StaffList() {
    const classes = useStyles();
    const [records, setRecords] = useState([]);
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [openPopup, setOpenPopup] = useState(false)
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })
    const [recordForEdit, setRecordForEdit] = useState(null)

    useEffect(() => {
        const fetchStaffDetails = async ()=> {
            try{
                debugger;
                const response = await api.get('/Staff');
                setRecords(response.data);
                // console.log(response.data);
            }   
            catch(err){

            }
        }
        fetchStaffDetails();
    }, [])

    const {
        TblContainer,
        TblHead
    } = useTable(records, headCells);

    const openInPopup = item => {
        setRecordForEdit(item)
        setOpenPopup(true)
    }

    const onDelete = staffId => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })

        const response = api.delete('/Staff?staffId=' + staffId);
    }

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
                        records.map(item =>
                        (
                            <TableRow key={item.id}>
                                <TableCell>{item.staffId}</TableCell>
                                <TableCell>{item.firstName + " " + item.lastName}</TableCell>
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
                                                    onConfirm: () => { onDelete(item.staffId) }
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
        </>
    )
}
