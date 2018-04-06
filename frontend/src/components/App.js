import React, { Component } from 'react';
import AppointmentApp from './AppointmentApp';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import '../App.css';

class App extends Component {
  render() {
    return (
      <div>
        <MuiThemeProvider>
          <AppointmentApp />
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
