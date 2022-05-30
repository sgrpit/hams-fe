import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { ThemeProvider } from '@material-ui/styles';
import theme from './Components/ui/Theme';
import Header from './Components/Common/Header';
import Home from './Pages/Home';
import Admin from './Pages/Admin/Admin'
import Staff from './Pages/Staff';
import Patient from './Pages/Patient';
import { CssBaseline } from '@material-ui/core';
import AdmitPatient from './Pages/Admin/AdmitPatient';
import AdminForm from './Pages/app' 
import PatientList from './Pages/PatientList';
import Dashboard from './Pages/Admin/Dashboard';




function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Header />
        <Switch>
          
          <Route exact path="/" component={Home}></Route>
          <Route exact path="/Admin" component={Admin} />
          <Route exact path="/Dashboard" component={Dashboard} />
          <Route exact path="/Patient" component={Patient} />
          <Route exact path="/Staff" component={Staff} />
          <Route exact path="/AdmitPatient" component={PatientList} />
          <Route exact path="/AdminForm" component={AdminForm} />
        </Switch>
      </BrowserRouter>
      <CssBaseline />
    </ThemeProvider>
  );
}

export default App;
