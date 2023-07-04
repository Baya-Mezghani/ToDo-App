import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import PropTypes from 'prop-types';
import React, {useContext} from 'react';
import {TodoContext} from '../contexts/TodoContextProvider';

function DeleteDialog(props) {
    const context = useContext(TodoContext);

    const hide = () => {
        props.setDeleteConfirmationIsShown(false);
    };

    return (
        <Dialog onClose={hide} fullWidth={true} maxWidth='sm' open={props.open}>
            <DialogTitle>Are you sure you wish to delete this to-do?</DialogTitle>
            <DialogContent>
                {props.todo.task}
            </DialogContent>
            <DialogActions>
                <Button onClick={hide}>Cancel</Button>
                <Button onClick={() => {
                    context.deleteTodo({id: props.todo.id, task: props.todo.task});
                    hide();
                }}>
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
}

DeleteDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    setDeleteConfirmationIsShown: PropTypes.func.isRequired,
    todo: PropTypes.shape = ({
        id: PropTypes.number,
        task: PropTypes.string,
    }),
};
export default DeleteDialog;
