import React from 'react'
import PropTypes from 'prop-types'
import IconButton from 'material-ui/IconButton'
import Button from 'material-ui/Button'
import Paper from 'material-ui/Paper'
import Typography from 'material-ui/Typography'
import VDivider from '../common/VDivider'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'

function UserInfo(props) {
  const {
    username='sdf',
    email,
    onClickLogout,
  } = props
  return (
    <Paper style={{ display: 'flex', alignItems: 'center',padding:10 }}>
      <div style={{ flex: 2, diplay: 'flex', alignItems: 'center'}}>
        <Typography>{username}</Typography>
        <Typography color="textSecondary">{email}</Typography>
      </div>
      <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center'}}>
        <IconButton style={{ width: 40, height: 40 }}><KeyboardArrowRight style={{ width: 20, height: 20 }} /></IconButton>
        <VDivider height={30} />
        <Button size="small"  onClick={onClickLogout}>Logout</Button>
      </div>
    </Paper>
  )
}

UserInfo.propTypes = {
  username: PropTypes.string,
  email: PropTypes.string,
  onClickLogout: PropTypes.func
}

export default UserInfo