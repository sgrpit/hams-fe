import { Grid, makeStyles, TextField } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import Controls from '../Components/Controls/Controls';
import { Form, useForm } from '../Components/useForm';
import * as employeeService from '../Services/EmployeeService';

const initialFValues = {
    id: 0,
    patientUHID: '',
    patientName: '',    
    contactNo: '',
    emailId: '',
    dateOfBirth: new Date(),
    gender: 'male',
    address: '',
    patientType: ''
}

const genderItems = [
    { id: 'male', title: 'Male' },
    { id: 'female', title: 'Female' },
    { id: 'other', title: 'Other' }
]

const useStyles = makeStyles(theme => ({
    root: {
            '& .MuiGrid-root': {
                marginLeft: '10%',
                marginRight: '10%'
        }
    },
    gridItem: {
        width: '30%',
    }
    
}))



export default function PatientRegistration(props) {
    const classes = useStyles();
    const { addOrEdit, recordForEdit } = props

    const validate = (fieldValues = values) => {
        let temp = {...errors}
        setErrors({
            ...temp
        })
        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
    } 

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFValues, true, validate)

    const handleSubmit = e => {
        e.preventDefault()
        // if (validate()) {
            debugger;
            addOrEdit(values, resetForm);
        // }
    }

    useEffect(() => {
        if (recordForEdit != null)
            setValues({
                ...recordForEdit
            })
    }, [recordForEdit])

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container className={classes.root}>
                <Grid item sx={4} className={classes.gridItem}>
                    <Controls.Input
                        variant='outlined' name='patientName' label='Patient Name'
                        value={values.firstName} onChange={handleInputChange}
                    />                    
                     <Controls.Input
                        variant='outlined' name='contactNo' label='Contact No'
                        value={values.contactNo} onChange={handleInputChange}
                    />
                    <Controls.Input
                        variant='outlined' name='address' label='Address'
                        value={values.Address} onChange={handleInputChange}
                    />
                    <Controls.RadioGroup
                        name="gender"
                        label="Gender"
                        value={values.gender}
                        onChange={handleInputChange}
                        items={genderItems}
                    />
                </Grid>
                <Grid item sx={4} className={classes.gridItem}>
                    
                    <Controls.Input
                        variant='outlined' name='emailId' label='Email Id'
                        value={values.EmailId} onChange={handleInputChange}
                    />
                </Grid>
                <Grid item sx={4} className={classes.gridItem}>                   
                    <Controls.DatePicker
                        name="dateOfBirth"
                        label="DOB"
                        value={values.dateOfBirth}
                        onChange={handleInputChange}
                    />
                    {/* <Controls.Select
                        name="departmentId"
                        label="Department"
                        value={values.departmentId}
                        onChange={handleInputChange}
                        options={employeeService.getDepartmentCollection()}                        
                    /> */}
                     <Controls.Button
                            type="submit"
                            text="Submit" />
                        <Controls.Button
                            text="Reset"
                            color="default"
                            onChange={resetForm}
                        />
                </Grid>

            </Grid>
        </Form>
    )
}
