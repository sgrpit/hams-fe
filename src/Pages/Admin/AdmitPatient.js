import { Grid, makeStyles, Paper } from '@material-ui/core'
import { InfoOutlined } from '@material-ui/icons'
import React, { useState } from 'react'
import Controls from '../../Components/Controls/Controls'
import { Form } from '../../Components/useForm'
import api from '../../api/PatientAPI'
import axios from 'axios';
import { useForm } from '../../Components/useForm'
import PageHeader from '../../Components/Common/PageHeader'
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone';
import PatientDetails from '../../Components/Patient/PatientDetails'

const intialFValues = {
  patientUHID : ""
}

const useStyles = makeStyles(theme => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3)
  },
  gridItem: {
    display: "flex"
  }
}))



export default function AdmitPatient() {
  const classes = useStyles();
  const [data, setData] = useState(null)
  //const[values, setValues] = useState(intialFValues);

  const {
    values,
    setValues,
    handleInputChange
  } = useForm(intialFValues)

  const handleSearch = e => {
    e.preventDefault()
    axios.get("https://localhost:5001/api/Patient/UHID/" + values.patientUHID)
      .then(res => {
        //debugger;
        if(!res.data.succeeded){
          console.log("No Records Found")
        }
        else{
          setData(res.data);
        }
      })
      .catch(err => console.log(err));
  };
  console.log(data);
  return (
    // <Form onSubmit={handleSubmit}>
    <>
      <PageHeader title="Patient Details"
              subTitle="Manage PAtient Details"
              icon={<PeopleOutlineTwoToneIcon fontSize="large" />} />
      <Paper className={classes.pageContent}>
        <div className={classes.gridItem}>
          <div >
            <Controls.Input variant='outlined' label='UHID' name='patientUHID'
              value={values.patientUHID} onChange={handleInputChange} />
          </div>
          <div>
            <Controls.Button
              type="submit"
              text="Submit" onClick={handleSearch} />
          </div>
        </div>
        <div>
          <div>
          {
            data && (<PatientDetails data = {data} />) 
          }
                     
            
          </div>
        </div>
      </Paper>
    </>
    // </Form>
  )
}
