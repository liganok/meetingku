import React from 'react'
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import Slide from 'material-ui/transitions/Slide';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

function ConfirmDialog(props) {
  const {
    title = 'Confirm',
    message = '',
    open,
    onRequestClose,
    onConfirm
  } = props

  return (
    <Dialog
      open={open}
      transition={Transition}
      keepMounted
      onRequestClose={onRequestClose}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onRequestClose} color="primary">Cancel</Button>
        <Button onClick={onConfirm} color="primary">Confirm</Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmDialog