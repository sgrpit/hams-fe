import { Grid, Paper, Typography } from '@material-ui/core'
import React from 'react'
import Controls from '../Controls/Controls'

export default function PatientDetails(props) {
  debugger;
  return (
    <Paper spacing={5}>
      <Grid container>
        <Grid item sx={4}>
        <Typography>
              <div>Name : {props.data.data.patientName}</div>
              <div>Date Of Birth : {props.data.data.dateOfBirth}</div>
            </Typography>
        </Grid>
        <Grid item sx={8}>
          
        </Grid>
      </Grid>
    </Paper>
    
  )
}
