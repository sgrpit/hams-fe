import { Grid, makeStyles, TextField } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import Controls from '../Components/Controls/Controls';
import { Form, useForm } from '../Components/useForm';
import * as employeeService from '../Services/EmployeeService';
import { Formik } from 'formik';
import * as Yup from 'yup';

const initialFValues = {
    id: 0,
    firstName: '',
    lastName: '',
    middleName:'',
    contactNo: '',
    emailId: '',
    bloodGroup:'',
    dateOfBirth: new Date(),
    gender: 'male',
    address: '',
    city: '',
    departmentId: 1,
    isPermanent: true
}

const formValidation = Yup.object().shape({
    firstName: Yup.string()
        .required('Required'),
})

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

export default function StaffRegistration(props) {
    const classes = useStyles();
    const { addOrEditStaff, staffDetailsForEdit } = props



    const {
        values,
        setValues,
        handleInputChange,
        resetForm
    } = useForm(initialFValues)
    

    const handleSubmit = e =>{
        e.preventDefault();
        addOrEditStaff(values, resetForm)

    }

    useEffect(() => {
        if (staffDetailsForEdit != null)
            setValues({
                ...staffDetailsForEdit
            })
    }, [staffDetailsForEdit])

    return (
        <Formik
            initialValues={{
                ...initialFValues
            }}
            validationSchema={formValidation}
            onSubmit={values => {
                console.log(values);
            }}
        >
            <Form onSubmit={handleSubmit}>
                <Grid container className={classes.ro}>
                    <Grid item sx={4} className={classes.gridItem}>
                        <Controls.Input
                            variant='outlined' name='firstName' label='First Name'
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
                            variant='outlined' name='middleName' label='Middle Name'
                            value={values.middleName} onChange={handleInputChange}
                        />
                        <Controls.Input
                            variant='outlined' name='emailId' label='Email Id'
                            value={values.EmailId} onChange={handleInputChange}
                        />
                        <Controls.Input
                            variant='outlined' name='city' label='City'
                            value={values.city} onChange={handleInputChange}
                        />


                    </Grid>
                    <Grid item sx={4} className={classes.gridItem}>
                        <Controls.Input
                            variant='outlined' name='lastName' label='Last Name'
                            value={values.lastName} onChange={handleInputChange}
                        />
                        <Controls.DatePicker
                            name="dateOfBirth"
                            label="DOB"
                            value={values.dateOfBirth}
                            onChange={handleInputChange}
                        />
                        <Controls.Select
                            name="departmentId"
                            label="Department"
                            value={values.departmentId}
                            onChange={handleInputChange}
                            options={employeeService.getDepartmentCollection()}
                        />
                        <Controls.Button
                            type="submit"
                            text="Submit" />
                        <Controls.Button
                            text="Reset"
                            color="default"
                        />
                    </Grid>
                </Grid>
            </Form>
        </Formik>
    )
}
