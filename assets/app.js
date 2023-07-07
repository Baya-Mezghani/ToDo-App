import React , { Component } from 'react';
import ReactDOM  from 'react-dom';
import TodoContextProvider from './contexts/TodoContextProvider';
import TodoTable from './components/TodoTable.js';
import { CssBaseline } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


class App extends Component {
  render() {
    return (
      <TodoContextProvider>
        <CssBaseline>
            <TodoTable/> 
            <ToastContainer />
        </CssBaseline>
      </TodoContextProvider>
     
    );
  }
}

ReactDOM.render (<App/>, document.getElementById('root'));
