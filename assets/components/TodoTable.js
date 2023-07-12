import React, { Fragment, useState }  from 'react';
import { useContext } from 'react';
import  { TodoContext } from '../contexts/TodoContextProvider';
import {  InputAdornment, Table, TableBody, TableCell, TableHead, TableRow, TextField , Typography} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import DeleteDialog from './DeleteDialog';

function TodoTable()  {

    const context = useContext(TodoContext);
    const [addTodoTask, setAddTodoTask] = useState('');
    const [addTodoDescription, setAddTodoDescription] = useState('');
    const [editIsShown, setEditIsShown]=useState(false);
    const [editTodo , setEditTodo]=useState("");
    const [editTodoDescription , setEditTodoDescription]=useState("");
    const [deleteConfirmationIsShown, setDeleteConfirmationIsShown] = useState(false);
    const [todoToBeDeleted, setTodoToBeDeleted] = useState(null);

    const onCreateSubmit = (event) => {
        event.preventDefault();
        context.createTodo({ task: addTodoTask , description: addTodoDescription } , event);
        setAddTodoTask(''); 
        setAddTodoDescription('');
      };
    const onEditSubmit = (todoId, event) => {
        event.preventDefault();
        context.updateTodo({ id : todoId , task: editTodo , description: editTodoDescription});
        setEditIsShown(false); 
      };
    return (
        <Fragment>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Tasks</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell align='right'>Actions</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                <TableRow>
                    <TableCell>
                    <form onSubmit={onCreateSubmit}>
                        <TextField type='text'
                                value={addTodoTask} 
                                onChange={(event) => {
                                    setAddTodoTask(event.target.value);
                                }} 
                                label="New Task" 
                                fullWidth={true}/>
                    </form>
                    </TableCell>
                    <TableCell>
                    <form>
                        <TextField type='text'
                                value={addTodoDescription} 
                                onChange={(event) => {
                                    setAddTodoDescription(event.target.value);
                                }} 
                                label="Description" 
                                fullWidth={true}
                                multiline={true}/>
                    </form>
                    </TableCell>

                    <TableCell align='right'>
                        <IconButton onClick={onCreateSubmit}> <AddIcon/> </IconButton>
                    </TableCell>
                    
                </TableRow>
                    {context.todos.slice().reverse().map((todo , index) =>(
                        <TableRow key={'todo' + index}>
                             <TableCell>
                                {editIsShown === todo.id ?
                                 <form onSubmit={onEditSubmit.bind(this, todo.id)}>
                                     <TextField
                                         type="text"
                                         fullWidth={true}
                                         autoFocus={true}
                                         value={editTodo}
                                         onChange={(event) => {
                                             setEditTodo(event.target.value);
                                         }}
                                     />
                                 </form>
                                                         :
                                 <Typography>{todo.task}</Typography>
                                }
                            </TableCell>
 
                            {/*DESCRIPTION*/}
                            <TableCell>
                                {editIsShown === todo.id ?
                                 <TextField
                                     type="text"
                                     fullWidth={true}
                                     value={editTodoDescription}
                                     onChange={(event) => setEditTodoDescription(event.target.value)}
                                     multiline={true}
                                 />
                                                         :
                                 <Typography style={{whiteSpace: 'pre-wrap'}}>{todo.description}</Typography>
                                }
                            </TableCell>
 
                            
                            <TableCell align="right">
 
                                {editIsShown === todo.id ?
                                 <Fragment>
                                     <IconButton onClick={onEditSubmit.bind(this, todo.id)}>
                                         <DoneIcon/>
                                     </IconButton>
                                     <IconButton onClick={() => setEditIsShown(false)}>
                                         <CloseIcon/>
                                     </IconButton>
                                 </Fragment>
                                                         :
                                 <Fragment>
                                     <IconButton onClick={() => {
                                         setEditIsShown(todo.id);
                                         setEditTodo(todo.task);
                                         setEditTodoDescription(todo.description);
                                     }}>
                                         <EditIcon/>
                                     </IconButton>
 
                                     <IconButton onClick={() => {
                                         setDeleteConfirmationIsShown(true);
                                         setTodoToBeDeleted(todo);
                                     }}>
                                         <DeleteIcon/>
                                     </IconButton>
                                 </Fragment>
                                }
 
 
                            </TableCell>
                        </TableRow>
                    )
                        )}
            </TableBody>
        </Table>
        

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