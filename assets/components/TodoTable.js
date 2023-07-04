import React, { Fragment, useState }  from 'react';
import { useContext } from 'react';
import  { TodoContext } from '../contexts/TodoContextProvider';
import {  InputAdornment, Table, TableBody, TableCell, TableHead, TableRow, TextField } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import DeleteDialog from './DeleteDialog';

function TodoTable()  {

    const context = useContext(TodoContext);
    const [addTodo, setAddTodo] = useState('');
    const [editIsShown, setEditIsShown]=useState(false);
    const [editTodo , setEditTodo]=useState("");
    const [deleteConfirmationIsShown, setDeleteConfirmationIsShown] = useState(false);
    const [todoToBeDeleted, setTodoToBeDeleted] = useState(null);

    return (
        <Fragment>

        <form onSubmit={(event) => {context.createTodo( {task:addTodo},  event)}}>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Task</TableCell>
                    <TableCell align='right'>Actions</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                <TableRow>
                    <TableCell>
                        <TextField value={addTodo} onChange={(event) => {setAddTodo(event.target.value); console.log(event.target.value);}} label="New Task" fullWidth={true}/>
                    </TableCell>
                    <TableCell align='right'>
                        <IconButton type='submit'> <AddIcon/> </IconButton>
                    </TableCell>
                </TableRow>
                    {context.todos.slice().reverse().map((todo , index) =>(
                        <TableRow key={'todo' + index}>
                            <TableCell>
                                
                                {editIsShown === todo.id ?
                                     <TextField value={editTodo} 
                                     onChange={(event) => {setEditTodo(event.target.value);}} 
                                     label="New Task" 
                                     fullWidth={true}
                                     InputProps={{endAdornment :<Fragment>
                                        <IconButton onClick={()=>{setEditIsShown(false);} }> < CloseIcon/> </IconButton>
                                        <IconButton onClick={()=> {setEditIsShown(false); context.updateTodo({id: todo.id, task: editTodo})}}> <DoneIcon/> </IconButton>
                                        </Fragment>}}/>
                                    
                                :

                                todo.task   
                                    
                                }   
                            
                            
                            
                            </TableCell>
                
                            <TableCell align='right'>
                                <IconButton onClick={()=>{setEditIsShown(todo.id) ; setEditTodo (todo.task)}}><EditIcon/></IconButton>
                                <IconButton onClick={() => {
                                        setDeleteConfirmationIsShown(true);
                                        setTodoToBeDeleted(todo);
                                    }}>
                                        <DeleteIcon/>
                                    </IconButton>
                            </TableCell>
                        </TableRow>
                    )
                        )}
            </TableBody>
        </Table>
        </form>

        {deleteConfirmationIsShown && (
                <DeleteDialog todo={todoToBeDeleted}
                              open={deleteConfirmationIsShown}
                              setDeleteConfirmationIsShown={setDeleteConfirmationIsShown}
                />
            )}

        
        </Fragment>

    );
  }

export default TodoTable;