import React , { Component } from 'react';
import { createRoot } from 'react-dom/client';
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
const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App/>);
