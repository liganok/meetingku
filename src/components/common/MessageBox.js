import React from 'react'
import PropTypes from 'prop-types'
import Snackbar from '@material-ui/core/Snackbar';

function MessageBox(props) {
  const {
    isShowMsg = false,
    msg = { status: '', message: '' },
    onRequestClose
  } = props

  return (
    <Snackbar
      style={{marginTop:50}}  
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}  
      open={isShowMsg}
      autoHideDuration={2500}
      onClose={onRequestClose}
      SnackbarContentProps={{
        'aria-describedby': 'message-id',
      }}
      message={<span id="message-id">{msg.message}</span>}
    />
  )
}

MessageBox.propTypes = {
  isShowMsg: PropTypes.bool,
  msg: PropTypes.object,
  onRequestClose: PropTypes.func
}

export default MessageBox
