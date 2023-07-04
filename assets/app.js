import React , { Component } from 'react';
import ReactDOM  from 'react-dom';
import TodoContextProvider from './contexts/TodoContextProvider';
import TodoTable from './components/TodoTable.js';
import { CssBaseline } from '@mui/material';
class App extends Component {
  render() {
    return (
      <TodoContextProvider>
        <CssBaseline>
            <TodoTable/> 
        </CssBaseline>
      </TodoContextProvider>
     
    );
  }
}

ReactDOM.render (<App/>, document.getElementById('root'));
