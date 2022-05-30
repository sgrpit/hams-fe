import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

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
import StaffList from './Pages/Admin/StaffList';





function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Header></Header>
        <Switch>      
          <Route exact path="/" component={Home}></Route>    
          <Route path="/Admin" component={Admin} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/Patient" component={Patient} />
          <Route path="/Staff" component={Staff} />
          <Route path="/StaffList" component={StaffList} />
          <Route path="/AdmitPatient" component={AdmitPatient} />
          <Route path="/AdminForm" component={AdminForm} />
          
          {/* <Redirect exact from="/" to={'/home'} /> */}
          
        </Switch>
      </BrowserRouter>
      <CssBaseline />
    </ThemeProvider>
  );
}

export default App;

//export default withRouter(App)
