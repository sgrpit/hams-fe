import { Grid } from '@material-ui/core'
import React, { useState } from 'react'
import Controls from '../Components/Controls/Controls'
import { Form } from '../Components/useForm'

const initialFValues = {
    id: 0,
    patientName: '',
    contactNo: '',
    emailId: '',
    appointmentScheduleDate: new Date(),
    appointmentSecduledTimeSlot: '',
    gender: 'male',
    departmentId: 0,
    staffid: 0,
    dignosisDetails: ''


}

export default function PatientAppointment(props) {
    const [values, setValues] = useState(initialFValues);

    return (
        <Form>
            <Grid container>
                <Grid item sx={6}>
                    <Controls.Input 
                        variant='outlined'
                        label='Patient Name'
                        value={values.patientName}
                        />
                    <Controls.Input 
                        variant='outlined'
                        label='Contact No'
                        value={values.contactNo}
                        />
                    <Controls.Input 
                        variant='outlined'
                        label='EmailId'
                        value={values.emailId}
                        />
                    <Controls.DatePicker
                        name="appointmentScheduledDate"
                        label="Date"
                        value={values.appointmentScheduleDate}
                     />

                </Grid>
                <Grid item sx={6}>
                <Controls.Input 
                        variant='outlined'
                        label='Patient Name'
                        value={values.patientName}
                        />
                    {/* <Controls.Select
                            name="departmentId"
                            label="Department"
                            
                            //onChange={handleInputChange}
                            //options={employeeService.getDepartmentCollection()}                        
                        />
                    <Controls.Select
                            name="departmentId"
                            label="Doctor"
                            
                            //onChange={handleInputChange}
                            //options={employeeService.getDepartmentCollection()}                        
                        /> */}
                </Grid>
            </Grid>
        </Form>
  )
}
