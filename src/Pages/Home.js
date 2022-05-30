import { Container, Grid, makeStyles, Paper, Typography } from '@material-ui/core'
import React from 'react'
import Controls from '../Components/Controls/Controls'
import { useHistory } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

//import Login from './Login'

const useStyles = makeStyles((theme) => ({
  formWrapper: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(8),
  },
}));

function Home(props) {
  const classes = useStyles();
  const history = useHistory();

  const handleLogin = e => {
    debugger;
    //e.preventDefault();
    //<Link to="/dashboard" />
    
  }

  return (
    <Grid item xs={12}>
      <Container maxWidth="md">
        <div className={classes.formWrapper}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant='h3'>
                Login
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Controls.Input label="Username" name="UserName" />
            </Grid>
            <Grid item xs={12}>
              <Controls.Input label="Password" name="Password" />
            </Grid>
            <Grid item xs={12}>
              <Controls.Button text="LOG IN" type="button" onClick={handleLogin} />
            </Grid>
          </Grid>
        </div>
      </Container>
    </Grid>
  )
}

export default Home
